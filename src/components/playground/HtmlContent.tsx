import { Html, useScroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const HtmlContent = (props: any) => {
  const scroll = useScroll();
  const { gl } = useThree();

  const { children, ...otherProps } = props;

  // Globally forward wheel/trackpad events that land outside the canvas
  // (i.e. over any <Html portal> element) into the ScrollControls scroll element.
  // scroll.el is the actual scroll DOM node exposed by useScroll() — no guessing.
  useEffect(() => {
    const scrollEl = scroll.el;
    if (!scrollEl) return;

    const canvasContainer = gl.domElement.parentElement;

    const handler = (e: WheelEvent) => {
      // If the event target is already inside the canvas, ScrollControls
      // handles it natively — don't double-forward.
      if (canvasContainer?.contains(e.target as Node)) return;
      scrollEl.scrollTop += e.deltaY;
    };

    document.addEventListener("wheel", handler, { passive: true });
    return () => document.removeEventListener("wheel", handler);
  }, [gl, scroll.el]);

  return (
    <group {...otherProps} dispose={null}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />

        <Html transform portal={{ current: document.body }}>
          {children}
        </Html>
      </mesh>
    </group>
  );
};
