import { useMemo, type ComponentProps } from "react";
import { Euler, Vector3, type Group } from "three";
import { ORBITS } from "./skill-overview-config";
import { INACTIVE_SCALE, RADIUS } from "./useSkillOverviewAnimation";
import { AppIcon } from "../playground/AppIcon";
import { PointLightMesh } from "../playground/PointLightMesh";
import { degToRad } from "three/src/math/MathUtils.js";

type SkillsOrbitProps = {
  groupRef: React.RefObject<Group | null>;
  itemRefs: React.RefObject<(Group | null)[]>;
  activeIndex: number;
} & ComponentProps<"group">;

export function SkillsOrbit({
  groupRef,
  itemRefs,
  activeIndex,
  ...groupProps
}: SkillsOrbitProps) {
  // Compute circular layout once (offset so item 0 starts at front +Z)
  const svgItems = useMemo(
    () =>
      ORBITS.map((orbit, i) => {
        const angle = (i / ORBITS.length) * Math.PI * 2 + Math.PI / 2;
        return {
          id: i,
          position: new Vector3(
            Math.cos(angle) * RADIUS,
            0,
            Math.sin(angle) * RADIUS,
          ),
          rotation: new Euler(0, -angle + Math.PI / 2, 0),
          icon: orbit.icon,
          color: orbit.color,
        };
      }),
    [],
  );

  return (
    <>
      <group {...groupProps} ref={groupRef}>
        {svgItems.map((item, i) => (
          <group
            key={item.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            position={item.position}
            rotation={item.rotation}
            scale={INACTIVE_SCALE}
          >
            <AppIcon
              src={item.icon.src}
              color={item.color}
              width={item.icon.width}
              height={item.icon.height}
              scale={item.icon.scale}
            />
          </group>
        ))}
      </group>

      <group position-y={1.5} rotation-x={degToRad(180)}>
        <PointLightMesh color={ORBITS[activeIndex].color} />
      </group>
    </>
  );
}
