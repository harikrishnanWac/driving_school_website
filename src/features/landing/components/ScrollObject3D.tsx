'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const GLB_BASE = '/kenney_car-kit/Models/GLB format';

if (typeof window !== 'undefined') {
  const preload = () => useGLTF.preload(`${GLB_BASE}/sedan.glb`);
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload);
  } else {
    setTimeout(preload, 200);
  }
}

function CarModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF(`${GLB_BASE}/sedan.glb`);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    // Smooth rotation tied to scroll
    const target = scrollProgress * Math.PI * 2;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target, 0.08);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.4}>
      <group ref={ref}>
        <primitive object={clone} scale={2.8} />
        {/* Roof sign */}
        <group position={[0, 1.55, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.05, 0.4]} />
            <meshStandardMaterial color="#444" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[0.65, 0.25, 0.35]} />
            <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function SceneCamera() {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.set(4.5, 2.2, 4.5);
    camera.lookAt(0, 0.3, 0);
  });

  return null;
}

export default function ScrollObject3D({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      camera={{ position: [4.5, 2.2, 4.5], fov: 40, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
    >
      <SceneCamera />

      {/* Clean, bright studio lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 10, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, 8, -6]} intensity={0.5} color="#e8eeff" />
      <hemisphereLight color="#f0f4ff" groundColor="#e8e8ec" intensity={0.4} />

      {/* Subtle accent */}
      <pointLight position={[2, 1, 2]} intensity={0.4} color="#1e40af" distance={8} decay={2} />

      <Environment preset="city" />

      <CarModel scrollProgress={scrollProgress} />

      {/* Soft contact shadow on the ground */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.15}
        scale={12}
        blur={2.5}
        far={4}
      />
    </Canvas>
  );
}
