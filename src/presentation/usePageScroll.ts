import { useEffect, type RefObject } from "react";
import { useStaticScrollTrigger } from "./useStaticScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { lerp } from "three/src/math/MathUtils.js";
import { UI } from "./Core";
import { useScrollStore } from "../stores/ScrollStore";

export const usePageScroll = ({
  count,
  contentRef,
  backgroundRef,
}: {
  count: number
  contentRef: RefObject<any>;
  backgroundRef: RefObject<any>;
}) => {
  const setTotalPages = useScrollStore(state => state.setTotalPages)

  // Remove this, once when we setup RouterScrollSync (duplicate code)
  useStaticScrollTrigger();

  useEffect(() => {
    setTotalPages(count)
  }, [setTotalPages, count])

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
