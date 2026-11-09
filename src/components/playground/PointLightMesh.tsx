import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const VLightMaterial = {
  uniforms: {
    uColor: { value: new THREE.Color("#f5f533") }, // Input color (Cyan light simulation)
    uIntensity: { value: 2.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vHeight;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;

    void main() {
      // vUv.y goes from 0.0 at one end to 1.0 at the other.
      // Adjust distance falloff along the length of the beam.
      float distanceFactor = 1.0 - vUv.y;
      distanceFactor = clamp(distanceFactor, 0.0, 1.0);
      distanceFactor = pow(distanceFactor, 3.2); 

      // For a cylinder/cone geometry, vUv.x wraps around the circumference (0.0 to 1.0).
      // We can create a smooth radial falloff from the center of the beam or keep it uniform.
      // Here we create a subtle edge softness around the beam's cross-section if desired,
      // or let the geometry shape handle the circular cross-section naturally.
      float edgeFactor = 1.0; 

      float totalLight = distanceFactor * edgeFactor * uIntensity;

      vec3 finalColor = uColor * totalLight;
      float alpha = distanceFactor * 0.98;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.MultiplyBlending, // Makes it look like glowing light
};

export const PointLightMesh = ({ color }: any) => {
  const materialRef = useRef<any>(null);

  const beamGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(2, 0.2, 7, 20, 20, true);
    return geo;
  }, []);

  // Update color uniform dynamically if prop changes
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(color);
    }
  });

  return (
    <mesh geometry={beamGeometry} position={[0, -1.5, 0]}>
      <shaderMaterial
        ref={materialRef}
        args={[VLightMaterial]}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};
