import type { BoundingBox } from "../../presentation/Types";
import type { SkillBalloonConfig } from "./config";
import { SkillBalloonsCluster } from "./SkillsBalloonsCluster";

export function SkillBalloonsSection({
  bounds,
  config,
}: {
  bounds: BoundingBox;
  config: SkillBalloonConfig;
}) {
  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: -2,
  };

  return (
    <group position={[middle.x, middle.y, middle.z]}>
      <SkillBalloonsCluster config={config} />
    </group>
  );
}
