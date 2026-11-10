import { degToRad } from "three/src/math/MathUtils.js";
import type { BoundingBox } from "../../presentation/Types";
import { AchievementCard } from "../playground/AchievementCard";
import { useThree } from "@react-three/fiber";

export function AchievementSection({ bounds }: { bounds: BoundingBox }) {
  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 0,
  };

  return (
    <group position={[middle.x, middle.y, middle.z]}>
      <ProjectAchievementCard />
      <YOEAchievementCard />
      <ArticlesAchievementCard />
      <SkillsAchievementCard />
    </group>
  );
}

const ProjectAchievementCard = () => {
  const viewport = useThree((t) => t.viewport);

  const position = {
    x: -viewport.width / 4.0,
    y: viewport.height * 0.5 * 0.45,
    z: 0,
  };

  const rotation = {
    x: 0,
    y: degToRad(35),
    z: 0,
  };

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <AchievementCard
        title={"Projects"}
        achievement={"32+"}
        color={"purple"}
      />
    </group>
  );
};

const YOEAchievementCard = () => {
  const viewport = useThree((t) => t.viewport);

  const position = {
    x: viewport.width / 4.0,
    y: viewport.height * 0.5 * 0.45,
    z: 0,
  };

  const rotation = {
    x: 0,
    y: degToRad(-35),
    z: 0,
  };

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <AchievementCard
        title={"Years of Experience"}
        achievement={"7+ years"}
        color={"blue"}
      />
    </group>
  );
};

const ArticlesAchievementCard = () => {
  const viewport = useThree((t) => t.viewport);

  const position = {
    x: -viewport.width / 4.0,
    y: -viewport.height * 0.5 * 0.45,
    z: 0,
  };

  const rotation = {
    x: 0,
    y: degToRad(35),
    z: 0,
  };

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <AchievementCard title={"Articles"} achievement={"10+"} color={"green"} />
    </group>
  );
};

const SkillsAchievementCard = () => {
  const viewport = useThree((t) => t.viewport);

  const position = {
    x: viewport.width / 4.0,
    y: -viewport.height * 0.5 * 0.45,
    z: 0,
  };

  const rotation = {
    x: 0,
    y: degToRad(-35),
    z: 0,
  };

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <AchievementCard title={"Skills"} achievement={"60+"} color={"brown"} />
    </group>
  );
};
