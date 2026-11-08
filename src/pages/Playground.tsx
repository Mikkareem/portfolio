import SkillBalloonVisualizer from "../components/skills/SkillsBalloonsCluster";

export const Playground = (props: any) => {
  return (
    <group {...props} dispose={null}>
      {/* <SkillOverview /> */}
      {/* <TSLNode /> */}
      {/* <GlowAppIcon /> */}
      {/* <LightMesh color={[1.0, 0.26753, 0.13]} /> */}

      {/* <AdBoard>
        <SimpleAboutCard scale={[0.188, 0.21, 1]} position-z={0.09} />
      </AdBoard> */}

      <SkillBalloonVisualizer />

      {/* <SkillCard
        skillText={"Kotlin\nMultiplatform"}
        textColor={"#000"}
        boxColor={"#45fe3f"}
      /> */}

      {/* <Background /> */}
    </group>
  );
};
