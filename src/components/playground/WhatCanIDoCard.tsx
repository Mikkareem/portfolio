import { extend, type ThreeElements } from "@react-three/fiber";
import { useCallback, useMemo, useRef, useState } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { Text, RoundedBox } from "@react-three/drei";
import { Fonts } from "../../presentation/Core";
import { Markdown } from "../../libs/markdown/Markdown";
import type { MarkdownStyles } from "../../libs/markdown/types";
import { measureTextWidth } from "../../libs/markdown/measure";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Layout constants ───────────────────────────────────────
const PADDING = 0.4;
const SECTION_GAP = 0.25; // vertical gap between sections
const TAG_BOTTOM_GAP = 0.2; // gap below the tag
const TITLE_DESC_GAP = 0.15; // gap between title and description
const DESC_CHIPS_GAP = 0.25; // gap between description and chips
const MAX_TEXT_WIDTH = 6;
const CARD_DEPTH = 1;

// ─── Font sizes ─────────────────────────────────────────────
const TAG_FONT_SIZE = 0.18;
const TITLE_FONT_SIZE = 0.38;
const DESC_FONT_SIZE = 0.2;

// ─── Chip constants ─────────────────────────────────────────
const CHIP_FONT_SIZE = 0.16;
const CHIP_PADDING_X = 0.18;
const CHIP_PADDING_Y = 0.1;
const CHIP_HEIGHT = CHIP_FONT_SIZE + CHIP_PADDING_Y * 2;
const CHIP_DEPTH = 0.15;
const CHIP_RADIUS = 0.12;
const CHIP_COL_GAP = 0.12;
const CHIP_ROW_GAP = 0.12;
const CHIP_COLOR = "#334155";
const CHIP_TEXT_COLOR = "#e2e8f0";

// ─── Tag glow constants ────────────────────────────────────
const TAG_PADDING_X = 0.2;
const TAG_PADDING_Y = 0.08;
const TAG_HEIGHT = TAG_FONT_SIZE + TAG_PADDING_Y * 2;
const TAG_DEPTH = 0.12;
const TAG_RADIUS = TAG_HEIGHT / 2;
const TAG_GLOW_COLOR = "#7c3aed"; // vibrant purple
const TAG_GLOW_INTENSITY = 2.5;

// ─── Markdown styles for description ───────────────────────
const DESC_MD_STYLES: MarkdownStyles = {
  base: {
    font: Fonts.bodyRegular.name,
    fontSize: DESC_FONT_SIZE,
    color: "#bbb",
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
    outlineWidth: "3%",
  },
  italic: {
    fontStyle: "italic",
    font: Fonts.bodyItalic.name,
  },
};

// ─── Types ──────────────────────────────────────────────────
type WhatCanIDo = {
  tag: string;
  title: string;
  description: string;
  stack: string[];
};

type TextSize = { w: number; h: number };
const ZERO: TextSize = { w: 0, h: 0 };

function measure(mesh: any, setter: (s: TextSize) => void) {
  const bounds = mesh.textRenderInfo?.blockBounds;
  if (bounds) {
    setter({
      w: Math.abs(bounds[2] - bounds[0]),
      h: Math.abs(bounds[3] - bounds[1]),
    });
  }
}

// ─── Chip layout helper ────────────────────────────────────
interface ChipLayout {
  text: string;
  x: number; // center x
  y: number; // center y
  width: number; // full chip width
}

function computeChipLayout(
  chips: string[],
  maxWidth: number,
): { items: ChipLayout[]; totalWidth: number; totalHeight: number } {
  const items: ChipLayout[] = [];
  let cursorX = 0;
  let cursorY = 0;
  let rowMaxWidth = 0;

  for (const text of chips) {
    const textWidth = measureTextWidth(text, {
      fontSize: CHIP_FONT_SIZE,
      font: Fonts.bodyRegular.name,
    });
    const chipWidth = textWidth + CHIP_PADDING_X * 2;

    // Wrap to next row if this chip overflows
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

  return { items, totalWidth: rowMaxWidth, totalHeight };
}

// ─── Component ──────────────────────────────────────────────
export const WhatCanIDoCard = ({
  wcid,
  color = "#1e1e2e",
  tagColor = TAG_GLOW_COLOR,
  ...groupProps
}: {
  wcid: WhatCanIDo;
  color?: string;
  tagColor?: string;
} & JSX.IntrinsicElements["group"]) => {
  // ── Refs ────────────────────────────────────────────────
  const tagRef = useRef<any>(null);
  const titleRef = useRef<any>(null);

  // ── Measured sizes ─────────────────────────────────────
  const [tagSize, setTagSize] = useState<TextSize>(ZERO);
  const [titleSize, setTitleSize] = useState<TextSize>(ZERO);
  const [descSize, setDescSize] = useState<TextSize>(ZERO);

  // ── Chip layout ───────────────────────────────────────
  const chipLayout = useMemo(
    () => computeChipLayout(wcid.stack, MAX_TEXT_WIDTH),
    [wcid.stack],
  );

  // ── Tag pill dimensions ───────────────────────────────
  const tagPillWidth = tagSize.w + TAG_PADDING_X * 2;

  // ── Derived layout ────────────────────────────────────
  const headerHeight = TAG_HEIGHT + TAG_BOTTOM_GAP;

  const hasTitle = titleSize.h > 0;
  const hasDesc = descSize.h > 0;
  const hasChips = chipLayout.totalHeight > 0;

  const bodyHeight =
    titleSize.h +
    (hasDesc && hasTitle ? TITLE_DESC_GAP : 0) +
    descSize.h +
    (hasChips && (hasTitle || hasDesc) ? DESC_CHIPS_GAP : 0) +
    chipLayout.totalHeight;

  const contentWidth = Math.max(
    tagPillWidth,
    titleSize.w,
    descSize.w,
    chipLayout.totalWidth,
  );
  const contentHeight = headerHeight + bodyHeight;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  // ── Desc callback ─────────────────────────────────────
  const onDescLayout = useCallback(
    (dims: { width: number; height: number }) => {
      setDescSize((prev) => {
        if (prev.w === dims.width && prev.h === dims.height) return prev;
        return { w: dims.width, h: dims.height };
      });
    },
    [],
  );

  // ── Vertical cursors (top-down from content origin) ───
  let yTag = -PADDING;
  let yTitle = yTag - TAG_HEIGHT - TAG_BOTTOM_GAP;
  let yDesc = yTitle - titleSize.h - (hasDesc && hasTitle ? TITLE_DESC_GAP : 0);
  let yChips =
    yDesc -
    descSize.h -
    (hasChips && (hasTitle || hasDesc) ? DESC_CHIPS_GAP : 0);

  // ── Render ────────────────────────────────────────────
  return (
    <group {...groupProps}>
      {/* ── Card background ─────────────────────────────── */}
      <mesh position={[0, 0, -(CARD_DEPTH / 2 + 0.001)]}>
        {/* @ts-expect-error */}
        <roundedBoxGeometry
          args={[
            cardWidth + 2 * PADDING,
            cardHeight + 2 * PADDING,
            CARD_DEPTH,
            2,
            0.6,
          ]}
        />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>

      {/* ── Content origin: top-left ───────────────────── */}
      <group position={[-cardWidth / 2, cardHeight / 2, 0]}>
        {/* ─ Glowing Tag Pill ──────────────────────────── */}
        <group position={[PADDING, yTag, 0]}>
          {/* Tag pill background (glowing) */}
          <RoundedBox
            args={[tagPillWidth, TAG_HEIGHT, TAG_DEPTH]}
            radius={TAG_RADIUS}
            smoothness={8}
            position={[tagPillWidth / 2, -TAG_HEIGHT / 2, -TAG_DEPTH / 2]}
          >
            <meshStandardMaterial
              color={tagColor}
              emissive={tagColor}
              emissiveIntensity={TAG_GLOW_INTENSITY}
              toneMapped={false}
              roughness={0.2}
              metalness={0.1}
            />
          </RoundedBox>

          {/* Tag text */}
          <Text
            ref={tagRef}
            font={Fonts.bodyRegular.name}
            fontSize={TAG_FONT_SIZE}
            fontWeight={700}
            color="#fff"
            anchorX="left"
            anchorY="top"
            outlineWidth={0.008}
            position={[TAG_PADDING_X, -TAG_PADDING_Y, 0.001]}
            onSync={(m) => measure(m, setTagSize)}
          >
            {wcid.tag}
          </Text>
        </group>

        {/* ─ Title ─────────────────────────────────────── */}
        <Text
          ref={titleRef}
          font={Fonts.bodyRegular.name}
          fontSize={TITLE_FONT_SIZE}
          fontWeight={700}
          color="#fff"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.015}
          position={[PADDING, yTitle, 0]}
          onSync={(m) => measure(m, setTitleSize)}
        >
          {wcid.title}
        </Text>

        {/* ─ Description (Markdown) ────────────────────── */}
        <Markdown
          content={wcid.description}
          maxWidth={MAX_TEXT_WIDTH}
          styles={DESC_MD_STYLES}
          anchor="top-left"
          onLayout={onDescLayout}
          position={[PADDING, yDesc, 0]}
        />

        {/* ─ Stack Chips ───────────────────────────────── */}
        <group position={[PADDING, yChips, 0]}>
          {chipLayout.items.map((chip, i) => (
            <group key={i} position={[chip.x, chip.y, 0]}>
              {/* Chip background */}
              <RoundedBox
                args={[chip.width, CHIP_HEIGHT, CHIP_DEPTH]}
                radius={CHIP_RADIUS}
                smoothness={4}
              >
                <meshStandardMaterial
                  color={CHIP_COLOR}
                  roughness={0.35}
                  metalness={0.1}
                />
              </RoundedBox>

              {/* Chip label */}
              <Text
                font={Fonts.bodyRegular.name}
                fontSize={CHIP_FONT_SIZE}
                color={CHIP_TEXT_COLOR}
                anchorX="center"
                anchorY="middle"
                position={[0, 0, CHIP_DEPTH / 2 + 0.001]}
              >
                {chip.text}
              </Text>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};

// ─── Sample data ────────────────────────────────────────────
export const WhatCanIDos: WhatCanIDo[] = [
  {
    tag: "Web Applications",
    title: "Full Stack Development",
    description:
      "Designing and building scalable web applications from backend APIs to responsive user interfaces. Experienced in developing microservices, REST APIs, and modern frontend architectures that deliver reliable, high-performance user experiences.",
    stack: ["Spring Boot", "React.js", "Next.js", "TypeScript", "Databases"],
  },
  {
    tag: "Android & Multiplatform",
    title: "Mobile App Development",
    description:
      "Creating modern Android and cross-platform applications with a focus on clean architecture, intuitive UI, and offline-first experiences. Passionate about building maintainable apps using the latest Kotlin ecosystem.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Compose Multiplatform",
      "Kotlin Multiplatform",
      "Room",
    ],
  },
  {
    tag: "Scalable Infrastructure",
    title: "Cloud Native Engineering",
    description:
      "Building and deploying cloud-native applications using containers and Kubernetes. Experienced in designing scalable deployments, optimizing cloud infrastructure, and improving application reliability and operational efficiency.",
    stack: ["Kubernetes", "Docker", "AWS", "GCP", "Terraform"],
  },
  {
    tag: "Automation",
    title: "DevOps & CI/CD",
    description:
      "Automating build, test, and deployment workflows to accelerate software delivery. Implementing CI/CD pipelines, GitOps practices, and infrastructure automation for reliable and repeatable releases.",
    stack: ["GitHub Actions", "ArgoCD", "Helm", "Jenkins"],
  },
];
