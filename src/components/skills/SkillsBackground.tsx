import type { RefObject } from "react";
import Background from "../playground/Background";
import { UI } from "../../presentation/Core";
import { useThree } from "@react-three/fiber";

export function SkillsBackground({ ref }: { ref: RefObject<any> }) {
  const camera = useThree((t) => t.camera);
  const viewport = useThree((t) => t.viewport);

  const { width: bgWidth, height: bgHeight } = viewport.getCurrentViewport(
    camera,
    [0, 0, UI.BG_DEPTH],
  );

  return (
    <group ref={ref}>
      <Background
        color={"white"}
        y={0 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-1 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-2 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-3 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-4 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-5 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"white"}
        y={-6 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
    </group>
  );
}
