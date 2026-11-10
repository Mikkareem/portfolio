import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { BoundingBox } from "../../presentation/Types";
import { usePageScroll } from "../../presentation/usePageScroll";
import { AboutSection } from "./AboutSection";
import { HeroSection } from "./HeroSection";
import { HomeBackground } from "./HomeBackground";
import { AchievementSection } from "./AchievementSection";

export default function Home() {
  const homeRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  usePageScroll({ contentRef: homeRef, backgroundRef: bgRef });

  const aboutSectionBounds = useBounds(1);
  const achievementSectionBounds = useBounds(2);

  return (
    <>
      <HomeBackground ref={bgRef} />
      <group ref={homeRef}>
        <HeroSection />
        <AboutSection bounds={aboutSectionBounds} />
        <AchievementSection bounds={achievementSectionBounds} />
      </group>
    </>
  );
}

const useBounds: (page: number) => BoundingBox = (page) => {
  const viewport = useThree((t) => t.viewport);

  const viewportLeft = -viewport.width / 2.0;
  const viewportRight = viewport.width / 2.0;

  const top = -viewport.height * (page - 0.5);
  const bottom = -viewport.height * (page + 0.5);

  return {
    left: viewportLeft,
    right: viewportRight,
    top,
    bottom,
  };
};
