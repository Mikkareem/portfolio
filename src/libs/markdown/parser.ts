import type {
  BlockNode,
  CustomBlockRule,
  CustomInlineRule,
  InlineSpan,
  TextStyleFlags,
} from './types.ts';

/**
 * Standard inline parsing rule definition
 */
interface InternalInlineRule {
  name: string;
  pattern: RegExp;
  flagUpdates: TextStyleFlags;
}

/**
 * Default inline formatting rules in order of precedence:
 * 1. Code blocks (shielded so inner characters are literal)
 * 2. Bold + Italic (***text*** or ___text___)
 * 3. Bold (**text** or __text__)
 * 4. Italic (*text* or _text_)
 * 5. Underline (<u>text</u> or ++text++)
 * 6. Strikethrough (~~text~~)
 */
const DEFAULT_INLINE_RULES: InternalInlineRule[] = [
  // 1. Inline code: `code` (highest precedence, shields inner text)
  {
    name: 'code',
    pattern: /`([^`]+)`/,
    flagUpdates: { code: true },
  },
  // 2. Underline: <u>text</u> or ++text++ (container tags run before inline style markers)
  {
    name: 'underline',
    pattern: /(?:<u>([\s\S]*?)<\/u>|\+\+([\s\S]+?)\+\+)/i,
    flagUpdates: { underline: true },
  },
  // 3. Strikethrough: ~~text~~
  {
    name: 'strikethrough',
    pattern: /~~([\s\S]+?)~~/,
    flagUpdates: { strikethrough: true },
  },
  // 4. Bold + Italic: ***text*** or ___text___
  {
    name: 'boldItalic',
    pattern: /(?:\*\*\*([\s\S]+?)\*\*\*|___([\s\S]+?)___)/,
    flagUpdates: { bold: true, italic: true },
  },
  // 5. Bold: **text** or __text__
  {
    name: 'bold',
    pattern: /(?:\*\*([\s\S]+?)\*\*|__([\s\S]+?)__)/,
    flagUpdates: { bold: true },
  },
  // 6. Italic: *text* or _text_
  {
    name: 'italic',
    pattern: /(?:\*([\s\S]+?)\*|_([\s\S]+?)_)/,
    flagUpdates: { italic: true },
  },
];

/**
 * Splits inline text into spans with active formatting flags, supporting nested rules.
 */
export function parseInlineTokens(
  rawText: string,
  customRules?: CustomInlineRule[]
): InlineSpan[] {
  let chunks: InlineSpan[] = [{ text: rawText, flags: {} }];

  // Combine default rules with any user-supplied custom inline rules
  const allRules: InternalInlineRule[] = [...DEFAULT_INLINE_RULES];

  if (customRules && customRules.length > 0) {
    for (const cr of customRules) {
      allRules.push({
        name: cr.name,
        pattern: cr.pattern,
        flagUpdates: { [cr.flagKey]: true },
      });
    }
  }

  // Sequentially apply each inline rule to unshielded text chunks
  for (const rule of allRules) {
    const nextChunks: InlineSpan[] = [];

    for (const chunk of chunks) {
      // Inline code is shielded from any other formatting
      if (chunk.flags.code) {
        nextChunks.push(chunk);
        continue;
      }

      // If this chunk already has all the flags this rule applies, skip regex
      const hasAllFlags = Object.entries(rule.flagUpdates).every(
        ([key, val]) => val === undefined || chunk.flags[key] === val
      );
      if (hasAllFlags && rule.name !== 'code') {
        nextChunks.push(chunk);
        continue;
      }

      const str = chunk.text;
      // Ensure global matching
      const regex = new RegExp(
        rule.pattern.source,
        rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g'
      );

      let lastIndex = 0;
      let match: RegExpExecArray | null;
      let matchedAny = false;

      while ((match = regex.exec(str)) !== null) {
        matchedAny = true;
        // Text preceding match
        if (match.index > lastIndex) {
          nextChunks.push({
            text: str.slice(lastIndex, match.index),
            flags: { ...chunk.flags },
          });
        }

        // Captured inner content (find the first defined capture group, or entire match)
        let captured = match[0];
        for (let i = 1; i < match.length; i++) {
          if (match[i] !== undefined) {
            captured = match[i];
            break;
          }
        }

        nextChunks.push({
          text: captured,
          flags: { ...chunk.flags, ...rule.flagUpdates },
        });

        lastIndex = regex.lastIndex;
      }

      if (!matchedAny) {
        nextChunks.push(chunk);
      } else if (lastIndex < str.length) {
        nextChunks.push({
          text: str.slice(lastIndex),
          flags: { ...chunk.flags },
        });
      }
    }

    chunks = nextChunks;
  }

  // Filter out empty spans
  return chunks.filter((c) => c.text.length > 0);
}

/**
 * Parses raw markdown text into block-level AST nodes
 */
export function parseMarkdown(
  markdown: string,
  customInlineRules?: CustomInlineRule[],
  customBlockRules?: CustomBlockRule[]
): BlockNode[] {
  if (!markdown) return [];

  // Normalize newlines
  const normalized = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n');
  const blocks: BlockNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines between blocks
    if (trimmed.length === 0) {
      i++;
      continue;
    }

    // 1. Check custom block rules first for extensibility
    let matchedCustom = false;
    if (customBlockRules && customBlockRules.length > 0) {
      for (const rule of customBlockRules) {
        const result = rule.match(rawLine, lines, i);
        if (result && result.matched) {
          if (result.node) {
            blocks.push(result.node);
          }
          i += Math.max(1, result.consumedLines);
          matchedCustom = true;
          break;
        }
      }
    }
    if (matchedCustom) continue;

    // 2. Thematic Break / Horizontal Rule: ---, ***, ___
    if (/^(?:---|\*\*\*|___)\s*$/.test(trimmed)) {
      blocks.push({
        type: 'thematicBreak',
        spans: [],
      });
      i++;
      continue;
    }

    // 3. Headings: # H1 through ###### H6
    const headingMatch = rawLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      const content = headingMatch[2].trim();
      blocks.push({
        type: 'heading',
        level,
        spans: parseInlineTokens(content, customInlineRules),
      });
      i++;
      continue;
    }

    // 4. Blockquotes: > quote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        spans: parseInlineTokens(quoteLines.join(' '), customInlineRules),
      });
      continue;
    }

    // 5. Bullet points: * item, - item, + item, • item
    const bulletMatch = rawLine.match(/^(\s*)([*+-]|•)\s+(.*)$/);
    if (bulletMatch) {
      const indentSpaces = bulletMatch[1].length;
      const level = Math.floor(indentSpaces / 2);
      const bulletChar = bulletMatch[2];
      const itemLines: string[] = [bulletMatch[3]];
      i++;

      // Check if subsequent lines belong to this list item (indented continuation)
      while (i < lines.length) {
        const nextLine = lines[i];
        if (nextLine.trim().length === 0) break;
        // If next line starts a new bullet item or heading, break
        if (/^(\s*)([*+-]|•)\s+/.test(nextLine) || /^#{1,6}\s+/.test(nextLine)) {
          break;
        }
        itemLines.push(nextLine.trim());
        i++;
      }

      blocks.push({
        type: 'bullet',
        level,
        bulletChar,
        spans: parseInlineTokens(itemLines.join(' '), customInlineRules),
      });
      continue;
    }

    // 6. Paragraphs: collect consecutive non-empty lines
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i];
      if (current.trim().length === 0) break;
      // Stop paragraph if next line is a bullet, heading, blockquote, or horizontal rule
      if (
        /^(\s*)([*+-]|•)\s+/.test(current) ||
        /^#{1,6}\s+/.test(current) ||
        current.trim().startsWith('>') ||
        /^(?:---|\*\*\*|___)\s*$/.test(current.trim())
      ) {
        break;
      }
      paragraphLines.push(current.trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        spans: parseInlineTokens(paragraphLines.join(' '), customInlineRules),
      });
    }
  }

  return blocks;
}
