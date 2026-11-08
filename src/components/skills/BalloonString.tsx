import { useRef } from "react";
import { useBalloonStringSetup } from "./useBalloonStringSetup";
import { QuadraticBezierCurve3, Vector3 } from "three";

// Component that creates the joint link between anchor and balloon
export function BalloonString({ anchorRef, balloonRef, color }: any) {
  const meshRef = useRef<any>(null);

  useBalloonStringSetup({ meshRef, anchorRef, balloonRef });

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
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}
