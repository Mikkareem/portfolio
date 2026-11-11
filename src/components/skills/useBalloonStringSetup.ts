import { useFrame, useThree } from "@react-three/fiber";
import { useRopeJoint } from "@react-three/rapier";
import type { RefObject } from "react";
import { QuadraticBezierCurve3, TubeGeometry, Vector3 } from "three";

const REQUESTED_HEIGHT = 10;

export function useBalloonStringSetup({
  anchorRef,
  balloonRef,
  meshRef,
}: {
  meshRef: RefObject<any>;
  anchorRef: RefObject<any>;
  balloonRef: RefObject<any>;
}) {
  const viewport = useThree((state) => state.viewport);

  useRopeJoint(anchorRef, balloonRef, [
    [0, 0, 0], // Anchor point relative to bodyA
    [0, 0, 0], // Anchor point relative to balloon (dead center)
    REQUESTED_HEIGHT, // Max distance / rope length
  ]);

  useFrame((state) => {
    if (!anchorRef.current || !balloonRef.current || !meshRef.current) return;

    // 1. Get Rapier translations
    const handPos = anchorRef.current.translation();
    const balloonPos = balloonRef.current.translation();

    // 2. Both anchor and balloons live in this cluster's local coordinate frame:
    // - Anchor is at local [0, -viewport.height / 2, 0]
    // - Balloon offset relative to anchor connects to dead center
    const pStart = new Vector3(0, -(viewport.height / 2), 0);
    const pEnd = new Vector3(
      balloonPos.x - handPos.x,
      -(viewport.height / 2) + (balloonPos.y - handPos.y),
      balloonPos.z - handPos.z
    );

    // 3. Calculate midpoint and introduce a gravity sag + wind deflection
    const midPoint = pStart.clone().lerp(pEnd, 0.5);

    // Sag downward due to gravity/string weight
    midPoint.y -= 0.35;

    // Add subtle wind sway to the middle of the string
    const t = state.clock.elapsedTime;
    midPoint.x += Math.sin(t * 0.9) * 0.18;
    midPoint.z += -Math.cos(t * 0.7) * 0.25;

    // 4. Update the Quadratic Bézier curve geometry smoothly
    const curve = new QuadraticBezierCurve3(pStart, midPoint, pEnd);

    // Clean up old geometry buffer and assign new updated tube geometry
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = new TubeGeometry(curve, 20, 0.02, 8, false);
  });
}
