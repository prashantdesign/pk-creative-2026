'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function Knot() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.16;
    // gentle parallax toward the pointer
    const { x, y } = state.pointer;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.35, 0.05);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.35, 0.05);
  });

  return (
    <mesh ref={mesh} scale={1.65}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#3b0f9e"
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={0.6}
        distort={0.32}
        speed={1.4}
      />
    </mesh>
  );
}

function Orb(props: ThreeElements['mesh'] & { color: string }) {
  const { color, ...rest } = props;
  return (
    <mesh {...rest}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.4} />
    </mesh>
  );
}

/**
 * The WebGL hero object. Kept deliberately small:
 * one distorted primitive + a couple of floaters + 2 lights.
 * Consumers gate mounting (desktop / motion / in-view).
 */
export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#c4b5fd" />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#6d28d9" />

      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <Knot />
      </Float>

      <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
        <Orb position={[2.4, 1.3, -1]} color="#a78bfa" />
      </Float>
      <Float speed={1.8} rotationIntensity={1} floatIntensity={2.4}>
        <Orb position={[-2.6, -1.1, -0.5]} color="#8b5cf6" />
      </Float>
    </Canvas>
  );
}
