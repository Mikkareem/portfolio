import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import { QuadraticBezierCurve3, Vector3 } from "three";

export const TUBULAR_SEGMENTS = 14;
export const RADIAL_SEGMENTS = 6;
export const STRING_RADIUS = 0.018;

// Static pre-allocated vector instances to eliminate garbage collection inside useFrame
const pStart = new Vector3();
const pEnd = new Vector3();
const midPoint = new Vector3();
const curve = new QuadraticBezierCurve3();
const sampleP = new Vector3();

export function useBalloonStringSetup({
  anchorRef,
  balloonRef,
  meshRef,
}: {
  meshRef: RefObject<any>;
  anchorRef: RefObject<any>;
  balloonRef: RefObject<any>;
}) {
  const viewport = useThree((state) => state.viewport);

  useFrame((state) => {
    if (!anchorRef.current || !balloonRef.current || !meshRef.current) return;
    const mesh = meshRef.current;
    if (!mesh.visible) return;

    // If ancestor section group is culled off-screen, skip
    let p = mesh.parent;
    while (p) {
      if (p.visible === false) return;
      p = p.parent;
    }

    const geom = mesh.geometry;
    if (!geom || !geom.attributes.position) return;

    // 1. Get Rapier translations
    const handPos = anchorRef.current.translation();
    const balloonPos = balloonRef.current.translation();

    // 2. Both anchor and balloons live in this cluster's local coordinate frame:
    // Anchor is at local [0, -viewport.height / 2, -5]
    pStart.set(0, -(viewport.height / 2), -5);
    pEnd.set(
      balloonPos.x - handPos.x,
      -(viewport.height / 2) + (balloonPos.y - handPos.y),
      -5 + (balloonPos.z - handPos.z)
    );

    // 3. Midpoint with subtle gravity sag + wind deflection
    midPoint.copy(pStart).lerp(pEnd, 0.5);
    midPoint.y -= 0.35;

    const t = state.clock.elapsedTime;
    midPoint.x += Math.sin(t * 0.9) * 0.18;
    midPoint.z += -Math.cos(t * 0.7) * 0.25;

    // 4. Update the Quadratic Bézier curve in-place
    curve.v0.copy(pStart);
    curve.v1.copy(midPoint);
    curve.v2.copy(pEnd);

    // 5. Update existing geometry buffer in-place (ZERO allocations, ZERO GC pauses!)
    const pos = geom.attributes.position.array;
    const norm = geom.attributes.normal?.array;
    const frames = curve.computeFrenetFrames(TUBULAR_SEGMENTS, false);
    let offset = 0;

    for (let i = 0; i <= TUBULAR_SEGMENTS; i++) {
      curve.getPointAt(i / TUBULAR_SEGMENTS, sampleP);
      const N = frames.normals[i];
      const B = frames.binormals[i];

      for (let j = 0; j <= RADIAL_SEGMENTS; j++) {
        const v = (j / RADIAL_SEGMENTS) * Math.PI * 2;
        const sin = Math.sin(v);
        const cos = -Math.cos(v);

        const nx = cos * N.x + sin * B.x;
        const ny = cos * N.y + sin * B.y;
        const nz = cos * N.z + sin * B.z;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

        const normX = nx / len;
        const normY = ny / len;
        const normZ = nz / len;

        if (norm) {
          norm[offset] = normX;
          norm[offset + 1] = normY;
          norm[offset + 2] = normZ;
        }

        pos[offset] = sampleP.x + STRING_RADIUS * normX;
        pos[offset + 1] = sampleP.y + STRING_RADIUS * normY;
        pos[offset + 2] = sampleP.z + STRING_RADIUS * normZ;

        offset += 3;
      }
    }

    geom.attributes.position.needsUpdate = true;
    if (geom.attributes.normal) geom.attributes.normal.needsUpdate = true;
  });
}
