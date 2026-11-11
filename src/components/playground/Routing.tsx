import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useScrollStore } from "../../stores/ScrollStore";

export function Routing() {
  return (
    <BrowserRouter>
      <RouterScrollSync />
      <Routes>
        <Route index element={<Home />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  const setTotalPages = useScrollStore((state) => state.setTotalPages);

  useEffect(() => {
    setTotalPages(10);
  }, [setTotalPages]);

  return (
    <mesh onClick={() => navigate("details")}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Details() {
  const navigate = useNavigate();
  const setTotalPages = useScrollStore((state) => state.setTotalPages);

  useEffect(() => {
    setTotalPages(6);
  }, [setTotalPages]);

  return (
    <mesh onClick={() => navigate(-1)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

const scrollBackstack = new Map<string, number>();

function RouterScrollSync() {
  const scroll = useScroll();
  const location = useLocation();
  const invalidate = useThree((state) => state.invalidate);
  const isRestoring = useRef(false);

  // Continuously record scroll position & record final position on route exit
  useEffect(() => {
    const el = scroll?.el;
    if (!el) return;

    const onScroll = () => {
      if (isRestoring.current) return;
      scrollBackstack.set(location.key, el.scrollTop);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (!isRestoring.current) {
        scrollBackstack.set(location.key, el.scrollTop);
      }
      el.removeEventListener("scroll", onScroll);
    };
  }, [location.key, scroll]);

  // Restore or reset scroll position on route change
  useEffect(() => {
    const el = scroll?.el;
    if (!el) return;

    // New route = reset to 0 (top of page); Backstack route = restore saved position
    const targetScroll = scrollBackstack.get(location.key) ?? 0;

    isRestoring.current = true;

    const frameId = requestAnimationFrame(() => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      const targetOffset = maxScroll > 0 ? targetScroll / maxScroll : 0;

      // 1. Reset or restore DOM scroll
      el.scrollTop = targetScroll;

      // 2. Sync Drei's internal damping target
      if ((scroll as any).scroll) {
        (scroll as any).scroll.current = targetOffset;
      }

      // 3. Sync immediate Drei state offset
      scroll.offset = targetOffset;

      invalidate();

      // Release lock on the next frame so programmatic scroll events aren't recorded
      requestAnimationFrame(() => {
        isRestoring.current = false;
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [location.key, scroll, invalidate]);

  return null;
}
