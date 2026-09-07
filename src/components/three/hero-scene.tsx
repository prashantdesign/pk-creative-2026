'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

function LogoCard() {
  const group = useRef<THREE.Group>(null);
  const tex = useTexture('/icon-512x512.png');
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!group.current) return;
    // small rock so the monogram stays face-on and readable, + mouse parallax
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t * 0.5) * 0.22 + x * 0.25,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(t * 0.4) * 0.08 - y * 0.16,
      0.05
    );
  });

  return (
    <group ref={group} scale={0.78}>
      {/* card body */}
      <RoundedBox args={[2.4, 2.4, 0.26]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color="#e2dbf7" roughness={0.4} metalness={0.15} />
      </RoundedBox>
      {/* thin purple rim */}
      <RoundedBox args={[2.46, 2.46, 0.18]} radius={0.17} smoothness={4}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          roughness={0.45}
          metalness={0.55}
        />
      </RoundedBox>
      {/* monogram on both faces */}
      <mesh position={[0, 0, 0.141]}>
        <planeGeometry args={[1.85, 1.85]} />
        <meshBasicMaterial map={tex} toneMapped={false} transparent />
      </mesh>
      <mesh position={[0, 0, -0.141]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.85, 1.85]} />
        <meshBasicMaterial map={tex} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

/**
 * The WebGL hero object — the PK monogram as a single glossy 3D card,
 * slowly tumbling with subtle mouse parallax. Nothing else.
 * One 13KB texture, no HDR/asset fetches — lightweight & CSP-safe.
 */
export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={1.9} color="#ffffff" />
      <directionalLight position={[-5, -3, -2]} intensity={0.9} color="#a78bfa" />
      <pointLight position={[-3, 2.5, 3]} intensity={18} color="#c4b5fd" distance={16} />

      <Suspense fallback={null}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.5}>
          <LogoCard />
        </Float>
      </Suspense>
    </Canvas>
  );
}
