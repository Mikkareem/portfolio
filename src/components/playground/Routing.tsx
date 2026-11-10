import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

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

  return (
    <mesh onClick={() => navigate("details")}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Details() {
  const navigate = useNavigate();

  return (
    <mesh onClick={() => navigate(-1)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

function RouterScrollSync() {
  const scroll = useScroll();
  const location = useLocation();

  // Store scroll positions keyed by React Router's unique location.key
  const scrollPositions = useRef<any>({});

  useEffect(() => {
    if (!scroll || !scroll.el) return;

    // 1. Save scroll position of the current page before unmounting/changing
    const handleScroll = () => {
      scrollPositions.current[location.key] = scroll.el.scrollTop;
    };

    const scrollEl = scroll.el;
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Restore scroll position for this specific history key (handles Back/Forward perfectly)
    const savedPosition = scrollPositions.current[location.key] || 0;
    scrollEl.scrollTop = savedPosition;

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [location.key, scroll]);

  return null;
}
