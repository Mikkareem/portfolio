import { extend, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { RoundedBox, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Default Sample Video ────────────────────────────────────
export const DEFAULT_VIDEO_URL =
  "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4";

// ─── Layout Constants ────────────────────────────────────────
const PADDING = 0.35;
const CARD_DEPTH = 0.6;

// ─── Helper: FIT strategy dimension calculation ──────────────
/**
 * Computes dimensions that FIT proportionally inside [maxWidth, maxHeight]
 * strictly maintaining the video's original aspect ratio (contain strategy, NO STRETCH).
 */
function getFitDimensions(
  videoWidth: number,
  videoHeight: number,
  maxWidth: number,
  maxHeight: number,
): [number, number] {
  if (!videoWidth || !videoHeight || videoWidth <= 0 || videoHeight <= 0) {
    return [maxWidth, maxHeight];
  }
  const videoAspect = videoWidth / videoHeight;
  const containerAspect = maxWidth / maxHeight;

  if (videoAspect > containerAspect) {
    // Video is wider than container aspect ratio -> fit width, scale height down
    return [maxWidth, maxWidth / videoAspect];
  } else {
    // Video is taller than container aspect ratio -> fit height, scale width down
    return [maxHeight * videoAspect, maxHeight];
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
      {/* Background Dimmer */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0a0a0f" opacity={0.65} transparent />
      </mesh>

      {/* Spinning Ring */}
      <mesh ref={ringRef} position={[0, 0, 0.01]}>
        <torusGeometry args={[0.3, 0.045, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Video Screen Mesh with Exact FIT Calculation ───────────
function VideoScreen({
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

  // Track intrinsic video dimensions
  const [videoDims, setVideoDims] = useState(() => {
    const w = video?.videoWidth || 0;
    const h = video?.videoHeight || 0;
    if (w > 0 && h > 0) return { w, h };
    return { w: 1, h: 1 };
  });

  // Calculate FIT dimensions (no stretching, exact aspect ratio)
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

    const handleWaiting = () => {
      setIsLoading(true);
    };

    // If video is already actively playing
    if (!video.paused && video.readyState >= 2) {
      setIsLoading(false);
      updateDims();
    }

    video.addEventListener("loadedmetadata", updateDims);
    video.addEventListener("canplay", updateDims);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("timeupdate", handlePlaying);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("seeking", handleWaiting);

    return () => {
      video.removeEventListener("loadedmetadata", updateDims);
      video.removeEventListener("canplay", updateDims);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("timeupdate", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("seeking", handleWaiting);
    };
  }, [video]);

  // Fail-safe useFrame check to dismiss spinner as soon as playback starts
  useFrame(() => {
    if (isLoading && video && !video.paused && video.currentTime > 0) {
      setIsLoading(false);
    }
  });

  return (
    <group>
      {/* Video Plane (Layered at z = 0.035 to eliminate z-fighting) */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[fitWidth, fitHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Loading Spinner Indicator */}
      {isLoading && (
        <LoadingSpinner width={containerWidth} height={containerHeight} />
      )}
    </group>
  );
}

// ─── Main Component: VideoPlayer ─────────────────────────────
export type VideoPlayerProps = {
  src?: string;
  width?: number; // viewport container width, default 5.6
  height?: number; // viewport container height, default 3.6
  autoPlay?: boolean; // default true
  loop?: boolean; // default true
  muted?: boolean; // default true
  cardColor?: string; // default #111827
} & JSX.IntrinsicElements["group"];

export const VideoPlayer = ({
  src = DEFAULT_VIDEO_URL,
  width = 5.6,
  height = 3.6,
  autoPlay = true,
  loop = true,
  muted = true,
  cardColor = "#111827",
  ...groupProps
}: VideoPlayerProps) => {
  const containerWidth = width;
  const containerHeight = height;

  // Exact single padding all around (symmetrically centered)
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
          metalness={0.25}
          roughness={0.35}
        />
      </mesh>

      {/* ── Viewport Display Area ─────────────────────────── */}
      <group position={[0, 0, 0]}>
        {/* Dark viewport inner frame (front surface at z = 0.025) */}
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

        {/* Video Screen with FIT strategy + Loading Indicator */}
        <Suspense
          fallback={
            <LoadingSpinner
              width={containerWidth}
              height={containerHeight}
            />
          }
        >
          <VideoScreen
            src={src}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
          />
        </Suspense>
      </group>
    </group>
  );
};
