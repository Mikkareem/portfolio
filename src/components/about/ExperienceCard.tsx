import { extend, type ThreeElements } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { Text } from "@react-three/drei";
import { Fonts } from "../../presentation/Core";
import { Markdown } from "../../libs/markdown/Markdown";
import type { MarkdownStyles } from "../../libs/markdown/types";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Layout constants ───────────────────────────────────────
const PADDING = 0.35;
const SECTION_GAP = 0.2; // gap between header group and bullet list
const HEADER_LINE_GAP = 0.1; // gap between lines inside the header
const MAX_TEXT_WIDTH = 6; // max width for wrapping description text
const CARD_DEPTH = 1;

// ─── Font sizes ─────────────────────────────────────────────
const JOB_TITLE_SIZE = 0.4;
const COMPANY_SIZE = 0.28;
const INTERVAL_SIZE = 0.22;

// ─── Markdown styles for bullet points ──────────────────────
const DESCRIPTION_MD_STYLES: MarkdownStyles = {
  base: {
    font: Fonts.bodyRegular.name,
    fontSize: 0.22,
    color: "#ccc",
    lineHeight: 1.4,
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
  bullet: {
    char: "•",
    indent: 0.35,
    gap: 0.12,
    spacing: 0.1,
  },
};

// ─── Types ──────────────────────────────────────────────────
export type Experience = {
  jobTitle: string;
  companyName: string;
  interval: string; // (Aug 2025 - Present)
  descriptionPoints: string[];
};

type TextSize = { w: number; h: number };
const ZERO: TextSize = { w: 0, h: 0 };

// ─── Helpers ────────────────────────────────────────────────
function measure(mesh: any, setter: (s: TextSize) => void) {
  const bounds = mesh.textRenderInfo?.blockBounds;
  if (bounds) {
    setter({
      w: Math.abs(bounds[2] - bounds[0]),
      h: Math.abs(bounds[3] - bounds[1]),
    });
  }
}

/** Convert descriptionPoints array to markdown bullet list */
function pointsToMarkdown(points: string[]): string {
  return points.map((p) => `- ${p}`).join("\n");
}

// ─── Default sample data (for playground / preview) ─────────
const SAMPLE_EXP: Experience = {
  jobTitle: "Senior Software Engineer",
  companyName: "Google",
  interval: "Aug 2023 – Present",
  descriptionPoints: [
    "Led the **end-to-end migration** of 12 legacy monolithic services to a modern microservices architecture, reducing deployment times by **60%**",
    "Designed and implemented a **CI/CD pipeline** overhaul that improved build reliability from 78% to **99%**",
    "Mentored a team of **5 junior engineers** through weekly code reviews and pair-programming sessions",
  ],
};

// ─── Component ──────────────────────────────────────────────
export function ExperienceCard({
  exp = SAMPLE_EXP,
  color = "#4a6cf7",
  ...groupProps
}: {
  exp?: Experience;
  color?: string;
} & JSX.IntrinsicElements["group"]) {
  // ── Refs ────────────────────────────────────────────────
  const jobTitleRef = useRef<any>(null);
  const companyRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  // ── Measured sizes ─────────────────────────────────────
  const [jobTitleSize, setJobTitleSize] = useState<TextSize>(ZERO);
  const [companySize, setCompanySize] = useState<TextSize>(ZERO);
  const [intervalSize, setIntervalSize] = useState<TextSize>(ZERO);
  const [descSize, setDescSize] = useState<TextSize>(ZERO);

  // ── Derived layout ────────────────────────────────────
  const headerHeight =
    jobTitleSize.h +
    (companySize.h > 0 ? HEADER_LINE_GAP + companySize.h : 0) +
    (intervalSize.h > 0 ? HEADER_LINE_GAP + intervalSize.h : 0);

  const hasDesc = descSize.h > 0;
  const sectionGap = hasDesc && headerHeight > 0 ? SECTION_GAP : 0;

  const contentWidth = Math.max(
    jobTitleSize.w,
    companySize.w,
    intervalSize.w,
    descSize.w,
  );
  const contentHeight = headerHeight + sectionGap + descSize.h;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  // ── Markdown content ──────────────────────────────────
  const markdownContent = pointsToMarkdown(exp.descriptionPoints);

  const onDescLayout = useCallback(
    (dims: { width: number; height: number }) => {
      setDescSize((prev) => {
        if (prev.w === dims.width && prev.h === dims.height) return prev;
        return { w: dims.width, h: dims.height };
      });
    },
    [],
  );

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
        <meshStandardMaterial color={color} metalness={0.34} roughness={0.23} />
      </mesh>

      {/* ── Content origin: top-left of content area ───── */}
      <group position={[-cardWidth / 2, cardHeight / 2, 0]}>
        {/* ─ Job Title ──────────────────────────────────── */}
        <Text
          ref={jobTitleRef}
          font={Fonts.bodyRegular.name}
          fontSize={JOB_TITLE_SIZE}
          fontWeight={700}
          color="#fff"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.015}
          position={[PADDING, -PADDING, 0]}
          onSync={(m) => measure(m, setJobTitleSize)}
        >
          {exp.jobTitle}
        </Text>

        {/* ─ Company Name ───────────────────────────────── */}
        <Text
          ref={companyRef}
          font={Fonts.bodyRegular.name}
          fontSize={COMPANY_SIZE}
          color="#ddd"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.01}
          position={[PADDING, -PADDING - jobTitleSize.h - HEADER_LINE_GAP, 0]}
          onSync={(m) => measure(m, setCompanySize)}
        >
          {exp.companyName}
        </Text>

        {/* ─ Interval ───────────────────────────────────── */}
        <Text
          ref={intervalRef}
          font={Fonts.bodyItalic.name}
          fontSize={INTERVAL_SIZE}
          color="#bbb"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.008}
          position={[
            PADDING,
            -PADDING -
              jobTitleSize.h -
              HEADER_LINE_GAP -
              companySize.h -
              HEADER_LINE_GAP,
            0,
          ]}
          onSync={(m) => measure(m, setIntervalSize)}
        >
          {exp.interval}
        </Text>

        {/* ─ Description points (Markdown with bold) ───── */}
        <Markdown
          content={markdownContent}
          maxWidth={MAX_TEXT_WIDTH}
          styles={DESCRIPTION_MD_STYLES}
          anchor="top-left"
          onLayout={onDescLayout}
          position={[PADDING, -PADDING - headerHeight - sectionGap, 0]}
        />
      </group>
    </group>
  );
}
