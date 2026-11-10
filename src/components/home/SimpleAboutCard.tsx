import { useState } from "react";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Fonts } from "../../presentation/Core";

export const SimpleAboutCard = (props: any) => {
  const viewport = useThree((t) => t.viewport);

  // Card dimensions (acting as max-width + padding bounds)
  const padding = 0.23;
  const gap = 0.4;
  const maxWidth = Math.min(viewport.width / 3, 10) - 2 * padding;

  const [titleSize, setTitleSize] = useState({ w: 0, h: 0 });
  const [paragraphSize, setParagraphSize] = useState({ w: 0, h: 0 });

  const cardWidth = 2 * padding + Math.max(titleSize.w, paragraphSize.w);
  const cardHeight = 2 * padding + titleSize.h + paragraphSize.h + gap;

  const [hovered, setHovered] = useState(false);

  return (
    <group {...props}>
      {/* 1. Yellow Background Card (replaces bg-amber-400 with p-8) */}
      <mesh
        position={[0, 0, -0.01]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshStandardMaterial
          color={hovered ? "#fbbf24" : "#ae45f2"}
          roughness={0.8}
        />
      </mesh>

      {/* 2. Content Group (positioned inside the card with padding offset) */}
      <group position={[-cardWidth / 2 + padding, cardHeight / 2 - padding, 0]}>
        {/* Title (replaces h2 text-6xl) */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.4}
          font={Fonts.bodyRegular.name}
          maxWidth={maxWidth}
          color={hovered ? "#111827" : "#ffffff"} // dark text for contrast
          anchorX="left"
          anchorY="top"
          onSync={(mesh) => {
            // textRenderInfo.blockBounds returns [minX, minY, maxX, maxY]
            const bounds = mesh.textRenderInfo?.blockBounds;
            if (bounds) {
              const measuredWidth = bounds[2] - bounds[0]; // maxY - minY
              const measuredHeight = bounds[3] - bounds[1]; // maxY - minY
              console.log("Title", measuredWidth, measuredHeight);
              setTitleSize({ w: measuredWidth, h: measuredHeight });
            }
          }}
        >
          About Me (Simple)
        </Text>

        {/* Paragraph (replaces p text-2xl with multiline constraints) */}
        <Text
          position={[0, -gap - 0.4, 0]} // Offset vertically below the title (simulating gap)
          fontSize={0.22}
          font={Fonts.bodyRegular.name}
          maxWidth={maxWidth} // Keeps text within padding bounds
          color={hovered ? "#111827" : "#ffffff"}
          anchorX="left"
          anchorY="top"
          onSync={(mesh) => {
            // textRenderInfo.blockBounds returns [minX, minY, maxX, maxY]
            const bounds = mesh.textRenderInfo?.blockBounds;
            if (bounds) {
              const measuredWidth = bounds[2] - bounds[0]; // maxY - minY
              const measuredHeight = bounds[3] - bounds[1]; // maxY - minY
              console.log("Paragraph", measuredWidth, measuredHeight);
              setParagraphSize({ w: measuredWidth, h: measuredHeight });
            }
          }}
        >
          I build modern software from mobile to cloud. My work spans Android
          and Kotlin Multiplatform applications, scalable backend services, and
          cloud-native infrastructure, with a strong focus on clean
          architecture, reliability, performance, and developer experience. I
          enjoy designing systems that are as maintainable as they are scalable.
        </Text>
      </group>
    </group>
  );
};
