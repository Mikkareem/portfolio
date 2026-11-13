import { extend, type ThreeElements } from "@react-three/fiber";
import { useCallback, useMemo, useState } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
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
const DEFAULT_PADDING = 0.35;
const DEFAULT_MAX_TEXT_WIDTH = 6;
const DEFAULT_CARD_DEPTH = 1;
const DEFAULT_CARD_COLOR = "#1e1e2e";
const DEFAULT_RADIUS = 0.6;
const DEFAULT_SEGMENTS = 2;
const DEFAULT_METALNESS = 0.2;
const DEFAULT_ROUGHNESS = 0.35;

// ─── Default markdown styles ────────────────────────────────
export const DESCRIPTION_CARD_MD_STYLES: MarkdownStyles = {
  base: {
    font: Fonts.bodyRegular.name,
    fontSize: 0.22,
    color: "#cbd5e1",
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
    color: "#ffffff",
    outlineWidth: "3.2%",
  },
  italic: {
    fontStyle: "italic",
    font: Fonts.bodyItalic.name,
    color: "#93c5fd",
  },
  underline: {
    color: "#ffb74d",
    underlineChar: "_",
  },
  code: {
    color: "#f6c177",
    letterSpacing: 0.02,
  },
  bullet: {
    char: "•",
    color: "#60a5fa",
    indent: 0.35,
    gap: 0.12,
    spacing: 0.1,
  },
  paragraph: {
    spacing: 0.16,
  },
  headings: {
    h1: {
      fontSize: 0.38,
      fontWeight: "bold",
      color: "#ffffff",
      lineHeight: 1.3,
      spacingTop: 0.1,
      spacingBottom: 0.12,
    },
    h2: {
      fontSize: 0.3,
      fontWeight: "bold",
      color: "#f8fafc",
      lineHeight: 1.3,
      spacingTop: 0.1,
      spacingBottom: 0.1,
    },
    h3: {
      fontSize: 0.25,
      fontWeight: "bold",
      color: "#f1f5f9",
      lineHeight: 1.35,
      spacingTop: 0.08,
      spacingBottom: 0.08,
    },
  },
};

// ─── Sample Markdown (fallback when no content is provided) ─
export const SAMPLE_DESCRIPTION_MARKDOWN = `
# Interactive 3D Experience

Building **immersive web experiences** using modern WebGL and declarative 3D scenes.

- **Fast & Responsive**: Fully reactive 3D layouts adhering to custom bounds
- **Clean Typography**: Markdown-driven text formatting with *bold*, *italic*, and \`inline code\`
- **Modular Components**: Seamlessly compose into any Three.js canvas
`.trim();

// ─── Types ──────────────────────────────────────────────────
type TextSize = { w: number; h: number };
const ZERO: TextSize = { w: 0, h: 0 };

export interface DescriptionCardProps
  extends Omit<JSX.IntrinsicElements["group"], "onLayout"> {
  markdown?: string;
  content?: string;
  color?: string;
  maxWidth?: number;
  padding?: number;
  depth?: number;
  radius?: number;
  segments?: number;
  metalness?: number;
  roughness?: number;
  styles?: MarkdownStyles;
  onLayout?: (dims: { width: number; height: number }) => void;
}

// ─── Component ──────────────────────────────────────────────
export const DescriptionCard = ({
  markdown,
  content,
  color = DEFAULT_CARD_COLOR,
  maxWidth = DEFAULT_MAX_TEXT_WIDTH,
  padding = DEFAULT_PADDING,
  depth = DEFAULT_CARD_DEPTH,
  radius = DEFAULT_RADIUS,
  segments = DEFAULT_SEGMENTS,
  metalness = DEFAULT_METALNESS,
  roughness = DEFAULT_ROUGHNESS,
  styles,
  onLayout: onLayoutProp,
  ...groupProps
}: DescriptionCardProps) => {
  const [descSize, setDescSize] = useState<TextSize>(ZERO);

  // Fallback chain: markdown prop -> content prop -> default sample
  const markdownContent = markdown ?? content ?? SAMPLE_DESCRIPTION_MARKDOWN;

  // Merge user styles with default styles
  const mergedStyles = useMemo<MarkdownStyles>(() => {
    if (!styles) return DESCRIPTION_CARD_MD_STYLES;
    return {
      ...DESCRIPTION_CARD_MD_STYLES,
      ...styles,
      base: { ...DESCRIPTION_CARD_MD_STYLES.base, ...(styles.base || {}) },
      bold: { ...DESCRIPTION_CARD_MD_STYLES.bold, ...(styles.bold || {}) },
      italic: {
        ...DESCRIPTION_CARD_MD_STYLES.italic,
        ...(styles.italic || {}),
      },
      code: { ...DESCRIPTION_CARD_MD_STYLES.code, ...(styles.code || {}) },
      bullet: {
        ...DESCRIPTION_CARD_MD_STYLES.bullet,
        ...(styles.bullet || {}),
      },
      paragraph: {
        ...DESCRIPTION_CARD_MD_STYLES.paragraph,
        ...(styles.paragraph || {}),
      },
      headings: {
        ...DESCRIPTION_CARD_MD_STYLES.headings,
        ...(styles.headings || {}),
      },
    };
  }, [styles]);

  const onDescLayout = useCallback(
    (dims: { width: number; height: number }) => {
      setDescSize((prev) => {
        if (prev.w === dims.width && prev.h === dims.height) return prev;
        return { w: dims.width, h: dims.height };
      });
      onLayoutProp?.(dims);
    },
    [onLayoutProp],
  );

  const contentWidth = descSize.w;
  const contentHeight = descSize.h;

  const cardWidth = contentWidth + padding * 2;
  const cardHeight = contentHeight + padding * 2;

  return (
    <group {...groupProps}>
      {/* ── Card background ─────────────────────────────── */}
      <mesh position={[0, 0, -(depth / 2 + 0.001)]}>
        {/* @ts-expect-error */}
        <roundedBoxGeometry
          args={[
            cardWidth + 2 * padding,
            cardHeight + 2 * padding,
            depth,
            segments,
            radius,
          ]}
        />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>

      {/* ── Content origin: top-left of content area ───── */}
      <group position={[-cardWidth / 2, cardHeight / 2, 0]}>
        <Markdown
          content={markdownContent}
          maxWidth={maxWidth}
          styles={mergedStyles}
          anchor="top-left"
          onLayout={onDescLayout}
          position={[padding, -padding, 0]}
        />
      </group>
    </group>
  );
};
