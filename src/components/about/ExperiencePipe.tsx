import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";

export const ExperiencePipe = () => {
  const viewport = useThree((t) => t.viewport);
  const length = 5;

  // 1. Define an array of points for multiple bends
  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      [
        new Vector3(viewport.width + length, length, 0), // Start point
        new Vector3(-length, length, 0), // Bend 1
        new Vector3(-length, -viewport.height, 0), // Bend 2
        new Vector3(length, -viewport.height, 0), // Bend 3
        new Vector3(length, -2 * viewport.height, 0), // Bend 4
        new Vector3(-viewport.width + length, -2 * viewport.height, 0), // End point
      ],
      false, // closed: true/false
      "catmullrom", // curve type ('centripetal', 'chordal', 'catmullrom')
    );
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 256, 0.35, 32, false]} />
      <meshStandardMaterial
        color={"green"}
        toneMapped={false}
        roughness={0.3}
        metalness={0.3}
      />
    </mesh>
  );
};
