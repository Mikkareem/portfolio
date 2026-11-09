import { AchievementCard } from "../components/playground/AchievementCard";

export const Playground = (props: any) => {
  return (
    <group {...props} dispose={null}>
      <axesHelper args={[10]} />

      {/* <SkillOverview /> */}
      {/* <SkillsDescription skill={ORBITS[0]} /> */}
      {/* <TSLNode /> */}
      {/* <GlowAppIcon /> */}
      {/* <LightMesh color={[1.0, 0.26753, 0.13]} /> */}

      {/* <AdBoard>
        <SimpleAboutCard scale={[0.188, 0.21, 1]} position-z={0.09} />
      </AdBoard> */}

      {/* <SkillBalloonVisualizer /> */}

      {/* <Routing /> */}

      {/* <SkillCard
        skillText={"Kotlin\nMultiplatform"}
        textColor={"#000"}
        boxColor={"#45fe3f"}
      /> */}

      {/* <Background /> */}

      <AchievementCard color={"red"} title={"Projects"} achievement={"32+"} />
    </group>
  );
};
