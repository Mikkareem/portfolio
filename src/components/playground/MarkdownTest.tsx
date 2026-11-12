import { Markdown } from "../../libs/markdown";
import AdBoard from "./AdBoard";

export function MarkdownTest() {
  const markdownContent = `
# 3D Markdown

This is a **bold statement** with *italic accents* .

Here is some inline \`const val = 100;\` code rendered in full 3D space.

* First key feature
* Second key feature with a longer sentence that automatically wraps across multiple lines and maintains proper hanging indent!
  * Sub-item nested cleanly
    * SS

Paragraphs maintain comfortable spacing and strictly obey maxWidth.
  `.trim();

  return (
    <group scale={1.5} position={[0, 0, 0]}>
      <AdBoard scaleFactorX={0.18} scaleFactorY={0.22} isTranslationRequired>
        <Markdown
          content={markdownContent}
          maxWidth={6}
          position={[0, 0, 0]}
          styles={{
            base: {
              fontSize: 0.22,
              color: "#ffffff",
              lineHeight: 1.4,
            },
            bold: {
              fontWeight: "bold",
            },
            italic: {
              fontStyle: "italic",
              color: "#90caf9",
            },
            underline: {
              color: "#ffb74d",
              underlineChar: "_",
            },
            code: {
              color: "#e5c07b",
              letterSpacing: 0.02,
            },
            bullet: {
              char: "•",
              color: "#4fc3f7",
              indent: 0.35,
              spacing: 0.08,
            },
            paragraph: {
              spacing: 0.16,
            },
          }}
        />
      </AdBoard>
    </group>
  );
}
