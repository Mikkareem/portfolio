import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { BoundingBox } from "../../presentation/Types";
import { useBounds } from "../../presentation/useBounds";
import type { SkillBalloonConfig } from "./config";
import { SkillBalloonsCluster } from "./SkillsBalloonsCluster";

export function SkillBalloonsSection({
  bounds: customBounds,
  config,
  pageIndex = 0,
}: {
  bounds?: BoundingBox;
  config: SkillBalloonConfig;
  pageIndex?: number;
}) {
  const defaultBounds = useBounds(pageIndex);
  const bounds = customBounds ?? defaultBounds;

  const scroll = useScroll();
  const groupRef = useRef<any>(null);

  useFrame(() => {
    if (groupRef.current) {
      const currentPage = scroll.offset * (scroll.pages - 1);
      // Visible if within 1.15 pages of the current scroll viewport
      const isVisible = Math.abs(pageIndex - currentPage) < 1.15;
      if (groupRef.current.visible !== isVisible) {
        groupRef.current.visible = isVisible;
      }
    }
  });

  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: -2,
  };

  return (
    <group ref={groupRef} position={[middle.x, middle.y, middle.z]}>
      <SkillBalloonsCluster config={config} isVisibleRef={groupRef} />
    </group>
  );
}
