import type { RefObject } from "react";
import Background from "../playground/Background";
import { UI } from "../../presentation/Core";
import { useThree } from "@react-three/fiber";

export function SkillsBackground({
  ref,
  count = 13,
}: {
  ref: RefObject<any>;
  count?: number;
}) {
  const camera = useThree((t) => t.camera);
  const viewport = useThree((t) => t.viewport);

  const { width: bgWidth, height: bgHeight } = viewport.getCurrentViewport(
    camera,
    [0, 0, UI.BG_DEPTH],
  );

  return (
    <group ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <Background
          key={i}
          color={"white"}
          y={-i * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
      ))}
    </group>
  );
}
