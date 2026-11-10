import { Text } from "@react-three/drei";
import AdBoard from "../playground/AdBoard";
import { useMemo, useRef, useState } from "react";
import { FlowRowChips } from "../playground/FlowRowChips";

export const SkillsDescription = ({ skill }: any) => {
  return (
    <group>
      <AdBoard scaleFactorX={0.06} scaleFactorY={0.086} color={"brown"}>
        <Card skill={skill} />
      </AdBoard>
    </group>
  );
};

const GAP = 0.45; // Vertical spacing between sections
const PADDING = 0.2; // Padding around the content
const MAX_WIDTH = 5;

const Card = ({ skill }: any) => {
  const titleTextRef = useRef<any>(null);
  const descTextRef = useRef<any>(null);

  const [titleTextSize, setTitleTextSize] = useState({ w: 0, h: 0 });
  const [descTextSize, setDescTextSize] = useState({ w: 0, h: 0 });

  const chips: string[] = skill.chips || [
    "React",
    "Google",
    "Facebook",
    "Remoo",
    "KMP/CPP",
  ];

  // Calculate chips dimensions using FlowRowChips' layout rules
  const chipsLayout = useMemo(() => {
    let currentX = 0;
    let currentY = 0;
    let maxW = 0;
    const fontSize = 0.15;
    const paddingX = 0.2;
    const chipHeight = 0.35;
    const rowGap = 0.3;
    const colGap = 0.2;

    chips.forEach((text: string) => {
      const estimatedWidth = text.length * (fontSize * 0.6) + paddingX * 2;
      if (currentX > 0 && currentX + estimatedWidth > MAX_WIDTH) {
        maxW = Math.max(maxW, currentX - colGap);
        currentX = 0;
        currentY -= chipHeight + rowGap;
      }
      currentX += estimatedWidth + colGap;
    });

    maxW = Math.max(maxW, currentX > 0 ? currentX - colGap : 0);
    const totalH = Math.abs(currentY) + (chips.length > 0 ? chipHeight : 0);

    return { width: maxW, height: totalH };
  }, [chips]);

  const hasDesc = descTextSize.h > 0 && descTextSize.w > 0;
  const descGap = hasDesc && titleTextSize.h > 0 ? GAP : 0;
  const chipsGap =
    (titleTextSize.h > 0 || hasDesc) && chipsLayout.height > 0 ? GAP : 0;

  const contentWidth = Math.max(
    titleTextSize.w,
    descTextSize.w,
    chipsLayout.width,
  );
  const contentHeight =
    titleTextSize.h + descGap + descTextSize.h + chipsGap + chipsLayout.height;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  return (
    <group>
      {/* 1. Red background card centered at origin */}
      {cardWidth > 0 && cardHeight > 0 && (
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[cardWidth, cardHeight]} />
          <meshStandardMaterial color={"brown"} metalness={0.45} />
        </mesh>
      )}

      {/* 2. Content Group positioned inside the card with padding offset */}
      <group
        position={[-cardWidth / 2.0 + PADDING, cardHeight / 2.0 - PADDING, 0]}
      >
        <Text
          ref={titleTextRef}
          font="/fonts/GoogleSans-Regular-Variable.ttf"
          fontSize={0.5}
          color="#fff"
          anchorX={"left"}
          anchorY={"top"}
          position={[0, 0, 0]}
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
          maxWidth={MAX_WIDTH}
          anchorX={"left"}
          anchorY={"top"}
          position={[0, -titleTextSize.h - descGap, 0]}
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

        <group
          position={[
            0,
            -titleTextSize.h - descGap - descTextSize.h - chipsGap,
            0.1,
          ]}
        >
          <FlowRowChips
            maxWidth={MAX_WIDTH}
            listOfStrings={chips}
            rowGap={0.2}
          />
        </group>
      </group>
    </group>
  );
};
