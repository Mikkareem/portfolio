import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import type { Group } from "three";

export function HeroAnimatingVisual(props: any) {
  const coreRef = useRef<Group>(null);
  const ring1Ref = useRef<Group>(null);
  const ring2Ref = useRef<Group>(null);
  const ring3Ref = useRef<Group>(null);
  const satellitesRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Smooth continuous rotations for gyroscopic orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.7;
      ring2Ref.current.rotation.z += delta * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.4;
      ring3Ref.current.rotation.x -= delta * 0.5;
    }

    // Polyhedral core gentle rotation and wobble
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.45;
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }

    // Orbiting satellites rotation
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 1.1;
    }
  });

  return (
    <group {...props}>
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Ambient point lights inside the visual element */}
        <pointLight color="#ffd230" intensity={2.2} distance={10} />
        <pointLight
          color="#38bdf8"
          intensity={1.8}
          distance={8}
          position={[0, -1, 1]}
        />

        {/* 1. Geometric Faceted Core */}
        <group ref={coreRef}>
          <mesh>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshStandardMaterial
              color="#ffd230"
              metalness={0.8}
              roughness={0.25}
              emissive="#b45309"
              emissiveIntensity={0.35}
            />
          </mesh>
          {/* Outer wireframe lattice cage */}
          <mesh scale={1.22}>
            <icosahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>

        {/* 2. Gyroscope Ring 1 (Gold) */}
        <group ref={ring1Ref} rotation={[degToRad(35), 0, degToRad(20)]}>
          <mesh>
            <torusGeometry args={[2.0, 0.04, 16, 80]} />
            <meshStandardMaterial
              color="#ffd230"
              metalness={0.85}
              roughness={0.2}
              emissive="#ffd230"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>

        {/* 3. Gyroscope Ring 2 (Cyan) */}
        <group ref={ring2Ref} rotation={[degToRad(-45), degToRad(30), 0]}>
          <mesh>
            <torusGeometry args={[2.4, 0.035, 16, 80]} />
            <meshStandardMaterial
              color="#38bdf8"
              metalness={0.9}
              roughness={0.15}
              emissive="#38bdf8"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        {/* 4. Gyroscope Ring 3 (Purple Outer) */}
        <group
          ref={ring3Ref}
          rotation={[degToRad(70), degToRad(-40), degToRad(15)]}
        >
          <mesh>
            <torusGeometry args={[2.8, 0.025, 16, 90]} />
            <meshStandardMaterial
              color="#a855f7"
              metalness={0.8}
              roughness={0.3}
              emissive="#a855f7"
              emissiveIntensity={0.45}
            />
          </mesh>
        </group>

        {/* 5. Orbiting Satellites */}
        <group ref={satellitesRef}>
          <mesh position={[2.6, 0.5, 0]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[-2.4, -0.4, 0.8]}>
            <octahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial
              color="#ffd230"
              emissive="#ffd230"
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[0.5, -2.5, -0.5]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
