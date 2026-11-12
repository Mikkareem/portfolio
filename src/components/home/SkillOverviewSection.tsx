import { useRef, useState } from "react";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { ORBITS } from "./skill-overview-config";
import { TILT_X, useSkillOverviewAnimation } from "./useSkillOverviewAnimation";
import { SkillsOrbit } from "./SkillsOrbit";
import { SkillsDescription } from "./SkillsDescription";
import type { BoundingBox } from "../../presentation/Types";

export const SkillOverviewSection = ({ bounds }: { bounds: BoundingBox }) => {
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

  return (
    <group position={[middle.x, middle.y, middle.z]}>
      <group position={[-4, 0, 0]} rotation={[TILT_X, 0, degToRad(-25)]}>
        <SkillsOrbit
          groupRef={leftPanelGroupRef}
          itemRefs={leftPanelIconsRef}
          activeIndex={activeIndex}
        />
      </group>

      <group
        position={[4, 0, 0]}
        scale={1.3}
        rotation-y={degToRad(-25)}
        ref={rightPanelRef}
      >
        <SkillsDescription skill={ORBITS[activeIndex]} />
      </group>
    </group>
  );
};
