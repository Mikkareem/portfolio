import { extend, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { Text, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Fonts } from "../../presentation/Core";

extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      roundedBoxGeometry: RoundedBoxGeometry;
    }
  }
}

// ─── Default Sample Images ───────────────────────────────────
export const DEFAULT_CAROUSEL_IMAGES = [
  "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
  "/images/cmp.png",
  "/images/kmp.png",
];

// ─── Layout Constants ────────────────────────────────────────
const PADDING = 0.35;
const CARD_DEPTH = 0.6;
const CONTROLS_HEIGHT = 0.5;
const PROGRESS_BAR_HEIGHT = 0.03;

// ─── Helper: FIT strategy dimension calculation ──────────────
/**
 * Computes dimensions that FIT proportionally inside [maxWidth, maxHeight]
 * strictly maintaining the image's original aspect ratio (contain strategy, NO STRETCH).
 */
function getFitDimensions(
  imgWidth: number,
  imgHeight: number,
  maxWidth: number,
  maxHeight: number,
): [number, number] {
  if (!imgWidth || !imgHeight || imgWidth <= 0 || imgHeight <= 0) {
    return [maxWidth, maxHeight];
  }
  const imgAspect = imgWidth / imgHeight;
  const containerAspect = maxWidth / maxHeight;

  if (imgAspect > containerAspect) {
    // Image is wider than container -> fit width, scale height down
    return [maxWidth, maxWidth / imgAspect];
  } else {
    // Image is taller than container -> fit height, scale width down
    return [maxHeight * imgAspect, maxHeight];
  }
}

// ─── Slide Loading Fallback ──────────────────────────────────
function SlideLoadingFallback({
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
    <group position={[0, 0, 0.035]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0b0f19" opacity={0.7} transparent />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, 0.04]}>
        <torusGeometry args={[0.3, 0.045, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Single Slide (Maintains Aspect Ratio with FIT) ──────────
function SlideItem({
  url,
  containerWidth,
  containerHeight,
  isInitialActive,
  onRegisterRefs,
}: {
  url: string;
  containerWidth: number;
  containerHeight: number;
  isInitialActive: boolean;
  onRegisterRefs: (
    group: THREE.Group | null,
    mat: THREE.MeshBasicMaterial | null,
  ) => void;
}) {
  const texture = useTexture(url);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  // Extract true intrinsic dimensions (checking naturalWidth, width, etc.)
  const [dimensions, setDimensions] = useState(() => {
    const img: any = texture?.image;
    const w = img?.naturalWidth || img?.videoWidth || img?.width || 0;
    const h = img?.naturalHeight || img?.videoHeight || img?.height || 0;
    if (w > 0 && h > 0) return { w, h };
    return { w: 1, h: 1 };
  });

  useEffect(() => {
    const img: any = texture?.image;
    if (!img) return;

    const updateDims = () => {
      const w = img.naturalWidth || img.videoWidth || img.width || 0;
      const h = img.naturalHeight || img.videoHeight || img.height || 0;
      if (w > 0 && h > 0) {
        setDimensions((prev) =>
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

  // Exact FIT strategy computation
  const [fitWidth, fitHeight] = useMemo(() => {
    return getFitDimensions(
      dimensions.w,
      dimensions.h,
      containerWidth,
      containerHeight,
    );
  }, [dimensions, containerWidth, containerHeight]);

  useEffect(() => {
    onRegisterRefs(groupRef.current, matRef.current);
    return () => {
      onRegisterRefs(null, null);
    };
  }, [onRegisterRefs]);

  return (
    <group
      ref={groupRef}
      visible={isInitialActive}
      position={[
        isInitialActive ? 0 : containerWidth * 0.4,
        0,
        0.035, // Positioned safely above the frame at z = 0.025 to prevent z-fighting
      ]}
      scale={isInitialActive ? [1, 1, 1] : [0.92, 0.92, 1]}
    >
      <mesh>
        <planeGeometry args={[fitWidth, fitHeight]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          opacity={isInitialActive ? 1 : 0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Interactive Nav Button (< / >) ──────────────────────────
function NavButton({
  symbol,
  position,
  onClick,
}: {
  symbol: string;
  position: [number, number, number];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current.scale, {
        x: hovered ? 1.15 : 1,
        y: hovered ? 1.15 : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [hovered]);

  return (
    <group
      ref={btnRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 3D Glass Pill */}
      <RoundedBox args={[0.5, 0.5, 0.08]} radius={0.25} smoothness={8}>
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#0f172a"}
          emissive={hovered ? "#8b5cf6" : "#000000"}
          emissiveIntensity={hovered ? 0.7 : 0}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </RoundedBox>

      {/* Button Symbol */}
      <Text
        font={Fonts.bodyRegular.name}
        fontSize={0.24}
        fontWeight={700}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.05]}
      >
        {symbol}
      </Text>
    </group>
  );
}

// ─── Pagination Dot ──────────────────────────────────────────
function PaginationDot({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const dotRef = useRef<THREE.Group>(null);

  const targetWidth = isActive ? 0.38 : 0.12;

  useGSAP(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current.scale, {
        x: hovered ? 1.2 : 1,
        y: hovered ? 1.2 : 1,
        duration: 0.2,
      });
    }
  }, [hovered]);

  return (
    <group
      ref={dotRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[targetWidth, 0.09, 0.04]} radius={0.045} smoothness={4}>
        <meshStandardMaterial
          color={isActive ? "#8b5cf6" : hovered ? "#94a3b8" : "#475569"}
          emissive={isActive ? "#8b5cf6" : "#000000"}
          emissiveIntensity={isActive ? 1.8 : 0}
          toneMapped={false}
          roughness={0.3}
        />
      </RoundedBox>
    </group>
  );
}

// ─── Main Component: ImageCarousel ───────────────────────────
export type ImageCarouselProps = {
  imageUrls?: string[];
  width?: number; // viewport container width, default 5.6
  height?: number; // viewport container height, default 3.6
  autoPlayInterval?: number; // ms, default 5000 (5 seconds)
  cardColor?: string;
} & JSX.IntrinsicElements["group"];

export const ImageCarousel = ({
  imageUrls = DEFAULT_CAROUSEL_IMAGES,
  width = 5.6,
  height = 3.6,
  autoPlayInterval = 5000,
  cardColor = "#111827",
  ...groupProps
}: ImageCarouselProps) => {
  const total = imageUrls.length;

  // Slide state tracking current index, previous index, and direction (-1 or 1)
  const [slideState, setSlideState] = useState({
    current: 0,
    prev: 0,
    direction: 1,
  });

  // Slide mesh refs for GSAP animations
  const slideGroupsRef = useRef<(THREE.Group | null)[]>([]);
  const slideMaterialsRef = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  // 5-second auto-transition progress bar ref
  const progressFillRef = useRef<THREE.Group>(null);

  // ─── Navigation Handlers ───────────────────────────────────
  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setSlideState((prev) => ({
      current: (prev.current + 1) % total,
      prev: prev.current,
      direction: 1,
    }));
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setSlideState((prev) => ({
      current: (prev.current - 1 + total) % total,
      prev: prev.current,
      direction: -1,
    }));
  }, [total]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index === slideState.current || total <= 1) return;
      setSlideState({
        current: index,
        prev: slideState.current,
        direction: index > slideState.current ? 1 : -1,
      });
    },
    [slideState.current, total],
  );

  // ─── GSAP Slide Transition ─────────────────────────────────
  useEffect(() => {
    const fromIdx = slideState.prev;
    const toIdx = slideState.current;
    const dir = slideState.direction;

    if (fromIdx === toIdx) return;

    const leavingGroup = slideGroupsRef.current[fromIdx];
    const leavingMat = slideMaterialsRef.current[fromIdx];
    const enteringGroup = slideGroupsRef.current[toIdx];
    const enteringMat = slideMaterialsRef.current[toIdx];

    // Animate out leaving slide
    if (leavingGroup && leavingMat) {
      gsap.killTweensOf(leavingGroup.position);
      gsap.killTweensOf(leavingGroup.scale);
      gsap.killTweensOf(leavingMat);

      gsap.to(leavingGroup.position, {
        x: -dir * (width * 0.4),
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(leavingGroup.scale, {
        x: 0.92,
        y: 0.92,
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(leavingMat, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          if (leavingGroup) leavingGroup.visible = false;
        },
      });
    }

    // Animate in entering slide
    if (enteringGroup && enteringMat) {
      enteringGroup.visible = true;
      gsap.killTweensOf(enteringGroup.position);
      gsap.killTweensOf(enteringGroup.scale);
      gsap.killTweensOf(enteringMat);

      // Start position for incoming slide
      enteringGroup.position.x = dir * (width * 0.4);
      enteringGroup.position.z = 0.035; // Kept safely above the background frame
      enteringGroup.scale.set(0.92, 0.92, 1);
      enteringMat.opacity = 0;

      gsap.to(enteringGroup.position, {
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(enteringGroup.scale, {
        x: 1,
        y: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(enteringMat, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [slideState, width]);

  // ─── 5-Second Automatic Transition Timer & Progress Bar ───
  useEffect(() => {
    if (total <= 1) return;

    // Animate progress bar fill over the 5-second interval using GSAP
    if (progressFillRef.current) {
      gsap.killTweensOf(progressFillRef.current.scale);
      progressFillRef.current.scale.x = 0.0001;
      gsap.to(progressFillRef.current.scale, {
        x: 1,
        duration: autoPlayInterval / 1000,
        ease: "none",
      });
    }

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      clearInterval(timer);
    };
  }, [slideState.current, total, autoPlayInterval, goToNext]);

  // Cleanup mouse cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  // ─── Exact Card Geometry Calculations (Zero Double-Padding) ─
  const containerWidth = width;
  const containerHeight = height;

  // Single exact padding all around:
  const cardWidth = containerWidth + PADDING * 2;
  const cardHeight = containerHeight + CONTROLS_HEIGHT + PADDING * 2;

  // Symmetrical vertical center:
  const yViewport = CONTROLS_HEIGHT / 2;
  const yControls = yViewport - containerHeight / 2 - 0.32;

  // Register refs for each slide
  const registerSlideRefs = useCallback(
    (
      index: number,
      group: THREE.Group | null,
      mat: THREE.MeshBasicMaterial | null,
    ) => {
      slideGroupsRef.current[index] = group;
      slideMaterialsRef.current[index] = mat;
    },
    [],
  );

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
      <group position={[0, yViewport, 0]}>
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

        {/* Slides rendering with FIT strategy (placed safely at z = 0.035) */}
        <Suspense
          fallback={
            <SlideLoadingFallback
              width={containerWidth}
              height={containerHeight}
            />
          }
        >
          {imageUrls.map((url, i) => (
            <SlideItem
              key={url + i}
              url={url}
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              isInitialActive={i === 0}
              onRegisterRefs={(g, m) => registerSlideRefs(i, g, m)}
            />
          ))}
        </Suspense>

        {/* ── Inline Navigation Arrow Buttons ─────────────── */}
        {total > 1 && (
          <>
            <NavButton
              symbol="<"
              position={[-containerWidth / 2 + 0.4, 0, 0.08]}
              onClick={goToPrev}
            />
            <NavButton
              symbol=">"
              position={[containerWidth / 2 - 0.4, 0, 0.08]}
              onClick={goToNext}
            />
          </>
        )}

        {/* ── 5-Second Animated Progress Bar ──────────────── */}
        {total > 1 && (
          <group position={[-containerWidth / 2, -containerHeight / 2 - 0.03, 0.04]}>
            {/* Background Track */}
            <mesh position={[containerWidth / 2, 0, 0]}>
              <planeGeometry args={[containerWidth, PROGRESS_BAR_HEIGHT]} />
              <meshBasicMaterial color="#1e293b" opacity={0.6} transparent />
            </mesh>

            {/* GSAP-Animated Fill (Left-anchored) */}
            <group ref={progressFillRef} scale={[0.0001, 1, 1]}>
              <mesh position={[containerWidth / 2, 0, 0.001]}>
                <planeGeometry args={[containerWidth, PROGRESS_BAR_HEIGHT]} />
                <meshBasicMaterial
                  color="#8b5cf6"
                  toneMapped={false}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            </group>
          </group>
        )}
      </group>

      {/* ── Inline Bottom Controls (Dots & Counter) ───────── */}
      <group position={[0, yControls, 0.04]}>
        {/* Pagination Dots (Clickable to revisit slides) */}
        <group position={[-containerWidth / 2 + 0.25, 0, 0]}>
          {imageUrls.map((_, i) => {
            const xOffset = i * 0.3;
            return (
              <group key={i} position={[xOffset, 0, 0]}>
                <PaginationDot
                  isActive={i === slideState.current}
                  onClick={() => goToIndex(i)}
                />
              </group>
            );
          })}
        </group>

        {/* Slide Counter (e.g. "01 / 03") */}
        <Text
          font={Fonts.bodyRegular.name}
          fontSize={0.19}
          color="#94a3b8"
          anchorX="right"
          anchorY="middle"
          position={[containerWidth / 2 - 0.25, 0, 0]}
        >
          {`${String(slideState.current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </Text>
      </group>
    </group>
  );
};
