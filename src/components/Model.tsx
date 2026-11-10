import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Home from "./home";
import { Playground } from "../pages/Playground";

const Model = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[15, 10, 20]} intensity={1.2} castShadow />

        <ScrollControls pages={4} damping={0.2}>
          {/* <Home /> */}
          <Playground />
        </ScrollControls>

        <OrbitControls makeDefault enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Model;
