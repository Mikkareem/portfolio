import { Text } from "@react-three/drei";
import AdBoard from "../playground/AdBoard";
import { useMemo, useRef, useState } from "react";

export const SkillsDescription = ({ skill }: any) => {
  return (
    <group>
      <AdBoard scaleFactorX={0} scaleFactorY={0}>
        <Card skill={skill} />
      </AdBoard>
    </group>
  );
};

const Card = ({ skill }: any) => {
  const titleTextRef = useRef<any>(null);
  const descTextRef = useRef<any>(null);

  const [titleTextSize, setTitleTextSize] = useState({ w: 0, h: 0 });
  const [descTextSize, setDescTextSize] = useState({ w: 0, h: 0 });

  const cardWidth = Math.max(titleTextSize.w, descTextSize.w);
  const cardHeight = titleTextSize.h + descTextSize.h;

  return (
    <group>
      <mesh position={[cardWidth / 2.0, -cardHeight / 2.0, -0.001]}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshBasicMaterial color={"red"} />
      </mesh>

      <Text
        ref={titleTextRef}
        font="/fonts/GoogleSans-Regular-Variable.ttf"
        fontSize={0.5}
        color="#fff"
        anchorX={"left"}
        anchorY={"top"}
        onSync={(mesh) => {
          const bounds = mesh.textRenderInfo?.blockBounds;
          if (bounds) {
            const measuredWidth = Math.abs(bounds[2] - bounds[0]); // maxY - minY
            const measuredHeight = Math.abs(bounds[3] - bounds[1]); // maxY - minY

            console.log("Bounds", bounds);
            console.log("Measured", measuredWidth, measuredHeight);
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
        position={[0, titleTextSize.h, 0]}
        onSync={(mesh) => {
          const bounds = mesh.textRenderInfo?.blockBounds;
          if (bounds) {
            const measuredWidth = Math.abs(bounds[2] - bounds[0]); // maxY - minY
            const measuredHeight = Math.abs(bounds[3] - bounds[1]); // maxY - minY

            console.log("Desc Bounds", bounds);
            console.log("Desc Measured", measuredWidth, measuredHeight);
            setDescTextSize({ w: measuredWidth, h: measuredHeight });
          }
        }}
      >
        {skill.description}
      </Text>
    </group>
  );
};
