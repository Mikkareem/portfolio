import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { BalloonString } from "./BalloonString";
import SkillCard from "./SkillCard";
import { SKILLS_BALLOON_CONFIGS, type SkillBalloonConfig } from "./config";
import { useSkillBalloonsClusterSetup } from "./useSkillBalloonsClusterSetup";

function SkillBalloonsCluster({ config }: { config: SkillBalloonConfig }) {
  const anchorRef = useRef<any>(null);
  const balloonRefs = useRef<Array<any>>([]);

  const viewport = useThree((state) => state.viewport);

  useSkillBalloonsClusterSetup({ anchorRef, balloonRefs, config });

  return (
    <>
      {/* Seller's Hand / Anchor Point (Fixed) */}
      <RigidBody
        ref={anchorRef}
        type="fixed"
        position={[0, -(viewport.height / 2), 0]}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </RigidBody>

      {/* Render all balloons and their corresponding strings */}
      {config.skills.map((skill, index) => {
        const balloonRef = useRef<any>(null);
        return (
          <group key={index}>
            <RigidBody
              ref={(el) => {
                balloonRef.current = el;
                balloonRefs.current[index] = el;
              }}
              type="kinematicPosition"
              colliders={false}
              position={skill.basePos}
            >
              <SkillCard
                skillText={skill.name}
                textColor={config.textColor}
                boxColor={config.boxColor}
              />
            </RigidBody>
            <BalloonString
              anchorRef={anchorRef}
              balloonRef={balloonRef}
              color={config.ropeColor}
            />
          </group>
        );
      })}
    </>
  );
}

export default function SkillBalloonsVisualizer() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <SkillBalloonsCluster config={SKILLS_BALLOON_CONFIGS[3]} />
    </Physics>
  );
}
