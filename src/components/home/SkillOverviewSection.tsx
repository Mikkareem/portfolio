import { useRef, useState } from "react";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { ORBITS } from "./skill-overview-config";
import { TILT_X, useSkillOverviewAnimation } from "./useSkillOverviewAnimation";
import { SkillsOrbit } from "./SkillsOrbit";
import { SkillsDescription } from "./SkillsDescription";
import type { BoundingBox } from "../../presentation/Types";
import { useThree } from "@react-three/fiber";

export const SkillOverviewSection = ({ bounds }: { bounds: BoundingBox }) => {
  const viewport = useThree((t) => t.viewport);

  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 0,
  };

  const rightPanelRef = useRef<any>(null);

  const leftPanelGroupRef = useRef<Group>(null);
  const leftPanelIconsRef = useRef<any[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useSkillOverviewAnimation({
    leftPanelGroupRef,
    leftPanelIconsRef,
    setActiveIndex,
    rightPanelRef,
  });

  // Determine if width is available for row-based layout (Desktop / Tablet Landscape)
  // otherwise fallback to column-based layout (Mobile / Tablet Portrait)
  const isWide = viewport.width >= 13.5;

  // Responsive calculations for row vs column layouts
  const xOffset = Math.min(4.0, viewport.width * 0.23);

  const orbitScale = isWide
    ? Math.min(1.0, (viewport.width * 0.44) / 8.5, (viewport.height * 0.8) / 8.0)
    : Math.min(0.7, (viewport.width * 0.82) / 8.5, (viewport.height * 0.36) / 3.5);

  const descScale = isWide
    ? Math.min(1.3, (viewport.width * 0.44) / 5.5, (viewport.height * 0.8) / 4.8)
    : Math.min(0.95, (viewport.width * 0.88) / 5.5, (viewport.height * 0.45) / 4.5);

  const yOrbit = Math.min(2.5, viewport.height * 0.22);
  const yDesc = -Math.min(2.4, viewport.height * 0.22);

  const orbitPosition: [number, number, number] = isWide
    ? [-xOffset, 0, 0]
    : [0, yOrbit, 0];

  const orbitRotation: [number, number, number] = isWide
    ? [TILT_X, 0, degToRad(-25)]
    : [TILT_X, 0, 0];

  const descPosition: [number, number, number] = isWide
    ? [xOffset, 0, 0]
    : [0, yDesc, 0];

  const descRotationY = isWide ? degToRad(-25) : 0;

  return (
    <group position={[middle.x, middle.y, middle.z]}>
      {/* 1. Skills Orbit Component */}
      <group
        position={orbitPosition}
        rotation={orbitRotation}
        scale={orbitScale}
      >
        <SkillsOrbit
          groupRef={leftPanelGroupRef}
          itemRefs={leftPanelIconsRef}
          activeIndex={activeIndex}
        />
      </group>

      {/* 2. Skills Description Card Component */}
      <group
        position={descPosition}
        scale={descScale}
        rotation-y={descRotationY}
        ref={rightPanelRef}
      >
        <SkillsDescription skill={ORBITS[activeIndex]} />
      </group>
    </group>
  );
};
