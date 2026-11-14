import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { usePageScroll } from "../../presentation/usePageScroll";
import { UI, Fonts } from "../../presentation/Core";
import Background from "./Background";
import { MajorProjectPreviewCard } from "./MajorProjectPreviewCard";
import { FloatingActionButton } from "../home/FloatingActionButton";
import type { ProjectDetail } from "../home/projects-data";

export interface ProjectsPageViewProps {
  projects: ProjectDetail[];
  categoryTitle: string;
  categoryDescription?: string;
  accentColor?: string;
  glowColor?: string;
  landscapeScale?: number;
  portraitScale?: number;
  onGoHome?: () => void;
}

const PALETTE = [
  "#4f46e5",
  "#0284c7",
  "#059669",
  "#db2777",
  "#8b5cf6",
  "#ea580c",
  "#06b6d4",
  "#10b981",
];

export function ProjectsBackground({
  ref,
  count = 5,
  color = "black",
}: {
  ref: RefObject<any>;
  count?: number;
  color?: string;
}) {
  const camera = useThree((t) => t.camera);
  const viewport = useThree((t) => t.viewport);

  const { width: bgWidth, height: bgHeight } = viewport.getCurrentViewport(
    camera,
    [0, 0, UI.BG_DEPTH],
  );

  return (
    <group ref={ref}>
      {Array.from({ length: Math.ceil(count) }, (_, i) => (
        <Background
          key={i}
          color={color}
          y={-i * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
      ))}
    </group>
  );
}

// ─── Visibility Culling Wrapper to Boost FPS ────────────────
// Automatically hides entire off-screen sections (skipping all draw calls,
// vertex/fragment shaders, and text updates for elements outside the viewport).
function CullableSection({
  y,
  height,
  contentRef,
  children,
}: {
  y: number;
  height: number;
  contentRef: React.RefObject<any>;
  children: React.ReactNode;
}) {
  const groupRef = useRef<any>(null);
  const viewport = useThree((t) => t.viewport);

  useFrame(() => {
    if (groupRef.current && contentRef.current) {
      const currentContentY = contentRef.current.position.y;
      const worldY = y + currentContentY;
      // Generous buffer so section becomes visible slightly before entering the screen
      const isVisible = Math.abs(worldY) < viewport.height * 0.75 + height / 2;
      if (groupRef.current.visible !== isVisible) {
        groupRef.current.visible = isVisible;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, y, 0]}>
      {children}
    </group>
  );
}

export function ProjectsPageView({
  projects,
  categoryTitle,
  categoryDescription = "Production platforms, multiplatform systems & enterprise architectures",
  accentColor = "#6366f1",
  glowColor = "#818cf8",
  landscapeScale: propLandscapeScale,
  portraitScale: propPortraitScale,
  onGoHome,
}: ProjectsPageViewProps) {
  const viewport = useThree((t) => t.viewport);
  const contentRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  const isLandscape = viewport.width >= viewport.height;

  // Actual physical dimensions of MajorProjectPreviewCard (outer rounded box is 7.40 × 7.20)
  const cardWidth = 7.4;
  const cardHeight = 7.2;

  // ─── 1. Title + Description Section Metrics ─────────────────
  const titleY = 0;
  const titleBottom = isLandscape ? -1.8 : -1.5;
  const gapAfterTitle = isLandscape ? 2.5 : 2.0;

  // ─── 2. Project Cards Section Metrics ───────────────────────
  // Landscape: 2 in a row | Portrait: 1 in a row
  const itemsPerRow = isLandscape ? 2 : 1;
  const numRows = Math.ceil(projects.length / itemsPerRow);

  // Horizontal gap between the 2 cards in landscape mode
  const gapX = isLandscape
    ? Math.max(1.0, Math.min(2.0, viewport.width * 0.055))
    : 0;

  // Responsive Card Scaling
  const maxScaleLandscape = (viewport.width - 1.6 - gapX) / (cardWidth * 2);
  const landscapeScale =
    propLandscapeScale ??
    Math.min(1.10, Math.max(0.70, maxScaleLandscape));

  const maxScalePortrait = (viewport.width - 1.0) / cardWidth;
  const portraitScale =
    propPortraitScale ??
    Math.min(0.85, Math.max(0.55, maxScalePortrait));

  const activeScale = isLandscape ? landscapeScale : portraitScale;
  const scaledW = cardWidth * activeScale;
  const scaledH = cardHeight * activeScale;

  const posX = scaledW / 2 + gapX / 2;

  const rowGap = isLandscape
    ? Math.max(1.0, viewport.height * 0.1)
    : Math.max(0.8, viewport.height * 0.08);
  const rowHeight = scaledH + rowGap;

  const cardsStartY = titleBottom - gapAfterTitle - scaledH / 2;

  // ─── 3. End of Projects Section Metrics ─────────────────────
  const lastRowY =
    numRows > 0 ? cardsStartY - (numRows - 1) * rowHeight : cardsStartY;
  const lastCardBottom = lastRowY - scaledH / 2;
  const gapBeforeEnd = isLandscape ? 2.8 : 2.2;
  const endSectionY = lastCardBottom - gapBeforeEnd - 1.2;

  // ─── 4. Dynamic Page Count Calculation Based on Content Size ─
  // Total scroll travel needed to move from titleY (0) to endSectionY:
  const totalTravelDistance = -endSectionY;
  const calculatedPageCount = useMemo(() => {
    if (viewport.height <= 0) return 2;
    const rawPages = 1 + totalTravelDistance / viewport.height;
    return Math.max(1, Math.round(rawPages * 10) / 10);
  }, [totalTravelDistance, viewport.height]);

  usePageScroll({
    count: calculatedPageCount,
    contentRef,
    backgroundRef: bgRef,
  });

  return (
    <>
      <ProjectsBackground ref={bgRef} count={calculatedPageCount} />
      <group ref={contentRef}>
        {/* ── SECTION 1: Title + Description (Cullable) ──────── */}
        <CullableSection y={titleY} height={3.5} contentRef={contentRef}>
          {/* Eyebrow Badge */}
          <group position={[0, isLandscape ? 0.95 : 0.8, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.18 : 0.14}
              color={accentColor}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.14}
            >
              {`${projects.length} SELECTED WORKS`}
            </Text>
          </group>

          {/* Big Title */}
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={isLandscape ? 1.05 : 0.76}
            fontWeight="bold"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#ffffff"
            position={[0, isLandscape ? 0.35 : 0.3, 0]}
          >
            {categoryTitle}
          </Text>

          {/* Little Description */}
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={isLandscape ? 0.26 : 0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            maxWidth={isLandscape ? 13 : 7.2}
            textAlign="center"
            lineHeight={1.4}
            position={[0, isLandscape ? -0.4 : -0.32, 0]}
          >
            {categoryDescription}
          </Text>

          {/* Subtle Scroll Cue */}
          <group position={[0, isLandscape ? -1.3 : -1.05, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.18 : 0.15}
              color="#64748b"
              anchorX="center"
              anchorY="middle"
            >
              Scroll to explore ↓
            </Text>
          </group>
        </CullableSection>

        {/* ── SECTION 2: Project Cards (Cullable per Row) ───── */}
        {Array.from({ length: numRows }, (_, rowIndex) => {
          const rowY = cardsStartY - rowIndex * rowHeight;

          if (isLandscape) {
            // Landscape: 2 items in row
            const idx1 = rowIndex * 2;
            const idx2 = rowIndex * 2 + 1;
            const item1 = projects[idx1];
            const item2 = projects[idx2];

            const color1 =
              item1.color ?? PALETTE[idx1 % PALETTE.length];
            const color2 =
              item2?.color ?? PALETTE[idx2 % PALETTE.length];

            return (
              <CullableSection
                key={rowIndex}
                y={rowY}
                height={scaledH}
                contentRef={contentRef}
              >
                {item2 ? (
                  <>
                    <group position={[-posX, 0, 0]} scale={activeScale}>
                      <MajorProjectPreviewCard
                        project={item1}
                        color={color1}
                      />
                    </group>
                    <group position={[posX, 0, 0]} scale={activeScale}>
                      <MajorProjectPreviewCard
                        project={item2}
                        color={color2}
                      />
                    </group>
                  </>
                ) : (
                  <group position={[0, 0, 0]} scale={activeScale}>
                    <MajorProjectPreviewCard
                      project={item1}
                      color={color1}
                    />
                  </group>
                )}
              </CullableSection>
            );
          }

          // Portrait: 1 item in row
          const item = projects[rowIndex];
          const color = item.color ?? PALETTE[rowIndex % PALETTE.length];

          return (
            <CullableSection
              key={rowIndex}
              y={rowY}
              height={scaledH}
              contentRef={contentRef}
            >
              <group position={[0, 0, 0]} scale={activeScale}>
                <MajorProjectPreviewCard project={item} color={color} />
              </group>
            </CullableSection>
          );
        })}

        {/* ── SECTION 3: End of Projects Section (Cullable) ─── */}
        <CullableSection
          y={endSectionY}
          height={4.0}
          contentRef={contentRef}
        >
          {/* Header */}
          <group position={[0, 1.0, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.52 : 0.42}
              fontWeight="bold"
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#ffffff"
            >
              You've Reached the End
            </Text>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.22 : 0.17}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.45, 0]}
            >
              {`Explored all ${projects.length} ${categoryTitle.toLowerCase()}`}
            </Text>
          </group>

          {/* Prominent Go To Home Button */}
          <FloatingActionButton
            label="Go To Home"
            type="home"
            textAlign="center"
            position={[0, -0.6, 0.4]}
            accentColor={accentColor}
            glowColor={glowColor}
            baseWidth={3.4}
            baseHeight={0.96}
            scale={isLandscape ? 1.2 : 1.05}
            floatSpeed={1.8}
            floatRotation={0.06}
            floatIntensity={0.35}
            floatingRange={[-0.04, 0.04]}
            isExternal={false}
            onClick={() => {
              console.log("Go To Home (placeholder)");
              onGoHome?.();
            }}
          />
        </CullableSection>
      </group>
    </>
  );
}

export default ProjectsPageView;
