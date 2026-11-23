"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** One slab of the stack — reads as a server/database tier. */
function Slab({
  y,
  color,
  width = 2.6,
}: {
  y: number;
  color: string;
  width?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Each tier bobs on its own phase
    ref.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.9 + y * 2) * 0.05;
  });

  return (
    <RoundedBox ref={ref} args={[width, 0.42, 1.8]} radius={0.1} smoothness={4} position={[0, y, 0]}>
      <meshStandardMaterial
        color="#0b1330"
        roughness={0.35}
        metalness={0.75}
        emissive={color}
        emissiveIntensity={0.16}
      />
      <Edges scale={1.001} threshold={15} color={color} />
    </RoundedBox>
  );
}

/** Packets travelling up and down the stack. */
function Packets() {
  const group = useRef<THREE.Group>(null);

  const packets = useMemo(
    () => [
      { x: 1.55, z: 0.55, speed: 0.9, color: "#22d3ee", offset: 0 },
      { x: -1.55, z: -0.5, speed: 1.15, color: "#60a5fa", offset: 1.4 },
      { x: 1.3, z: -0.7, speed: 0.75, color: "#a78bfa", offset: 2.6 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const p = packets[i];
      const t = (state.clock.elapsedTime * p.speed + p.offset) % 3;
      child.position.y = -1.3 + t; // travel bottom → top, then loop
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      // Fade in and out at the ends of the run
      m.opacity = Math.sin((t / 3) * Math.PI) * 0.9;
    });
  });

  return (
    <group ref={group}>
      {packets.map((p, i) => (
        <mesh key={i} position={[p.x, 0, p.z]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
    // Tilt toward the pointer, gently
    group.current.rotation.x += (-pointer.y * 0.18 + 0.18 - group.current.rotation.x) * 0.05;
  });

  return <group ref={group}>{children}</group>;
}

export default function DevScene() {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [3.4, 2.2, 4.6], fov: 42 }}
      dpr={[1, isSmall ? 1.3 : 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 6, 5]} intensity={70} color="#60a5fa" distance={26} />
      <pointLight position={[-5, -2, -3]} intensity={50} color="#7c3aed" distance={26} />

      <Suspense fallback={null}>
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
          <Rig>
            <Slab y={-0.9} color="#3b82f6" width={2.9} />
            <Slab y={-0.15} color="#22d3ee" width={2.6} />
            <Slab y={0.6} color="#a78bfa" width={2.3} />
            <Slab y={1.35} color="#60a5fa" width={2.0} />
            <Packets />

            {/* Wireframe cage around the stack */}
            <mesh>
              <icosahedronGeometry args={[2.5, 1]} />
              <meshBasicMaterial color="#1e40af" wireframe transparent opacity={0.16} />
            </mesh>
          </Rig>
        </Float>
      </Suspense>
    </Canvas>
  );
}
