import { useTexture } from "@react-three/drei";
import AdBoard from "./AdBoard";

export function ImageCard() {
  const imageTexture = useTexture(
    "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn_light_3.png",
  );

  return (
    <AdBoard scaleFactorX={0.07} scaleFactorY={0.08} color={"green"}>
      <mesh scale={[8 * (imageTexture.width / imageTexture.height), 8, 0]}>
        <planeGeometry />
        <meshBasicMaterial map={imageTexture} toneMapped={false} />
      </mesh>
    </AdBoard>
  );
}
