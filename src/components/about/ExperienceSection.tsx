import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { type ColorRepresentation } from "three";
import { ExperienceCard, type Experience } from "./ExperienceCard";
import { ExperiencePipe, getExperiencePipeLayout } from "./ExperiencePipe";
import { DEFAULT_EXPERIENCES } from "./data";

export type ExperienceSectionProps = {
  experiences?: Experience[];
  startSide?: "left" | "right";
  pipeColor?: ColorRepresentation;
  cardColor?: string;
  cardColors?: string[];
  cardScale?: number;
  showConnectors?: boolean;
};

const DEFAULT_CARD_COLORS = [
  "#1e3a8a", // deep blue
  "#312e81", // deep indigo
  "#064e3b", // deep emerald
  "#4c1d95", // deep violet
];

export function ExperienceSection({
  experiences = DEFAULT_EXPERIENCES,
  startSide = "left",
  pipeColor = "#10b981",
  cardColor,
  cardColors = DEFAULT_CARD_COLORS,
  cardScale,
  showConnectors = true,
}: ExperienceSectionProps) {
  const viewport = useThree((state) => state.viewport);
  const count = experiences.length;

  const isMobile = viewport.width < 9;
  const isTablet = viewport.width >= 9 && viewport.width < 14;

  const responsiveCardScale =
    cardScale ??
    (isMobile
      ? Math.min(0.65, Math.max(0.46, viewport.width / 13))
      : isTablet
        ? 0.78
        : 0.88);

  const estimatedCardWidth = 6.7 * responsiveCardScale;

  const { dots, xDist } = useMemo(() => {
    return getExperiencePipeLayout({
      count,
      startSide,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [count, startSide, viewport.width, viewport.height]);

  return (
    <group>
      {/* ── 3D Connected Experience Pipe with Viewport Dots ─────────────── */}
      <ExperiencePipe
        count={count}
        startSide={startSide}
        pipeColor={pipeColor}
        showConnectorPins={showConnectors}
      />

      {/* ── Experience Cards (1 per viewport, opposite to the pipe) ────── */}
      {experiences.map((exp, index) => {
        const dot = dots[index];
        if (!dot) return null;

        const sideSign = dot.side === "left" ? -1 : 1;
        const cardTargetSide = -sideSign; // Opposite side of pipe

        // Calculate card center X to sit comfortably on the opposite side
        const cardCenterX =
          cardTargetSide *
          Math.min(
            viewport.width / 2 - estimatedCardWidth / 2 - 0.35,
            Math.max(xDist * 0.9, viewport.width * 0.25)
          );

        const yCenter = -index * viewport.height;
        const color = cardColor ?? cardColors[index % cardColors.length];

        // Connector wire/bridge endpoints (from pin tip to card edge)
        const pinTipX = dot.dotPosition.x + -cardTargetSide * 0.8;
        const cardEdgeX = cardCenterX - cardTargetSide * (estimatedCardWidth / 2);
        const wireCenterX = (pinTipX + cardEdgeX) / 2;
        const wireLength = Math.abs(cardEdgeX - pinTipX);

        return (
          <group key={index}>
            {/* Optional connecting bridge wire from Dot to Card */}
            {showConnectors && wireLength > 0.2 && (
              <mesh position={[wireCenterX, yCenter, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, wireLength, 12]} />
                <meshStandardMaterial
                  color={pipeColor}
                  emissive={pipeColor}
                  emissiveIntensity={0.4}
                  roughness={0.3}
                  metalness={0.8}
                />
              </mesh>
            )}

            {/* Experience Card */}
            <ExperienceCard
              exp={exp}
              color={color}
              scale={responsiveCardScale}
              position={[cardCenterX, yCenter, 0]}
            />
          </group>
        );
      })}
    </group>
  );
}

export default ExperienceSection;
