import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import { type SkillBalloonConfig } from "./config";

export function useSkillBalloonsClusterSetup({
  anchorRef,
  balloonRefs,
  config
}: {
  anchorRef: RefObject<any>
  balloonRefs: RefObject<Array<any>>
  config: SkillBalloonConfig
}) {
  const viewport = useThree((state) => state.viewport);

  useFrame((state: any) => {
    if (!anchorRef.current) return;
    const t = state.clock.elapsedTime;

    // 1. Procedurally drive the target float position directly above the anchor
    // This completely bypasses physics-solver lockup and dead resting states.
    const handPos = anchorRef.current.translation();

    balloonRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const skill = config.skills[index];
      const p = t * (0.6 + config.speedMultiplier) + (config.phaseOffset + (index * 0.3));

      // Unique wind turbulence per balloon
      const windX = Math.sin(p * 1.3) * 0.5 + Math.cos(p * 0.7) * 0.25;
      const windZ = Math.cos(p * 1.1) * 0.5 + Math.sin(p * 0.8) * 0.25;
      const bobY = Math.sin(p * 2.0) * 0.2;

      const baseX = skill.basePos.x * viewport.width - viewport.width / 2.0;
      const baseY = skill.basePos.y * viewport.height;
      const baseZ = skill.basePos.z * 10.0 - (10.0 / 2.0)

      // Disperse outward based on their base configuration spread
      const targetX = handPos.x + baseX + windX;
      const targetY = handPos.y + baseY + bobY;
      const targetZ = handPos.z + baseZ + windZ;

      ref.setTranslation({ x: targetX, y: targetY, z: targetZ }, true);
    });
  });
}