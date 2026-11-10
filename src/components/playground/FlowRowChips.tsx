import { useMemo } from "react";
import { Text, RoundedBox } from "@react-three/drei";

export function FlowRowChips({
  topLeftPos = [0, 0, 0],
  listOfStrings = [],
  maxWidth = 5,
  rowGap = 0.3,
  colGap = 0.2,
  fontSize = 0.15,
  paddingX = 0.2,
  chipHeight = 0.35,
}: {
  topLeftPos?: number[];
  listOfStrings: string[];
  maxWidth?: number;
  rowGap?: number;
  colGap?: number;
  fontSize?: number;
  paddingX?: number;
  chipHeight?: number;
}) {
  // Compute layout positions for each chip
  const layout = useMemo(() => {
    let currentX = 0;
    let currentY = 0;
    const [startX, startY, startZ] = topLeftPos;

    return listOfStrings.map((text: string) => {
      // Estimate width based on character count and font size
      const estimatedWidth = text.length * (fontSize * 0.6) + paddingX * 2;

      // Check if chip exceeds max width and needs to wrap to the next row
      if (currentX > 0 && currentX + estimatedWidth > maxWidth) {
        currentX = 0;
        currentY -= chipHeight + rowGap;
      }

      const position = [
        startX + currentX + estimatedWidth / 2,
        startY + currentY - chipHeight / 2,
        startZ,
      ];

      const chipData = {
        text,
        position,
        width: estimatedWidth,
      };

      // Advance X for the next chip
      currentX += estimatedWidth + colGap;

      return chipData;
    });
  }, [
    listOfStrings,
    maxWidth,
    rowGap,
    colGap,
    fontSize,
    paddingX,
    chipHeight,
    topLeftPos,
  ]);

  return (
    <group>
      {layout.map((chip, index) => (
        <group
          key={index}
          position={[chip.position[0], chip.position[1], chip.position[2]]}
        >
          {/* Chip Background */}
          <RoundedBox
            args={[chip.width, chipHeight, 0.2]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial color="#3b82f6" roughness={0.3} />
          </RoundedBox>

          {/* Chip Label */}
          <Text
            position={[0, 0, 0.11]}
            fontSize={fontSize}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {chip.text}
          </Text>
        </group>
      ))}
    </group>
  );
}
