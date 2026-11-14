import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, type RefObject } from "react";
import { DEFAULT_Z_RANGE, lerpZ, type SkillBalloonConfig } from "./config";

export type BalloonLayoutItem = {
  baseX: number;
  baseY: number;
  baseZ: number;
  cardScale: number;
};

export function useSkillBalloonsClusterSetup({
  anchorRef,
  balloonRefs,
  config,
  isVisibleRef,
}: {
  anchorRef: RefObject<any>;
  balloonRefs: RefObject<Array<any>>;
  config: SkillBalloonConfig;
  isVisibleRef?: RefObject<any>;
}) {
  const viewport = useThree((state) => state.viewport);

  const layout = useMemo<BalloonLayoutItem[]>(() => {
    const N = config.skills.length;
    if (N === 0) return [];

    const zRange = config.zRange ?? DEFAULT_Z_RANGE;
    const aspect = viewport.width / viewport.height;

    // Responsive columns based on screen aspect ratio & orientation
    let C = 5;
    if (aspect < 0.65) C = 3; // Mobile portrait
    else if (aspect < 1.0) C = 4; // Tablet portrait / square
    else if (aspect < 1.45) C = 5; // Tablet landscape
    else if (viewport.height < 9) C = 7; // Mobile landscape
    else C = 6; // Desktop wide

    const maxWindX = 0.28;
    const maxWindY = 0.12;
    const baseW = 2.1;
    const baseH = 0.55;

    const itemsPerCol = Math.ceil(N / C);

    // Responsive card scale
    let responsiveScale = 1.0;
    if (aspect < 0.65) {
      responsiveScale = Math.min(0.68, Math.max(0.50, viewport.width / 11));
    } else if (viewport.height < 9) {
      responsiveScale = 0.72;
    } else if (aspect < 1.0) {
      responsiveScale = 0.82;
    } else if (aspect < 1.45) {
      responsiveScale = 0.90;
    }

    const cardHalfW = (baseW * responsiveScale) / 2;
    const cardHalfH = (baseH * responsiveScale) / 2;

    // Strict boundaries within the section's viewport:
    // - Horizontally: stay strictly inside [-viewport.width / 2, +viewport.width / 2]
    // - Vertically: stay strictly UP from anchor (Y_min) and below section top (Y_max)
    const X_safe = Math.max(0.2, viewport.width / 2 - cardHalfW - maxWindX - 0.15);
    const Y_min = cardHalfH + maxWindY + 0.8; // strictly above hand anchor
    const Y_max = viewport.height - cardHalfH - maxWindY - 0.7; // strictly below section top

    const availWidth = 2 * X_safe;
    const availHeight = Math.max(1.0, Y_max - Y_min);

    const balloons: BalloonLayoutItem[] = [];

    for (let i = 0; i < N; i++) {
      const skill = config.skills[i];
      const zNorm = skill.z ?? 0.5;
      const baseZ = lerpZ(zNorm, zRange);

      const c = i % C;
      const r = Math.floor(i / C);

      const colStep = C > 1 ? availWidth / (C - 1) : 0;
      const baseX = -X_safe + c * colStep;

      const rowStep = itemsPerCol > 1 ? availHeight / (itemsPerCol - 0.15) : 0;
      const vOffset = c % 2 === 1 ? 0.35 * rowStep : 0.0;
      const baseY = Y_min + (r / Math.max(1, itemsPerCol - 1)) * (availHeight - vOffset) + vOffset;

      balloons.push({
        baseX,
        baseY,
        baseZ,
        cardScale: responsiveScale,
      });
    }

    // Collision-resolution relaxation pass to guarantee zero overlap
    for (let iter = 0; iter < 40; iter++) {
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const b1 = balloons[i];
          const b2 = balloons[j];
          const dx = b1.baseX - b2.baseX;
          const dy = b1.baseY - b2.baseY;
          const reqX = cardHalfW * 2 + 2 * maxWindX + 0.10;
          const reqY = cardHalfH * 2 + 2 * maxWindY + 0.08;

          if (Math.abs(dx) < reqX && Math.abs(dy) < reqY) {
            const penX = reqX - Math.abs(dx);
            const penY = reqY - Math.abs(dy);

            if (penX / reqX < penY / reqY) {
              const s = dx >= 0 || (dx === 0 && i > j) ? 1 : -1;
              b1.baseX += s * penX * 0.5;
              b2.baseX -= s * penX * 0.5;
            } else {
              const s = dy >= 0 || (dy === 0 && i > j) ? 1 : -1;
              b1.baseY += s * penY * 0.5;
              b2.baseY -= s * penY * 0.5;
            }
          }
        }
      }

      // Clamp strictly within safe section boundaries
      for (const b of balloons) {
        b.baseX = Math.min(Math.max(b.baseX, -X_safe), X_safe);
        b.baseY = Math.min(Math.max(b.baseY, Y_min), Y_max);
      }
    }

    return balloons;
  }, [viewport.width, viewport.height, config.skills, config.zRange]);

  useFrame((state: any) => {
    // If section is culled off-screen, skip simulation
    if (isVisibleRef?.current && isVisibleRef.current.visible === false) return;
    if (!anchorRef.current) return;

    const t = state.clock.elapsedTime;
    const handPos = anchorRef.current.translation();

    balloonRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const item = layout[index];
      if (!item) return;

      const balloonSpeed =
        0.25 +
        config.speedMultiplier * 0.2 +
        (Math.sin(index * 12.9898) * 0.5 + 0.5) * 0.15;
      const p = t * balloonSpeed + (config.phaseOffset + index * 0.43);

      const forceScaleX =
        0.18 + (Math.cos(index * 4.31) * 0.5 + 0.5) * 0.10;
      const forceScaleZ =
        0.18 + (Math.sin(index * 7.19) * 0.5 + 0.5) * 0.10;
      const forceScaleY =
        0.06 + (Math.cos(index * 9.17) * 0.5 + 0.5) * 0.04;

      const windX =
        (Math.sin(p * 1.2) * 0.7 + Math.cos(p * 0.6) * 0.3) * forceScaleX;
      const windZ =
        (Math.cos(p * 1.0) * 0.7 + Math.sin(p * 0.7) * 0.3) * forceScaleZ;
      const bobY = Math.sin(p * 1.4) * forceScaleY;

      // Position relative to this section's anchor in 3D world space
      // Anchor is at z = -5 locally, so adding 5 places balloons at local z in [-2, 2]
      const targetX = handPos.x + item.baseX + windX;
      const targetY = handPos.y + item.baseY + bobY;
      const targetZ = handPos.z + 5 + item.baseZ + windZ;

      ref.setTranslation({ x: targetX, y: targetY, z: targetZ }, true);
    });
  });

  return { layout };
}
