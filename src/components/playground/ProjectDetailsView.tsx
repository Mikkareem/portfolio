import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { usePageScroll } from "../../presentation/usePageScroll";
import { Fonts } from "../../presentation/Core";
import { ProjectsBackground } from "./ProjectsPageView";
import { ImageCarousel } from "./ImageCarousel";
import { VideoPlayer } from "./VideoPlayer";
import { GifPlayer } from "./GifPlayer";
import { DescriptionCard } from "./DescriptionCard";
import {
  TechnologiesUsedCard,
  DEFAULT_TECHNOLOGIES_DATA,
  type TechnologiesUsedData,
} from "./TechnologiesUsedCard";
import { FloatingActionButton } from "../home/FloatingActionButton";
import type { ProjectDetail } from "../home/projects-data";

export interface ProjectDetailsViewProps {
  project: ProjectDetail;
  categoryLabel?: string;
  accentColor?: string;
  glowColor?: string;
  cardColor?: string;
  onGoHome?: () => void;
  landscapeScale?: number;
  portraitScale?: number;
}

// ─── Vibrant Palette for Cards & Elements ───────────────────
const CARD_PALETTE = [
  "#4f46e5", // Vibrant Indigo
  "#0284c7", // Bright Ocean Blue
  "#059669", // Vibrant Emerald Green
  "#db2777", // Electric Rose / Pink
  "#7c3aed", // Vivid Purple
  "#ea580c", // Vibrant Warm Orange
  "#0891b2", // Cyan / Teal
  "#e11d48", // Crimson Red
  "#2563eb", // Royal Blue
  "#10b981", // Bright Mint
];

const DESC_PALETTE = [
  "#232066", // Deep Radiant Indigo
  "#0b3558", // Deep Radiant Azure
  "#074332", // Deep Radiant Emerald
  "#4a0e2e", // Deep Radiant Wine / Rose
  "#341459", // Deep Radiant Violet
  "#4a2206", // Deep Radiant Amber
];

const CHIP_PALETTE = [
  "#4f46e5",
  "#0284c7",
  "#059669",
  "#db2777",
  "#7c3aed",
  "#ea580c",
  "#0891b2",
  "#e11d48",
];

// ─── Visibility Culling Wrapper for 60+ FPS Performance ────
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
      const isVisible = Math.abs(worldY) < viewport.height * 0.95 + height / 2;
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

// ─── Centered Responsive Tag Chips with Vibrant Colors ──────
function CenteredTags({
  tags,
  maxWidth = 7.5,
  isLandscape = false,
}: {
  tags: string[];
  maxWidth?: number;
  accentColor?: string;
  isLandscape?: boolean;
}) {
  const fontSize = isLandscape ? 0.2 : 0.17;
  const paddingX = isLandscape ? 0.26 : 0.22;
  const colGap = isLandscape ? 0.2 : 0.16;
  const chipHeight = isLandscape ? 0.42 : 0.36;
  const rowGap = isLandscape ? 0.18 : 0.14;

  const rows = useMemo(() => {
    const computedRows: { text: string; width: number; globalIdx: number }[][] =
      [];
    let currentRow: { text: string; width: number; globalIdx: number }[] = [];
    let currentRowWidth = 0;

    tags.forEach((tag, globalIdx) => {
      const w = tag.length * (fontSize * 0.58) + paddingX * 2;
      if (currentRow.length > 0 && currentRowWidth + colGap + w > maxWidth) {
        computedRows.push(currentRow);
        currentRow = [{ text: tag, width: w, globalIdx }];
        currentRowWidth = w;
      } else {
        if (currentRow.length > 0) currentRowWidth += colGap;
        currentRow.push({ text: tag, width: w, globalIdx });
        currentRowWidth += w;
      }
    });
    if (currentRow.length > 0) computedRows.push(currentRow);
    return computedRows;
  }, [tags, maxWidth, fontSize, paddingX, colGap]);

  return (
    <group>
      {rows.map((row, rIdx) => {
        const rowW =
          row.reduce((sum, item) => sum + item.width, 0) +
          (row.length - 1) * colGap;
        let startX = -rowW / 2;
        const yPos = -rIdx * (chipHeight + rowGap);

        return (
          <group key={rIdx} position={[0, yPos, 0]}>
            {row.map((item, cIdx) => {
              const xPos = startX + item.width / 2;
              startX += item.width + colGap;
              const chipColor =
                CHIP_PALETTE[item.globalIdx % CHIP_PALETTE.length];

              return (
                <group key={cIdx} position={[xPos, 0, 0]}>
                  <RoundedBox
                    args={[item.width, chipHeight, 0.08]}
                    radius={0.08}
                    smoothness={2}
                  >
                    <meshStandardMaterial
                      color={chipColor}
                      roughness={0.25}
                      metalness={0.2}
                      emissive={chipColor}
                      emissiveIntensity={0.22}
                    />
                  </RoundedBox>
                  <Text
                    font={Fonts.bodyRegular.name}
                    fontSize={fontSize}
                    fontWeight="bold"
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0, 0.05]}
                  >
                    {item.text}
                  </Text>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

// ─── Main ProjectDetailsView ────────────────────────────────
export function ProjectDetailsView({
  project,
  categoryLabel,
  accentColor = "#6366f1",
  glowColor = "#818cf8",
  cardColor: customCardColor,
  onGoHome,
  landscapeScale: propLandscapeScale,
  portraitScale: propPortraitScale,
}: ProjectDetailsViewProps) {
  const viewport = useThree((t) => t.viewport);
  const contentRef = useRef<any>(null);
  const bgRef = useRef<any>(null);

  const isLandscape = viewport.width >= viewport.height;
  const activeScale = isLandscape
    ? propLandscapeScale ?? 1.0
    : propPortraitScale ?? 0.9;

  // Track dynamic heights of the cards
  const [descHeight, setDescHeight] = useState(5.5);
  const [techHeight, setTechHeight] = useState(5.5);

  // ─── Media Items ──────────────────────────────────────────
  const images = useMemo(() => {
    if (project.demoImages && project.demoImages.length > 0) {
      return project.demoImages;
    }
    if (project.thumbnail?.image) {
      return [
        project.thumbnail.image,
        "/images/cmp.png",
        "/images/kmp.png",
      ];
    }
    return [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
      "/images/cmp.png",
      "/images/kmp.png",
    ];
  }, [project.demoImages, project.thumbnail?.image]);

  const videos = useMemo(() => {
    if (project.demoVideos && project.demoVideos.length > 0) {
      return project.demoVideos;
    }
    if (project.thumbnail?.video) {
      return [project.thumbnail.video, project.thumbnail.video];
    }
    return [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ];
  }, [project.demoVideos, project.thumbnail?.video]);

  const gifs = useMemo(() => {
    if (project.demoGifs && project.demoGifs.length > 0) {
      return project.demoGifs;
    }
    if (project.thumbnail?.video) {
      return [project.thumbnail.video, project.thumbnail.video];
    }
    return [
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    ];
  }, [project.demoGifs, project.thumbnail?.video]);

  // Combined tags (platform tags + tech stack tags)
  const allTags = useMemo(() => {
    const list: string[] = [];
    if (project.platforms) {
      list.push(...project.platforms);
    }
    if (project.tags) {
      for (const t of project.tags) {
        if (!list.includes(t)) list.push(t);
      }
    }
    return list;
  }, [project.platforms, project.tags]);

  // Technologies used data
  const technologiesData: TechnologiesUsedData = useMemo(() => {
    if (project.technologies) return project.technologies;
    const derived: TechnologiesUsedData = {};
    if (project.platforms && project.platforms.length > 0) {
      derived["Platforms"] = project.platforms;
    }
    if (project.tags && project.tags.length > 0) {
      derived["Core Stack"] = project.tags;
    }
    return Object.keys(derived).length > 0
      ? derived
      : DEFAULT_TECHNOLOGIES_DATA;
  }, [project]);

  // Markdown content for DescriptionCard
  const markdownText = useMemo(() => {
    if (project.markdownDescription) return project.markdownDescription;
    return `
# ${project.title}

${project.description}

### Highlights & Architecture
- **Production Performance**: Reactive architecture with high-efficiency state pipelines.
- **Cross-Platform Engineering**: Unified shared codebase across multiple client platforms.
- **Reliable Persistence**: Offline-first local data synchronization and error recovery.

### Platforms Supported
${(project.platforms || ["Android", "Web"]).map((p) => `- ${p}`).join("\n")}
`.trim();
  }, [project]);

  // ─── Dynamic Colorful Card Color Assignments ──────────────
  const baseColor = project.color || accentColor || CARD_PALETTE[0];
  const carouselCardColor = customCardColor || baseColor;

  const videoCardColors = useMemo(() => {
    return videos.map(
      (_, i) => CARD_PALETTE[(i + 1) % CARD_PALETTE.length],
    );
  }, [videos]);

  const gifCardColors = useMemo(() => {
    return gifs.map(
      (_, i) =>
        CARD_PALETTE[(videos.length + i + 1) % CARD_PALETTE.length],
    );
  }, [gifs, videos.length]);

  const descCardColor = useMemo(() => {
    const idx = (videos.length + gifs.length + 1) % DESC_PALETTE.length;
    return DESC_PALETTE[idx];
  }, [videos.length, gifs.length]);

  const techCardColor = useMemo(() => {
    const idx = (videos.length + gifs.length + 2) % DESC_PALETTE.length;
    return DESC_PALETTE[idx];
  }, [videos.length, gifs.length]);

  // ─── Dimensional Metrics (70-80% screen filled in landscape mode) ─────────
  const targetFillRatio = 0.76; // 76% screen fill
  const maxCardWidthLandscape = viewport.width * targetFillRatio;
  const maxCardHeightLandscape = viewport.height * 0.78;

  // Outer padding on cards: PADDING = 0.35 on each side -> 0.7 total
  // ImageCarousel controls & progress bar: ~0.53 extra height
  const extraPaddingW = 0.7;
  const extraPaddingH = 1.25;

  // 16:9 ratio for media viewport:
  // If height-limited:
  const heightLimitedMediaH = Math.max(3.0, maxCardHeightLandscape - extraPaddingH);
  const heightLimitedMediaW = heightLimitedMediaH * (16 / 9);

  // If width-limited:
  const widthLimitedMediaW = Math.max(4.0, maxCardWidthLandscape - extraPaddingW);

  const demoWidth = isLandscape
    ? Math.min(widthLimitedMediaW, heightLimitedMediaW)
    : Math.min(viewport.width * 0.92, 7.5);

  const demoHeight = isLandscape
    ? demoWidth * (9 / 16)
    : Math.min(demoWidth * 0.62, viewport.height * 0.55);

  const demoCardWidth = demoWidth + extraPaddingW;
  const demoCardHeight = demoHeight + extraPaddingH;

  // ─── Description & Technologies Cards Layout ─────────────
  // User Requirement:
  // Landscape: Horizontal (Left: DescriptionCard (70-80% width), Right: TechnologiesUsedCard (30-20% width))
  // Portrait: Vertical (Top: DescriptionCard, Bottom: TechnologiesUsedCard)
  const gapX = isLandscape ? 0.6 : 0;
  const availableRowWidth = demoCardWidth - gapX;

  // In landscape: 74% / 26% (fits exactly in 70-80% and 30-20% ranges)
  const descWidth = isLandscape ? availableRowWidth * 0.74 : demoCardWidth;
  const techWidth = isLandscape ? availableRowWidth * 0.26 : demoCardWidth;

  const descMaxWidth = descWidth - 1.2;

  const posX_desc = isLandscape ? -demoCardWidth / 2 + descWidth / 2 : 0;
  const posX_tech = isLandscape ? demoCardWidth / 2 - techWidth / 2 : 0;

  const descStyles = useMemo(
    () => ({
      base: {
        fontSize: isLandscape ? 0.26 : 0.22,
        lineHeight: 1.55,
        color: "#f1f5f9",
      },
      headings: {
        h1: {
          fontSize: isLandscape ? 0.48 : 0.38,
          fontWeight: "bold",
          lineHeight: 1.3,
          spacingTop: 0.15,
          spacingBottom: 0.16,
          color: "#ffffff",
        },
        h2: {
          fontSize: isLandscape ? 0.38 : 0.3,
          fontWeight: "bold",
          lineHeight: 1.3,
          spacingTop: 0.14,
          spacingBottom: 0.12,
          color: "#ffffff",
        },
        h3: {
          fontSize: isLandscape ? 0.32 : 0.25,
          fontWeight: "bold",
          lineHeight: 1.35,
          spacingTop: 0.12,
          spacingBottom: 0.1,
          color: "#ffffff",
        },
      },
    }),
    [isLandscape],
  );

  // ─── Vertical Layout Calculation (Top to Bottom) ──────────
  const headerY = 0;
  const headerHeight = isLandscape ? 3.8 : 2.8;
  const gapAfterHeader = isLandscape ? 2.2 : 1.4;

  let cursorY = headerY - headerHeight / 2 - gapAfterHeader;

  // 1. Image Carousel Position
  const carouselY = cursorY - demoCardHeight / 2;
  const demoGap = isLandscape ? 2.4 : 1.4;
  cursorY -= demoCardHeight + demoGap;

  // 2. Video Players Positions (Column layout)
  const videoPositions: number[] = [];
  videos.forEach(() => {
    videoPositions.push(cursorY - demoCardHeight / 2);
    cursorY -= demoCardHeight + demoGap;
  });

  // 3. Gif Players Positions (Column layout)
  const gifPositions: number[] = [];
  gifs.forEach(() => {
    gifPositions.push(cursorY - demoCardHeight / 2);
    cursorY -= demoCardHeight + demoGap;
  });

  // 4. Source Code Button Position (Rendered after all demos)
  const sourceCodeBtnHeight = isLandscape ? 1.4 : 1.0;
  const sourceCodeBtnY = cursorY - sourceCodeBtnHeight / 2;
  cursorY -= sourceCodeBtnHeight + (isLandscape ? 2.6 : 1.6);

  // 5. Description & Technologies Cards Positioning
  let descCardY = 0;
  let techCardY = 0;
  let combinedSectionY = 0;
  let combinedSectionHeight = 0;

  if (isLandscape) {
    const rowHeight = Math.max(descHeight, techHeight);
    combinedSectionY = cursorY - rowHeight / 2;
    combinedSectionHeight = rowHeight + 1.4;

    descCardY = cursorY - descHeight / 2;
    techCardY = cursorY - techHeight / 2;

    cursorY -= rowHeight + 3.0;
  } else {
    descCardY = cursorY - descHeight / 2;
    cursorY -= descHeight + 1.6;

    techCardY = cursorY - techHeight / 2;
    cursorY -= techHeight + 2.0;
  }

  // 6. End Section ("Go to Home" Button)
  const endSectionHeight = isLandscape ? 4.4 : 3.6;
  const endSectionY = cursorY - endSectionHeight / 2;

  // ─── Page Size Calculation Based on Total Content Distance ─
  const totalTravelDistance = -endSectionY;
  const calculatedPageCount = useMemo(() => {
    if (viewport.height <= 0) return 3;
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
      <group ref={contentRef} scale={activeScale}>
        {/* ── 1. HEADER SECTION: Title + Subtitle + Tags ────────── */}
        <CullableSection
          y={headerY}
          height={headerHeight + 1.2}
          contentRef={contentRef}
        >
          {/* Eyebrow / Category badge */}
          <group position={[0, isLandscape ? 1.45 : 1.1, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.24 : 0.16}
              color={baseColor}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              {categoryLabel ||
                (project.category === "major"
                  ? "MAJOR PROJECT"
                  : "MINOR PROJECT")}
            </Text>
          </group>

          {/* Project Title */}
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={isLandscape ? 1.25 : 0.76}
            fontWeight="bold"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.016}
            outlineColor="#ffffff"
            position={[0, isLandscape ? 0.7 : 0.5, 0]}
          >
            {project.title}
          </Text>

          {/* Subtitle */}
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={isLandscape ? 0.32 : 0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            maxWidth={isLandscape ? demoCardWidth : 6.8}
            textAlign="center"
            lineHeight={1.4}
            position={[0, isLandscape ? -0.15 : -0.1, 0]}
          >
            {project.subtitle}
          </Text>

          {/* Tags Chips */}
          <group position={[0, isLandscape ? -1.05 : -0.75, 0]}>
            <CenteredTags
              tags={allTags}
              maxWidth={isLandscape ? demoCardWidth : 6.5}
              accentColor={baseColor}
              isLandscape={isLandscape}
            />
          </group>
        </CullableSection>

        {/* ── 2. DEMOS SECTION ─────────────────────────────────── */}
        {/* A. Image Carousel (Single component for all available images) */}
        <CullableSection
          y={carouselY}
          height={demoCardHeight + 1.4}
          contentRef={contentRef}
        >
          {/* Section subtitle cue with matching card color */}
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={isLandscape ? 0.24 : 0.18}
            fontWeight="bold"
            color={carouselCardColor}
            letterSpacing={0.14}
            anchorX="center"
            anchorY="middle"
            position={[0, demoCardHeight / 2 + (isLandscape ? 0.55 : 0.35), 0]}
          >
            SCREENSHOT GALLERY ({images.length} IMAGES)
          </Text>
          <ImageCarousel
            imageUrls={images}
            width={demoWidth}
            height={demoHeight}
            cardColor={carouselCardColor}
          />
        </CullableSection>

        {/* B. Multiple VideoPlayer's in Column Manner with Autoplay */}
        {videos.map((videoSrc, idx) => {
          const vColor = videoCardColors[idx];
          return (
            <CullableSection
              key={`video-${idx}`}
              y={videoPositions[idx]}
              height={demoCardHeight + 1.4}
              contentRef={contentRef}
            >
              <Text
                font={Fonts.bodyRegular.name}
                fontSize={isLandscape ? 0.24 : 0.18}
                fontWeight="bold"
                color={vColor}
                letterSpacing={0.14}
                anchorX="center"
                anchorY="middle"
                position={[
                  0,
                  demoCardHeight / 2 + (isLandscape ? 0.55 : 0.35),
                  0,
                ]}
              >
                {`VIDEO DEMO ${idx + 1} OF ${videos.length}`}
              </Text>
              <VideoPlayer
                src={videoSrc}
                width={demoWidth}
                height={demoHeight}
                autoPlay={true}
                loop={true}
                muted={true}
                cardColor={vColor}
              />
            </CullableSection>
          );
        })}

        {/* C. Multiple Gif Player's in Column Manner */}
        {gifs.map((gifSrc, idx) => {
          const gColor = gifCardColors[idx];
          return (
            <CullableSection
              key={`gif-${idx}`}
              y={gifPositions[idx]}
              height={demoCardHeight + 1.4}
              contentRef={contentRef}
            >
              <Text
                font={Fonts.bodyRegular.name}
                fontSize={isLandscape ? 0.24 : 0.18}
                fontWeight="bold"
                color={gColor}
                letterSpacing={0.14}
                anchorX="center"
                anchorY="middle"
                position={[
                  0,
                  demoCardHeight / 2 + (isLandscape ? 0.55 : 0.35),
                  0,
                ]}
              >
                {`INTERACTIVE ANIMATION ${idx + 1} OF ${gifs.length}`}
              </Text>
              <GifPlayer
                src={gifSrc}
                width={demoWidth}
                height={demoHeight}
                autoPlay={true}
                loop={true}
                muted={true}
                cardColor={gColor}
              />
            </CullableSection>
          );
        })}

        {/* ── 3. SOURCE CODE BUTTON (Rendered After All Demos) ──── */}
        <CullableSection
          y={sourceCodeBtnY}
          height={sourceCodeBtnHeight + 1.6}
          contentRef={contentRef}
        >
          <FloatingActionButton
            label="Source Code"
            type="github"
            textAlign="center"
            position={[0, 0, 0.3]}
            accentColor={baseColor}
            glowColor={glowColor}
            baseWidth={isLandscape ? 4.2 : 3.6}
            baseHeight={isLandscape ? 1.05 : 0.96}
            scale={isLandscape ? 1.25 : 1.0}
            floatSpeed={1.8}
            floatRotation={0.06}
            floatIntensity={0.35}
            floatingRange={[-0.04, 0.04]}
            isExternal={true}
            onClick={() => {
              if (project.githubUrl) {
                window.open(project.githubUrl, "_blank");
              }
            }}
          />
        </CullableSection>

        {/* ── 4. & 5. DESCRIPTION & TECHNOLOGIES CARDS ────────── */}
        {/* Landscape: Horizontal side-by-side | Portrait: Vertical stacked */}
        {isLandscape ? (
          <CullableSection
            y={combinedSectionY}
            height={combinedSectionHeight}
            contentRef={contentRef}
          >
            {/* Left: DescriptionCard (70-80% width) */}
            <group position={[posX_desc, descCardY - combinedSectionY, 0]}>
              <DescriptionCard
                markdown={markdownText}
                width={descWidth}
                maxWidth={descMaxWidth}
                color={descCardColor}
                padding={0.5}
                styles={descStyles}
                onLayout={(dims) => {
                  if (dims.height > 0) {
                    setDescHeight(dims.height + 1.4);
                  }
                }}
              />
            </group>

            {/* Right: TechnologiesUsedCard (30-20% width) */}
            <group position={[posX_tech, techCardY - combinedSectionY, 0]}>
              <TechnologiesUsedCard
                data={technologiesData}
                width={techWidth}
                color={techCardColor}
                padding={0.38}
                onLayout={(dims) => {
                  if (dims.height > 0) {
                    setTechHeight(dims.height);
                  }
                }}
              />
            </group>
          </CullableSection>
        ) : (
          <>
            {/* Top: DescriptionCard */}
            <CullableSection
              y={descCardY}
              height={descHeight + 1.4}
              contentRef={contentRef}
            >
              <DescriptionCard
                markdown={markdownText}
                width={descWidth}
                maxWidth={descMaxWidth}
                color={descCardColor}
                padding={0.4}
                styles={descStyles}
                onLayout={(dims) => {
                  if (dims.height > 0) {
                    setDescHeight(dims.height + 1.0);
                  }
                }}
              />
            </CullableSection>

            {/* Bottom: TechnologiesUsedCard */}
            <CullableSection
              y={techCardY}
              height={techHeight + 1.4}
              contentRef={contentRef}
            >
              <TechnologiesUsedCard
                data={technologiesData}
                width={techWidth}
                color={techCardColor}
                padding={0.4}
                onLayout={(dims) => {
                  if (dims.height > 0) {
                    setTechHeight(dims.height);
                  }
                }}
              />
            </CullableSection>
          </>
        )}

        {/* ── 6. LAST PAGE: "Go to Home" Button ────────────────── */}
        <CullableSection
          y={endSectionY}
          height={endSectionHeight + 1.2}
          contentRef={contentRef}
        >
          <group position={[0, isLandscape ? 1.1 : 0.8, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.58 : 0.38}
              fontWeight="bold"
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.012}
              outlineColor="#ffffff"
            >
              End of Project Overview
            </Text>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={isLandscape ? 0.24 : 0.16}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              position={[0, isLandscape ? -0.55 : -0.42, 0]}
            >
              {`Explore more works in the portfolio`}
            </Text>
          </group>

          <FloatingActionButton
            label="Go To Home"
            type="home"
            textAlign="center"
            position={[0, isLandscape ? -0.85 : -0.7, 0.4]}
            accentColor={baseColor}
            glowColor={glowColor}
            baseWidth={isLandscape ? 4.0 : 3.4}
            baseHeight={isLandscape ? 1.05 : 0.96}
            scale={isLandscape ? 1.25 : 1.05}
            floatSpeed={1.8}
            floatRotation={0.06}
            floatIntensity={0.35}
            floatingRange={[-0.04, 0.04]}
            isExternal={false}
            onClick={() => {
              console.log("Go to Home clicked");
              onGoHome?.();
            }}
          />
        </CullableSection>
      </group>
    </>
  );
}

export default ProjectDetailsView;
