# 3D Markdown Renderer for React Three Fiber

A high-performance, modular, and extensible Markdown renderer built exclusively using `@react-three/drei`'s `<Text>` component.

Designed specifically for **Full 3D Applications**:
- **Zero HTML tags or DOM overlays** (`<Html>` is NOT used). All typography renders directly into the WebGL scene as 3D meshes.
- **Strictly obeys `maxWidth`** with automatic word-wrapping across multiple lines.
- **Rich inline formatting**: Bold, Italic, Bold + Italic, Underline, and Inline Code.
- **Block-level support**: Paragraphs with configurable vertical spacing, and Bullet lists with hanging indentation.
- **Built-in extensions**: Headings (H1 to H6), Strikethrough, Blockquotes, and Thematic breaks (HR).
- **Easily extendable**: Register custom inline regex patterns and custom block-level parser rules.

---

## Installation & Import

Import directly from your markdown library:

```tsx
import { Markdown } from './libs/markdown';
```

---

## Basic Usage

```tsx
import { Canvas } from '@react-three/fiber';
import { Markdown } from './libs/markdown';

export function Scene() {
  const markdownText = `
# Welcome to 3D Space

This is a **bold statement** with *italic flair* and <u>underlined precision</u>.

Here is some inline \`const speed = 42;\` code that stays crisp in 3D.

* First key feature
* Second key feature with a very long sentence that wraps cleanly across multiple lines and maintains hanging indentation!
  * Sub-bullet level 1

Paragraphs maintain comfortable vertical spacing automatically.
  `.trim();

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Render Markdown in 3D */}
      <Markdown
        content={markdownText}
        maxWidth={3.5}
        position={[-1.75, 1.5, 0]}
      />
    </Canvas>
  );
}
```

---

## Props & Inputs

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | *(required)* | The raw Markdown text to render. |
| `maxWidth` | `number` | *(required)* | Maximum container width in 3D world units. Multiline text wraps strictly within this boundary. |
| `styles` | `MarkdownStyles` | *(defaults)* | Custom styles for each markdown feature (font, color, fontSize, etc.). |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal text alignment within `maxWidth`. |
| `anchor` | `'top-left' \| 'top-center' \| 'center'` | `'top-left'` | Anchor origin for 3D positioning and centering. |
| `customInlineRules` | `CustomInlineRule[]` | `[]` | Additional custom inline regex rules. |
| `customBlockRules` | `CustomBlockRule[]` | `[]` | Additional custom block parsing rules. |
| `onLayout` | `(dims: { width, height }) => void` | `undefined` | Callback invoked with calculated 3D container dimensions. |
| ...groupProps | `ThreeElements['group']` | | Standard R3F `position`, `rotation`, `scale`, etc. |

---

## Styling Each Feature

Every feature supports full style customization:

```tsx
<Markdown
  content={markdownText}
  maxWidth={4.0}
  styles={{
    // Base style for regular body text
    base: {
      fontSize: 0.22,
      color: '#e0e0e0',
      lineHeight: 1.45,
      letterSpacing: 0.005,
      font: '/fonts/GoogleSans-Regular-Variable.ttf',
    },

    // Bold text style (**bold** or __bold__)
    bold: {
      fontWeight: 'bold',
      color: '#ffffff',
      font: '/fonts/GoogleSans-Regular-Variable.ttf',
    },

    // Italic text style (*italic* or _italic_)
    italic: {
      fontStyle: 'italic',
      color: '#90caf9',
      font: '/fonts/GoogleSans-Italic-Variable.ttf',
    },

    // Underline text style (<u>text</u> or ++text++)
    underline: {
      color: '#ffb74d',
      underlineChar: '_', // Character used to render underline in 3D
      offsetY: 0.2,       // Vertical offset below baseline
    },

    // Inline code (`code`)
    code: {
      color: '#e5c07b',
      letterSpacing: 0.02,
      outlineWidth: 0.004,
      outlineColor: '#282c34',
    },

    // Bullet points (*, -, +, •)
    bullet: {
      char: '•',          // Bullet symbol
      color: '#4fc3f7',   // Marker color
      indent: 0.35,       // Indentation per nesting level
      gap: 0.12,          // Space between marker and text
      spacing: 0.08,      // Vertical spacing between items
    },

    // Paragraphs
    paragraph: {
      spacing: 0.18,      // Vertical spacing between paragraphs
    },

    // Headings
    headings: {
      h1: { fontSize: 0.45, color: '#ffffff', spacingBottom: 0.12 },
      h2: { fontSize: 0.35, color: '#e0e0e0', spacingBottom: 0.10 },
      h3: { fontSize: 0.28, color: '#bdbdbd', spacingBottom: 0.08 },
    },
  }}
/>
```

---

## Supported Features

### 1. Bold
- Syntax: `**bold**` or `__bold__`
- Combines with other styles seamlessly (e.g., `**bold with *italic* inside**`).

### 2. Italic
- Syntax: `*italic*` or `_italic_`

### 3. Bold + Italic
- Syntax: `***bold and italic***` or `___bold and italic___`

### 4. Underline
- Syntax: `<u>underlined text</u>` or `++underlined text++`
- Rendered using pure `@react-three/drei` `<Text>` characters positioned beneath the text.

### 5. Inline Code Text
- Syntax: `` `inline code` ``
- Shielded from other markdown formatting. Distinct color and monospace font option.

### 6. Bullet Points & Nested Lists
- Syntax:
  ```markdown
  * Item 1
  * Item 2 with a long sentence that automatically wraps across lines!
    * Sub-item 2a (2 spaces)
      * Sub-sub-item 2a1 (4 spaces)
  - Also supports dashes
  + Also supports pluses
  • Also supports unicode bullet symbols
  ```
- Sub-lines are automatically indented past the bullet marker (hanging indent).

### 7. Paragraphs
- Multiple lines separated by blank lines (`\n\n`) form paragraphs.
- Configurable `styles.paragraph.spacing`.

### 8. Built-in Extensions
- **Headings**: `# H1` through `###### H6`
- **Strikethrough**: `~~deleted text~~`
- **Blockquotes**: `> quoted text`
- **Thematic Breaks (Horizontal Rules)**: `---`, `***`, `___`

---

## Extending with Custom Rules

You can add custom inline rules or block rules without modifying core files:

```tsx
<Markdown
  content="Check out this [badge:FEATURED] item!"
  maxWidth={3.0}
  customInlineRules={[
    {
      name: 'badge',
      pattern: /\[badge:([^\]]+)\]/,
      flagKey: 'isBadge',
    },
  ]}
  styles={{
    base: { color: 'white' },
  }}
/>
```

---

## Architecture

- **`types.ts`**: TypeScript definitions for styles, AST tokens, and props.
- **`parser.ts`**: Modular lexer producing block-level AST and inline formatting spans with arbitrary nesting.
- **`measure.ts`**: Canvas 2D measurement in world units with high-speed memoization and fallback.
- **`layout.ts`**: Pure 3D layout engine computing coordinates, line breaks, word wrapping within `maxWidth`, and underline geometry.
- **`styles.ts`**: Style inheritance, defaults, and multi-attribute span style resolution.
- **`Markdown.tsx`**: React Three Fiber component rendering only `<Text>` of Drei.
