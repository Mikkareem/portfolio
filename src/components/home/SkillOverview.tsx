import { useGSAP } from "@gsap/react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { type ComponentProps, useMemo, useRef, useState } from "react";
import { Euler, Group, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { AppIcon } from "../playground/AppIcon";

// Configuration constants
const ORBITS = [
  {
    name: "Kotlin Multiplatform",
    icon: {
      src: "images/kmp.png",
      width: 96,
      height: 96,
      scale: 0.02,
    },
    color: "",
    description: "111",
  },
  {
    name: "Compose Multiplatform",
    icon: {
      src: "images/cmp.png",
      width: 256,
      height: 286,
      scale: 0.008,
    },
    color: "#4285f4",
    description: "222",
  },
  {
    name: "Kotlin Multiplatform",
    icon: {
      src: "images/kmp.png",
      width: 96,
      height: 96,
      scale: 0.02,
    },
    color: "green",
    description: "333",
  },
  {
    name: "Kotlin Multiplatform",
    icon: {
      src: "images/kmp.png",
      width: 96,
      height: 96,
      scale: 0.02,
    },
    color: "blue",
    description: "444",
  },
  {
    name: "Android",
    icon: {
      src: "images/kmp.png",
      width: 96,
      height: 96,
      scale: 0.02,
    },
    color: "blue",
    description: "555",
  },
  {
    name: "React",
    icon: {
      src: "images/kmp.png",
      width: 96,
      height: 96,
      scale: 0.02,
    },
    color: "blue",
    description: "666",
  },
];
const RADIUS = 4;
const ACTIVE_SCALE = 2.5;
const INACTIVE_SCALE = 0.4;
const STEP_ANGLE = (Math.PI * 2) / ORBITS.length;
const TILT_X = degToRad(-5);

const DURATION = {
  STEP: 1,
  PAUSE: 3,
  FADE: 0.3,
};

export const SkillOverview = (props: ComponentProps<"group">) => {
  const textRef = useRef<any>(null);
  const textOpacity = useRef({ value: 1 });

  const svgGroupRef = useRef<Group>(null);
  const svgRefs = useRef<any[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync actual material opacity with the GSAP-animated proxy every frame
  useFrame(() => {
    if (textRef.current?.material) {
      textRef.current.material.opacity = textOpacity.current.value;
      textRef.current.material.transparent = true;
      textRef.current.material.needsUpdate = true;
    }
  });

  // Orchestrate the step rotation, scale, and text fade animations in the parent container
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Initial state: Item 0 is scaled up at front, and text opacity starts at 1
    if (svgRefs.current[0]) {
      gsap.set(svgRefs.current[0].scale, {
        x: ACTIVE_SCALE,
        y: ACTIVE_SCALE,
        z: ACTIVE_SCALE,
      });
    }
    gsap.set(textOpacity.current, { value: 1 });

    for (let i = 0; i < ORBITS.length; i++) {
      const outgoingIdx = i;
      const incomingIdx = (i + 1) % ORBITS.length;
      const label = `step-${i}`;

      // 1. Rotate ring, scale down outgoing item, scale up incoming item simultaneously
      if (svgGroupRef.current) {
        tl.to(
          svgGroupRef.current.rotation,
          {
            y: `+=${STEP_ANGLE}`, //(i + 1) * STEP_ANGLE,
            duration: DURATION.STEP,
            ease: "power2.inOut",
          },
          label,
        );
      }

      if (svgRefs.current[outgoingIdx]) {
        tl.to(
          svgRefs.current[outgoingIdx].scale,
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

      if (svgRefs.current[incomingIdx]) {
        tl.to(
          svgRefs.current[incomingIdx].scale,
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
        textOpacity.current,
        { value: 0, duration: DURATION.FADE, ease: "power1.inOut" },
        label,
      );

      tl.call(
        () => setActiveIndex(incomingIdx),
        [],
        `${label}+=${DURATION.FADE}`,
      );

      tl.to(
        textOpacity.current,
        { value: 1, duration: DURATION.FADE, ease: "power1.inOut" },
        `${label}+=${DURATION.FADE * 2}`,
      );
    }
  }, []);

  return (
    <group {...props}>
      <group position={[-3, 0, 0]} rotation={[TILT_X, 0, degToRad(-25)]}>
        <SkillsOrbit groupRef={svgGroupRef} itemRefs={svgRefs} />
      </group>

      <group position={[0, -4, 0]}>
        <Text
          ref={textRef}
          position={[0, 0, 0]}
          fontSize={1}
          color="#ffffff"
          font="/fonts/GoogleSans-Regular-Variable.ttf"
        >
          {ORBITS[activeIndex].description}
        </Text>
      </group>
    </group>
  );
};

type SkillsOrbitProps = {
  groupRef: React.RefObject<Group | null>;
  itemRefs: React.RefObject<(Group | null)[]>;
} & ComponentProps<"group">;

function SkillsOrbit({ groupRef, itemRefs, ...groupProps }: SkillsOrbitProps) {
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
  );
}
