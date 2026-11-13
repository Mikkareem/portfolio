import { Center, Text3D } from "@react-three/drei";
import { Fonts } from "../../presentation/Core";
import type { ComponentProps } from "react";

export const CenterTitle = ({
  title,
  ...groupProps
}: { title: string } & ComponentProps<"group">) => {
  return (
    <group {...groupProps}>
      <Center>
        <Text3D
          font={Fonts.stylish.typeface}
          size={2.6} // Font size
          letterSpacing={0.2}
          height={0.2} // Depth / Extrusion thickness
          curveSegments={12} // Smoothness of curved letter paths
          bevelEnabled // Enable beveled edges
          bevelThickness={0.03} // Depth of the bevel
          bevelSize={0.02} // Extent of the bevel outline
          bevelOffset={0}
          bevelSegments={5} // Smoothness of the bevel
        >
          {title}
          <meshBasicMaterial color={"#fff"} />
        </Text3D>
      </Center>
    </group>
  );
};
