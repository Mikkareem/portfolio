import { degToRad } from "three/src/math/MathUtils.js";
import type { BoundingBox } from "../../presentation/Types";
import { AchievementCard } from "../playground/AchievementCard";
import { useThree } from "@react-three/fiber";

const ACHIEVEMENTS = [
  {
    id: "projects",
    title: "Projects",
    achievement: "32+",
    color: "purple",
  },
  {
    id: "yoe",
    title: "Years of Experience",
    achievement: "7+ years",
    color: "blue",
  },
  {
    id: "articles",
    title: "Articles",
    achievement: "10+",
    color: "green",
  },
  {
    id: "skills",
    title: "Skills",
    achievement: "60+",
    color: "brown",
  },
];

export function AchievementSection({ bounds }: { bounds: BoundingBox }) {
  const viewport = useThree((t) => t.viewport);

  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 0,
  };

  // Threshold: desktop & wide landscape have sufficient width for 2x2 grid with gaps
  const isWide = viewport.width >= 13.5;

  if (isWide) {
    // 2x2 Grid Layout on all 4 quadrants
    const maxCardW = 6.2;
    const maxCardH = 3.3;

    const scaleX = (viewport.width * 0.44) / maxCardW;
    const scaleY = (viewport.height * 0.42) / maxCardH;
    const cardScale = Math.min(1.0, scaleX, scaleY);

    const posX = viewport.width * 0.25;
    const posY = viewport.height * 0.22;

    const items = [
      {
        ...ACHIEVEMENTS[0],
        position: [-posX, posY, 0] as [number, number, number],
        rotation: [0, degToRad(25), 0] as [number, number, number],
      },
      {
        ...ACHIEVEMENTS[1],
        position: [posX, posY, 0] as [number, number, number],
        rotation: [0, degToRad(-25), 0] as [number, number, number],
      },
      {
        ...ACHIEVEMENTS[2],
        position: [-posX, -posY, 0] as [number, number, number],
        rotation: [0, degToRad(25), 0] as [number, number, number],
      },
      {
        ...ACHIEVEMENTS[3],
        position: [posX, -posY, 0] as [number, number, number],
        rotation: [0, degToRad(-25), 0] as [number, number, number],
      },
    ];

    return (
      <group position={[middle.x, middle.y, middle.z]}>
        {items.map((item) => (
          <group
            key={item.id}
            position={item.position}
            rotation={item.rotation}
            scale={cardScale}
          >
            <AchievementCard
              title={item.title}
              achievement={item.achievement}
              color={item.color}
              minWidth={4.8}
            />
          </group>
        ))}
      </group>
    );
  }

  // Vertical layout in a single viewport page when width is restricted (Mobile / Tablet Portrait)
  const cardW = 6.0;
  const actualCardH = 3.3;
  const cardGap = 1.4;
  const totalBaseHeight = 4 * actualCardH + 3 * cardGap; // 14.4

  // Scale down so cards breathe comfortably inside viewport with ample padding
  const scaleX = (viewport.width * 0.78) / cardW;
  const scaleY = (viewport.height * 0.74) / totalBaseHeight;
  const cardScale = Math.min(0.68, scaleX, scaleY);

  const stepY = (actualCardH + cardGap) * cardScale;

  return (
    <group position={[middle.x, middle.y, middle.z]}>
      {ACHIEVEMENTS.map((item, index) => {
        const y = (1.5 - index) * stepY;
        const yAngle = degToRad((index % 2 == 0 ? -1 : 1) * 25);
        return (
          <group
            key={item.id}
            position={[0, y, 0]}
            rotation={[0, yAngle, 0]}
            scale={cardScale}
          >
            <AchievementCard
              title={item.title}
              achievement={item.achievement}
              color={item.color}
              minWidth={4.8}
            />
          </group>
        );
      })}
    </group>
  );
}
