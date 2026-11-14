import { useRef } from "react";
import { usePageScroll } from "../../presentation/usePageScroll";
import { AboutBackground } from "./AboutBackground";
import { ExperienceSection } from "./ExperienceSection";
import { DEFAULT_EXPERIENCES } from "./data";
import type { Experience } from "./ExperienceCard";

export * from "./ExperiencePipe";
export * from "./ExperienceCard";
export * from "./ExperienceSection";
export * from "./AboutBackground";
export * from "./data";

export function About({
  experiences = DEFAULT_EXPERIENCES,
  startSide = "left",
}: {
  experiences?: Experience[];
  startSide?: "left" | "right";
}) {
  const aboutRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  const count = experiences.length;

  usePageScroll({
    count,
    contentRef: aboutRef,
    backgroundRef: bgRef,
  });

  return (
    <>
      <AboutBackground ref={bgRef} count={count} />
      <group ref={aboutRef}>
        <ExperienceSection experiences={experiences} startSide={startSide} />
      </group>
    </>
  );
}

export default About;
