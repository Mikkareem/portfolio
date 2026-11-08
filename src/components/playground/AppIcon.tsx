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

export const AppIcon = ({
  width,
  height,
  src,
  color,
  scale,
  ...groupProps
}: AppSvgProps) => {
  const texture = useTexture(src);

  return (
    <group {...groupProps}>
      <mesh scale={scale}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={DoubleSide}
          emissive={"pink"}
          emissiveMap={texture}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
};
