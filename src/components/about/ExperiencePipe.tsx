import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3, type ColorRepresentation } from "three";

export type ExperiencePipePoint = {
  index: number;
  side: "left" | "right";
  dotPosition: Vector3;
  cardTargetPosition: Vector3;
};

export type ExperiencePipeProps = {
  /** Number of experience viewports/pages (default: 4) */
  count?: number;
  /** Side where the pipe starts on Page 0 (default: "left") */
  startSide?: "left" | "right";
  /** Radius of the main connected pipe (default: 0.22) */
  pipeRadius?: number;
  /** Radius of the junction dot spheres on the pipe (default: 0.42) */
  dotRadius?: number;
  /** Color of the main pipe (default: "#10b981") */
  pipeColor?: ColorRepresentation;
  /** Color of the outer dot junction (default matches pipeColor) */
  dotColor?: ColorRepresentation;
  /** Emissive color of the inner active core dot (default: "#ffffff") */
  dotCoreColor?: ColorRepresentation;
  /** Optional custom horizontal offset from center (auto-calculated if omitted) */
  xOffset?: number;
  /** Depth position of the pipe in Z (default: 0) */
  z?: number;
  /** Whether to show a connector pin stub extending from the dot toward the card area (default: true) */
  showConnectorPins?: boolean;
  /** Length of the connector pin stub (default: 0.75) */
  connectorPinLength?: number;
  /** Callback exposing calculated dot and card positions */
  onLayoutCalculated?: (points: ExperiencePipePoint[]) => void;
};

/**
 * Computes the curve and dot positions for an alternating connected pipe across viewports.
 */
export function getExperiencePipeLayout({
  count = 4,
  startSide = "left",
  viewportWidth,
  viewportHeight,
  xOffset,
  z = 0,
}: {
  count?: number;
  startSide?: "left" | "right";
  viewportWidth: number;
  viewportHeight: number;
  xOffset?: number;
  z?: number;
}) {
  const isMobile = viewportWidth < 9;
  // Responsive horizontal offset:
  // On desktop, keep pipe nicely separated from center leaving room for the card
  const defaultXDist = isMobile
    ? viewportWidth * 0.36
    : Math.min(viewportWidth * 0.28, viewportWidth / 2 - 1.8);

  const xDist = xOffset ?? defaultXDist;

  const dots: ExperiencePipePoint[] = [];
  const controlPoints: Vector3[] = [];

  const firstSideSign = startSide === "left" ? -1 : 1;
  const startX = firstSideSign * xDist;

  // ── 1. Start of pipe: extends far beyond the top of viewport 0 ──────────────
  controlPoints.push(new Vector3(startX, viewportHeight * 1.0, z));
  controlPoints.push(new Vector3(startX, viewportHeight * 0.5, z));

  // ── 2. Viewports: alternating Left and Right ────────────────────────────────
  for (let i = 0; i < count; i++) {
    const isFirstSide = i % 2 === 0;
    const side: "left" | "right" = isFirstSide
      ? startSide
      : startSide === "left"
        ? "right"
        : "left";

    const sideSign = side === "left" ? -1 : 1;
    const x = sideSign * xDist;
    const yCenter = -i * viewportHeight;

    const dotPosition = new Vector3(x, yCenter, z);
    // Suggested card anchor position on the opposite side
    const cardTargetPosition = new Vector3(-sideSign * xDist * 0.85, yCenter, z);

    dots.push({
      index: i,
      side,
      dotPosition,
      cardTargetPosition,
    });

    // Straight vertical section around the dot for visual stability
    controlPoints.push(new Vector3(x, yCenter + viewportHeight * 0.22, z));
    controlPoints.push(dotPosition);
    controlPoints.push(new Vector3(x, yCenter - viewportHeight * 0.22, z));
  }

  // ── 3. End of pipe: extends far beyond the bottom of the last viewport ──────
  const lastDot = dots[dots.length - 1];
  const lastSideSign = lastDot.side === "left" ? -1 : 1;
  const endX = lastSideSign * xDist;
  const lastYCenter = -(count - 1) * viewportHeight;

  controlPoints.push(new Vector3(endX, lastYCenter - viewportHeight * 0.5, z));
  controlPoints.push(new Vector3(endX, lastYCenter - viewportHeight * 1.0, z));

  // Smooth Catmull-Rom curve using 'chordal' parameterization to prevent overshoot
  const curve = new CatmullRomCurve3(controlPoints, false, "chordal");

  return {
    curve,
    dots,
    controlPoints,
    xDist,
  };
}

export const ExperiencePipe = ({
  count = 4,
  startSide = "left",
  pipeRadius = 0.22,
  dotRadius = 0.44,
  pipeColor = "#10b981",
  dotColor,
  dotCoreColor = "#ffffff",
  xOffset,
  z = 0,
  showConnectorPins = true,
  connectorPinLength = 0.8,
  onLayoutCalculated,
}: ExperiencePipeProps) => {
  const viewport = useThree((state) => state.viewport);

  const { curve, dots } = useMemo(() => {
    const layout = getExperiencePipeLayout({
      count,
      startSide,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
      xOffset,
      z,
    });

    if (onLayoutCalculated) {
      onLayoutCalculated(layout.dots);
    }

    return layout;
  }, [
    count,
    startSide,
    viewport.width,
    viewport.height,
    xOffset,
    z,
    onLayoutCalculated,
  ]);

  const activeDotColor = dotColor ?? pipeColor;

  return (
    <group>
      {/* ── Main Connected 3D Pipe ────────────────────────────────────────── */}
      <mesh>
        <tubeGeometry
          args={[
            curve,
            Math.max(128, count * 64), // smooth tubular segments
            pipeRadius,
            24, // radial cross-section segments
            false,
          ]}
        />
        <meshStandardMaterial
          color={pipeColor}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>

      {/* ── Dots in the Pipe (1 per viewport page, on pipe's active side) ── */}
      {dots.map((dot) => {
        const pinDirection = dot.side === "left" ? 1 : -1;
        const pinHalfLen = connectorPinLength / 2;

        return (
          <group key={dot.index} position={dot.dotPosition}>
            {/* Outer Joint Sphere on Pipe */}
            <mesh>
              <sphereGeometry args={[dotRadius, 32, 32]} />
              <meshStandardMaterial
                color={activeDotColor}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>

            {/* Glowing Active Inner Core */}
            <mesh>
              <sphereGeometry args={[dotRadius * 0.55, 24, 24]} />
              <meshStandardMaterial
                color={dotCoreColor}
                emissive={dotCoreColor}
                emissiveIntensity={1.2}
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>

            {/* Subtle Metallic Joint Ring Accent */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[dotRadius * 1.05, pipeRadius * 0.25, 16, 32]} />
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.15}
                metalness={0.9}
              />
            </mesh>

            {/* Connector Pin / Stub pointing towards the Card area */}
            {showConnectorPins && (
              <group position={[pinDirection * pinHalfLen, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry
                    args={[
                      pipeRadius * 0.75,
                      pipeRadius * 0.75,
                      connectorPinLength,
                      20,
                    ]}
                  />
                  <meshStandardMaterial
                    color={activeDotColor}
                    roughness={0.3}
                    metalness={0.6}
                  />
                </mesh>
                {/* Pin Tip Accent */}
                <mesh position={[pinDirection * pinHalfLen, 0, 0]}>
                  <sphereGeometry args={[pipeRadius * 0.85, 16, 16]} />
                  <meshStandardMaterial
                    color={dotCoreColor}
                    emissive={dotCoreColor}
                    emissiveIntensity={0.8}
                  />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
