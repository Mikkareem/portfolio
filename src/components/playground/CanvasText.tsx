import { extend } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";
import { MeshBasicNodeMaterial } from "three/webgpu";

extend({ MeshBasicNodeMaterial });

export function PublicFontText({ text = "Hello WebGPU" }) {
  const [texture, setTexture] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLocalFont() {
      try {
        const fontName = "LocalCustomFont";
        // Point directly to your public folder path
        const fontUrl = "/fonts/GoogleSans-Regular-Variable.ttf";

        // 1. Initialize FontFace with the local path
        const font = new FontFace(
          fontName,
          `url(${fontUrl}) format('truetype')`,
        );

        // 2. Wait for the browser to download and parse the local TTF file
        await font.load();
        document.fonts.add(font);

        if (!isMounted) return;

        // 3. Draw to canvas
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 256;
        const ctx: any = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold 90px '${fontName}', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // 4. Create texture
        const newTexture = new CanvasTexture(canvas);
        newTexture.colorSpace = SRGBColorSpace;
        setTexture(newTexture);
      } catch (err) {
        console.error("Failed to load local font from public folder:", err);
      }
    }

    loadLocalFont();

    return () => {
      isMounted = false;
    };
  }, [text]);

  if (!texture) return null;

  return (
    <mesh>
      <planeGeometry args={[4, 1]} />
      <meshBasicNodeMaterial map={texture} transparent={true} />
    </mesh>
  );
}
