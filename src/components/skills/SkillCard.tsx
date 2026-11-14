import { Text } from "@react-three/drei";
import { useState } from "react";
import type { ColorRepresentation } from "three";

type SkillCardProps = {
  skillText: string;
  boxColor: ColorRepresentation;
  textColor: ColorRepresentation;
  scale?: number;
};

const SkillCard = ({ skillText, boxColor, textColor, scale = 1 }: SkillCardProps) => {
  const [skillTextSize, setSkillTextSize] = useState({ w: 0, h: 0 });

  const cardWidth = 2 * PADDING + skillTextSize.w;
  const cardHeight = 2 * PADDING + skillTextSize.h;

  const meshZ = -DEPTH / 2.0 - 0.01;

  return (
    <group scale={scale}>
      <mesh position={[0, 0, meshZ]}>
        <boxGeometry args={[cardWidth, cardHeight, DEPTH]} />
        <meshStandardMaterial
          color={boxColor}
          roughness={0.1}
          metalness={0.34}
        />
      </mesh>
      <Text
        position={[-cardWidth / 2 + PADDING, cardHeight / 2 - PADDING, 0]}
        font="/fonts/GoogleSans-Regular-Variable.ttf"
        fontSize={0.3}
        fontWeight="extrabold"
        color={textColor}
        anchorX="left"
        textAlign="center"
        anchorY="top"
        onSync={(mesh) => {
          // textRenderInfo.blockBounds returns [minX, minY, maxX, maxY]
          const bounds = mesh.textRenderInfo?.blockBounds;
          if (bounds) {
            const measuredWidth = bounds[2] - bounds[0]; // maxY - minY
            const measuredHeight = bounds[3] - bounds[1]; // maxY - minY
            setSkillTextSize({ w: measuredWidth, h: measuredHeight });
          }
        }}
      >
        {skillText}
      </Text>
    </group>
  );
};

const PADDING = 0.1;
const DEPTH = 0.25;

export default SkillCard;
