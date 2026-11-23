"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Round sprite so points read as stars rather than squares. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.65)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** Slowly drifting star field. */
function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const dot = useDotTexture();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell so the middle stays clear for the core object
      const r = 4.5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        color="#93c5fd"
        map={dot}
        alphaMap={dot}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** The molten blue core plus its wireframe shell. */
function Core() {
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!shell.current) return;
    shell.current.rotation.y -= delta * 0.12;
    shell.current.rotation.x += delta * 0.05;
    // Breathe very slightly
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015;
    shell.current.scale.setScalar(s);
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <Icosahedron args={[1.15, 12]}>
          <MeshDistortMaterial
            color="#1d4ed8"
            emissive="#1e3a8a"
            emissiveIntensity={0.45}
            roughness={0.18}
            metalness={0.85}
            distort={0.38}
            speed={1.6}
          />
        </Icosahedron>

        {/* Faceted wireframe shell around the core */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.72, 1]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.28} />
        </mesh>
      </Float>

      {/* Two tilted orbit rings */}
      <Torus args={[2.6, 0.012, 12, 128]} rotation={[Math.PI / 2.2, 0.2, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.45} />
      </Torus>
      <Torus args={[3.1, 0.008, 12, 128]} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

/** Small satellites drifting around the core. */
function Satellites() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
  });

  const nodes = useMemo(
    () => [
      { pos: [3.1, 0.6, -0.4] as const, size: 0.07, color: "#22d3ee" },
      { pos: [-3.2, -0.5, 0.8] as const, size: 0.06, color: "#a78bfa" },
      { pos: [0.6, 2.6, -1.6] as const, size: 0.05, color: "#60a5fa" },
      { pos: [-1.2, -2.5, 1.2] as const, size: 0.065, color: "#3b82f6" },
    ],
    []
  );

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <Float key={i} speed={2} floatIntensity={1.4} rotationIntensity={0.6}>
          <mesh position={[...n.pos]}>
            <sphereGeometry args={[n.size, 16, 16]} />
            <meshBasicMaterial color={n.color} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Eases the whole scene toward the pointer for a parallax feel. */
function PointerParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-pointer.y * 0.22 - group.current.rotation.x) * 0.04;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      dpr={[1, isSmall ? 1.3 : 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 5, 6]} intensity={90} color="#60a5fa" distance={30} />
      <pointLight position={[-6, -4, 2]} intensity={70} color="#7c3aed" distance={30} />
      <pointLight position={[0, 4, -6]} intensity={40} color="#22d3ee" distance={30} />

      <Suspense fallback={null}>
        <PointerParallax>
          <Core />
          <Satellites />
          <Particles count={isSmall ? 400 : 900} />
        </PointerParallax>
      </Suspense>
    </Canvas>
  );
}
