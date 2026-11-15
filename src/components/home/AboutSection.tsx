import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { degToRad } from "three/src/math/MathUtils.js";
import type { BoundingBox } from "../../presentation/Types";
import AdBoard from "../playground/AdBoard";
import {
  FloatingActionButton,
  type FloatingActionButtonProps,
} from "./FloatingActionButton";
import { SimpleAboutCard } from "./SimpleAboutCard";

export function AboutSection({ bounds }: { bounds: BoundingBox }) {
  const viewport = useThree((t) => t.viewport);
  const navigate = useNavigate();

  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 2,
  };

  const isWide = viewport.width >= 13.5;
  // At z = 2 (camera at z = 15), visible frustum is 13/15 (~0.8667) of z=0 viewport
  const frustumRatio = (15 - 2) / 15;
  const visW = viewport.width * frustumRatio;
  const visH = viewport.height * frustumRatio;

  const responsiveScale = isWide
    ? 0.8
    : Math.min(
        0.55,
        (viewport.width * 0.72) / 8.0,
        (viewport.height * 0.72) / 7.0,
      );

  const rotationY = isWide ? degToRad(-25) : 0;

  // Responsive button scaling & layout
  const btnScale = isWide
    ? Math.min(1.0, visW / 16)
    : Math.min(0.85, (visW * 0.44) / 3.0);

  const buttonConfigs: FloatingActionButtonProps[] = isWide
    ? [
        {
          label: "My Articles",
          type: "articles",
          position: [
            -Math.min(visW * 0.36, 6.6),
            Math.min(visH * 0.32, 2.85),
            0.35,
          ],
          accentColor: "#10b981",
          glowColor: "#34d399",
          baseWidth: 2.95,
          scale: btnScale,
          floatSpeed: 1.8,
          floatRotation: 0.08,
          floatIntensity: 0.45,
          floatingRange: [-0.05, 0.05],
          isExternal: false,
          onClick: () => navigate("/articles"),
        },
        {
          label: "Read More\n about me",
          type: "about",
          textAlign: "center",
          position: [
            -Math.min(visW * 0.35, 6.5),
            -Math.min(visH * 0.32, 2.85),
            0.35,
          ],
          accentColor: "#8b5cf6",
          glowColor: "#a78bfa",
          baseWidth: 2.85,
          baseHeight: 0.92,
          scale: btnScale,
          floatSpeed: 1.5,
          floatRotation: 0.06,
          floatIntensity: 0.4,
          floatingRange: [-0.04, 0.05],
          isExternal: false,
          onClick: () => navigate("/about"),
        },
        {
          label: "GitHub",
          type: "github",
          position: [
            Math.min(visW * 0.36, 6.6),
            Math.min(visH * 0.32, 2.85),
            0.35,
          ],
          accentColor: "#0ea5e9",
          glowColor: "#38bdf8",
          baseWidth: 2.35,
          scale: btnScale,
          floatSpeed: 2.0,
          floatRotation: 0.08,
          floatIntensity: 0.48,
          floatingRange: [-0.05, 0.05],
          isExternal: true,
          onClick: () => window.open("https://github.com/Mikkareem", "_blank"),
        },
        {
          label: "Contact Me",
          type: "contact",
          position: [
            Math.min(visW * 0.35, 6.5),
            -Math.min(visH * 0.32, 2.85),
            0.35,
          ],
          accentColor: "#f43f5e",
          glowColor: "#fb7185",
          baseWidth: 2.85,
          scale: btnScale,
          floatSpeed: 1.7,
          floatRotation: 0.07,
          floatIntensity: 0.42,
          floatingRange: [-0.05, 0.05],
          isExternal: true,
          onClick: () => {
            window.location.href = "mailto:mohdirsath1997@gmail.com";
          },
        },
      ]
    : [
        {
          label: "My Articles",
          type: "articles",
          position: [-visW * 0.24, Math.min(visH * 0.36, 4.3), 0.35],
          accentColor: "#10b981",
          glowColor: "#34d399",
          baseWidth: 2.95,
          scale: btnScale,
          floatSpeed: 1.8,
          floatRotation: 0.08,
          floatIntensity: 0.45,
          floatingRange: [-0.05, 0.05],
          isExternal: false,
          onClick: () => navigate("/articles"),
        },
        {
          label: "GitHub",
          type: "github",
          position: [visW * 0.24, Math.min(visH * 0.26, 3.1), 0.35],
          accentColor: "#0ea5e9",
          glowColor: "#38bdf8",
          baseWidth: 2.35,
          scale: btnScale,
          floatSpeed: 2.0,
          floatRotation: 0.08,
          floatIntensity: 0.48,
          floatingRange: [-0.05, 0.05],
          isExternal: true,
          onClick: () => window.open("https://github.com/Mikkareem", "_blank"),
        },
        {
          label: "Read More\n about me",
          type: "about",
          textAlign: "center",
          position: [-visW * 0.23, -Math.min(visH * 0.26, 3.1), 0.35],
          accentColor: "#8b5cf6",
          glowColor: "#a78bfa",
          baseWidth: 2.85,
          baseHeight: 0.92,
          scale: btnScale,
          floatSpeed: 1.5,
          floatRotation: 0.06,
          floatIntensity: 0.4,
          floatingRange: [-0.04, 0.05],
          isExternal: false,
          onClick: () => navigate("/about"),
        },
        {
          label: "Contact Me",
          type: "contact",
          position: [visW * 0.23, -Math.min(visH * 0.36, 4.3), 0.35],
          accentColor: "#f43f5e",
          glowColor: "#fb7185",
          baseWidth: 2.85,
          scale: btnScale,
          floatSpeed: 1.7,
          floatRotation: 0.07,
          floatIntensity: 0.42,
          floatingRange: [-0.05, 0.05],
          isExternal: true,
          onClick: () => {
            window.location.href = "mailto:mohdirsath1997@gmail.com";
          },
        },
      ];

  return (
    <>
      <group position={[middle.x, middle.y, middle.z]}>
        {/* Central AdBoard Billboard */}
        <group
          rotation-y={rotationY}
          scale={[responsiveScale, responsiveScale, 1]}
        >
          <AdBoard scaleFactorX={0.07} scaleFactorY={0} color={"#56ff34"}>
            <SimpleAboutCard scale={1.6} />
          </AdBoard>
        </group>

        {/* 4 Floating Action Buttons around the viewport */}
        {buttonConfigs.map((cfg) => (
          <FloatingActionButton key={cfg.label} {...cfg} />
        ))}
      </group>
    </>
  );
}
