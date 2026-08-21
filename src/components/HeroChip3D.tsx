import { Float, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useDeviceTier } from '../hooks/useDeviceTier';

// --- Sub-components for 3D Chip ---

function ChipCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const circuitLinesRef = useRef<THREE.LineSegments>(null);

  // Reusable materials & geometries
  const [substrateMaterial, dieMaterial, goldPinMaterial] = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({
        color: '#081120',
        metalness: 0.85,
        roughness: 0.25,
      }),
      new THREE.MeshStandardMaterial({
        color: '#0e223d',
        metalness: 0.95,
        roughness: 0.15,
        emissive: '#0284c7',
        emissiveIntensity: 0.18,
      }),
      new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        metalness: 0.9,
        roughness: 0.2,
        emissive: '#0284c7',
        emissiveIntensity: 0.4,
      }),
    ];
  }, []);

  // Circuit trace lines on the die
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 1.4;
    const step = 0.2;
    for (let i = -size; i <= size; i += step) {
      points.push(new THREE.Vector3(i, 0.12, -size));
      points.push(new THREE.Vector3(i, 0.12, Math.sin(i * 4) * 0.4));
      points.push(new THREE.Vector3(-size, 0.12, i));
      points.push(new THREE.Vector3(Math.cos(i * 4) * 0.4, 0.12, i));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#38bdf8',
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  // Pin coordinates (around substrate edges)
  const pinPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 12;
    const spacing = 0.28;
    const offset = ((count - 1) * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const pos = i * spacing - offset;
      positions.push([pos, -0.02, 1.85]); // Front
      positions.push([pos, -0.02, -1.85]); // Back
      positions.push([1.85, -0.02, pos]); // Right
      positions.push([-1.85, -0.02, pos]); // Left
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
    if (circuitLinesRef.current) {
      lineMaterial.opacity = 0.4 + Math.sin(t * 2) * 0.25;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Substrate Base */}
      <mesh material={substrateMaterial} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.12, 3.6]} />
      </mesh>

      {/* Silicon Die Center */}
      <mesh position={[0, 0.1, 0]} material={dieMaterial} castShadow>
        <boxGeometry args={[2.2, 0.1, 2.2]} />
      </mesh>

      {/* Die Circuit Traces */}
      <lineSegments
        ref={circuitLinesRef}
        geometry={lineGeometry}
        material={lineMaterial}
      />

      {/* Heatspreader Center Logo Plate */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[1.0, 0.04, 1.0]} />
        <meshStandardMaterial
          color="#0369a1"
          metalness={0.9}
          roughness={0.1}
          emissive="#38bdf8"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Golden/Cyan Interconnect Pins */}
      {pinPositions.map((pos, idx) => (
        <mesh
          key={idx}
          position={pos}
          material={goldPinMaterial}
          castShadow
        >
          <boxGeometry args={[0.12, 0.06, 0.22]} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingDataParticles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6
      ),
      speed: 0.2 + Math.random() * 0.6,
      scale: 0.04 + Math.random() * 0.06,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position.x,
        p.position.y + Math.sin(t * p.speed + i) * 0.3,
        p.position.z
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 3 + i) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
    </instancedMesh>
  );
}

export function HeroChip3D() {
  const { isLow, reduced } = useDeviceTier();
  const particleCount = isLow || reduced ? 10 : 36;

  return (
    <div
      className="hero-chip-3d relative w-full h-full flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(260px, 42vw, 420px)',
          height: 'clamp(260px, 42vw, 420px)',
          background:
            'radial-gradient(circle, rgba(41, 171, 226, 0.22) 0%, rgba(34, 84, 196, 0.08) 55%, transparent 80%)',
          filter: 'blur(48px)',
        }}
      />

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-full">
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          camera={{ position: [0, 3.2, 5.2], fov: 42 }}
          dpr={[1, 1]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight
            position={[-4, 2, -2]}
            intensity={1.2}
            color="#0284c7"
          />
          <pointLight
            position={[0, 1.5, 0]}
            intensity={2.0}
            color="#38bdf8"
            distance={4}
          />

          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
            <group rotation={[0.42, 0.35, 0]}>
              <ChipCore />
            </group>
          </Float>

          <FloatingDataParticles count={particleCount} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.35} minPolarAngle={Math.PI * 0.32} maxPolarAngle={Math.PI * 0.65} />
        </Canvas>

      </div>
    </div>
  );
}