import { Center, Float, Text, Text3D } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { Fonts } from "../../presentation/Core";

const Hero3d = () => {
  return <NameSection rotation-y={degToRad(45)} scale={1.03} />;
};

function NameSection(props: any) {
  return (
    <group {...props} dispose={null}>
      <Float>
        <MultilineCentered3DText position-y={2} scale={1.3} />;
        <Center position={[0, -2, 0]} bottom>
          <Text
            font={Fonts.bodyRegular.name}
            textAlign="center"
            fontSize={0.7}
            outlineWidth={0.002}
          >
            Full Stack Web & Mobile App Developer
          </Text>
        </Center>
      </Float>
    </group>
  );
}

function MultilineCentered3DText(props: any) {
  const lines = ["Mohamed", "Irsath", "Kareem"];
  const lineHeight = 1.4;

  return (
    <group {...props}>
      {lines.map((line, index) => (
        // center along X axis for each line
        <Center key={index} position={[0, -index * lineHeight, 0]}>
          <Text3D
            font={Fonts.stylish.typeface}
            size={1.2} // Font size
            height={0.4} // Depth / Extrusion thickness
            curveSegments={12} // Smoothness of curved letter paths
            bevelEnabled // Enable beveled edges
            bevelThickness={0.03} // Depth of the bevel
            bevelSize={0.02} // Extent of the bevel outline
            bevelOffset={0}
            bevelSegments={5} // Smoothness of the bevel
          >
            {line}
            <meshStandardMaterial
              color="#ffd230"
              roughness={0.7}
              metalness={0.2}
            />
          </Text3D>
        </Center>
      ))}
    </group>
  );
}

export default Hero3d;
