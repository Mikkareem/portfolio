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
      // Normalize height factor: 0.0 at top (y = 2.0), 1.0 at bottom (y = 0.0)
      float distanceFactor = 1.0 - vUv.y;
      distanceFactor = clamp(distanceFactor, 0.0, 1.0);
      distanceFactor = pow(distanceFactor, 1.2); // Controls light reach curve

      // 2. Horizontal edge falloff: Brightest at center (vUv.x = 0.5), fading at edges (0.0 or 1.0)
      float edgeFactor = 1.0 - abs(vUv.x - 0.5) * 2.0;
      edgeFactor = pow(edgeFactor, 0.78); // Softens the beam borders

      // Combine factors
      float totalLight = distanceFactor * edgeFactor * uIntensity;

      vec3 finalColor = uColor * totalLight;
      float alpha = distanceFactor * edgeFactor * 0.98; // Fade alpha smoothly at edges/tip

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.MultiplyBlending, // Makes it look like glowing light
};

export const LightMesh = ({ color }: any) => {
  const materialRef = useRef<any>(null);

  // Create a triangular V-shaped wedge for the torch beam
  const beamGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    // Triangle vertices forming a V-shape (Point at bottom [0,0,0], wide at top)
    const vertices = new Float32Array([
      0.0,
      0.0,
      0.0, // Vertex 0: Bottom tip
      -3.5,
      6.0,
      0.0, // Vertex 1: Top left
      3.5,
      6.0,
      0.0, // Vertex 2: Top right
    ]);

    // Explicit UV mapping corresponding to the vertices
    const uvs = new Float32Array([
      0.5,
      0.0, // Bottom tip (Center X, Bottom Y)
      0.0,
      1.0, // Top left (Left X, Top Y)
      1.0,
      1.0, // Top right (Right X, Top Y)
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    return geometry;
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
