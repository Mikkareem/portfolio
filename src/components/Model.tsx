import { OrbitControls, ScrollControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useScrollStore } from "../stores/ScrollStore";
import Skills from "./skills";

const Model = () => {
  const totalPages = useScrollStore((state) => state.totalPages);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 45,
        }}
      >
        <Stats />
        <ambientLight intensity={0.9} />
        <directionalLight position={[15, 10, 20]} intensity={1.2} castShadow />

        <ScrollControls pages={totalPages} damping={0.2}>
          {/* <Playground /> */}
          {/* <Home /> */}
          <Skills />
        </ScrollControls>

        <OrbitControls makeDefault enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Model;
