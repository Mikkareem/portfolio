import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, useRopeJoint } from "@react-three/rapier";
import { useRef } from "react";
import { QuadraticBezierCurve3, TubeGeometry, Vector3 } from "three";

const REQUESTED_HEIGHT = 10;

const BALLOON_CONFIGS = [
  {
    color: "#ff3366",
    basePos: new Vector3(0, REQUESTED_HEIGHT, 0),
    speedMultiplier: 1.0,
    phaseOffset: 0.0,
  },
  {
    color: "#33ccff",
    basePos: new Vector3(-1.2, REQUESTED_HEIGHT, 0.8),
    speedMultiplier: 1.2,
    phaseOffset: 1.5,
  },
  {
    color: "#ffcc00",
    basePos: new Vector3(1.5, REQUESTED_HEIGHT, -0.5),
    speedMultiplier: 0.9,
    phaseOffset: 2.8,
  },
  {
    color: "#9933ff",
    basePos: new Vector3(-0.8, REQUESTED_HEIGHT, -1.2),
    speedMultiplier: 1.1,
    phaseOffset: 4.2,
  },
  {
    color: "#33ff99",
    basePos: new Vector3(1.0, REQUESTED_HEIGHT, 1.2),
    speedMultiplier: 1.3,
    phaseOffset: 5.5,
  },
];

function BalloonCluster() {
  const anchorRef = useRef<any>(null);
  const balloonRefs = useRef<Array<any>>([]);

  const { viewport } = useThree();

  useFrame((state: any) => {
    if (!anchorRef.current) return;
    const t = state.clock.elapsedTime;

    // 1. Procedurally drive the target float position directly above the anchor
    // This completely bypasses physics-solver lockup and dead resting states.
    const handPos = anchorRef.current.translation();

    balloonRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const config = BALLOON_CONFIGS[index];
      const p = t * config.speedMultiplier + config.phaseOffset;

      // Unique wind turbulence per balloon
      const windX = Math.sin(p * 1.3) * 0.5 + Math.cos(p * 0.7) * 0.25;
      const windZ = Math.cos(p * 1.1) * 0.5 + Math.sin(p * 0.8) * 0.25;
      const bobY = Math.sin(p * 2.0) * 0.2;

      // Disperse outward based on their base configuration spread
      const targetX = handPos.x + config.basePos.x + windX;
      const targetY = handPos.y + config.basePos.y + bobY;
      const targetZ = handPos.z + config.basePos.z + windZ;

      ref.setTranslation({ x: targetX, y: targetY, z: targetZ }, true);
    });
  });

  return (
    <>
      {/* Seller's Hand / Anchor Point (Fixed) */}
      <RigidBody
        ref={anchorRef}
        type="fixed"
        position={[0, -(viewport.height / 2), 0]}
      >
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </RigidBody>

      {/* Render all balloons and their corresponding strings */}
      {BALLOON_CONFIGS.map((config, index) => {
        const balloonRef = useRef<any>(null);
        return (
          <group key={index}>
            <RigidBody
              ref={(el) => {
                balloonRef.current = el;
                balloonRefs.current[index] = el;
              }}
              type="kinematicPosition"
              colliders="ball"
              position={config.basePos}
            >
              <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color={config.color} roughness={0.3} />
              </mesh>
            </RigidBody>
            <BalloonString
              anchorRef={anchorRef}
              balloonRef={balloonRef}
              index={index}
            />
          </group>
        );
      })}
    </>
  );
}

// Component that creates the joint link between anchor and balloon
function BalloonString({ anchorRef, balloonRef }: any) {
  const meshRef = useRef<any>(null);

  // Connects bodyA and bodyB with a rope of max length 3.0
  useRopeJoint(anchorRef, balloonRef, [
    [0, 0, 0], // Anchor point relative to bodyA
    [0, -0.6, 0], // Anchor point relative to balloon
    REQUESTED_HEIGHT, // Max distance / rope length
  ]);

  useFrame((state) => {
    if (!anchorRef.current || !balloonRef.current || !meshRef.current) return;

    // 1. Get current 3D world positions of the anchor and balloon
    const handPos = anchorRef.current.translation();
    const balloonPos = balloonRef.current.translation();

    const pStart = new Vector3(handPos.x, handPos.y, handPos.z);
    const pEnd = new Vector3(balloonPos.x, balloonPos.y - 0.5, balloonPos.z);

    // 2. Calculate midpoint and introduce a gravity sag + wind deflection
    const midPoint = pStart.clone().lerp(pEnd, 0.5);

    // Sag downward due to gravity/string weight
    midPoint.y -= 0.35;

    // Add subtle wind sway to the middle of the string
    const t = state.clock.elapsedTime;
    midPoint.x += Math.sin(t * 2.0) * 0.4;
    midPoint.z += -Math.cos(t * 1.5) * 0.8;

    // 3. Update the Quadratic Bézier curve geometry smoothly
    const curve = new QuadraticBezierCurve3(pStart, midPoint, pEnd);

    // Clean up old geometry buffer and assign new updated tube geometry
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = new TubeGeometry(curve, 20, 0.02, 8, false);
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry
        args={[
          new QuadraticBezierCurve3(
            new Vector3(0, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 2, 0),
          ),
          20,
          0.02,
          8,
          false,
        ]}
      />
      <meshStandardMaterial color="#fff" roughness={0.6} />
    </mesh>
  );
}

export default function BalloonVisualizer() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <BalloonCluster />
    </Physics>
  );
}
