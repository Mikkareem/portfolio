import { extend, type ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { Text } from "@react-three/drei";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

const GAP = 0.25; // Vertical spacing between title and description
const PADDING = 0.3; // Padding around the text (set to 0 for exact tight fit)

export function AchievementCard({ title, achievement, color }: any) {
  const titleTextRef = useRef<any>(null);
  const achievementTextRef = useRef<any>(null);

  const [titleTextSize, setTitleTextSize] = useState({ w: 0, h: 0 });
  const [achievementTextSize, setAchievementTextSize] = useState({
    w: 0,
    h: 0,
  });

  const hasDesc = achievementTextSize.h > 0 && achievementTextSize.w > 0;
  const gap = hasDesc && titleTextSize.h > 0 ? GAP : 0;

  const contentWidth = Math.max(titleTextSize.w, achievementTextSize.w);
  const contentHeight = titleTextSize.h + gap + achievementTextSize.h;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  return (
    <group>
      <mesh position={[0, 0, -(1.0 / 2.0 + 0.001)]}>
        {/* width, height, depth, segments, radius*/}
        {/* @ts-expect-error */}
        <roundedBoxGeometry
          args={[cardWidth + 2 * PADDING, cardHeight + 2 * PADDING, 1, 2, 0.6]}
        />
        ;
        <meshStandardMaterial
          color={color} //{"#f283b6"}
          metalness={0.34}
          roughness={0.23}
        />
      </mesh>

      <group position={[-cardWidth / 2.0, cardHeight / 2.0, 0]}>
        <Text
          ref={titleTextRef}
          font="/fonts/GoogleSans-Regular-Variable.ttf"
          fontSize={0.5}
          color="#fff"
          anchorX={"left"}
          anchorY={"top"}
          outlineWidth={0.02}
          position={[PADDING, -PADDING, 0]}
          onSync={(mesh) => {
            const bounds = mesh.textRenderInfo?.blockBounds;
            if (bounds) {
              const measuredWidth = Math.abs(bounds[2] - bounds[0]);
              const measuredHeight = Math.abs(bounds[3] - bounds[1]);
              setTitleTextSize({ w: measuredWidth, h: measuredHeight });
            }
          }}
        >
          {title}
        </Text>

        <Text
          ref={achievementTextRef}
          font="/fonts/GoogleSans-Regular-Variable.ttf"
          fontSize={1.3}
          color="#fff"
          maxWidth={5}
          anchorX={"left"}
          anchorY={"top"}
          outlineWidth={0.02}
          position={[PADDING, -PADDING - titleTextSize.h - gap, 0]}
          onSync={(mesh) => {
            const bounds = mesh.textRenderInfo?.blockBounds;
            if (bounds) {
              const measuredWidth = Math.abs(bounds[2] - bounds[0]);
              const measuredHeight = Math.abs(bounds[3] - bounds[1]);
              setAchievementTextSize({ w: measuredWidth, h: measuredHeight });
            }
          }}
        >
          {achievement}
        </Text>
      </group>
    </group>
  );
}
