import { useState } from "react";
import { Markdown } from "../../libs/markdown";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { extend } from "@react-three/fiber";

extend({ RoundedBoxGeometry });

const PADDING = 0.2;

export function MarkdownCard() {
  const [markdownTextSize, setMarkdownTextSize] = useState({ w: 0, h: 0 });

  const contentWidth = markdownTextSize.w;
  const contentHeight = markdownTextSize.h;

  const cardWidth = contentWidth + 2 * PADDING;
  const cardHeight = contentHeight + 2 * PADDING;

  return (
    <group>
      <mesh position={[0, 0, -(1.0 / 2.0 + 0.001)]}>
        {/* width, height, depth, segments, radius*/}
        {/* @ts-expect-error */}
        <roundedBoxGeometry
          args={[cardWidth + 2 * PADDING, cardHeight + 2 * PADDING, 1, 2, 0.6]}
        />
        ;
        <meshStandardMaterial
          color={"red"} //{"#f283b6"}
          metalness={0.34}
          roughness={0.23}
        />
      </mesh>

      <group position={[-cardWidth / 2.0, cardHeight / 2.0, 0]}>
        <Markdown
          content={markdownContent}
          maxWidth={10}
          position={[PADDING, -PADDING, 0]}
          onLayout={(dim) => {
            setMarkdownTextSize({
              w: dim.width,
              h: dim.height,
            });
          }}
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
    </group>
  );
}

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
