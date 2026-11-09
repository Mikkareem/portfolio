import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

const AdBoard = ({ children, scaleFactorX, scaleFactorY }: any) => {
  const contentRef = useRef<any>(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  useFrame(() => {
    if (contentRef.current) {
      // 1. Force update matrices to ensure accurate scaling/positions
      contentRef.current.updateMatrixWorld(true, true);

      // 2. Calculate bounding box of all children at any level
      const box = new THREE.Box3().setFromObject(contentRef.current);
      const boxSize = new THREE.Vector3();
      box.getSize(boxSize);

      // 3. Set dimensions with optional padding
      if (boxSize.x != contentSize.width || boxSize.y != contentSize.height) {
        setContentSize({
          width: boxSize.x,
          height: boxSize.y,
        });
      }
    }
  });

  const mesh = useMemo(() => {
    const box = new THREE.BoxGeometry(1, 1, 0.2).toNonIndexed();
    box.translate(0, 0, -0.23);

    const monitorShape = new THREE.Shape();
    const w = 1,
      h = 1;
    monitorShape.moveTo(-w / 2, -h / 2);
    monitorShape.lineTo(w / 2, -h / 2);
    monitorShape.lineTo(w / 2, h / 2);
    monitorShape.lineTo(-w / 2, h / 2);
    monitorShape.closePath();

    // Define the inner hole path (creates the screen inset/cutout frame)
    const screenHole = new THREE.Path();
    const sw = 0.98,
      sh = 0.98;
    screenHole.moveTo(-sw / 2, -sh / 2);
    screenHole.lineTo(-sw / 2, sh / 2);
    screenHole.lineTo(sw / 2, sh / 2);
    screenHole.lineTo(sw / 2, -sh / 2);
    screenHole.closePath();
    monitorShape.holes.push(screenHole);

    // Extrusion settings to give the frame depth and smooth bevel edges
    const extrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 10,
      bevelSize: 0.02,
      bevelThickness: 0.03,
    };

    // This generates a single, optimized THREE.BufferGeometry subclass
    const monitorGeometry = new THREE.ExtrudeGeometry(
      monitorShape,
      extrudeSettings,
    );

    // Center the geometry origin to its bounding box center
    monitorGeometry.center();

    // 3. Material and Mesh
    const monitorMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4f63a,
      roughness: 0.3,
      metalness: 0.8,
    });

    const mergedGeometry = BufferGeometryUtils.mergeGeometries([
      box,
      monitorGeometry,
    ]);

    const monitorMesh = new THREE.Mesh(mergedGeometry, monitorMaterial);

    return monitorMesh;
  }, []);

  return (
    <group>
      <group
        scale={[
          contentSize.width + contentSize.width * scaleFactorX,
          contentSize.height + contentSize.height * scaleFactorY,
          1,
        ]}
      >
        <primitive object={mesh} />
      </group>
      <group
        position={[-contentSize.width / 2.0, contentSize.height / 2.0, 0.001]}
        ref={contentRef}
      >
        {children}
      </group>
    </group>
  );
};

export default AdBoard;
