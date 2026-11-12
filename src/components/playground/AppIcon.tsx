import { useTexture } from "@react-three/drei";
import {
  type EventHandlers,
  type InstanceProps,
  type MathProps,
  type ReactProps,
} from "@react-three/fiber";
import type {
  Mutable,
  Overwrite,
} from "@react-three/fiber/dist/declarations/src/core/utils";
import {
  AdditiveBlending,
  DoubleSide,
  type Color,
  type ColorRepresentation,
  type Group,
  type Object3DEventMap,
} from "three";

type AppSvgProps = {
  src: string;
  width: number;
  height: number;
  scale: number;
  color:
    | string
    | number
    | Color
    | [r: number, g: number, b: number]
    | [color: ColorRepresentation]
    | Readonly<Color>
    | readonly [r: number, g: number, b: number]
    | readonly [color: ColorRepresentation]
    | undefined;
} & Mutable<
  Overwrite<
    Partial<
      Overwrite<
        Group<Object3DEventMap>,
        MathProps<Group<Object3DEventMap>> &
          ReactProps<Group<Object3DEventMap>> &
          Partial<EventHandlers>
      >
    >,
    Omit<InstanceProps<Group<Object3DEventMap>, typeof Group>, "object">
  >
>;
import { useControls } from "leva";

export const AppIcon = ({
  width,
  height,
  src,
  color,
  scale,
  ...groupProps
}: AppSvgProps) => {
  const texture = useTexture(src);

  const { circleColor } = useControls({
    circleColor: { value: "#00ffff", label: "Circle Color" },
  });

  return (
    <group {...groupProps}>
      <mesh scale={scale}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={DoubleSide}
          emissive={color}
          emissiveMap={texture}
          emissiveIntensity={1.2}
        />
      </mesh>

      <group position={[0, 0, -0.001]}>
        <SelectiveGlowingCircle radius={1.6} color={circleColor} />
      </group>
    </group>
  );
};

/**
 * Lightweight glowing circle using a torus + emissive material.
 * No post-processing — the glow is faked with additive blending and an
 * outer soft halo ring, so it costs almost nothing per instance.
 */
function SelectiveGlowingCircle({
  radius = 1,
  tubeRadius = 0.025,
  color = "#00ffff",
  glowIntensity = 2.0,
  haloScale = 1.15,
  haloOpacity = 0.15,
}: {
  radius?: number;
  tubeRadius?: number;
  color?: string;
  glowIntensity?: number;
  haloScale?: number;
  haloOpacity?: number;
}) {
  return (
    <group>
      {/* Core bright ring */}
      <mesh>
        <torusGeometry args={[radius, tubeRadius, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glowIntensity}
          toneMapped={false}
        />
      </mesh>

      {/* Soft outer halo for the bloom look */}
      <mesh>
        <torusGeometry args={[radius, tubeRadius * 4, 16, 100]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={haloOpacity}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
