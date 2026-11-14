import { useRef } from "react";
import {
  useBalloonStringSetup,
  TUBULAR_SEGMENTS,
  RADIAL_SEGMENTS,
  STRING_RADIUS,
} from "./useBalloonStringSetup";
import { QuadraticBezierCurve3, Vector3 } from "three";

const initialCurve = new QuadraticBezierCurve3(
  new Vector3(0, 0, -5),
  new Vector3(0, 1, -2.5),
  new Vector3(0, 2, 0)
);

// Component that creates the joint link between anchor and balloon
export function BalloonString({ anchorRef, balloonRef, color }: any) {
  const meshRef = useRef<any>(null);

  useBalloonStringSetup({ meshRef, anchorRef, balloonRef });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry
        args={[
          initialCurve,
          TUBULAR_SEGMENTS,
          STRING_RADIUS,
          RADIAL_SEGMENTS,
          false,
        ]}
      />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}
