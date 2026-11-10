import { useScroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function useStaticScrollTrigger() {
  const invalidate = useThree((t) => t.invalidate);
  const scroll = useScroll();

  // Safeguard: Ensure native scroll listener is bound to scroll.el even if
  // Drei's events.connected condition failed during initial mount.
  useEffect(() => {
    const el = scroll.el;
    if (!el) return;

    const onScroll = () => {
      const scrollThreshold = el.scrollHeight - el.clientHeight;
      if (scrollThreshold > 0) {
        if ((scroll as any).scroll) {
          (scroll as any).scroll.current = el.scrollTop / scrollThreshold;
        }
        invalidate();
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scroll, invalidate]);
}