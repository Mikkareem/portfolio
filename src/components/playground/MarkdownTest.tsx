import { Markdown } from "../../libs/markdown";

export function MarkdownTest() {
  const markdownContent = `
# 3D Markdown

This is a **bold statement** with *italic accents* and <u>underlined emphasis</u>.

Here is some inline \`const val = 100;\` code rendered in full 3D space.

* First key feature
* Second key feature with a longer sentence that automatically wraps across multiple lines and maintains proper hanging indent!
  * Sub-item nested cleanly

Paragraphs maintain comfortable spacing and strictly obey maxWidth.
  `.trim();

  return (
    <group scale={2} position={[-3, 5, 0]}>
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
            color: "#ffffff",
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
    </group>
  );
}
