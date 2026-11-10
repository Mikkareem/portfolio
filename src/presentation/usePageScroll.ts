import type { RefObject } from "react";
import { useStaticScrollTrigger } from "./useStaticScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { lerp } from "three/src/math/MathUtils.js";
import { UI } from "./Core";

export const usePageScroll = ({
  contentRef,
  backgroundRef,
}: {
  contentRef: RefObject<any>;
  backgroundRef: RefObject<any>;
}) => {
  useStaticScrollTrigger();

  const viewport = useThree((t) => t.viewport);
  const scroll = useScroll();

  const camera = useThree((t) => t.camera);
  const bgViewport = viewport.getCurrentViewport(camera, [0, 0, UI.BG_DEPTH]);

  useFrame(() => {
    if (contentRef.current && backgroundRef.current) {
      const totalBgHeight = bgViewport.height * (scroll.pages - 1);
      const totalContentHeight = viewport.height * (scroll.pages - 1);

      backgroundRef.current.position.y = lerp(0, totalBgHeight, scroll.offset);
      contentRef.current.position.y = lerp(0, totalContentHeight, scroll.offset);
    }
  });
};
