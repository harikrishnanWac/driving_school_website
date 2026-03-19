'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const GLB_BASE = '/kenney_car-kit/Models/GLB format';

useGLTF.preload(`${GLB_BASE}/sedan.glb`);
useGLTF.preload(`${GLB_BASE}/cone.glb`);

function CarModel({ model, scale = 2.2 }: { model: string; scale?: number }) {
  const { scene } = useGLTF(`${GLB_BASE}/${model}.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} scale={scale} />;
}

function SchoolRoofSign() {
  return (
    <group position={[0, 1.55, 0]}>
      <mesh>
        <boxGeometry args={[0.7, 0.05, 0.4]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[0.65, 0.25, 0.35]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function SpinningCar({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Full rotation based on scroll
    const targetRotation = scrollProgress * Math.PI * 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.1
    );

    // Gentle float
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <CarModel model="sedan" scale={2.5} />
      <SchoolRoofSign />
    </group>
  );
}

function TrafficCone({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF(`${GLB_BASE}/cone.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} position={position} scale={1.8} />;
}

function OrbitalCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera orbits around the car, height changes with scroll
    const angle = scrollProgress * Math.PI * 0.5 - Math.PI * 0.15;
    const radius = 5.5 + Math.sin(scrollProgress * Math.PI) * 1;
    const height = 2.5 + Math.sin(scrollProgress * Math.PI * 2) * 0.8;

    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, height, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

function FloorGrid() {
  return (
    <group>
      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial
          color="#111118"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Ring accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.59, 0]}>
        <ringGeometry args={[3.5, 3.6, 64]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.59, 0]}>
        <ringGeometry args={[5.8, 5.85, 64]} />
        <meshStandardMaterial
          color="#eab308"
          emissive="#eab308"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <OrbitalCamera scrollProgress={scrollProgress} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.2}
        castShadow
        color="#e8e0ff"
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 8, -8]} intensity={0.4} color="#aaccff" />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#1e40af" distance={12} />

      {/* Subtle blue accent lights */}
      <pointLight position={[3, 0, 3]} intensity={2} color="#1e40af" distance={6} decay={2} />
      <pointLight position={[-3, 0, -3]} intensity={2} color="#eab308" distance={6} decay={2} />

      <Environment preset="city" />
      <fog attach="fog" args={['#0a0a14', 12, 25]} />
      <color attach="background" args={['#0a0a14']} />

      <FloorGrid />
      <SpinningCar scrollProgress={scrollProgress} />

      {/* Decorative cones */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <TrafficCone position={[3.2, -0.6, 1.5]} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <TrafficCone position={[-2.8, -0.6, 2.2]} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.25}>
        <TrafficCone position={[-1, -0.6, -3]} />
      </Float>
    </>
  );
}

export default function ScrollCar3D({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [5, 2.5, 5], fov: 45, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 1.5]}
      >
        <SceneContent scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
