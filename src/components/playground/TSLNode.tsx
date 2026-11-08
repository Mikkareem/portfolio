import { PublicFontText } from "./CanvasText";

const TSLNode = (props: any) => {
  return (
    <group {...props}>
      {/* <mesh>
        <boxGeometry args={[5, 5, 5]} />
        <meshBasicNodeMaterial colorNode={color("#ff3356")} />
      </mesh> */}

      <PublicFontText />
    </group>
  );
};

export default TSLNode;
