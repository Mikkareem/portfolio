import React, { useMemo, useEffect } from 'react';
import { Text } from '@react-three/drei';
import type { MarkdownProps } from './types.ts';
import { resolveStyles } from './styles.ts';
import { parseMarkdown } from './parser.ts';
import { layoutMarkdown } from './layout.ts';

/**
 * 3D Markdown Renderer for React Three Fiber using exclusively Drei's <Text> component.
 *
 * Supports:
 * - Multiline text wrapped strictly adhering to maxWidth
 * - Paragraphs with configurable vertical spacing
 * - Bullet points with indentation, markers, and hanging indents
 * - Bold (**bold** or __bold__)
 * - Italic (*italic* or _italic_)
 * - Bold + Italic (***text*** or ___text___)
 * - Underline (<u>text</u> or ++text++) rendered in 3D using <Text>
 * - Inline Code (`code`) with custom color, font, or outline
 * - Headings (# H1 to ###### H6), Strikethrough (~~del~~), Blockquotes (> quote)
 * - Easily extendable with custom inline and block rules
 *
 * Full 3D application friendly: Absolutely NO HTML tags or DOM elements are used.
 */
export const Markdown: React.FC<MarkdownProps> = ({
  content,
  maxWidth,
  styles: userStyles,
  textAlign = 'left',
  anchor = 'top-left',
  customInlineRules,
  customBlockRules,
  onLayout,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  ...groupProps
}) => {
  // 1. Resolve and memoize styles
  const resolvedStyles = useMemo(() => resolveStyles(userStyles), [userStyles]);

  // 2. Parse markdown into AST blocks and tokens
  const ast = useMemo(
    () => parseMarkdown(content, customInlineRules, customBlockRules),
    [content, customInlineRules, customBlockRules]
  );

  // 3. Compute 3D layout adhering to maxWidth
  const { items, totalWidth, totalHeight } = useMemo(() => {
    return layoutMarkdown(ast, maxWidth, resolvedStyles, textAlign, anchor);
  }, [ast, maxWidth, resolvedStyles, textAlign, anchor]);

  // 4. Notify parent of calculated 3D bounds if requested
  useEffect(() => {
    onLayout?.({ width: totalWidth, height: totalHeight });
  }, [totalWidth, totalHeight, onLayout]);

  return (
    <group position={position} rotation={rotation} scale={scale} {...groupProps}>
      {items.map((item) => (
        <Text
          key={item.id}
          font={item.font}
          fontSize={item.fontSize}
          color={item.color}
          fontWeight={item.fontWeight}
          fontStyle={item.fontStyle}
          letterSpacing={item.letterSpacing}
          outlineWidth={item.outlineWidth}
          outlineColor={item.outlineColor}
          strokeWidth={item.strokeWidth}
          strokeColor={item.strokeColor}
          fillOpacity={item.fillOpacity}
          anchorX="left"
          anchorY="top"
          position={[item.x, item.y, item.z]}
        >
          {item.text}
        </Text>
      ))}
    </group>
  );
};
