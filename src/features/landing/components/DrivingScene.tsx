'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const GLB_BASE = '/kenney_car-kit/Models/GLB format';

// Defer model preloading until after the page is idle
if (typeof window !== 'undefined') {
  const preloadModels = () => {
    useGLTF.preload(`${GLB_BASE}/sedan.glb`);
    useGLTF.preload(`${GLB_BASE}/hatchback-sports.glb`);
    useGLTF.preload(`${GLB_BASE}/suv.glb`);
    useGLTF.preload(`${GLB_BASE}/taxi.glb`);
    useGLTF.preload(`${GLB_BASE}/van.glb`);
    useGLTF.preload(`${GLB_BASE}/cone.glb`);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadModels);
  } else {
    setTimeout(preloadModels, 200);
  }
}

// ============================================================
// Shared materials for environment
// ============================================================
const MAT = {
  asphalt: new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.95 }),
  yellow: new THREE.MeshStandardMaterial({ color: '#f0c040' }),
  white: new THREE.MeshStandardMaterial({ color: '#ffffff' }),
  curb: new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.9 }),
  sidewalk: new THREE.MeshStandardMaterial({ color: '#777777', roughness: 1 }),
  grass: new THREE.MeshStandardMaterial({ color: '#2d5a1e', roughness: 1 }),
  lampPole: new THREE.MeshStandardMaterial({ color: '#555555', metalness: 0.8, roughness: 0.3 }),
  trunk: new THREE.MeshStandardMaterial({ color: '#5c3a1e', roughness: 0.95 }),
  signYellow: new THREE.MeshStandardMaterial({ color: '#eab308', emissive: new THREE.Color('#eab308'), emissiveIntensity: 0.5 }),
  signBase: new THREE.MeshStandardMaterial({ color: '#333333', roughness: 0.7 }),
  signWhite: new THREE.MeshStandardMaterial({ color: '#ffffff' }),
  signRed: new THREE.MeshStandardMaterial({ color: '#dd0000' }),
};

// ============================================================
// GLB Car component
// ============================================================
function CarModel({ model, scale = 1.8 }: { model: string; scale?: number }) {
  const { scene } = useGLTF(`${GLB_BASE}/${model}.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} scale={scale} />;
}

// ============================================================
// Roof sign for school car
// ============================================================
function SchoolSign() {
  return (
    <group position={[0, 1.55, 0]}>
      <mesh material={MAT.signBase}><boxGeometry args={[0.7, 0.05, 0.4]} /></mesh>
      <mesh position={[0, 0.17, 0]} material={MAT.signYellow}><boxGeometry args={[0.65, 0.25, 0.35]} /></mesh>
      <mesh position={[0, 0.17, 0.18]} material={MAT.signWhite}><planeGeometry args={[0.22, 0.2]} /></mesh>
      <mesh position={[0, 0.15, 0.185]} material={MAT.signRed}><planeGeometry args={[0.1, 0.15]} /></mesh>
      <mesh position={[0, 0.17, -0.18]} rotation={[0, Math.PI, 0]} material={MAT.signWhite}><planeGeometry args={[0.22, 0.2]} /></mesh>
      <mesh position={[0, 0.15, -0.185]} rotation={[0, Math.PI, 0]} material={MAT.signRed}><planeGeometry args={[0.1, 0.15]} /></mesh>
    </group>
  );
}

// ============================================================
// Road
// ============================================================
function Road() {
  const L = 300;
  const W = 12;
  const halfPi = Math.PI / 2;
  return (
    <group>
      <mesh rotation={[-halfPi, 0, 0]} position={[0, 0.01, 0]} material={MAT.asphalt} receiveShadow>
        <planeGeometry args={[W, L]} />
      </mesh>
      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} rotation={[-halfPi, 0, 0]} position={[0, 0.02, -120 + i * 8]} material={MAT.yellow}>
          <planeGeometry args={[0.15, 3]} />
        </mesh>
      ))}
      {Array.from({ length: 25 }, (_, i) => (
        <mesh key={i} rotation={[-halfPi, 0, 0]} position={[3, 0.02, -100 + i * 8]} material={MAT.white}>
          <planeGeometry args={[0.1, 2.5]} />
        </mesh>
      ))}
      <mesh rotation={[-halfPi, 0, 0]} position={[-W / 2 + 0.3, 0.02, 0]} material={MAT.white}><planeGeometry args={[0.15, L]} /></mesh>
      <mesh rotation={[-halfPi, 0, 0]} position={[W / 2 - 0.3, 0.02, 0]} material={MAT.white}><planeGeometry args={[0.15, L]} /></mesh>
      <mesh position={[-W / 2 - 0.15, 0.08, 0]} material={MAT.curb}><boxGeometry args={[0.3, 0.16, L]} /></mesh>
      <mesh position={[W / 2 + 0.15, 0.08, 0]} material={MAT.curb}><boxGeometry args={[0.3, 0.16, L]} /></mesh>
      <mesh rotation={[-halfPi, 0, 0]} position={[-W / 2 - 2.3, 0.12, 0]} material={MAT.sidewalk}><planeGeometry args={[4, L]} /></mesh>
      <mesh rotation={[-halfPi, 0, 0]} position={[W / 2 + 2.3, 0.12, 0]} material={MAT.sidewalk}><planeGeometry args={[4, L]} /></mesh>
      <mesh rotation={[-halfPi, 0, 0]} position={[-W / 2 - 22, 0, 0]} material={MAT.grass}><planeGeometry args={[40, L]} /></mesh>
      <mesh rotation={[-halfPi, 0, 0]} position={[W / 2 + 22, 0, 0]} material={MAT.grass}><planeGeometry args={[40, L]} /></mesh>
    </group>
  );
}

// ============================================================
// Street Lamp
// ============================================================
function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} material={MAT.lampPole}><cylinderGeometry args={[0.05, 0.08, 4, 6]} /></mesh>
      <mesh position={[0.5, 3.9, 0]} rotation={[0, 0, -0.5]} material={MAT.lampPole}><cylinderGeometry args={[0.025, 0.025, 1.2, 4]} /></mesh>
      <mesh position={[0.9, 3.74, 0]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial color="#fff8dd" emissive="#ffeeaa" emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0.9, 3.6, 0]} color="#ffeedd" intensity={8} distance={16} decay={2} />
    </group>
  );
}

// ============================================================
// Tree
// ============================================================
const treeCanopyGeo = new THREE.SphereGeometry(1.1, 6, 6);
const treeCanopy2Geo = new THREE.SphereGeometry(0.75, 5, 5);
const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.16, 1.8, 5);
const treeGreen1 = new THREE.MeshStandardMaterial({ color: '#1a6b1a', roughness: 0.85 });
const treeGreen2 = new THREE.MeshStandardMaterial({ color: '#228b22', roughness: 0.85 });

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} geometry={treeTrunkGeo} material={MAT.trunk} />
      <mesh position={[0, 2.3, 0]} geometry={treeCanopyGeo} material={treeGreen1} />
      <mesh position={[0.5, 2.7, 0.3]} geometry={treeCanopy2Geo} material={treeGreen2} />
    </group>
  );
}

// ============================================================
// Traffic Cone (from kit)
// ============================================================
function TrafficCone({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(`${GLB_BASE}/cone.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={1.5} />;
}

// ============================================================
// Moving cars
// ============================================================
function MainCar() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += delta * 3;
    ref.current.position.x = Math.sin(ref.current.position.z * 0.05) * 0.08;
    if (ref.current.position.z > 50) ref.current.position.z = -50;
  });
  return (
    <group ref={ref} position={[2.8, 0, -5]} rotation={[0, 0, 0]}>
      <CarModel model="sedan" scale={2} />
      <SchoolSign />
      <pointLight position={[0, 0.5, 1.5]} color="#ffffdd" intensity={6} distance={20} />
    </group>
  );
}

const TRAFFIC_MODELS = ['hatchback-sports', 'suv', 'taxi', 'van', 'sedan'];

function TrafficCar({ startZ, speed, xPos, modelIndex, direction }: {
  startZ: number; speed: number; xPos: number; modelIndex: number; direction: 1 | -1;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += delta * speed * direction;
    if (direction === 1 && ref.current.position.z > 100) ref.current.position.z = -100;
    if (direction === -1 && ref.current.position.z < -100) ref.current.position.z = 100;
  });
  const model = TRAFFIC_MODELS[modelIndex % TRAFFIC_MODELS.length];
  return (
    <group ref={ref} position={[xPos, 0, startZ]} rotation={[0, direction === 1 ? 0 : Math.PI, 0]}>
      <CarModel model={model} scale={2} />
    </group>
  );
}

// ============================================================
// Scene
// ============================================================
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[15, 25, 10]} intensity={1.0} castShadow color="#ffeedd" />
      <directionalLight position={[-8, 12, -15]} intensity={0.25} color="#aaccff" />
      <hemisphereLight color="#87ceeb" groundColor="#2d5a1e" intensity={0.2} />
      <fog attach="fog" args={['#1a1a2e', 25, 100]} />
      <color attach="background" args={['#1a1a2e']} />

      <Road />
      <MainCar />

      {/* Oncoming traffic */}
      <TrafficCar startZ={30} speed={12} xPos={-2.8} modelIndex={0} direction={-1} />
      <TrafficCar startZ={70} speed={10} xPos={-2.8} modelIndex={1} direction={-1} />
      <TrafficCar startZ={-20} speed={14} xPos={-4.5} modelIndex={2} direction={-1} />

      {/* Same direction traffic */}
      <TrafficCar startZ={-40} speed={5} xPos={4.5} modelIndex={3} direction={1} />
      <TrafficCar startZ={40} speed={2} xPos={2.8} modelIndex={4} direction={1} />

      {/* Traffic cones along roadside */}
      {Array.from({ length: 4 }, (_, i) => (
        <TrafficCone key={`cone${i}`} position={[6.2, 0, -10 + i * 6]} />
      ))}

      {/* Street lamps */}
      {Array.from({ length: 6 }, (_, i) => (
        <StreetLamp key={`ll${i}`} position={[-8, 0, -60 + i * 25]} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <StreetLamp key={`lr${i}`} position={[8, 0, -50 + i * 25]} />
      ))}

      {/* Trees */}
      {Array.from({ length: 8 }, (_, i) => (
        <Tree key={`tl${i}`} position={[-12 - ((i * 7 + 3) % 5) * 1.2, 0, -80 + i * 20]} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <Tree key={`tr${i}`} position={[12 + ((i * 5 + 2) % 4) * 1.3, 0, -70 + i * 20]} />
      ))}
    </>
  );
}

// ============================================================
// Camera
// ============================================================
function CameraFollow() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = 7 + Math.sin(t * 0.12) * 1.2;
    state.camera.position.y = 3.8 + Math.sin(t * 0.08) * 0.2;
    state.camera.position.z = -10 + Math.sin(t * 0.06) * 2;
    state.camera.lookAt(0, 1.2, 5);
  });
  return null;
}

// ============================================================
// Export
// ============================================================
export default function DrivingScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [7, 3.8, -10], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <CameraFollow />
        <Scene />
      </Canvas>
    </div>
  );
}
