import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { BoundingBox } from "../../presentation/Types";
import { MajorProjectPreviewCard } from "../playground/MajorProjectPreviewCard";
import { FloatingActionButton } from "./FloatingActionButton";
import { ProjectsModal } from "./ProjectsModal";
import { MAJOR_PROJECTS } from "./projects-data";
import { Fonts } from "../../presentation/Core";

export interface MajorProjectsSectionProps {
  bounds: BoundingBox;
  landscapeScale?: number;
  portraitScale?: number;
}

export function MajorProjectsSection({
  bounds,
  landscapeScale: propLandscapeScale,
  portraitScale: propPortraitScale,
}: MajorProjectsSectionProps) {
  const viewport = useThree((t) => t.viewport);
  const [modalOpen, setModalOpen] = useState(false);

  const middle = {
    x: (bounds.right + bounds.left) / 2.0,
    y: (bounds.bottom + bounds.top) / 2.0,
    z: 0,
  };

  const isLandscape = viewport.width >= viewport.height;
  const cardWidth = 7.4;
  const cardHeight = 7.2;

  // ─── Landscape Layout (Horizontal Side-by-Side) ─
  if (isLandscape) {
    const cardScale = propLandscapeScale ?? 1.10;

    const scaledW = cardWidth * cardScale;
    const scaledH = cardHeight * cardScale;
    const gapX = Math.max(1.0, Math.min(2.0, viewport.width * 0.055));
    const posX = scaledW / 2 + gapX / 2;

    const cardY = -0.1;
    const titleY = cardY + scaledH / 2 + 0.85;
    const buttonY = cardY - scaledH / 2 - 0.75;
    const buttonScale = 1.0;

    return (
      <>
        <group position={[middle.x, middle.y, middle.z]}>
          {/* Section Header */}
          <group position={[0, titleY, 0]}>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={0.48}
              fontWeight="bold"
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#ffffff"
            >
              Major Projects
            </Text>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={0.2}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.42, 0]}
            >
              Production platforms, multiplatform systems & enterprise architectures
            </Text>
          </group>

          {/* 2 Preview Cards Side-by-Side with Scale 1.20 */}
          <group position={[-posX, cardY, 0]} scale={cardScale}>
            <MajorProjectPreviewCard
              project={MAJOR_PROJECTS[0]}
              color="#4f46e5"
            />
          </group>

          <group position={[posX, cardY, 0]} scale={cardScale}>
            <MajorProjectPreviewCard
              project={MAJOR_PROJECTS[1]}
              color="#0284c7"
            />
          </group>

          {/* View All Projects Button */}
          <FloatingActionButton
            label={`View all (${MAJOR_PROJECTS.length})\nMajor Projects`}
            type="about"
            textAlign="center"
            position={[0, buttonY, 0.4]}
            accentColor="#8b5cf6"
            glowColor="#a78bfa"
            baseWidth={3.5}
            baseHeight={0.92}
            scale={buttonScale}
            floatSpeed={1.8}
            floatRotation={0.06}
            floatIntensity={0.35}
            floatingRange={[-0.04, 0.04]}
            isExternal={true}
            onClick={() => setModalOpen(true)}
          />
        </group>

        {modalOpen && (
          <ProjectsModal
            initialCategory="major"
            onClose={() => setModalOpen(false)}
          />
        )}
      </>
    );
  }

  // ─── Portrait Layout (Vertical Stacked Cards: Scale 0.65) ───
  const cardScale = propPortraitScale ?? 0.65;

  const scaledH = cardHeight * cardScale;
  const gapY = Math.max(0.4, viewport.height * 0.025);
  const posY = scaledH / 2 + gapY / 2;

  const titleY = posY + scaledH / 2 + 0.75;
  const buttonY = -posY - scaledH / 2 - 0.75;
  const buttonScale = 0.95;

  return (
    <>
      <group position={[middle.x, middle.y, middle.z]}>
        {/* Section Header */}
        <group position={[0, titleY, 0]}>
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={0.38}
            fontWeight="bold"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.009}
            outlineColor="#ffffff"
          >
            Major Projects
          </Text>
          <Text
            font={Fonts.bodyRegular.name}
            fontSize={0.16}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.32, 0]}
          >
            Production platforms & enterprise systems
          </Text>
        </group>

        {/* 2 Preview Cards Stacked Vertically with Scale 0.65 */}
        <group position={[0, posY, 0]} scale={cardScale}>
          <MajorProjectPreviewCard
            project={MAJOR_PROJECTS[0]}
            color="#4f46e5"
          />
        </group>

        <group position={[0, -posY, 0]} scale={cardScale}>
          <MajorProjectPreviewCard
            project={MAJOR_PROJECTS[1]}
            color="#0284c7"
          />
        </group>

        {/* View All Projects Button */}
        <FloatingActionButton
          label={`View all (${MAJOR_PROJECTS.length})\nMajor Projects`}
          type="about"
          textAlign="center"
          position={[0, buttonY, 0.4]}
          accentColor="#8b5cf6"
          glowColor="#a78bfa"
          baseWidth={3.5}
          baseHeight={0.92}
          scale={buttonScale}
          floatSpeed={1.8}
          floatRotation={0.06}
          floatIntensity={0.35}
          floatingRange={[-0.04, 0.04]}
          isExternal={true}
          onClick={() => setModalOpen(true)}
        />
      </group>

      {modalOpen && (
        <ProjectsModal
          initialCategory="major"
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
