import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import { useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import { ORBITS } from "./skill-overview-config";
import { degToRad } from "three/src/math/MathUtils.js";

export const useSkillOverviewAnimation = (
  {
    leftPanelGroupRef, leftPanelIconsRef, rightPanelRef, setActiveIndex
  }: {
    leftPanelGroupRef: RefObject<any>
    leftPanelIconsRef: RefObject<any[]>
    rightPanelRef: RefObject<any>
    setActiveIndex: Dispatch<SetStateAction<number>>
  }
) => {
  const rightPanelOpacity = useRef({ value: 1 });

  // Sync actual material opacity with the GSAP-animated proxy every frame
  useFrame(() => {
    if (rightPanelRef.current) {
      const currentOpacity = rightPanelOpacity.current.value

      rightPanelRef.current.traverse((child: any) => {
        if (child.isMesh && child.material) {
          // Handle materials (support single material or material arrays)
          const materials = Array.isArray(child.material) ? child.material : [child.material];

          materials.forEach((mat: any) => {
            mat.transparent = true;
            mat.opacity = currentOpacity;
            mat.needsUpdate = true;
          });
        }
      })
    }
  });

  // Orchestrate the step rotation, scale, and text fade animations in the parent container
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Initial state: Item 0 is scaled up at front, and text opacity starts at 1
    if (leftPanelIconsRef.current[0]) {
      gsap.set(leftPanelIconsRef.current[0].scale, {
        x: ACTIVE_SCALE,
        y: ACTIVE_SCALE,
        z: ACTIVE_SCALE,
      });
    }
    gsap.set(rightPanelOpacity.current, { value: 1 });

    for (let i = 0; i < ORBITS.length; i++) {
      const outgoingIdx = i;
      const incomingIdx = (i + 1) % ORBITS.length;
      const label = `step-${i}`;

      // 1. Rotate ring, scale down outgoing item, scale up incoming item simultaneously
      if (leftPanelGroupRef.current) {
        tl.to(
          leftPanelGroupRef.current.rotation,
          {
            y: `+=${STEP_ANGLE}`, //(i + 1) * STEP_ANGLE,
            duration: DURATION.STEP,
            ease: "power2.inOut",
          },
          label,
        );
      }

      if (leftPanelIconsRef.current[outgoingIdx]) {
        tl.to(
          leftPanelIconsRef.current[outgoingIdx].scale,
          {
            x: INACTIVE_SCALE,
            y: INACTIVE_SCALE,
            z: INACTIVE_SCALE,
            duration: DURATION.STEP,
            ease: "power2.inOut",
          },
          label,
        );
      }

      if (leftPanelIconsRef.current[incomingIdx]) {
        tl.to(
          leftPanelIconsRef.current[incomingIdx].scale,
          {
            x: ACTIVE_SCALE,
            y: ACTIVE_SCALE,
            z: ACTIVE_SCALE,
            duration: DURATION.STEP,
            ease: "power2.inOut",
          },
          label,
        );
      }

      // 2. Pause at this position
      tl.to({}, { duration: DURATION.PAUSE });

      // 3. Fade out text, update active index, and fade text back in
      tl.to(
        rightPanelOpacity.current,
        { value: 0, duration: DURATION.FADE, ease: "power1.inOut" },
        label,
      );

      tl.call(
        () => setActiveIndex(incomingIdx),
        [],
        `${label}+=${DURATION.FADE}`,
      );

      tl.to(
        rightPanelOpacity.current,
        { value: 1, duration: DURATION.FADE, ease: "power1.inOut" },
        `${label}+=${DURATION.FADE * 2}`,
      );
    }
  }, []);
}


export const RADIUS = 4;
export const TILT_X = degToRad(-5);
const ACTIVE_SCALE = 1.5;
export const INACTIVE_SCALE = 0.2;
const STEP_ANGLE = (Math.PI * 2) / ORBITS.length;

const DURATION = {
  STEP: 1,
  PAUSE: 3,
  FADE: 0.3,
};
