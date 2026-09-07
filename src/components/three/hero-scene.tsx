'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.1;
    mesh.current.rotation.y += delta * 0.13;
    const { x, y } = state.pointer;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.5, 0.04);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.5, 0.04);
  });

  return (
    <mesh ref={mesh} scale={1.55}>
      <icosahedronGeometry args={[1, 24]} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#5b21b6"
        emissiveIntensity={0.25}
        roughness={0.22}
        metalness={0.7}
        distort={0.42}
        speed={1.8}
      />
    </mesh>
  );
}

/**
 * The WebGL hero object — a single glossy distorted blob. Nothing else.
 * Pure lights (no HDR/asset fetches) — lightweight & CSP-safe.
 */
export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 4]} intensity={2.6} color="#f5f3ff" />
      <directionalLight position={[-5, -3, -2]} intensity={1} color="#7c3aed" />
      <pointLight position={[-2.5, 2.5, 3]} intensity={18} color="#c4b5fd" distance={14} />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <Blob />
      </Float>
    </Canvas>
  );
}
