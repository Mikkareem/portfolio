import { useFrame } from "@react-three/fiber";
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
    const pEnd = new Vector3(balloonPos.x, balloonPos.y, balloonPos.z - 0.1);

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
}
