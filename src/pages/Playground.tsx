import { ImageCard } from "../components/playground/ImageCard";
import { MarkdownTest } from "../components/playground/MarkdownTest";
import { Routing } from "../components/playground/Routing";

export const Playground = (props: any) => {
  return (
    <group {...props} dispose={null}>
      {/* <axesHelper args={[10]} /> */}

      {/* <SkillOverviewSection /> */}
      {/* <SkillsDescription skill={ORBITS[1]} /> */}
      {/* <TSLNode /> */}
      {/* <GlowAppIcon /> */}
      {/* <LightMesh color={[1.0, 0.26753, 0.13]} /> */}

      {/* <AdBoard>
        <SimpleAboutCard scale={[0.188, 0.21, 1]} position-z={0.09} />
      </AdBoard> */}

      {/* <SkillBalloonVisualizer /> */}

      {/* <Routing /> */}

      {/* <ImageCard /> */}

      <MarkdownTest />

      {/* <group scale={2}>
        <FlowRowChips
          rowGap={0.12}
          colGap={0.15}
          listOfStrings={["Red Bus", "Book My Show", "Google", "Helverica"]}
        />
      </group> */}

      {/* <Background /> */}

      {/* <AchievementCard color={"red"} title={"Projects"} achievement={"32+"} /> */}
    </group>
  );
};
