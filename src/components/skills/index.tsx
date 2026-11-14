import { useRef } from "react";
import { usePageScroll } from "../../presentation/usePageScroll";
import { SkillsBackground } from "./SkillsBackground";
import { Physics } from "@react-three/rapier";
import { SKILLS_BALLOON_CONFIGS } from "./config";
import { SkillBalloonsSection } from "./SkillBalloonsSection";

export default function Skills() {
  const skillsRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  // 7 clusters with a 1-page gap between each:
  // Cluster 0 (Mobile)  -> Page 0
  // Empty Page          -> Page 1
  // Cluster 1 (DevOps)  -> Page 2
  // Empty Page          -> Page 3
  // Cluster 2 (Backend) -> Page 4
  // Empty Page          -> Page 5
  // Cluster 3 (Spring)  -> Page 6
  // Empty Page          -> Page 7
  // Cluster 4 (Testing) -> Page 8
  // Empty Page          -> Page 9
  // Cluster 5 (Web)     -> Page 10
  // Empty Page          -> Page 11
  // Cluster 6 (Cloud)   -> Page 12
  // Total = 13 pages (from page 0 to page 12)
  const totalClusters = SKILLS_BALLOON_CONFIGS.length;
  const totalPages = (totalClusters - 1) * 2 + 1; // 13

  usePageScroll({
    count: totalPages,
    contentRef: skillsRef,
    backgroundRef: bgRef,
  });

  return (
    <>
      <SkillsBackground ref={bgRef} count={totalPages} />
      <group ref={skillsRef}>
        <Physics gravity={[0, -9.81, 0]}>
          {SKILLS_BALLOON_CONFIGS.map((config, index) => {
            const pageIndex = index * 2;
            return (
              <SkillBalloonsSection
                key={config.category}
                pageIndex={pageIndex}
                config={config}
              />
            );
          })}
        </Physics>
      </group>
    </>
  );
}
