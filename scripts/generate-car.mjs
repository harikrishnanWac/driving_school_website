/**
 * Generate realistic Indian hatchback car GLB models.
 * Creates: public/models/car.glb  &  public/models/school-car.glb
 *
 * Run:  node scripts/generate-car.mjs
 */

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { writeFileSync } from 'fs';

// ── helpers ──────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, ...opts });
}

function rounded(w, h, d, r, s) {
  // Rounded box via capsule-like approach: just use a normal box with bevel
  const shape = new THREE.Shape();
  const x = w / 2 - r;
  const y = h / 2 - r;
  shape.moveTo(-x, -h / 2);
  shape.lineTo(x, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -y);
  shape.lineTo(w / 2, y);
  shape.quadraticCurveTo(w / 2, h / 2, x, h / 2);
  shape.lineTo(-x, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, y);
  shape.lineTo(-w / 2, -y);
  shape.quadraticCurveTo(-w / 2, -h / 2, -x, -h / 2);
  return new THREE.ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: r * 0.3,
    bevelSize: r * 0.3,
    bevelSegments: s || 3,
  });
}

// ── Materials ────────────────────────────────────────────────
const paintWhite   = mat('#e8e8e8', { metalness: 0.6, roughness: 0.25 });
const paintRed     = mat('#b91c1c', { metalness: 0.6, roughness: 0.25 });
const paintBlue    = mat('#1e3a8a', { metalness: 0.6, roughness: 0.25 });
const paintSilver  = mat('#a0a0a0', { metalness: 0.7, roughness: 0.2 });
const paintGray    = mat('#4a4a4a', { metalness: 0.6, roughness: 0.25 });
const glass        = mat('#88ccff', { transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.1 });
const chrome       = mat('#d0d0d0', { metalness: 0.95, roughness: 0.05 });
const blackPlastic = mat('#111111', { roughness: 0.85 });
const darkGray     = mat('#222222', { roughness: 0.8 });
const rubber       = mat('#0a0a0a', { roughness: 0.95 });
const rimMat       = mat('#c0c0c0', { metalness: 0.85, roughness: 0.15 });
const headlightMat = mat('#ffffee', { emissive: new THREE.Color('#ffffaa'), emissiveIntensity: 2 });
const taillightMat = mat('#cc0000', { emissive: new THREE.Color('#ff0000'), emissiveIntensity: 1.5 });
const indicatorMat = mat('#ff8800', { emissive: new THREE.Color('#ff6600'), emissiveIntensity: 1 });
const seatMat      = mat('#1a1a1a', { roughness: 0.9 });
const dashMat      = mat('#151515', { roughness: 0.85 });
const skinMat      = mat('#d4a574', { roughness: 0.7 });
const shirtBlueMat = mat('#2563eb', { roughness: 0.6 });
const shirtGreenMat= mat('#059669', { roughness: 0.6 });
const hairMat      = mat('#1a1a1a', { roughness: 0.9 });
const signYellow   = mat('#eab308', { emissive: new THREE.Color('#eab308'), emissiveIntensity: 0.4 });
const signWhite    = mat('#ffffff');
const signRed      = mat('#dd0000');

// ── Indian Hatchback body (Maruti Swift / i20 style) ─────────
function createBodyProfile() {
  const s = new THREE.Shape();
  // Bottom front → clockwise around the side profile
  // A compact hatchback: ~3.8m long, ~1.5m tall
  // Scale: 1 unit = ~0.5m (so car is ~7.6 units long, ~3 units tall)

  // We'll work in half-scale for easier numbers, car length ~4.2
  s.moveTo(-2.1, 0.08);   // bottom front

  // Front bumper lower curve
  s.quadraticCurveTo(-2.25, 0.15, -2.2, 0.32);

  // Front face up to hood
  s.lineTo(-2.15, 0.42);

  // Hood – gentle slope upward (hatchback has shorter hood)
  s.quadraticCurveTo(-1.8, 0.52, -1.3, 0.56);

  // A-pillar / windshield base
  s.lineTo(-1.1, 0.58);

  // Windshield – steep angle (modern hatchback)
  s.quadraticCurveTo(-0.95, 0.85, -0.7, 1.12);

  // Roof – gentle arc
  s.quadraticCurveTo(-0.1, 1.22, 0.5, 1.2);

  // C-pillar / rear window – hatchback steep drop
  s.quadraticCurveTo(0.9, 1.15, 1.3, 0.82);

  // Rear hatch – steep (hatchback style!)
  s.quadraticCurveTo(1.5, 0.7, 1.7, 0.55);

  // Rear bumper area
  s.lineTo(1.85, 0.48);
  s.quadraticCurveTo(2.0, 0.4, 2.05, 0.3);

  // Bottom rear
  s.lineTo(2.05, 0.08);

  // Rear wheel arch cutout
  s.quadraticCurveTo(1.6, 0.06, 1.5, 0.22);
  s.quadraticCurveTo(1.35, 0.38, 1.05, 0.22);
  s.quadraticCurveTo(0.95, 0.06, 0.5, 0.06);

  // Flat bottom between wheels
  s.lineTo(-0.6, 0.06);

  // Front wheel arch cutout
  s.quadraticCurveTo(-1.0, 0.06, -1.1, 0.22);
  s.quadraticCurveTo(-1.3, 0.38, -1.5, 0.22);
  s.quadraticCurveTo(-1.65, 0.06, -2.1, 0.08);

  return s;
}

function createGlassProfile() {
  const s = new THREE.Shape();
  // Glass area (windshield + side windows + rear)
  s.moveTo(-1.05, 0.6);
  // Windshield
  s.quadraticCurveTo(-0.9, 0.87, -0.65, 1.08);
  // Roof edge
  s.quadraticCurveTo(-0.05, 1.17, 0.45, 1.15);
  // Rear window
  s.quadraticCurveTo(0.85, 1.1, 1.25, 0.8);
  // Rear hatch glass
  s.lineTo(1.45, 0.68);
  // Bottom of glass
  s.lineTo(-1.05, 0.6);
  return s;
}

function buildCar(paintMaterial, addSchoolSign = false) {
  const car = new THREE.Group();
  car.name = addSchoolSign ? 'school-car' : 'car';

  // ── Main body shell ──
  const bodyShape = createBodyProfile();
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 1.65,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
  });
  bodyGeo.translate(0, 0, -0.825);
  const body = new THREE.Mesh(bodyGeo, paintMaterial);
  body.name = 'body';
  car.add(body);

  // ── Glass ──
  const glassShape = createGlassProfile();
  const glassGeo = new THREE.ExtrudeGeometry(glassShape, {
    depth: 1.45,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  glassGeo.translate(0, 0, -0.725);
  const glassM = new THREE.Mesh(glassGeo, glass);
  glassM.name = 'glass';
  car.add(glassM);

  // ── Front grille (hexagonal-ish pattern for Indian hatchback) ──
  const grille = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 0.15),
    darkGray
  );
  grille.position.set(-2.17, 0.35, 0);
  grille.rotation.set(0, -Math.PI / 2, 0);
  car.add(grille);

  // Chrome grille surround
  const grilleSurround = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.18),
    chrome
  );
  grilleSurround.position.set(-2.16, 0.35, 0);
  grilleSurround.rotation.set(0, -Math.PI / 2, 0);
  car.add(grilleSurround);

  // Grille horizontal bars
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.012, 1.2),
      chrome
    );
    bar.position.set(-2.18, 0.30 + i * 0.05, 0);
    car.add(bar);
  }

  // ── Headlights (swept-back modern style) ──
  for (const side of [-1, 1]) {
    const hlGroup = new THREE.Group();
    hlGroup.position.set(-2.12, 0.43, side * 0.58);

    // Housing
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.13, 0.3),
      new THREE.MeshStandardMaterial({ color: '#e0e0e0', transparent: true, opacity: 0.6, roughness: 0.1, metalness: 0.3 })
    );
    hlGroup.add(housing);

    // Bulb
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 8, 8),
      headlightMat
    );
    bulb.position.set(0.02, 0, 0);
    hlGroup.add(bulb);

    // DRL strip
    const drl = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.02, 0.25),
      new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: new THREE.Color('#ffffff'), emissiveIntensity: 1.5 })
    );
    drl.position.set(0, -0.06, 0);
    hlGroup.add(drl);

    car.add(hlGroup);
  }

  // ── Tail lights (wrap-around style) ──
  for (const side of [-1, 1]) {
    const tlGroup = new THREE.Group();
    tlGroup.position.set(1.88, 0.5, side * 0.6);

    const tlHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.15, 0.25),
      taillightMat
    );
    tlGroup.add(tlHousing);

    // Indicator (amber)
    const ind = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 0.25),
      indicatorMat
    );
    ind.position.set(0, -0.09, 0);
    tlGroup.add(ind);

    car.add(tlGroup);
  }

  // ── Bumpers ──
  // Front bumper
  const frontBumper = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.1, 1.6),
    blackPlastic
  );
  frontBumper.position.set(-2.18, 0.2, 0);
  car.add(frontBumper);

  // Front fog light areas
  for (const side of [-1, 1]) {
    const fog = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.06, 0.15),
      darkGray
    );
    fog.position.set(-2.2, 0.18, side * 0.55);
    car.add(fog);
  }

  // Rear bumper
  const rearBumper = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.12, 1.6),
    blackPlastic
  );
  rearBumper.position.set(2.0, 0.2, 0);
  car.add(rearBumper);

  // ── Side mirrors ──
  for (const side of [-1, 1]) {
    const mirrorGroup = new THREE.Group();
    mirrorGroup.position.set(-0.8, 0.82, side * 0.88);

    // Arm
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.03, 0.1),
      paintMaterial
    );
    arm.position.set(0, 0, side * 0.05);
    mirrorGroup.add(arm);

    // Housing (teardrop-ish)
    const mHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.07, 0.06),
      blackPlastic
    );
    mHousing.position.set(0, 0, side * 0.12);
    mirrorGroup.add(mHousing);

    // Glass
    const mGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, 0.05),
      new THREE.MeshStandardMaterial({ color: '#aaddff', metalness: 0.95, roughness: 0.05 })
    );
    mGlass.rotation.set(0, side > 0 ? 0.1 : -0.1, 0);
    mGlass.position.set(0, 0, side * 0.15);
    mirrorGroup.add(mGlass);

    // Turn indicator on mirror
    const mInd = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.015, 0.01),
      indicatorMat
    );
    mInd.position.set(-0.02, -0.025, side * 0.12);
    mirrorGroup.add(mInd);

    car.add(mirrorGroup);
  }

  // ── Door lines ──
  for (const x of [-0.15, 0.45]) {
    for (const side of [-1, 1]) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.008, 0.5, 0.008),
        new THREE.MeshStandardMaterial({ color: '#000000' })
      );
      line.position.set(x, 0.55, side * 0.835);
      car.add(line);

      // Handle
      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.022, 0.018),
        chrome
      );
      handle.position.set(x + 0.12, 0.6, side * 0.84);
      car.add(handle);
    }
  }

  // ── Window trim (chrome) ──
  for (const side of [-1, 1]) {
    const trim = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.015, 0.015),
      chrome
    );
    trim.position.set(-0.1, 0.6, side * 0.78);
    car.add(trim);
  }

  // ── License plates ──
  const fpGeo = new THREE.PlaneGeometry(0.38, 0.1);

  const fpMesh = new THREE.Mesh(fpGeo, signWhite);
  fpMesh.position.set(-2.19, 0.28, 0);
  fpMesh.rotation.set(0, -Math.PI / 2, 0);
  car.add(fpMesh);

  const rpMesh = new THREE.Mesh(fpGeo.clone(), signWhite);
  rpMesh.position.set(2.06, 0.33, 0);
  rpMesh.rotation.set(0, Math.PI / 2, 0);
  car.add(rpMesh);

  // ── Undercarriage ──
  const under = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 1.5),
    new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 1 })
  );
  under.position.set(0, 0.07, 0);
  under.rotation.set(-Math.PI / 2, 0, 0);
  car.add(under);

  // ── Exhaust pipe ──
  const exhaust = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.03, 0.12, 8),
    new THREE.MeshStandardMaterial({ color: '#666', metalness: 0.8, roughness: 0.3 })
  );
  exhaust.position.set(1.95, 0.12, -0.4);
  exhaust.rotation.set(0, 0, Math.PI / 2);
  car.add(exhaust);

  // ── Wheels (4x) ──
  const wheelPositions = [
    [-1.3, 0.22, 0.82],   // FL
    [-1.3, 0.22, -0.82],  // FR
    [1.2,  0.22, 0.82],   // RL
    [1.2,  0.22, -0.82],  // RR
  ];

  for (const [wx, wy, wz] of wheelPositions) {
    const wheel = createWheel();
    wheel.position.set(wx, wy, wz);
    car.add(wheel);
  }

  // ── Interior ──
  // Dashboard
  const dash = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.07, 1.3),
    dashMat
  );
  dash.position.set(-0.9, 0.58, 0);
  dash.rotation.set(0.15, 0, 0);
  car.add(dash);

  // Instrument cluster
  const cluster = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.08, 0.3),
    new THREE.MeshStandardMaterial({ color: '#000000', emissive: new THREE.Color('#112233'), emissiveIntensity: 0.5 })
  );
  cluster.position.set(-0.85, 0.62, 0.3);
  cluster.rotation.set(-0.1, 0, 0);
  car.add(cluster);

  // Center console / infotainment screen
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.12, 0.08),
    new THREE.MeshStandardMaterial({ color: '#111122', emissive: new THREE.Color('#223344'), emissiveIntensity: 0.8 })
  );
  screen.position.set(-0.82, 0.62, 0);
  screen.rotation.set(0, 0.3, 0);
  car.add(screen);

  // Steering wheel
  const swGroup = new THREE.Group();
  swGroup.position.set(-0.7, 0.68, 0.3);
  swGroup.rotation.set(0.35, 0, 0);

  const swRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.01, 8, 16),
    new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.7 })
  );
  swGroup.add(swRing);

  // Steering column
  const swCol = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.15, 6),
    darkGray
  );
  swCol.position.set(0, 0, -0.08);
  swCol.rotation.set(Math.PI / 2, 0, 0);
  swGroup.add(swCol);

  car.add(swGroup);

  // Seats
  const seatPositions = [
    [-0.35, 0.42, 0.35],  // driver
    [-0.35, 0.42, -0.35], // front passenger
    [0.4,   0.40, 0.35],  // rear left
    [0.4,   0.40, -0.35], // rear right
  ];

  for (const [sx, sy, sz] of seatPositions) {
    const seat = createSeat();
    seat.position.set(sx, sy, sz);
    car.add(seat);
  }

  // ── People (driver + front passenger always, rear for school car) ──
  const driver = createPerson(skinMat, shirtBlueMat, hairMat);
  driver.position.set(-0.35, 0.62, 0.3);
  car.add(driver);

  const passenger = createPerson(skinMat, shirtGreenMat, hairMat);
  passenger.position.set(-0.35, 0.62, -0.3);
  car.add(passenger);

  if (addSchoolSign) {
    // Rear passengers
    const rp1 = createPerson(
      mat('#c49a6c', { roughness: 0.7 }),
      mat('#dc2626', { roughness: 0.6 }),
      mat('#3d2314', { roughness: 0.9 })
    );
    rp1.position.set(0.4, 0.58, 0.3);
    car.add(rp1);

    const rp2 = createPerson(
      mat('#f1c27d', { roughness: 0.7 }),
      mat('#7c3aed', { roughness: 0.6 }),
      mat('#1a1a1a', { roughness: 0.9 })
    );
    rp2.position.set(0.4, 0.58, -0.3);
    car.add(rp2);

    // ── Driving school roof sign ──
    const signGroup = new THREE.Group();
    signGroup.position.set(-0.1, 1.28, 0);

    // Base mount
    const signBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.04, 0.35),
      new THREE.MeshStandardMaterial({ color: '#333', roughness: 0.7 })
    );
    signGroup.add(signBase);

    // Sign body (yellow illuminated)
    const signBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.22, 0.3),
      signYellow
    );
    signBody.position.set(0, 0.13, 0);
    signGroup.add(signBody);

    // "L" plates (front & back)
    for (const dir of [1, -1]) {
      const bg = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.16),
        signWhite
      );
      bg.position.set(0, 0.13, dir * 0.155);
      bg.rotation.set(0, dir > 0 ? 0 : Math.PI, 0);
      signGroup.add(bg);

      const lPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.08, 0.12),
        signRed
      );
      lPlate.position.set(0, 0.12, dir * 0.157);
      lPlate.rotation.set(0, dir > 0 ? 0 : Math.PI, 0);
      signGroup.add(lPlate);
    }

    car.add(signGroup);
  }

  return car;
}

// ── Wheel assembly ──
function createWheel() {
  const group = new THREE.Group();

  // Tire
  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.09, 12, 24),
    rubber
  );
  tire.rotation.set(Math.PI / 2, 0, 0);
  group.add(tire);

  // Rim
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.12, 20),
    rimMat
  );
  rim.rotation.set(Math.PI / 2, 0, 0);
  group.add(rim);

  // Hub cap
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12),
    chrome
  );
  hub.rotation.set(Math.PI / 2, 0, 0);
  hub.position.set(0, 0, 0.07);
  group.add(hub);

  // Spokes (5-spoke alloy design)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.025, 0.015),
      rimMat
    );
    spoke.position.set(
      Math.cos(angle) * 0.09,
      Math.sin(angle) * 0.09,
      0.065
    );
    spoke.rotation.set(0, 0, angle);
    group.add(spoke);
  }

  // Brake disc
  const brake = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.015, 16),
    new THREE.MeshStandardMaterial({ color: '#555', metalness: 0.6, roughness: 0.4 })
  );
  brake.rotation.set(Math.PI / 2, 0, 0);
  brake.position.set(0, 0, 0.03);
  group.add(brake);

  return group;
}

// ── Seat ──
function createSeat() {
  const group = new THREE.Group();

  // Cushion
  const cushion = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.08, 0.32),
    seatMat
  );
  group.add(cushion);

  // Backrest
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.3, 0.3),
    seatMat
  );
  back.position.set(0.12, 0.16, 0);
  back.rotation.set(0, 0, 0.1);
  group.add(back);

  // Headrest
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.1, 0.14),
    seatMat
  );
  head.position.set(0.14, 0.34, 0);
  group.add(head);

  return group;
}

// ── Person (upper body visible through windows) ──
function createPerson(skinM, shirtM, hairM) {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 10, 10),
    skinM
  );
  head.position.set(0, 0.35, 0);
  group.add(head);

  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    hairM
  );
  hair.position.set(0.01, 0.4, 0);
  group.add(hair);

  // Neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.03, 0.05, 6),
    skinM
  );
  neck.position.set(0, 0.28, 0);
  group.add(neck);

  // Torso
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.24, 0.14),
    shirtM
  );
  torso.position.set(0, 0.14, 0);
  group.add(torso);

  // Shoulders
  const shoulders = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.05, 0.14),
    shirtM
  );
  shoulders.position.set(0, 0.23, 0);
  group.add(shoulders);

  // Arms
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.18, 0.05),
      shirtM
    );
    arm.position.set(0, 0.12, side * 0.1);
    arm.rotation.set(side * 0.15, 0, 0);
    group.add(arm);

    // Hand
    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 5, 5),
      skinM
    );
    hand.position.set(0, 0.03, side * 0.12);
    group.add(hand);
  }

  return group;
}

// ── Export function ──
async function exportToGLB(scene, filename) {
  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        // result is an ArrayBuffer when binary = true
        const buffer = Buffer.from(result);
        writeFileSync(filename, buffer);
        console.log(`✓ Written ${filename} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
        resolve();
      },
      (error) => reject(error),
      { binary: true }
    );
  });
}

// ── Main ──
async function main() {
  console.log('Generating car models...\n');

  // Regular cars (multiple colors)
  const colors = [
    { name: 'white',  mat: paintWhite },
    { name: 'red',    mat: paintRed },
    { name: 'blue',   mat: paintBlue },
    { name: 'silver', mat: paintSilver },
    { name: 'gray',   mat: paintGray },
  ];

  // Export the default car
  const defaultScene = new THREE.Scene();
  const defaultCar = buildCar(paintSilver, false);
  defaultScene.add(defaultCar);
  await exportToGLB(defaultScene, 'public/models/car.glb');

  // Export school car (white with L sign)
  const schoolScene = new THREE.Scene();
  const schoolCar = buildCar(paintWhite, true);
  schoolScene.add(schoolCar);
  await exportToGLB(schoolScene, 'public/models/school-car.glb');

  console.log('\nDone! Models saved to public/models/');
}

main().catch(console.error);
