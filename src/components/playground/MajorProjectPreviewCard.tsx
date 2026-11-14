import { extend, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import {
  Text,
  RoundedBox,
  useVideoTexture,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Fonts } from "../../presentation/Core";
import { measureTextWidth } from "../../libs/markdown/measure";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Layout constants ───────────────────────────────────────
const PADDING = 0.35;
const CARD_DEPTH = 1;
const THUMBNAIL_HEIGHT = 4; // fixed height for the thumbnail area
const THUMBNAIL_RADIUS = 0.3;
const THUMBNAIL_DEPTH = 0.08;
const THUMB_BOTTOM_GAP = 0.3; // gap below thumbnail
const TITLE_SUBTITLE_GAP = 0.1;
const SUBTITLE_PLATFORMS_GAP = 0.2;
const MAX_TEXT_WIDTH = 6;

// ─── Font sizes ─────────────────────────────────────────────
const TITLE_FONT_SIZE = 0.35;
const SUBTITLE_FONT_SIZE = 0.2;

// ─── Platform chip constants ────────────────────────────────
const CHIP_FONT_SIZE = 0.2;
const CHIP_PADDING_X = 0.22;
const CHIP_PADDING_Y = 0.1;
const CHIP_HEIGHT = CHIP_FONT_SIZE + CHIP_PADDING_Y * 2;
const CHIP_DEPTH = 0.12;
const CHIP_RADIUS = CHIP_HEIGHT / 2;
const CHIP_COL_GAP = 0.14;

// ─── Loading indicator constants ────────────────────────────
const SPINNER_RING_RADIUS = 0.4;
const SPINNER_TUBE_RADIUS = 0.06;
const SPINNER_COLOR = "#7c3aed";

// ─── Platform colors ───────────────────────────────────────
const PLATFORM_COLORS: Record<string, string> = {
  Android: "#3ddc84",
  Ios: "#a2aaad",
  Desktop: "#61aaff",
  Web: "#f59e0b",
};

// ─── Types ──────────────────────────────────────────────────
export type MajorProject = {
  title: string;
  thumbnail: {
    image?: string;
    video?: string;
  };
  subtitle: string;
  platforms: ("Android" | "Ios" | "Desktop" | "Web")[];
};

// ─── Chip layout helper ────────────────────────────────────
interface ChipLayout {
  text: string;
  x: number;
  y: number;
  width: number;
  color: string;
}

function computePlatformChipLayout(
  platforms: string[],
  maxWidth: number,
): { items: ChipLayout[]; totalWidth: number; totalHeight: number } {
  const items: ChipLayout[] = [];
  let cursorX = 0;
  let cursorY = 0;
  let rowMaxWidth = 0;

  for (const platform of platforms) {
    const textWidth = measureTextWidth(platform, {
      fontSize: CHIP_FONT_SIZE,
      font: Fonts.bodyRegular.name,
    });
    const chipWidth = textWidth + CHIP_PADDING_X * 2;

    if (cursorX > 0 && cursorX + chipWidth > maxWidth) {
      cursorX = 0;
      cursorY -= CHIP_HEIGHT + CHIP_COL_GAP;
    }

    items.push({
      text: platform,
      x: cursorX + chipWidth / 2,
      y: cursorY - CHIP_HEIGHT / 2,
      width: chipWidth,
      color: PLATFORM_COLORS[platform] ?? "#555",
    });

    cursorX += chipWidth + CHIP_COL_GAP;
    rowMaxWidth = Math.max(rowMaxWidth, cursorX - CHIP_COL_GAP);
  }

  const totalHeight = Math.abs(cursorY) + CHIP_HEIGHT;
  return { items, totalWidth: rowMaxWidth, totalHeight };
}

// ─── Spinning Loading Indicator (3D ring) ──────────────────
function LoadingSpinner({ width, height }: { width: number; height: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 3;
    }
  });

  return (
    <group position={[width / 2, -height / 2, THUMBNAIL_DEPTH + 0.01]}>
      {/* Background dimmer */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0a0a0f" opacity={0.6} transparent />
      </mesh>

      {/* Spinning ring */}
      <mesh ref={ringRef} position={[0, 0, 0.01]}>
        <torusGeometry
          args={[
            SPINNER_RING_RADIUS,
            SPINNER_TUBE_RADIUS,
            16,
            32,
            Math.PI * 1.5,
          ]}
        />
        <meshStandardMaterial
          color={SPINNER_COLOR}
          emissive={SPINNER_COLOR}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Video Thumbnail (uses useVideoTexture) ────────────────
function VideoThumbnail({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const texture = useVideoTexture(src, {
    start: true,
    loop: true,
    muted: true,
    playsInline: true,
    crossOrigin: "anonymous",
    onVideoFrame: () => {
      setIsLoading(false);
    },
  });

  const video = texture.image as HTMLVideoElement | undefined;

  useEffect(() => {
    if (!video) return;

    const handlePlaying = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    // If video is already actively playing or has buffered frames ready
    if (!video.paused && video.readyState >= 2) {
      setIsLoading(false);
    }

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("timeupdate", handlePlaying);
    video.addEventListener("canplay", handlePlaying);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("seeking", handleWaiting);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("timeupdate", handlePlaying);
      video.removeEventListener("canplay", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("seeking", handleWaiting);
    };
  }, [video]);

  useFrame(() => {
    if (isLoading && video && !video.paused && video.currentTime > 0) {
      setIsLoading(false);
    }
  });

  return (
    <group>
      <mesh position={[width / 2, -height / 2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {isLoading && <LoadingSpinner width={width} height={height} />}
    </group>
  );
}

// ─── Image Thumbnail ───────────────────────────────────────
function ImageThumbnail({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const texture = useTexture(src);

  return (
    <mesh position={[width / 2, -height / 2, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ─── Thumbnail with Suspense + Loading Fallback ────────────
function Thumbnail({
  thumbnail,
  width,
  height,
}: {
  thumbnail: MajorProject["thumbnail"];
  width: number;
  height: number;
}) {
  const hasVideo = Boolean(thumbnail.video);
  const hasImage = Boolean(thumbnail.image);

  return (
    <group>
      {/* Thumbnail background / frame */}
      <RoundedBox
        args={[width, height, THUMBNAIL_DEPTH]}
        radius={THUMBNAIL_RADIUS}
        smoothness={2}
        position={[width / 2, -height / 2, -THUMBNAIL_DEPTH / 2]}
      >
        <meshStandardMaterial color="#111" roughness={0.5} />
      </RoundedBox>

      {hasVideo ? (
        <Suspense fallback={<LoadingSpinner width={width} height={height} />}>
          <VideoThumbnail
            src={thumbnail.video!}
            width={width}
            height={height}
          />
        </Suspense>
      ) : hasImage ? (
        <Suspense fallback={<LoadingSpinner width={width} height={height} />}>
          <ImageThumbnail
            src={thumbnail.image!}
            width={width}
            height={height}
          />
        </Suspense>
      ) : (
        <mesh position={[width / 2, -height / 2, 0]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
        </mesh>
      )}
    </group>
  );
}

// ─── Default sample data ────────────────────────────────────
const SAMPLE_PROJECT: MajorProject = {
  title: "CodeHorn",
  thumbnail: {
    image:
      "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
    // video:
    //   "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
  },
  subtitle: "A competitive programming platform",
  platforms: ["Android", "Web"],
};

// ─── Main Component ────────────────────────────────────────
export const MajorProjectPreviewCard = ({
  project = SAMPLE_PROJECT,
  color = "#1a1a2e",
  ...groupProps
}: {
  project?: MajorProject;
  color?: string;
} & JSX.IntrinsicElements["group"]) => {
  // ── Synchronously measured text sizes to eliminate re-render cycles ─
  const titleWidth = useMemo(
    () =>
      measureTextWidth(project.title, {
        fontSize: TITLE_FONT_SIZE,
        font: Fonts.bodyRegular.name,
      }),
    [project.title],
  );
  const titleHeight = titleWidth > MAX_TEXT_WIDTH ? 0.82 : 0.42;

  const subtitleWidth = useMemo(
    () =>
      measureTextWidth(project.subtitle, {
        fontSize: SUBTITLE_FONT_SIZE,
        font: Fonts.bodyRegular.name,
      }),
    [project.subtitle],
  );
  const subtitleHeight = subtitleWidth > MAX_TEXT_WIDTH ? 0.52 : 0.26;

  // ── Platform chip layout ──────────────────────────────
  const chipLayout = useMemo(
    () => computePlatformChipLayout(project.platforms, MAX_TEXT_WIDTH),
    [project.platforms],
  );

  // ── Derived layout ────────────────────────────────────
  const thumbnailWidth = MAX_TEXT_WIDTH;
  const thumbnailHeight = THUMBNAIL_HEIGHT;

  const hasTitle = Boolean(project.title);
  const hasSubtitle = Boolean(project.subtitle);
  const hasChips = chipLayout.totalHeight > 0;

  const textContentHeight =
    titleHeight +
    (hasSubtitle && hasTitle ? TITLE_SUBTITLE_GAP : 0) +
    subtitleHeight +
    (hasChips && (hasTitle || hasSubtitle) ? SUBTITLE_PLATFORMS_GAP : 0) +
    chipLayout.totalHeight;

  const contentWidth = Math.max(
    thumbnailWidth,
    titleWidth,
    subtitleWidth,
    chipLayout.totalWidth,
  );
  const contentHeight = thumbnailHeight + THUMB_BOTTOM_GAP + textContentHeight;

  const cardWidth = contentWidth + PADDING * 2;
  const cardHeight = contentHeight + PADDING * 2;

  // ── Vertical cursors ──────────────────────────────────
  const yThumb = -PADDING;
  const yTitle = yThumb - thumbnailHeight - THUMB_BOTTOM_GAP;
  const ySubtitle =
    yTitle - titleHeight - (hasSubtitle && hasTitle ? TITLE_SUBTITLE_GAP : 0);
  const yChips =
    ySubtitle -
    subtitleHeight -
    (hasChips && (hasTitle || hasSubtitle) ? SUBTITLE_PLATFORMS_GAP : 0);

  // ── Stable geometry args to prevent GPU re-allocations ───
  const cardGeoArgs = useMemo<[number, number, number, number, number]>(
    () => [
      cardWidth + 2 * PADDING,
      cardHeight + 2 * PADDING,
      CARD_DEPTH,
      2,
      0.6,
    ],
    [cardWidth, cardHeight],
  );

  // ── Render ────────────────────────────────────────────
  return (
    <group {...groupProps}>
      {/* ── Card background ─────────────────────────────── */}
      <mesh position={[0, 0, -(CARD_DEPTH / 2 + 0.001)]}>
        {/* @ts-expect-error */}
        <roundedBoxGeometry args={cardGeoArgs} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.16}
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>

      {/* ── Content origin: top-left ───────────────────── */}
      <group position={[-cardWidth / 2, cardHeight / 2, 0]}>
        {/* ─ Thumbnail ─────────────────────────────────── */}
        <group position={[PADDING, yThumb, 0]}>
          <Thumbnail
            thumbnail={project.thumbnail}
            width={thumbnailWidth}
            height={thumbnailHeight}
          />
        </group>

        {/* ─ Title ─────────────────────────────────────── */}
        <Text
          font={Fonts.bodyRegular.name}
          fontSize={TITLE_FONT_SIZE}
          fontWeight={700}
          color="#fff"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.012}
          position={[PADDING, yTitle, 0]}
        >
          {project.title}
        </Text>

        {/* ─ Subtitle ──────────────────────────────────── */}
        <Text
          font={Fonts.bodyRegular.name}
          fontSize={SUBTITLE_FONT_SIZE}
          color="#e2e8f0"
          anchorX="left"
          anchorY="top"
          maxWidth={MAX_TEXT_WIDTH}
          outlineWidth={0.008}
          outlineColor="#111827"
          position={[PADDING, ySubtitle, 0]}
        >
          {project.subtitle}
        </Text>

        {/* ─ Platform Chips ────────────────────────────── */}
        <group position={[PADDING, yChips, 0]}>
          {chipLayout.items.map((chip, i) => (
            <group key={i} position={[chip.x, chip.y, 0]}>
              {/* Chip background */}
              <RoundedBox
                args={[chip.width, CHIP_HEIGHT, CHIP_DEPTH]}
                radius={CHIP_RADIUS}
                smoothness={2}
              >
                <meshStandardMaterial
                  color={chip.color}
                  roughness={0.3}
                  metalness={0.15}
                />
              </RoundedBox>

              {/* Chip label */}
              <Text
                font={Fonts.bodyRegular.name}
                fontSize={CHIP_FONT_SIZE}
                fontWeight="bold"
                letterSpacing={0.01}
                color="#ffffff"
                outlineWidth={0.008}
                outlineColor="#ffffff"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, CHIP_DEPTH / 2 + 0.001]}
              >
                {chip.text}
              </Text>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};
