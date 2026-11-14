import { extend, type ThreeElements } from "@react-three/fiber";
import { useMemo, useEffect } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { Text, RoundedBox } from "@react-three/drei";
import { Fonts } from "../../presentation/Core";
import { measureTextWidth } from "../../libs/markdown/measure";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Types ──────────────────────────────────────────────────
export type TechnologiesUsedData = Record<string, string[]>;

export interface TechnologiesUsedCardProps extends Omit<
  JSX.IntrinsicElements["group"],
  "onLayout"
> {
  data?: TechnologiesUsedData;
  title?: string;
  subtitle?: string;
  color?: string;
  width?: number;
  maxWidth?: number;
  padding?: number;
  depth?: number;
  radius?: number;
  onLayout?: (dims: { width: number; height: number }) => void;
}

// ─── Example / Default Data ─────────────────────────────────
export const DEFAULT_TECHNOLOGIES_DATA: TechnologiesUsedData = {
  Frontend: [
    "React.js",
    "Next.js",
    "R3F",
    "TypeScript",
    "TailwindCSS",
    "HTML",
    "CSS",
    "Framer Motion",
  ],
  Backend: ["Java", "Kotlin", "Spring Boot", "Ktor", "PostgreSQL"],
  Mobile: ["Jetpack Compose", "KMP", "Android SDK"],
  "Cloud & DevOps": ["Docker", "Kubernetes", "Kafka", "Redis"],
};

// ─── Category Theme Colors ──────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#38bdf8", // Sky blue
  Backend: "#a78bfa", // Vivid Purple / Violet
  Mobile: "#34d399", // Emerald
  "Cloud & DevOps": "#fb923c", // Amber / Warm Orange
  DevOps: "#fb923c",
  Database: "#f472b6", // Rose
  Tools: "#818cf8", // Indigo
};

const PALETTE_FALLBACKS = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fb923c",
  "#f472b6",
  "#818cf8",
  "#2dd4bf",
  "#facc15",
];

// ─── Layout Constants ────────────────────────────────────────
const DEFAULT_CARD_COLOR = "#131b2e";
const DEFAULT_MAX_WIDTH = 6.8;
const DEFAULT_PADDING = 0.45;
const DEFAULT_DEPTH = 0.8;
const DEFAULT_RADIUS = 0.35;

// Font sizes
const TITLE_FONT_SIZE = 0.36;
const SUBTITLE_FONT_SIZE = 0.16;
const CATEGORY_FONT_SIZE = 0.24;
const CHIP_FONT_SIZE = 0.16;

// Chip sizing
const CHIP_PADDING_X = 0.2;
const CHIP_PADDING_Y = 0.1;
const CHIP_HEIGHT = CHIP_FONT_SIZE + CHIP_PADDING_Y * 2; // ~0.36
const CHIP_DEPTH = 0.12;
const CHIP_RADIUS = 0.09;
const CHIP_COL_GAP = 0.14;
const CHIP_ROW_GAP = 0.14;

// Spacing
const TITLE_GAP = 0.1;
const HEADER_BOTTOM_GAP = 0.35;
const CATEGORY_TITLE_GAP = 0.18;
const CATEGORY_SECTION_GAP = 0.36;

// ─── Chip Layout Helper ─────────────────────────────────────
interface ChipPosition {
  text: string;
  x: number;
  y: number;
  width: number;
}

function computeCategoryChips(
  techs: string[],
  maxWidth: number,
): { items: ChipPosition[]; width: number; height: number } {
  const items: ChipPosition[] = [];
  let cursorX = 0;
  let cursorY = 0;
  let rowMaxWidth = 0;

  for (const text of techs) {
    const textWidth = measureTextWidth(text, {
      fontSize: CHIP_FONT_SIZE,
      font: Fonts.bodyRegular.name,
    });
    const chipWidth = textWidth + CHIP_PADDING_X * 2;

    if (cursorX > 0 && cursorX + chipWidth > maxWidth) {
      cursorX = 0;
      cursorY -= CHIP_HEIGHT + CHIP_ROW_GAP;
    }

    items.push({
      text,
      x: cursorX + chipWidth / 2,
      y: cursorY - CHIP_HEIGHT / 2,
      width: chipWidth,
    });

    cursorX += chipWidth + CHIP_COL_GAP;
    rowMaxWidth = Math.max(rowMaxWidth, cursorX - CHIP_COL_GAP);
  }

  const totalHeight = Math.abs(cursorY) + CHIP_HEIGHT;
  return { items, width: rowMaxWidth, height: totalHeight };
}

// ─── Main TechnologiesUsedCard Component ────────────────────
export const TechnologiesUsedCard = ({
  data = DEFAULT_TECHNOLOGIES_DATA,
  title = "Technologies Used",
  subtitle = "TECH STACK & ARCHITECTURE",
  color = DEFAULT_CARD_COLOR,
  width: explicitWidth,
  maxWidth = DEFAULT_MAX_WIDTH,
  padding = DEFAULT_PADDING,
  depth = DEFAULT_DEPTH,
  radius = DEFAULT_RADIUS,
  onLayout,
  ...groupProps
}: TechnologiesUsedCardProps) => {
  const categories = useMemo(() => Object.entries(data), [data]);

  const effectiveMaxWidth = useMemo(() => {
    if (explicitWidth) {
      return Math.max(2.0, explicitWidth - padding * 2);
    }
    return maxWidth;
  }, [explicitWidth, padding, maxWidth]);

  // Compute layout for each category
  const categoryLayouts = useMemo(() => {
    let currentY = 0;
    const computed = categories.map(([categoryName, techs], idx) => {
      const chipLayout = computeCategoryChips(techs, effectiveMaxWidth);
      const catColor =
        CATEGORY_COLORS[categoryName] ??
        PALETTE_FALLBACKS[idx % PALETTE_FALLBACKS.length];

      const sectionY = currentY;
      const chipsY = sectionY - CATEGORY_FONT_SIZE - CATEGORY_TITLE_GAP;
      const sectionHeight =
        CATEGORY_FONT_SIZE + CATEGORY_TITLE_GAP + chipLayout.height;

      currentY -= sectionHeight + CATEGORY_SECTION_GAP;

      return {
        categoryName,
        techs,
        catColor,
        chipLayout,
        sectionY,
        chipsY,
        sectionHeight,
      };
    });

    const totalCategoriesHeight = Math.abs(currentY);
    return { list: computed, totalHeight: totalCategoriesHeight };
  }, [categories, maxWidth]);

  // Header height
  const headerHeight =
    SUBTITLE_FONT_SIZE + TITLE_GAP + TITLE_FONT_SIZE + HEADER_BOTTOM_GAP;

  // Content dimensions
  const contentWidth = explicitWidth
    ? explicitWidth - padding * 2
    : Math.max(
        maxWidth,
        ...categoryLayouts.list.map((c) => c.chipLayout.width),
      );

  const contentHeight = headerHeight + categoryLayouts.totalHeight;

  const cardWidth = explicitWidth ?? contentWidth + padding * 2;
  const cardHeight = contentHeight + padding * 2;

  useEffect(() => {
    onLayout?.({ width: cardWidth, height: cardHeight });
  }, [cardWidth, cardHeight, onLayout]);

  const topOrigin = cardHeight / 2 - padding;
  const leftOrigin = -cardWidth / 2 + padding;

  return (
    <group {...groupProps}>
      {/* ── 3D Card Background ─────────────────────────────── */}
      <mesh position={[0, 0, -(depth / 2 + 0.001)]}>
        {/* @ts-expect-error */}
        <roundedBoxGeometry args={[cardWidth, cardHeight, depth, 2, radius]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.16}
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>

      {/* ── Content Root (Origin: Top-Left of inner padding) ── */}
      <group position={[leftOrigin, topOrigin, 0]}>
        {/* ── Header: Subtitle / Eyebrow ───────────────────── */}
        <Text
          font={Fonts.bodyRegular.name}
          fontSize={SUBTITLE_FONT_SIZE}
          letterSpacing={0.14}
          color="#a78bfa"
          anchorX="left"
          anchorY="top"
          position={[0, 0, 0]}
        >
          {subtitle}
        </Text>

        {/* ── Header: Main Title ───────────────────────────── */}
        <Text
          font={Fonts.bodyRegular.name}
          fontSize={TITLE_FONT_SIZE}
          fontWeight="bold"
          color="#ffffff"
          anchorX="left"
          anchorY="top"
          outlineWidth={0.012}
          outlineColor="#ffffff"
          position={[0, -(SUBTITLE_FONT_SIZE + TITLE_GAP), 0]}
        >
          {title}
        </Text>

        {/* ── Category Sections ────────────────────────────── */}
        <group position={[0, -headerHeight, 0]}>
          {categoryLayouts.list.map((cat, catIdx) => (
            <group key={catIdx} position={[0, cat.sectionY, 0]}>
              {/* Category Indicator Dot & Name */}
              <group position={[0, 0, 0]}>
                {/* Glowing Indicator Pill */}
                <RoundedBox
                  args={[0.1, 0.22, 0.06]}
                  radius={0.03}
                  smoothness={2}
                  position={[0.05, -CATEGORY_FONT_SIZE / 2, 0]}
                >
                  <meshStandardMaterial
                    color={cat.catColor}
                    emissive={cat.catColor}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                  />
                </RoundedBox>

                {/* Category Title Text */}
                <Text
                  font={Fonts.bodyRegular.name}
                  fontSize={CATEGORY_FONT_SIZE}
                  fontWeight="bold"
                  color="#f8fafc"
                  anchorX="left"
                  anchorY="top"
                  position={[0.22, 0, 0]}
                >
                  {cat.categoryName}
                </Text>

                {/* Tech count badge */}
                <Text
                  font={Fonts.bodyRegular.name}
                  fontSize={CATEGORY_FONT_SIZE * 0.7}
                  color={cat.catColor}
                  anchorX="left"
                  anchorY="top"
                  position={[
                    0.26 +
                      measureTextWidth(cat.categoryName, {
                        fontSize: CATEGORY_FONT_SIZE,
                        font: Fonts.bodyRegular.name,
                      }),
                    -CATEGORY_FONT_SIZE * 0.15,
                    0,
                  ]}
                >
                  {`(${cat.techs.length})`}
                </Text>
              </group>

              {/* Chips under Category */}
              <group
                position={[0, -CATEGORY_FONT_SIZE - CATEGORY_TITLE_GAP, 0]}
              >
                {cat.chipLayout.items.map((chip, chipIdx) => (
                  <group key={chipIdx} position={[chip.x, chip.y, 0]}>
                    {/* Chip Pill 3D Background */}
                    <RoundedBox
                      args={[chip.width, CHIP_HEIGHT, CHIP_DEPTH]}
                      radius={CHIP_RADIUS}
                      smoothness={2}
                    >
                      <meshStandardMaterial
                        color="#0f172a"
                        roughness={0.3}
                        metalness={0.2}
                        emissive={cat.catColor}
                        emissiveIntensity={0.18}
                      />
                    </RoundedBox>

                    {/* Chip Text */}
                    <Text
                      font={Fonts.bodyRegular.name}
                      fontSize={CHIP_FONT_SIZE}
                      fontWeight="bold"
                      color="#f1f5f9"
                      anchorX="center"
                      anchorY="middle"
                      position={[0, 0, CHIP_DEPTH / 2 + 0.002]}
                    >
                      {chip.text}
                    </Text>
                  </group>
                ))}
              </group>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};

export default TechnologiesUsedCard;
