import { Center, Float, Text, Text3D } from "@react-three/drei";
import { Fonts } from "../../presentation/Core";
import { useThree } from "@react-three/fiber";
import { HeroAnimatingVisual } from "./HeroAnimatingVisual";
import { degToRad } from "three/src/math/MathUtils.js";

// Accurate unscaled width of "Mohamed" in Chango font at fontSize 0.85: ~7.64 units
const NAME_WIDTH_MOBILE = 7.65;

const Hero3d = () => {
  const viewport = useThree((t) => t.viewport);

  // Threshold: desktop & wide landscape vs mobile / portrait
  const isWide = viewport.width >= 13.5;

  // ─── Desktop / Wide Landscape Layout ────────────────────────
  if (isWide) {
    // AnimatingVisual is scaled down to a compact floating companion
    const animScale = Math.min(
      0.42,
      (viewport.width * 0.16) / 5.5,
      (viewport.height * 0.38) / 5.5,
    );

    // Animating visual floats on the right side while Name is centered horizontally at x = 0
    const animX = Math.max(6.2, viewport.width * 0.32);

    return (
      <group>
        {/* Section 1: Heavily Dominant Name Section - Centered Horizontally at x = 0 */}
        <group position={[0, 0, 0]}>
          <NameSection rotation-y={degToRad(24)} scale={1.3} isWide={true} />
        </group>

        {/* Section 2: Scaled-down floating Animating 3D Visual */}
        <group position={[animX, 0, 0]}>
          <HeroAnimatingVisual scale={animScale} />
        </group>
      </group>
    );
  }

  // ─── Mobile / Narrow Portrait Layout ────────────────────────
  // On mobile, ensure the 3D text fits strictly within 82% of screen width
  const mobileNameScale = Math.min(
    0.62,
    (viewport.width * 0.82) / NAME_WIDTH_MOBILE,
    (viewport.height * 0.42) / 4.6,
  );

  // AnimatingVisual is scaled down significantly as a subordinate accent
  const animScale = Math.min(
    0.28,
    (viewport.width * 0.38) / 5.5,
    (viewport.height * 0.16) / 5.5,
  );

  const yName = Math.min(1.5, viewport.height * 0.12);
  const yAnim = -Math.min(2.5, viewport.height * 0.22);

  return (
    <group>
      {/* Section 1: Heavily Dominant Name Section - Centered Horizontally at x = 0 */}
      <group position={[0, yName, 0]}>
        <NameSection rotation-y={0} scale={mobileNameScale} isWide={false} />
      </group>

      {/* Section 2: Scaled-down floating Animating 3D Visual - Centered Horizontally at x = 0 */}
      <group position={[0, yAnim, 0]}>
        <HeroAnimatingVisual scale={animScale} />
      </group>
    </group>
  );
};

function NameSection({ isWide = true, ...props }: { isWide?: boolean } & any) {
  // Use responsive font size: 1.15 on desktop, 0.85 on mobile
  const fontSize = isWide ? 1.15 : 0.85;
  const lineHeight = isWide ? 1.35 : 1.05;
  const subtitleFontSize = isWide ? 0.54 : 0.38;
  const subtitleY = isWide ? -2.25 : -1.65;

  return (
    <group {...props} dispose={null}>
      {/* Expressive floating animation with safe oscillation bounds */}
      <Float
        speed={4.0}
        // rotationIntensity={isWide ? 0.2 : 0.38}
        // floatIntensity={isWide ? 0.35 : 0.2}
        // floatingRange={[-0.1, 0.1]}
      >
        {/* 3D Stacked Name (Mohamed / Irsath / Kareem) - Each line centered horizontally */}
        <MultilineCentered3DText fontSize={fontSize} lineHeight={lineHeight} />

        {/* Subtitle centered horizontally directly below the 3D name */}
        <Center position={[0, subtitleY, 0]}>
          <Text
            font={Fonts.bodyRegular.name}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            fontSize={subtitleFontSize}
            maxWidth={isWide ? 14 : 5.0}
            lineHeight={1.2}
            outlineWidth={0.002}
          >
            Full Stack Web & Mobile App Developer
          </Text>
        </Center>
      </Float>
    </group>
  );
}

function MultilineCentered3DText({
  fontSize = 1.15,
  lineHeight = 1.35,
}: {
  fontSize?: number;
  lineHeight?: number;
}) {
  const lines = ["Mohamed", "Irsath", "Kareem"];

  return (
    <group>
      {lines.map((line, index) => {
        // Offset so middle line (index = 1, "Irsath") is at y = 0
        const y = (1 - index) * lineHeight;
        return (
          <Center key={index} position={[0, y, 0]}>
            <Text3D
              font={Fonts.stylish.typeface}
              size={fontSize}
              height={0.35}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.025}
              bevelSize={0.018}
              bevelOffset={0}
              bevelSegments={4}
            >
              {line}
              <meshStandardMaterial
                color="#ffd230"
                roughness={0.65}
                metalness={0.25}
              />
            </Text3D>
          </Center>
        );
      })}
    </group>
  );
}

export default Hero3d;
