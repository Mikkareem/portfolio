import { Box, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useRef, type RefObject } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import Hero3d from "../components/home/Hero3d";
import { SimpleAboutCard } from "../components/home/SimpleAboutCard";
import Background from "../components/playground/Background";
import { useGSAP } from "@gsap/react";
import { UI } from "../presentation/Core";

const Home = () => {
  const camera = useThree((state) => state.camera);
  const viewport = useThree((state) => state.viewport);
  const { width: bgWidth, height: bgHeight } = viewport.getCurrentViewport(
    camera,
    [0, 0, UI.BG_DEPTH],
  );

  const pageScrollRef = useRef<any>(null);
  const bgScrollRef = useRef<any>(null);
  const roboPosRef = useRef<any>(null);

  useHomeScrollAnimation({ pageScrollRef, bgScrollRef, roboPosRef });

  return (
    <>
      <group ref={bgScrollRef}>
        <Background
          color={"green"}
          y={0 * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
        <Background
          color={"red"}
          y={-1 * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
        <Background
          color={"blue"}
          y={-2 * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
        <Background
          color={"teal"}
          y={-3 * bgHeight}
          z={UI.BG_DEPTH}
          width={bgWidth}
          height={bgHeight}
        />
      </group>
      <group ref={pageScrollRef}>
        <Hero3d />
        <Box
          ref={roboPosRef}
          position={[7, 0, 0]}
          rotation={[0, degToRad(25), 0]}
        >
          <meshBasicMaterial color={[1, 0.4, 0.2]} />
        </Box>
        <SimpleAboutCard position={[0, -27, 0]} />
      </group>
    </>
  );
};

function useHomeScrollAnimation({
  pageScrollRef,
  bgScrollRef,
  roboPosRef,
}: {
  pageScrollRef: RefObject<any>;
  bgScrollRef: RefObject<any>;
  roboPosRef: RefObject<any>;
}) {
  const scroll = useScroll();

  const camera = useThree((state) => state.camera);
  const viewport = useThree((state) => state.viewport);

  const { height: bgHeight } = viewport.getCurrentViewport(camera, [
    0,
    0,
    UI.BG_DEPTH,
  ]);

  const animationTimeline = useRef(
    gsap.timeline({
      paused: true,
      defaults: { duration: 1, ease: "none" },
      onUpdate: () => {
        console.log(roboPosRef.current.rotation);
      },
    }),
  );

  useGSAP(() => {
    animationTimeline.current
      .to(
        pageScrollRef.current.position,
        { y: (scroll.pages - 1) * viewport.height },
        0,
      )
      .to(bgScrollRef.current.position, { y: (scroll.pages - 1) * bgHeight }, 0)
      .to(
        roboPosRef.current.position,
        { y: -(scroll.pages - 1) * viewport.height },
        0,
      );

    // 2. Add your non-uniform rotation ranges using absolute positioning (the 3rd argument)
    // Each tween's 'duration' must match the exact size of its input range (end - start).
    animationTimeline.current
      .to(roboPosRef.current.rotation, { y: degToRad(-25), duration: 0.3 }, 0) // Range 1: 0.0 -> 0.3  (width: 0.3)
      .to(
        roboPosRef.current.rotation,
        { y: degToRad(25), duration: 0.09 },
        0.31,
      ) // Range 2: 0.31 -> 0.4 (width: 0.09)
      .to(
        roboPosRef.current.rotation,
        { y: degToRad(-25), duration: 0.04 },
        0.41,
      ) // Range 3: 0.41 -> 0.45(width: 0.04)
      .to(
        roboPosRef.current.rotation,
        { y: degToRad(25), duration: 0.44 },
        0.46,
      ) // Range 4: 0.46 -> 0.9 (width: 0.44)
      .to(
        roboPosRef.current.rotation,
        { y: degToRad(-25), duration: 0.09 },
        0.91,
      ); // Range 5: 0.91 -> 1.0 (width: 0.09)

    animationTimeline.current
      .to(roboPosRef.current.position, { x: -7, duration: 0.3 }, 0) // Range 1: 0.0 -> 0.3  (width: 0.3)
      .to(roboPosRef.current.position, { x: 7, duration: 0.09 }, 0.31) // Range 2: 0.31 -> 0.4 (width: 0.09)
      .to(roboPosRef.current.position, { x: -7, duration: 0.04 }, 0.41) // Range 3: 0.41 -> 0.45(width: 0.04)
      .to(roboPosRef.current.position, { x: 7, duration: 0.44 }, 0.46) // Range 4: 0.46 -> 0.9 (width: 0.44)
      .to(roboPosRef.current.position, { x: -7, duration: 0.09 }, 0.91); // Range 5: 0.91 -> 1.0 (width: 0.09)
  });

  useFrame(() => {
    console.log("Offset", scroll.offset);
    if (animationTimeline.current) {
      animationTimeline.current.seek(
        scroll.offset * animationTimeline.current.duration(),
        false,
      );
    }
  });
}

export default Home;
