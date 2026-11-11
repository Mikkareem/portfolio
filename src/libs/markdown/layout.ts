import type {
  BlockNode,
  ContainerAnchor,
  InlineSpan,
  LayoutResult,
  RenderableTextItem,
  ResolvedMarkdownStyles,
  TextAlignment,
  TextStyle,
  TextStyleFlags,
} from './types.ts';
import { getComputedSpanStyle } from './styles.ts';
import { measureTextWidth } from './measure.ts';

interface WordItem {
  text: string;
  spaceAfter: string;
  flags: TextStyleFlags;
  style: ReturnType<typeof getComputedSpanStyle>;
  width: number;
  spaceWidth: number;
}

interface MergedLineSpan {
  text: string;
  flags: TextStyleFlags;
  style: ReturnType<typeof getComputedSpanStyle>;
  width: number;
  hasTrailingSpace: boolean;
  trailingSpaceWidth: number;
}

/**
 * Splits inline spans into atomic words while tracking formatting flags and measurements.
 */
function tokenizeSpansIntoWords(
  spans: InlineSpan[],
  styles: ResolvedMarkdownStyles,
  blockOverride?: TextStyle
): WordItem[] {
  const words: WordItem[] = [];

  for (const span of spans) {
    const style = getComputedSpanStyle(span.flags, styles, blockOverride);
    const rawText = span.text;

    // Match word tokens and trailing spaces
    const regex = /(\S+)(\s*)/g;
    let match: RegExpExecArray | null;

    // Handle leading whitespace if the span starts with spaces
    const leadingSpaceMatch = rawText.match(/^(\s+)/);
    if (leadingSpaceMatch && words.length > 0) {
      // Append leading space to previous word's trailing space
      words[words.length - 1].spaceAfter += leadingSpaceMatch[1];
      words[words.length - 1].spaceWidth = measureTextWidth(
        words[words.length - 1].spaceAfter,
        words[words.length - 1].style
      );
    }

    while ((match = regex.exec(rawText)) !== null) {
      const wordText = match[1];
      const spaceAfter = match[2];

      const width = measureTextWidth(wordText, style);
      const spaceWidth = spaceAfter ? measureTextWidth(spaceAfter, style) : 0;

      words.push({
        text: wordText,
        spaceAfter,
        flags: span.flags,
        style,
        width,
        spaceWidth,
      });
    }
  }

  return words;
}

/**
 * Merges consecutive words on the same line that share identical formatting flags
 * to optimize Three.js meshes and allow natural kerning.
 */
function mergeWordsOnLine(words: WordItem[]): MergedLineSpan[] {
  const merged: MergedLineSpan[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = merged[merged.length - 1];

    const sameFlags =
      prev &&
      Boolean(prev.flags.bold) === Boolean(w.flags.bold) &&
      Boolean(prev.flags.italic) === Boolean(w.flags.italic) &&
      Boolean(prev.flags.underline) === Boolean(w.flags.underline) &&
      Boolean(prev.flags.code) === Boolean(w.flags.code) &&
      Boolean(prev.flags.strikethrough) === Boolean(w.flags.strikethrough);

    // If identical styles and prev had trailing space, merge into single span
    if (sameFlags) {
      prev.text += (prev.hasTrailingSpace ? ' ' : '') + w.text;
      prev.hasTrailingSpace = Boolean(w.spaceAfter);
      prev.trailingSpaceWidth = w.spaceWidth;
      // Re-measure full merged text
      prev.width = measureTextWidth(prev.text, prev.style);
    } else {
      merged.push({
        text: w.text,
        flags: w.flags,
        style: w.style,
        width: w.width,
        hasTrailingSpace: Boolean(w.spaceAfter),
        trailingSpaceWidth: w.spaceWidth,
      });
    }
  }

  return merged;
}

/**
 * Computes 3D coordinates for all text and formatting elements adhering strictly to maxWidth.
 */
export function layoutMarkdown(
  ast: BlockNode[],
  maxWidth: number,
  styles: ResolvedMarkdownStyles,
  textAlign: TextAlignment = 'left',
  anchor: ContainerAnchor = 'top-left'
): LayoutResult {
  const items: RenderableTextItem[] = [];
  let cursorY = 0;
  let itemIdCounter = 0;

  function nextId(prefix = 'txt'): string {
    return `${prefix}-${itemIdCounter++}`;
  }

  /**
   * Helper to lay out and render wrapped lines for a block
   */
  function layoutBlockLines(
    words: WordItem[],
    startX: number,
    availableWidth: number,
    lineHeight: number
  ): number {
    if (words.length === 0) return 0;

    let lineStartIdx = 0;
    let currentLineWidth = 0;
    let linesPlaced = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordFits =
        currentLineWidth + word.width <= availableWidth || i === lineStartIdx;

      if (!wordFits) {
        // Emit current line
        emitLine(words.slice(lineStartIdx, i), startX, availableWidth, cursorY);
        cursorY -= lineHeight;
        linesPlaced++;

        // Start new line
        lineStartIdx = i;
        currentLineWidth = word.width + (word.spaceAfter ? word.spaceWidth : 0);
      } else {
        currentLineWidth += word.width + (word.spaceAfter ? word.spaceWidth : 0);
      }
    }

    // Emit remaining words on the final line
    if (lineStartIdx < words.length) {
      emitLine(words.slice(lineStartIdx), startX, availableWidth, cursorY);
      cursorY -= lineHeight;
      linesPlaced++;
    }

    return linesPlaced;
  }

  /**
   * Emits a single line of merged spans with alignment and decoration
   */
  function emitLine(
    lineWords: WordItem[],
    startX: number,
    availableWidth: number,
    y: number
  ): void {
    if (lineWords.length === 0) return;

    const mergedSpans = mergeWordsOnLine(lineWords);

    // Calculate total line width (excluding trailing space of the last word)
    let totalLineWidth = 0;
    for (let i = 0; i < mergedSpans.length; i++) {
      totalLineWidth += mergedSpans[i].width;
      if (i < mergedSpans.length - 1 && mergedSpans[i].hasTrailingSpace) {
        totalLineWidth += mergedSpans[i].trailingSpaceWidth;
      }
    }

    // Determine alignment offset
    let alignOffset = 0;
    if (textAlign === 'center') {
      alignOffset = Math.max(0, (availableWidth - totalLineWidth) / 2);
    } else if (textAlign === 'right') {
      alignOffset = Math.max(0, availableWidth - totalLineWidth);
    }

    let currentX = startX + alignOffset;

    for (let i = 0; i < mergedSpans.length; i++) {
      const span = mergedSpans[i];
      const spanX = currentX;

      // 1. Text item
      items.push({
        id: nextId('span'),
        text: span.text,
        x: spanX,
        y,
        z: 0,
        fontSize: span.style.fontSize,
        color: span.style.color,
        font: span.style.font,
        fontWeight: span.style.fontWeight,
        fontStyle: span.style.fontStyle,
        letterSpacing: span.style.letterSpacing,
        outlineWidth: span.style.outlineWidth,
        outlineColor: span.style.outlineColor,
        strokeWidth: span.style.strokeWidth,
        strokeColor: span.style.strokeColor,
        fillOpacity: span.style.fillOpacity,
      });

      // 2. Underline decoration (using only Drei <Text>)
      if (span.flags.underline) {
        const uChar = styles.underline.underlineChar || '_';
        const uStyle = {
          fontSize: span.style.fontSize * (styles.underline.scale ?? 1),
          font: styles.underline.font || span.style.font,
          letterSpacing: 0,
        };
        const uCharWidth = Math.max(0.001, measureTextWidth(uChar, uStyle));
        const repeatCount = Math.max(1, Math.round(span.width / uCharWidth));
        const underlineText = uChar.repeat(repeatCount);
        const offsetY =
          styles.underline.offsetY !== undefined
            ? styles.underline.offsetY
            : span.style.fontSize * 0.92;

        items.push({
          id: nextId('underline'),
          text: underlineText,
          x: spanX,
          y: y - offsetY,
          z: 0.001, // Slight Z offset to prevent z-fighting in 3D
          fontSize: uStyle.fontSize,
          color: styles.underline.color || span.style.color,
          font: uStyle.font,
          letterSpacing: 0,
          fillOpacity: span.style.fillOpacity,
        });
      }

      // 3. Strikethrough decoration (using only Drei <Text>)
      if (span.flags.strikethrough) {
        const sChar = styles.strikethrough.strikeChar || '─';
        const sStyle = {
          fontSize: span.style.fontSize,
          font: span.style.font,
          letterSpacing: 0,
        };
        const sCharWidth = Math.max(0.001, measureTextWidth(sChar, sStyle));
        const repeatCount = Math.max(1, Math.round(span.width / sCharWidth));
        const strikeText = sChar.repeat(repeatCount);
        const offsetY = span.style.fontSize * 0.42;

        items.push({
          id: nextId('strike'),
          text: strikeText,
          x: spanX,
          y: y - offsetY,
          z: 0.001,
          fontSize: span.style.fontSize,
          color: styles.strikethrough.color || span.style.color,
          font: span.style.font,
          letterSpacing: 0,
          fillOpacity: span.style.fillOpacity,
        });
      }

      // Advance X for next span
      currentX += span.width;
      if (i < mergedSpans.length - 1 && span.hasTrailingSpace) {
        currentX += span.trailingSpaceWidth;
      }
    }
  }

  // Iterate over blocks in AST
  for (let b = 0; b < ast.length; b++) {
    const block = ast[b];

    switch (block.type) {
      case 'heading': {
        const headingStyle = styles.headings[`h${block.level}`] || styles.headings.h1;
        const fontSize = headingStyle.fontSize ?? styles.base.fontSize;
        const lineHeight = fontSize * (headingStyle.lineHeight ?? 1.3);

        cursorY -= headingStyle.spacingTop ?? 0.15;

        const words = tokenizeSpansIntoWords(block.spans, styles, headingStyle);
        layoutBlockLines(words, 0, maxWidth, lineHeight);

        cursorY -= headingStyle.spacingBottom ?? 0.1;
        break;
      }

      case 'paragraph': {
        const fontSize = styles.base.fontSize;
        const lineHeight = fontSize * (styles.base.lineHeight ?? 1.4);

        const words = tokenizeSpansIntoWords(block.spans, styles);
        layoutBlockLines(words, 0, maxWidth, lineHeight);

        cursorY -= styles.paragraph.spacing ?? 0.15;
        break;
      }

      case 'bullet': {
        const fontSize = styles.base.fontSize;
        const lineHeight = fontSize * (styles.base.lineHeight ?? 1.4);

        const indentLevel = block.level;
        const indentX = indentLevel * (styles.bullet.indent ?? 0.35);

        const bulletChar = styles.bullet.char || '•';
        const bulletStyle = {
          fontSize: styles.bullet.fontSize ?? fontSize,
          color: styles.bullet.color ?? styles.base.color,
          font: styles.bullet.font ?? styles.base.font,
          fontWeight: styles.bullet.fontWeight ?? 'bold',
        };

        const markerWidth = measureTextWidth(bulletChar, bulletStyle);
        const gap = styles.bullet.gap ?? 0.12;

        // Render bullet marker via Drei <Text>
        items.push({
          id: nextId('bullet-marker'),
          text: bulletChar,
          x: indentX,
          y: cursorY,
          z: 0,
          fontSize: bulletStyle.fontSize,
          color: bulletStyle.color,
          font: bulletStyle.font,
          fontWeight: bulletStyle.fontWeight,
        });

        // Content lines start indented past the bullet marker
        const contentStartX = indentX + markerWidth + gap;
        const contentAvailableWidth = Math.max(0.1, maxWidth - contentStartX);

        const words = tokenizeSpansIntoWords(block.spans, styles);
        layoutBlockLines(words, contentStartX, contentAvailableWidth, lineHeight);

        cursorY -= styles.bullet.spacing ?? 0.08;
        break;
      }

      case 'blockquote': {
        const fontSize = styles.base.fontSize;
        const lineHeight = fontSize * (styles.base.lineHeight ?? 1.4);
        const indentX = styles.blockquote.indent ?? 0.25;
        const prefix = styles.blockquote.prefix ?? '▌';

        cursorY -= styles.blockquote.spacing ?? 0.12;

        // Render quote bar/prefix via Drei <Text>
        items.push({
          id: nextId('quote-prefix'),
          text: prefix,
          x: 0,
          y: cursorY,
          z: 0,
          fontSize,
          color: styles.blockquote.color ?? styles.base.color,
        });

        const availableWidth = Math.max(0.1, maxWidth - indentX);
        const words = tokenizeSpansIntoWords(block.spans, styles, styles.blockquote);
        layoutBlockLines(words, indentX, availableWidth, lineHeight);

        cursorY -= styles.blockquote.spacing ?? 0.12;
        break;
      }

      case 'thematicBreak': {
        const hrChar = styles.strikethrough.strikeChar || '─';
        const hrStyle = {
          fontSize: styles.base.fontSize * 0.8,
          font: styles.base.font,
        };
        const charWidth = Math.max(0.001, measureTextWidth(hrChar, hrStyle));
        const repeatCount = Math.max(1, Math.round(maxWidth / charWidth));
        const hrText = hrChar.repeat(repeatCount);

        cursorY -= styles.base.fontSize * 0.5;

        items.push({
          id: nextId('hr'),
          text: hrText,
          x: 0,
          y: cursorY,
          z: 0,
          fontSize: hrStyle.fontSize,
          color: styles.base.color,
          font: hrStyle.font,
          fillOpacity: 0.5,
        });

        cursorY -= styles.base.fontSize * 0.8;
        break;
      }
    }
  }

  const totalHeight = Math.abs(cursorY);
  const totalWidth = maxWidth;

  // Apply anchor translation if needed
  if (anchor === 'top-center' || anchor === 'center') {
    const shiftX = -maxWidth / 2;
    const shiftY = anchor === 'center' ? totalHeight / 2 : 0;

    for (const item of items) {
      item.x += shiftX;
      item.y += shiftY;
    }
  }

  return {
    items,
    totalWidth,
    totalHeight,
  };
}
