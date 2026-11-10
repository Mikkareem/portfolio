import type { RefObject } from "react";
import Background from "../playground/Background";
import { UI } from "../../presentation/Core";
import { useThree } from "@react-three/fiber";

export function HomeBackground({ ref }: { ref: RefObject<any> }) {
  const camera = useThree((t) => t.camera);
  const viewport = useThree((t) => t.viewport);

  const { width: bgWidth, height: bgHeight } = viewport.getCurrentViewport(
    camera,
    [0, 0, UI.BG_DEPTH],
  );

  return (
    <group ref={ref}>
      <Background
        color={"green"}
        y={0 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"red"}
        y={-1 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
      <Background
        color={"black"}
        y={-2 * bgHeight}
        z={UI.BG_DEPTH}
        width={bgWidth}
        height={bgHeight}
      />
    </group>
  );
}
