import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, type RefObject } from "react";
import { BalloonString } from "./BalloonString";
import SkillCard from "./SkillCard";
import { type SkillBalloonConfig, type SkillItem } from "./config";
import { useSkillBalloonsClusterSetup } from "./useSkillBalloonsClusterSetup";
import { CenterTitle } from "../playground/CenterTitle";

export function SkillBalloonsCluster({
  config,
  isVisibleRef,
}: {
  config: SkillBalloonConfig;
  isVisibleRef?: RefObject<any>;
}) {
  const anchorRef = useRef<any>(null);
  const balloonRefs = useRef<Array<any>>([]);

  const viewport = useThree((state) => state.viewport);

  const { layout } = useSkillBalloonsClusterSetup({
    anchorRef,
    balloonRefs,
    config,
    isVisibleRef,
  });

  return (
    <>
      {/* Seller's Hand / Anchor Point (Fixed at z = -5 near viewport bottom) */}
      <RigidBody
        ref={anchorRef}
        type="fixed"
        position={[0, -(viewport.height / 2), -5]}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </RigidBody>

      {/* Render all balloons and their corresponding strings */}
      {config.skills.map((skill, index) => {
        const item = layout[index];
        const initialPos: [number, number, number] = item
          ? [item.baseX, item.baseY - viewport.height / 2, item.baseZ]
          : [0, -(viewport.height / 2) + 1, 0];

        return (
          <SkillBalloonItem
            key={index}
            skill={skill}
            index={index}
            config={config}
            anchorRef={anchorRef}
            balloonRefs={balloonRefs}
            cardScale={item?.cardScale ?? 1}
            initialPosition={initialPos}
          />
        );
      })}

      <CenterTitle title={config.category} position={[0, 0, -20]} />
    </>
  );
}

function SkillBalloonItem({
  skill,
  index,
  config,
  anchorRef,
  balloonRefs,
  cardScale = 1,
  initialPosition = [0, 0, 0],
}: {
  skill: SkillItem;
  index: number;
  config: SkillBalloonConfig;
  anchorRef: any;
  balloonRefs: React.MutableRefObject<any[]>;
  cardScale?: number;
  initialPosition?: [number, number, number];
}) {
  const balloonRef = useRef<any>(null);

  return (
    <group>
      <RigidBody
        ref={(el) => {
          balloonRef.current = el;
          balloonRefs.current[index] = el;
        }}
        type="kinematicPosition"
        colliders={false}
        position={initialPosition}
      >
        <SkillCard
          skillText={skill.name}
          textColor={config.textColor}
          boxColor={config.boxColor}
          scale={cardScale}
        />
      </RigidBody>
      <BalloonString
        anchorRef={anchorRef}
        balloonRef={balloonRef}
        color={config.ropeColor}
      />
    </group>
  );
}
