import { degToRad } from "three/src/math/MathUtils.js";
import type { BoundingBox } from "../../presentation/Types";
import AdBoard from "../playground/AdBoard";
import { SimpleAboutCard } from "./SimpleAboutCard";

export function AboutSection({ bounds }: { bounds: BoundingBox }) {
  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 2,
  };

  return (
    <group
      position={[middle.x, middle.y, middle.z]}
      rotation-y={degToRad(-25)}
      scale={[0.8, 0.8, 1]}
    >
      <AdBoard scaleFactorX={0.07} scaleFactorY={0} color={"#56ff34"}>
        <SimpleAboutCard scale={1.6} />
      </AdBoard>
    </group>
  );
}
