import { useRef, useState, useMemo, useEffect } from "react";
import { Float, RoundedBox, Text } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { Fonts } from "../../presentation/Core";

export type FloatingActionType = "articles" | "about" | "github" | "contact" | "home";

export interface FloatingActionButtonProps {
  label: string;
  type: FloatingActionType;
  position: [number, number, number];
  accentColor: string;
  glowColor?: string;
  baseWidth?: number;
  baseHeight?: number;
  textAlign?: "left" | "center" | "right";
  scale?: number;
  floatSpeed?: number;
  floatRotation?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  isExternal?: boolean;
  onClick: () => void;
}

function createIconTexture(type: FloatingActionType): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 128, 128);

  const paths: Record<FloatingActionType, string> = {
    github:
      "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    articles:
      "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    about:
      "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    contact:
      "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    home:
      "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  };

  const pathStr = paths[type] || paths.about;
  ctx.save();
  ctx.translate(16, 16);
  ctx.scale(4, 4);
  ctx.fillStyle = "#ffffff";
  const p = new Path2D(pathStr);
  ctx.fill(p);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function createArrowTexture(isExternal: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 128, 128);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (isExternal) {
    // ↗ bold prominent external arrow
    ctx.beginPath();
    ctx.moveTo(32, 96);
    ctx.lineTo(96, 32);
    ctx.moveTo(48, 32);
    ctx.lineTo(96, 32);
    ctx.lineTo(96, 80);
    ctx.stroke();
  } else {
    // → bold prominent forward arrow
    ctx.beginPath();
    ctx.moveTo(24, 64);
    ctx.lineTo(104, 64);
    ctx.moveTo(68, 28);
    ctx.lineTo(104, 64);
    ctx.lineTo(68, 100);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function FloatingActionButton({
  label,
  type,
  position,
  accentColor,
  glowColor = accentColor,
  baseWidth = 2.85,
  baseHeight,
  textAlign,
  scale = 1,
  floatSpeed = 2.0,
  floatRotation = 0.08,
  floatIntensity = 0.45,
  floatingRange = [-0.05, 0.05],
  isExternal = false,
  onClick,
}: FloatingActionButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const containerRef = useRef<THREE.Group>(null);
  const visualGroupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const outlineMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const badgeMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const arrowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const isMultiline = label.includes("\n");
  const height = baseHeight ?? (isMultiline ? 0.92 : 0.68);
  const radius = 0.34;
  const depth = 0.11;

  const effectiveTextAlign = textAlign ?? (isMultiline ? "center" : "left");
  const isCenter = effectiveTextAlign === "center";
  const textX = isCenter ? 0.05 : -baseWidth / 2 + 0.72;

  const iconTexture = useMemo(() => createIconTexture(type), [type]);
  const arrowTexture = useMemo(() => createArrowTexture(isExternal), [isExternal]);

  // Clean up cursor and textures on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
      iconTexture.dispose();
      arrowTexture.dispose();
    };
  }, [iconTexture, arrowTexture]);

  // Silky smooth GSAP animations targeting the visual group & materials
  useGSAP(() => {
    if (!visualGroupRef.current) return;

    if (pressed) {
      // Snappy compress on pointer down
      gsap.to(visualGroupRef.current.scale, {
        x: 0.94,
        y: 0.94,
        z: 0.94,
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(visualGroupRef.current.position, {
        z: -0.04,
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else if (hovered) {
      // Smooth expand on hover
      gsap.to(visualGroupRef.current.scale, {
        x: 1.08,
        y: 1.08,
        z: 1.08,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(visualGroupRef.current.position, {
        z: 0.15,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Material glow transition
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          emissiveIntensity: 0.65,
          roughness: 0.2,
          duration: 0.22,
          overwrite: "auto",
        });
      }
      if (outlineMatRef.current) {
        gsap.to(outlineMatRef.current, {
          opacity: 0.55,
          duration: 0.22,
          overwrite: "auto",
        });
      }
      if (badgeMatRef.current) {
        gsap.to(badgeMatRef.current, {
          emissiveIntensity: 0.85,
          duration: 0.22,
          overwrite: "auto",
        });
      }
      if (arrowMatRef.current) {
        gsap.to(arrowMatRef.current, {
          opacity: 1.0,
          duration: 0.22,
          overwrite: "auto",
        });
      }
    } else {
      // Relax back to natural resting state
      gsap.to(visualGroupRef.current.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(visualGroupRef.current.position, {
        z: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(visualGroupRef.current.rotation, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (materialRef.current) {
        gsap.to(materialRef.current, {
          emissiveIntensity: 0.15,
          roughness: 0.35,
          duration: 0.3,
          overwrite: "auto",
        });
      }
      if (outlineMatRef.current) {
        gsap.to(outlineMatRef.current, {
          opacity: 0.2,
          duration: 0.3,
          overwrite: "auto",
        });
      }
      if (badgeMatRef.current) {
        gsap.to(badgeMatRef.current, {
          emissiveIntensity: 0.4,
          duration: 0.3,
          overwrite: "auto",
        });
      }
      if (arrowMatRef.current) {
        gsap.to(arrowMatRef.current, {
          opacity: 0.75,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    }
  }, [hovered, pressed]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    setPressed(false);
    document.body.style.cursor = "auto";
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setPressed(true);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setPressed(false);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (visualGroupRef.current) {
      gsap.fromTo(
        visualGroupRef.current.scale,
        { x: 0.94, y: 0.94, z: 0.94 },
        {
          x: 1.12,
          y: 1.12,
          z: 1.12,
          duration: 0.14,
          ease: "back.out(2.5)",
          overwrite: "auto",
          onComplete: () => {
            gsap.to(visualGroupRef.current!.scale, {
              x: hovered ? 1.08 : 1.0,
              y: hovered ? 1.08 : 1.0,
              z: hovered ? 1.08 : 1.0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        }
      );
    }
    onClick();
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!visualGroupRef.current || !hovered || !e.uv) return;

    // Continuous UV across the flat hit plane (-1 to +1)
    const uvX = (e.uv.x - 0.5) * 2;
    const uvY = (e.uv.y - 0.5) * 2;

    gsap.to(visualGroupRef.current.rotation, {
      x: -uvY * 0.12,
      y: uvX * 0.12,
      duration: 0.18,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <group ref={containerRef} position={position} scale={scale}>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotation}
        floatIntensity={floatIntensity}
        floatingRange={floatingRange}
      >
        <group>
          {/* Visual Presentation Group (scales, lifts, and tilts on hover) */}
          <group ref={visualGroupRef}>
            {/* Main 3D Capsule Pill */}
            <RoundedBox
              args={[baseWidth, height, depth]}
              radius={radius}
              smoothness={8}
            >
              <meshStandardMaterial
                ref={materialRef}
                color="#0f172a"
                emissive={glowColor}
                emissiveIntensity={0.15}
                roughness={0.35}
                metalness={0.45}
                transparent
                opacity={0.92}
              />
            </RoundedBox>

            {/* Glowing Pill Outline Frame */}
            <mesh position={[0, 0, -depth / 2 - 0.005]} scale={1.03}>
              <RoundedBox
                args={[baseWidth + 0.04, height + 0.04, 0.01]}
                radius={radius + 0.02}
                smoothness={8}
              >
                <meshBasicMaterial
                  ref={outlineMatRef}
                  color={accentColor}
                  transparent
                  opacity={0.2}
                />
              </RoundedBox>
            </mesh>

            {/* Left Icon Badge Circle */}
            <group position={[-baseWidth / 2 + 0.38, 0, depth / 2 + 0.005]}>
              <mesh position={[0, 0, 0]}>
                <circleGeometry args={[0.22, 32]} />
                <meshStandardMaterial
                  ref={badgeMatRef}
                  color={accentColor}
                  emissive={accentColor}
                  emissiveIntensity={0.4}
                  roughness={0.2}
                />
              </mesh>

              <mesh position={[0, 0, 0.005]}>
                <planeGeometry args={[0.28, 0.28]} />
                <meshBasicMaterial map={iconTexture} transparent opacity={1} />
              </mesh>
            </group>

            {/* Bold Text Label with configurable alignment & font size */}
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={0.24}
              lineHeight={1.15}
              textAlign={effectiveTextAlign}
              fontWeight="bold"
              letterSpacing={0.01}
              color="#ffffff"
              outlineWidth={0.009}
              outlineColor="#ffffff"
              anchorX={isCenter ? "center" : "left"}
              anchorY="middle"
              position={[textX, 0, depth / 2 + 0.01]}
            >
              {label}
            </Text>

            {/* Right Action Arrow Indicator - Prominent & Visible */}
            <mesh position={[baseWidth / 2 - 0.32, 0, depth / 2 + 0.01]}>
              <planeGeometry args={[0.34, 0.34]} />
              <meshBasicMaterial
                ref={arrowMatRef}
                map={arrowTexture}
                color={accentColor}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>

          {/* 
            Dedicated Stable Hit-Testing Plane 
            - Matches baseWidth & height with generous padding (+0.25)
            - 100% transparent with depthWrite={false}
          */}
          <mesh
            position={[0, 0, depth / 2 + 0.06]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onClick={handleClick}
          >
            <planeGeometry args={[baseWidth + 0.25, height + 0.25]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
