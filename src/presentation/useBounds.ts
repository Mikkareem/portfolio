import { useThree } from "@react-three/fiber";
import type { BoundingBox } from "./Types";

export const useBounds: (page: number) => BoundingBox = (page) => {
  const viewport = useThree((t) => t.viewport);

  const viewportLeft = -viewport.width / 2.0;
  const viewportRight = viewport.width / 2.0;

  const top = -viewport.height * (page - 0.5);
  const bottom = -viewport.height * (page + 0.5);

  return {
    left: viewportLeft,
    right: viewportRight,
    top,
    bottom,
  };
};