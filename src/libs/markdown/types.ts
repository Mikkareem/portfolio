import type { Color } from 'three';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Three.js / Drei Text color type
 */
export type TextColor = string | number | Color;

/**
 * Common text styling attributes for Drei <Text>
 */
export interface TextStyle {
  /** Font family or URL to a .ttf/.otf/.woff font file */
  font?: string;
  /** Font size in 3D world units (default: 0.2) */
  fontSize?: number;
  /** Text color (hex string, CSS name, 0x hex number, or Three.Color) */
  color?: TextColor;
  /** Letter spacing adjustment in 3D world units (default: 0) */
  letterSpacing?: number;
  /** Line height multiplier relative to fontSize (default: 1.4) */
  lineHeight?: number;
  /** Font weight: 'normal' | 'bold' | number */
  fontWeight?: 'normal' | 'bold' | number | string;
  /** Font style: 'normal' | 'italic' */
  fontStyle?: 'normal' | 'italic';
  /** Text outline width in 3D world units */
  outlineWidth?: number | string;
  /** Text outline color */
  outlineColor?: TextColor;
  /** Text stroke width in 3D world units */
  strokeWidth?: number | string;
  /** Text stroke color */
  strokeColor?: TextColor;
  /** Fill opacity (0 to 1, default: 1) */
  fillOpacity?: number;
}

/**
 * Style configuration for Bold text (**bold** or __bold__)
 */
export interface BoldStyle extends TextStyle {}

/**
 * Style configuration for Italic text (*italic* or _italic_)
 */
export interface ItalicStyle extends TextStyle {}

/**
 * Style configuration for Underline text (<u>underline</u> or ++underline++)
 */
export interface UnderlineStyle extends TextStyle {
  /** Character used to render the underline via Drei <Text> (default: '_') */
  underlineChar?: string;
  /** Vertical offset below baseline in 3D units (default: auto based on fontSize) */
  offsetY?: number;
  /** Relative scale of the underline character (default: 1) */
  scale?: number;
}

/**
 * Style configuration for Inline Code text (`code`)
 */
export interface CodeStyle extends TextStyle {
  /** Background padding or visual offset if applicable */
  padding?: number;
}

/**
 * Style configuration for Bullet points (*, -, +, •)
 */
export interface BulletStyle extends TextStyle {
  /** Bullet symbol/character rendered via Drei <Text> (default: '•') */
  char?: string;
  /** Indentation per level in 3D world units (default: 0.3) */
  indent?: number;
  /** Gap between the bullet marker and the item content (default: 0.12) */
  gap?: number;
  /** Vertical spacing between consecutive list items (default: 0.08) */
  spacing?: number;
}

/**
 * Style configuration for Paragraphs
 */
export interface ParagraphStyle extends TextStyle {
  /** Vertical spacing between paragraphs in 3D world units (default: 0.15) */
  spacing?: number;
}

/**
 * Style configuration for Headings (# H1, ## H2, etc.)
 */
export interface HeadingStyle extends TextStyle {
  /** Top vertical spacing before the heading (default: 0.15) */
  spacingTop?: number;
  /** Bottom vertical spacing after the heading (default: 0.1) */
  spacingBottom?: number;
}

/**
 * Style configuration for Strikethrough (~~deleted~~)
 */
export interface StrikethroughStyle extends TextStyle {
  /** Strike character used for strikethrough line (default: '─') */
  strikeChar?: string;
}

/**
 * Style configuration for Blockquotes (> quote)
 */
export interface BlockquoteStyle extends TextStyle {
  /** Prefix marker rendered via Drei <Text> (default: '▌') */
  prefix?: string;
  /** Indentation for blockquote content (default: 0.25) */
  indent?: number;
  /** Vertical spacing around blockquotes (default: 0.12) */
  spacing?: number;
}

/**
 * Complete styles configuration passed to <Markdown styles={...} />
 */
export interface MarkdownStyles {
  /** Base text style for regular text */
  base?: TextStyle;
  /** Style overrides for bold text */
  bold?: BoldStyle;
  /** Style overrides for italic text */
  italic?: ItalicStyle;
  /** Style overrides for underline text */
  underline?: UnderlineStyle;
  /** Style overrides for inline code text */
  code?: CodeStyle;
  /** Style overrides for bullet lists */
  bullet?: BulletStyle;
  /** Style overrides for paragraphs */
  paragraph?: ParagraphStyle;
  /** Style overrides for headings h1 - h6 */
  headings?: {
    h1?: HeadingStyle;
    h2?: HeadingStyle;
    h3?: HeadingStyle;
    h4?: HeadingStyle;
    h5?: HeadingStyle;
    h6?: HeadingStyle;
  };
  /** Style overrides for strikethrough */
  strikethrough?: StrikethroughStyle;
  /** Style overrides for blockquotes */
  blockquote?: BlockquoteStyle;
}

/**
 * Resolved full style definition where required defaults are populated
 */
export interface ResolvedMarkdownStyles {
  base: Required<Omit<TextStyle, 'font' | 'outlineWidth' | 'outlineColor' | 'strokeWidth' | 'strokeColor'>> & {
    font?: string;
    outlineWidth?: number | string;
    outlineColor?: TextColor;
    strokeWidth?: number | string;
    strokeColor?: TextColor;
  };
  bold: BoldStyle;
  italic: ItalicStyle;
  underline: Required<Pick<UnderlineStyle, 'underlineChar' | 'scale'>> & UnderlineStyle;
  code: CodeStyle;
  bullet: Required<Pick<BulletStyle, 'char' | 'indent' | 'gap' | 'spacing'>> & BulletStyle;
  paragraph: Required<Pick<ParagraphStyle, 'spacing'>> & ParagraphStyle;
  headings: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingStyle>;
  strikethrough: Required<Pick<StrikethroughStyle, 'strikeChar'>> & StrikethroughStyle;
  blockquote: Required<Pick<BlockquoteStyle, 'prefix' | 'indent' | 'spacing'>> & BlockquoteStyle;
}

/**
 * Inline style flags for an inline text span
 */
export interface TextStyleFlags {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  [customFlag: string]: boolean | undefined;
}

/**
 * An inline token span with its text and active style flags
 */
export interface InlineSpan {
  text: string;
  flags: TextStyleFlags;
}

/**
 * Block types supported in AST
 */
export type BlockNodeType =
  | 'paragraph'
  | 'bullet'
  | 'heading'
  | 'blockquote'
  | 'thematicBreak';

/**
 * Base AST block node
 */
export interface BaseBlockNode {
  type: BlockNodeType;
  spans: InlineSpan[];
}

/**
 * Paragraph AST node
 */
export interface ParagraphBlockNode extends BaseBlockNode {
  type: 'paragraph';
}

/**
 * Bullet AST node
 */
export interface BulletBlockNode extends BaseBlockNode {
  type: 'bullet';
  level: number;
  bulletChar?: string;
}

/**
 * Heading AST node
 */
export interface HeadingBlockNode extends BaseBlockNode {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Blockquote AST node
 */
export interface BlockquoteBlockNode extends BaseBlockNode {
  type: 'blockquote';
}

/**
 * Thematic break (horizontal rule) AST node
 */
export interface ThematicBreakBlockNode extends BaseBlockNode {
  type: 'thematicBreak';
}

export type BlockNode =
  | ParagraphBlockNode
  | BulletBlockNode
  | HeadingBlockNode
  | BlockquoteBlockNode
  | ThematicBreakBlockNode;

/**
 * Custom rule definitions for easy extensibility
 */
export interface CustomInlineRule {
  name: string;
  pattern: RegExp;
  flagKey: string;
}

export interface CustomBlockRule {
  name: string;
  match: (
    line: string,
    allLines: string[],
    lineIndex: number
  ) => { matched: boolean; consumedLines: number; node?: BlockNode } | null;
}

/**
 * A renderable item ready to be mapped to Drei's <Text>
 */
export interface RenderableTextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  z: number;
  fontSize: number;
  color: TextColor;
  font?: string;
  fontWeight?: 'normal' | 'bold' | number | string;
  fontStyle?: 'normal' | 'italic';
  letterSpacing?: number;
  outlineWidth?: number | string;
  outlineColor?: TextColor;
  strokeWidth?: number | string;
  strokeColor?: TextColor;
  fillOpacity?: number;
}

/**
 * Layout computation result
 */
export interface LayoutResult {
  items: RenderableTextItem[];
  totalWidth: number;
  totalHeight: number;
}

/**
 * Text alignment options
 */
export type TextAlignment = 'left' | 'center' | 'right';

/**
 * Container anchor options
 */
export type ContainerAnchor = 'top-left' | 'top-center' | 'center';

/**
 * Props for the Markdown component
 */
export interface MarkdownProps extends Omit<ComponentPropsWithoutRef<'group'>, 'children'> {
  /** The raw markdown string to render */
  content: string;
  /** Maximum width of the text container in 3D world units. Text wraps multiline within this width. */
  maxWidth: number;
  /** Custom styles for each markdown feature (font, color, fontSize, spacing, etc.) */
  styles?: MarkdownStyles;
  /** Text alignment across maxWidth: 'left' | 'center' | 'right' (default: 'left') */
  textAlign?: TextAlignment;
  /** Anchor origin: 'top-left' | 'top-center' | 'center' (default: 'top-left') */
  anchor?: ContainerAnchor;
  /** Optional custom inline rules for extensibility */
  customInlineRules?: CustomInlineRule[];
  /** Optional custom block rules for extensibility */
  customBlockRules?: CustomBlockRule[];
  /** Callback fired with calculated dimensions { width, height } */
  onLayout?: (dimensions: { width: number; height: number }) => void;
}
