import { useVideoTexture } from "@react-three/drei";

export function VideoCard() {
  const videoTexture = useVideoTexture(
    "https://storage.googleapis.com/techullurgy-media/app-demos/codehorn/codehorn-home-dark.mp4",
    {
      start: true,
      loop: true,
      autoplay: true,
      playsInline: true,
      muted: true,
      crossOrigin: "anonymous",
      onloadstart: () => {
        /* loading = true */
      },
      onwaiting: () => {
        /* loading = true */
      },
      onplaying: () => {
        /* loading = false */
      },
      oncanplay: () => {
        /* loading = false */
      },
      onloadeddata: () => {
        /* loading = false */
      },
    },
  );
  return (
    <mesh>
      <planeGeometry
        args={[videoTexture.width / 200.0, videoTexture.height / 200.0]}
      />
      <meshStandardMaterial map={videoTexture} toneMapped={false} />
    </mesh>
  );
}
