'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const GLB_BASE = '/kenney_car-kit/Models/GLB format';

// Defer preloading
if (typeof window !== 'undefined') {
  const preload = () => {
    const models = [
      'sedan', 'sedan-sports', 'hatchback-sports', 'suv', 'suv-luxury',
      'taxi', 'van', 'police', 'truck', 'delivery',
    ];
    models.forEach((m) => useGLTF.preload(`${GLB_BASE}/${m}.glb`));
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload);
  } else {
    setTimeout(preload, 300);
  }
}

// Shared materials
const roadMat = new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.95 });
const lineMat = new THREE.MeshStandardMaterial({ color: '#ffffff', opacity: 0.25, transparent: true });
const yellowMat = new THREE.MeshStandardMaterial({ color: '#eab308', opacity: 0.35, transparent: true });

function CarModel({ model, scale = 1.6 }: { model: string; scale?: number }) {
  const { scene } = useGLTF(`${GLB_BASE}/${model}.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} scale={scale} />;
}

// Four-lane road
function Road() {
  const W = 16; // total width
  const L = 300;
  const hp = Math.PI / 2;
  return (
    <group>
      {/* Asphalt */}
      <mesh rotation={[-hp, 0, 0]} position={[0, -0.01, 0]} material={roadMat} receiveShadow>
        <planeGeometry args={[W, L]} />
      </mesh>

      {/* Outer edge lines — solid white */}
      <mesh rotation={[-hp, 0, 0]} position={[-W / 2 + 0.15, 0.01, 0]} material={lineMat}>
        <planeGeometry args={[0.12, L]} />
      </mesh>
      <mesh rotation={[-hp, 0, 0]} position={[W / 2 - 0.15, 0.01, 0]} material={lineMat}>
        <planeGeometry args={[0.12, L]} />
      </mesh>

      {/* Center double yellow */}
      <mesh rotation={[-hp, 0, 0]} position={[-0.15, 0.01, 0]} material={yellowMat}>
        <planeGeometry args={[0.1, L]} />
      </mesh>
      <mesh rotation={[-hp, 0, 0]} position={[0.15, 0.01, 0]} material={yellowMat}>
        <planeGeometry args={[0.1, L]} />
      </mesh>

      {/* Lane dividers — dashed white */}
      {[-W / 4, W / 4].map((x, i) => (
        <group key={i}>
          {Array.from({ length: 30 }, (_, j) => (
            <mesh key={j} rotation={[-hp, 0, 0]} position={[x, 0.01, -120 + j * 8]} material={lineMat}>
              <planeGeometry args={[0.08, 2.5]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

interface LaneCarProps {
  model: string;
  xPos: number;
  startZ: number;
  speed: number;
  direction: 1 | -1;
  scale?: number;
}

function LaneCar({ model, xPos, startZ, speed, direction, scale = 1.6 }: LaneCarProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += delta * speed * direction;
    if (direction === 1 && ref.current.position.z > 120) ref.current.position.z = -120;
    if (direction === -1 && ref.current.position.z < -120) ref.current.position.z = 120;
  });

  return (
    <group ref={ref} position={[xPos, 0, startZ]} rotation={[0, direction === 1 ? 0 : Math.PI, 0]}>
      <CarModel model={model} scale={scale} />
    </group>
  );
}

function Scene() {
  // Lane centers: -6, -2, 2, 6  (4 lanes of width ~4 each)
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 8]} intensity={0.8} color="#aaccff" />
      <directionalLight position={[-6, 12, -10]} intensity={0.3} color="#ffeedd" />
      <hemisphereLight color="#4a80c4" groundColor="#1a1a2e" intensity={0.15} />
      <fog attach="fog" args={['#1e3a6e', 20, 90]} />
      <color attach="background" args={['#00000000']} />

      <Road />

      {/* Lane 1 (far left) — heading forward */}
      <LaneCar model="sedan" xPos={-6} startZ={-10} speed={8} direction={1} />
      <LaneCar model="taxi" xPos={-6} startZ={-60} speed={6} direction={1} />
      <LaneCar model="van" xPos={-6} startZ={40} speed={7} direction={1} />

      {/* Lane 2 (inner left) — heading forward */}
      <LaneCar model="sedan-sports" xPos={-2} startZ={20} speed={12} direction={1} />
      <LaneCar model="hatchback-sports" xPos={-2} startZ={-40} speed={10} direction={1} />

      {/* Lane 3 (inner right) — heading backward (oncoming) */}
      <LaneCar model="suv" xPos={2} startZ={0} speed={9} direction={-1} />
      <LaneCar model="police" xPos={2} startZ={-50} speed={14} direction={-1} />

      {/* Lane 4 (far right) — heading backward (oncoming) */}
      <LaneCar model="suv-luxury" xPos={6} startZ={30} speed={7} direction={-1} />
      <LaneCar model="truck" xPos={6} startZ={-30} speed={5} direction={-1} scale={1.4} />
      <LaneCar model="delivery" xPos={6} startZ={-80} speed={8} direction={-1} />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = 10 + Math.sin(t * 0.08) * 1.5;
    state.camera.position.y = 5 + Math.sin(t * 0.06) * 0.3;
    state.camera.position.z = -8 + Math.sin(t * 0.05) * 2;
    state.camera.lookAt(0, 0, 5);
  });
  return null;
}

export default function StatisticsTrack() {
  return (
    <ErrorBoundary>
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas
          camera={{ position: [10, 5, -8], fov: 45, near: 0.1, far: 150 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          frameloop="always"
          style={{ background: 'transparent' }}
        >
          <CameraRig />
          <Scene />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
