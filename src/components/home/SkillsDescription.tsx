import { Text } from "@react-three/drei";
import AdBoard from "../playground/AdBoard";
import { useRef, useState } from "react";

export const SkillsDescription = ({ skill }: any) => {
  return (
    <group>
      <AdBoard scaleFactorX={0.06} scaleFactorY={0.086}>
        <Card skill={skill} />
      </AdBoard>
    </group>
  );
};

const GAP = 0.45; // Vertical spacing between title and description
const PADDING = 0.2; // Padding around the text (set to 0 for exact tight fit)

const Card = ({ skill }: any) => {
  const titleTextRef = useRef<any>(null);
  const descTextRef = useRef<any>(null);

  const [titleTextSize, setTitleTextSize] = useState({ w: 0, h: 0 });
  const [descTextSize, setDescTextSize] = useState({ w: 0, h: 0 });

  const hasDesc = descTextSize.h > 0 && descTextSize.w > 0;
  const gap = hasDesc && titleTextSize.h > 0 ? GAP : 0;

  const contentWidth = Math.max(titleTextSize.w, descTextSize.w);
  const contentHeight = titleTextSize.h + gap + descTextSize.h;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  return (
    <group>
      {cardWidth > 0 && cardHeight > 0 && (
        <mesh position={[cardWidth / 2.0, -cardHeight / 2.0, -0.001]}>
          <planeGeometry args={[cardWidth, cardHeight]} />
          <meshBasicMaterial color={"red"} />
        </mesh>
      )}

      <Text
        ref={titleTextRef}
        font="/fonts/GoogleSans-Regular-Variable.ttf"
        fontSize={0.5}
        color="#fff"
        anchorX={"left"}
        anchorY={"top"}
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
        {skill.name}
      </Text>

      <Text
        ref={descTextRef}
        font="/fonts/GoogleSans-Regular-Variable.ttf"
        fontSize={0.3}
        color="#fff"
        maxWidth={5}
        anchorX={"left"}
        anchorY={"top"}
        position={[PADDING, -PADDING - titleTextSize.h - gap, 0]}
        onSync={(mesh) => {
          const bounds = mesh.textRenderInfo?.blockBounds;
          if (bounds) {
            const measuredWidth = Math.abs(bounds[2] - bounds[0]);
            const measuredHeight = Math.abs(bounds[3] - bounds[1]);
            setDescTextSize({ w: measuredWidth, h: measuredHeight });
          }
        }}
      >
        {skill.description}
      </Text>
    </group>
  );
};
