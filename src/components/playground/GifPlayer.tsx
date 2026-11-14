import { extend, useFrame, type ThreeElements } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { RoundedBox, useVideoTexture, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { Fonts } from "../../presentation/Core";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Default Sample GIF/Video ────────────────────────────────
export const DEFAULT_GIF_URL =
  "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4";

// ─── Layout Constants ────────────────────────────────────────
const PADDING = 0.35;
const CARD_DEPTH = 0.6;

// ─── Helper: FIT strategy dimension calculation ──────────────
function getFitDimensions(
  mediaWidth: number,
  mediaHeight: number,
  maxWidth: number,
  maxHeight: number,
): [number, number] {
  if (!mediaWidth || !mediaHeight || mediaWidth <= 0 || mediaHeight <= 0) {
    return [maxWidth, maxHeight];
  }
  const mediaAspect = mediaWidth / mediaHeight;
  const containerAspect = maxWidth / maxHeight;

  if (mediaAspect > containerAspect) {
    return [maxWidth, maxWidth / mediaAspect];
  } else {
    return [maxHeight * mediaAspect, maxHeight];
  }
}

// ─── Loading Indicator (3D Ring + Dimmer) ───────────────────
function LoadingSpinner({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 3;
    }
  });

  return (
    <group position={[0, 0, 0.045]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0a0a0f" opacity={0.65} transparent />
      </mesh>

      <mesh ref={ringRef} position={[0, 0, 0.01]}>
        <torusGeometry args={[0.3, 0.045, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Video Screen for Video-Encoded GIFs (.mp4, .webm) ──────
function VideoGifScreen({
  src,
  containerWidth,
  containerHeight,
  autoPlay = true,
  loop = true,
  muted = true,
}: {
  src: string;
  containerWidth: number;
  containerHeight: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const texture = useVideoTexture(src, {
    start: autoPlay,
    loop: loop,
    muted: muted,
    playsInline: true,
    crossOrigin: "anonymous",
    onVideoFrame: () => {
      setIsLoading(false);
    },
  });

  const video = texture.image as HTMLVideoElement | undefined;

  const [videoDims, setVideoDims] = useState(() => {
    const w = video?.videoWidth || 0;
    const h = video?.videoHeight || 0;
    if (w > 0 && h > 0) return { w, h };
    return { w: 1, h: 1 };
  });

  const [fitWidth, fitHeight] = useMemo(() => {
    return getFitDimensions(
      videoDims.w,
      videoDims.h,
      containerWidth,
      containerHeight,
    );
  }, [videoDims, containerWidth, containerHeight]);

  useEffect(() => {
    if (!video) return;

    const updateDims = () => {
      const w = video.videoWidth || 0;
      const h = video.videoHeight || 0;
      if (w > 0 && h > 0) {
        setVideoDims((prev) =>
          prev.w === w && prev.h === h ? prev : { w, h },
        );
      }
    };

    const handlePlaying = () => {
      setIsLoading(false);
      updateDims();
    };

    updateDims();
    video.addEventListener("loadedmetadata", updateDims);
    video.addEventListener("playing", handlePlaying);

    if (autoPlay && video.paused) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("loadedmetadata", updateDims);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [video, autoPlay]);

  useFrame(() => {
    if (isLoading && video && !video.paused && video.currentTime > 0) {
      setIsLoading(false);
    }
  });

  return (
    <group>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[fitWidth, fitHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {isLoading && (
        <LoadingSpinner width={containerWidth} height={containerHeight} />
      )}
    </group>
  );
}

// ─── Image Screen for Standard .gif / .webp / .png files ────
function ImageGifScreen({
  src,
  containerWidth,
  containerHeight,
}: {
  src: string;
  containerWidth: number;
  containerHeight: number;
}) {
  const texture = useTexture(src);

  const [imgDims, setImgDims] = useState(() => {
    const img: any = texture?.image;
    const w = img?.naturalWidth || img?.width || 0;
    const h = img?.naturalHeight || img?.height || 0;
    if (w > 0 && h > 0) return { w, h };
    return { w: 1, h: 1 };
  });

  useEffect(() => {
    const img: any = texture?.image;
    if (!img) return;

    const updateDims = () => {
      const w = img.naturalWidth || img.width || 0;
      const h = img.naturalHeight || img.height || 0;
      if (w > 0 && h > 0) {
        setImgDims((prev) =>
          prev.w === w && prev.h === h ? prev : { w, h },
        );
      }
    };

    updateDims();
    if ("addEventListener" in img) {
      img.addEventListener("load", updateDims);
      return () => img.removeEventListener("load", updateDims);
    }
  }, [texture]);

  const [fitWidth, fitHeight] = useMemo(() => {
    return getFitDimensions(
      imgDims.w,
      imgDims.h,
      containerWidth,
      containerHeight,
    );
  }, [imgDims, containerWidth, containerHeight]);

  return (
    <mesh position={[0, 0, 0.035]}>
      <planeGeometry args={[fitWidth, fitHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ─── Screen Switcher ────────────────────────────────────────
function GifScreen({
  src,
  containerWidth,
  containerHeight,
  autoPlay,
  loop,
  muted,
}: {
  src: string;
  containerWidth: number;
  containerHeight: number;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
}) {
  const isVideo = useMemo(() => {
    const lower = src.toLowerCase().split("?")[0];
    return (
      lower.endsWith(".mp4") ||
      lower.endsWith(".webm") ||
      lower.endsWith(".ogg") ||
      lower.includes("video")
    );
  }, [src]);

  if (isVideo) {
    return (
      <VideoGifScreen
        src={src}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
      />
    );
  }

  return (
    <ImageGifScreen
      src={src}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    />
  );
}

// ─── Main Component: GifPlayer ──────────────────────────────
export type GifPlayerProps = {
  src?: string;
  width?: number; // viewport container width, default 5.6
  height?: number; // viewport container height, default 3.6
  autoPlay?: boolean; // default true
  loop?: boolean; // default true
  muted?: boolean; // default true
  cardColor?: string; // default #111827
  showBadge?: boolean; // show "GIF" badge pill
} & JSX.IntrinsicElements["group"];

export const GifPlayer = ({
  src = DEFAULT_GIF_URL,
  width = 5.6,
  height = 3.6,
  autoPlay = true,
  loop = true,
  muted = true,
  cardColor = "#111827",
  showBadge = true,
  ...groupProps
}: GifPlayerProps) => {
  const containerWidth = width;
  const containerHeight = height;

  const cardWidth = containerWidth + PADDING * 2;
  const cardHeight = containerHeight + PADDING * 2;

  return (
    <group {...groupProps}>
      {/* ── Outer 3D Card Background ──────────────────────── */}
      <mesh position={[0, 0, -(CARD_DEPTH / 2 + 0.001)]}>
        {/* @ts-expect-error */}
        <roundedBoxGeometry
          args={[cardWidth, cardHeight, CARD_DEPTH, 2, 0.4]}
        />
        <meshStandardMaterial
          color={cardColor}
          emissive={cardColor}
          emissiveIntensity={0.16}
          metalness={0.25}
          roughness={0.3}
        />
      </mesh>

      {/* ── Viewport Display Area ─────────────────────────── */}
      <group position={[0, 0, 0]}>
        {/* Dark viewport inner frame */}
        <RoundedBox
          args={[containerWidth, containerHeight, 0.03]}
          radius={0.2}
          smoothness={4}
          position={[0, 0, 0.01]}
        >
          <meshStandardMaterial
            color="#080c16"
            roughness={0.5}
            metalness={0.2}
          />
        </RoundedBox>

        {/* Media Screen with FIT strategy + Loading Indicator */}
        <Suspense
          fallback={
            <LoadingSpinner
              width={containerWidth}
              height={containerHeight}
            />
          }
        >
          <GifScreen
            src={src}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
          />
        </Suspense>

        {/* Sleek GIF Badge Pill in top-left */}
        {showBadge && (
          <group
            position={[
              -containerWidth / 2 + 0.48,
              containerHeight / 2 - 0.28,
              0.05,
            ]}
          >
            <RoundedBox
              args={[0.62, 0.26, 0.04]}
              radius={0.06}
              smoothness={2}
            >
              <meshStandardMaterial
                color="#030712"
                opacity={0.82}
                transparent
                roughness={0.3}
              />
            </RoundedBox>
            <Text
              font={Fonts.bodyRegular.name}
              fontSize={0.12}
              fontWeight="bold"
              letterSpacing={0.06}
              color="#c084fc"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.03]}
            >
              GIF
            </Text>
          </group>
        )}
      </group>
    </group>
  );
};

export default GifPlayer;
