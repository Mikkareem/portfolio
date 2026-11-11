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
      // Reduced blowing speed with randomized variation per balloon
      const balloonSpeed = 0.25 + config.speedMultiplier * 0.2 + (Math.sin(index * 12.9898) * 0.5 + 0.5) * 0.15;
      const p = t * balloonSpeed + (config.phaseOffset + index * 0.43);

      // Reduced blowing force, randomized per balloon
      const forceScaleX = 0.2 + (Math.cos(index * 4.31) * 0.5 + 0.5) * 0.12;
      const forceScaleZ = 0.2 + (Math.sin(index * 7.19) * 0.5 + 0.5) * 0.12;
      const forceScaleY = 0.08 + (Math.cos(index * 9.17) * 0.5 + 0.5) * 0.05;

      // Unique wind turbulence per balloon
      const windX = (Math.sin(p * 1.2) * 0.7 + Math.cos(p * 0.6) * 0.3) * forceScaleX;
      const windZ = (Math.cos(p * 1.0) * 0.7 + Math.sin(p * 0.7) * 0.3) * forceScaleZ;
      const bobY = Math.sin(p * 1.4) * forceScaleY;

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