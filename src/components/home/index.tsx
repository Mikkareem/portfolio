import { useRef } from "react";
import { usePageScroll } from "../../presentation/usePageScroll";
import { AboutSection } from "./AboutSection";
import { HeroSection } from "./HeroSection";
import { HomeBackground } from "./HomeBackground";
import { AchievementSection } from "./AchievementSection";
import { SkillOverviewSection } from "./SkillOverviewSection";
import { MajorProjectsSection } from "./MajorProjectsSection";
import { MinorProjectsSection } from "./MinorProjectsSection";
import { useBounds } from "../../presentation/useBounds";

export default function Home() {
  const homeRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  usePageScroll({ count: 6, contentRef: homeRef, backgroundRef: bgRef });

  const aboutSectionBounds = useBounds(1);
  const achievementSectionBounds = useBounds(2);
  const skillsOverviewSectionBounds = useBounds(3);
  const majorProjectsSectionBounds = useBounds(4);
  const minorProjectsSectionBounds = useBounds(5);

  return (
    <>
      <HomeBackground ref={bgRef} count={6} />
      <group ref={homeRef}>
        <HeroSection />
        <AboutSection bounds={aboutSectionBounds} />
        <AchievementSection bounds={achievementSectionBounds} />
        <SkillOverviewSection bounds={skillsOverviewSectionBounds} />
        <MajorProjectsSection bounds={majorProjectsSectionBounds} />
        <MinorProjectsSection bounds={minorProjectsSectionBounds} />
      </group>
    </>
  );
}
