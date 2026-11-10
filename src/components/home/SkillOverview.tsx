import { type ComponentProps, useRef, useState } from "react";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { ORBITS } from "./skill-overview-config";
import { TILT_X, useSkillOverviewAnimation } from "./useSkillOverviewAnimation";
import { SkillsOrbit } from "./SkillsOrbit";
import { SkillsDescription } from "./SkillsDescription";

export const SkillOverview = (props: ComponentProps<"group">) => {
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
    <group {...props}>
      <group position={[-4, 0, 0]} rotation={[TILT_X, 0, degToRad(-25)]}>
        <SkillsOrbit
          groupRef={leftPanelGroupRef}
          itemRefs={leftPanelIconsRef}
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
