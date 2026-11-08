import { useTexture } from "@react-three/drei";

const GlowMaterial = {
  uniforms: {
    uTexture: { value: null },
    uBrightnessBoost: { value: 2.8 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uBrightnessBoost;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      // Brighten based on the base color luminance/intensity
      vec3 brightColor = texColor.rgb * (texColor.rgb * uBrightnessBoost + 1.0);
      gl_FragColor = vec4(brightColor, texColor.a);
    }
  `,
};

const GlowAppIcon = () => {
  const texture = useTexture("images/kmp.png");

  return (
    <group scale={1}>
      <mesh>
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          transparent
          args={[GlowMaterial]}
          uniforms-uTexture-value={texture}
        />
      </mesh>
    </group>
  );
};

export default GlowAppIcon;
