import { useRef } from "react";
import { usePageScroll } from "../../presentation/usePageScroll";
import { useBounds } from "../../presentation/useBounds";
import { SkillsBackground } from "./SkillsBackground";
import { Physics } from "@react-three/rapier";
import { SKILLS_BALLOON_CONFIGS } from "./config";
import { SkillBalloonsSection } from "./SkillBalloonsSection";

export default function Skills() {
  const skillsRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  usePageScroll({ count: 7, contentRef: skillsRef, backgroundRef: bgRef });

  const mobileSkillsBounds = useBounds(0);
  const devOpsSkillsBounds = useBounds(1);
  const backendSkillsBounds = useBounds(2);
  const springSkillsBounds = useBounds(3);
  const testingSkillsBounds = useBounds(4);
  const webSkillsBounds = useBounds(5);
  const cloudSkillsBounds = useBounds(6);

  return (
    <>
      <SkillsBackground ref={bgRef} />
      <group ref={skillsRef}>
        <Physics gravity={[0, -9.81, 0]}>
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[0]}
            bounds={mobileSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[1]}
            bounds={devOpsSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[2]}
            bounds={backendSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[3]}
            bounds={springSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[4]}
            bounds={testingSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[5]}
            bounds={webSkillsBounds}
          />
          <SkillBalloonsSection
            config={SKILLS_BALLOON_CONFIGS[6]}
            bounds={cloudSkillsBounds}
          />
        </Physics>
      </group>
    </>
  );
}
