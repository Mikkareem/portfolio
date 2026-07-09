import { useEffect, useRef } from 'react';
import p5 from 'p5';

export const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Disable heavy p5.js canvas rendering on mobile to maintain 120Hz liquid-smooth scrolling
      return;
    }

    const particleCount = 85;
    const maxConnectionDistance = 120;
    const mouseInfluenceDistance = 180;

    const sketch = (p: p5) => {
      let particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: p5.Color;
        originalAlpha: number;
      }> = [];

      p.setup = () => {
        const width = containerRef.current?.clientWidth || window.innerWidth;
        const height = containerRef.current?.clientHeight || window.innerHeight;
        
        const canvas = p.createCanvas(width, height);
        canvas.style('display', 'block');
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('width', '100%');
        canvas.style('height', '100%');
        
        // Setup initial particles
        for (let i = 0; i < particleCount; i++) {
          const size = p.random(1.5, 4);
          const isPrimary = p.random() > 0.4;
          const r = isPrimary ? 56 : 139;
          const g = isPrimary ? 189 : 92;
          const b = isPrimary ? 248 : 246;
          const originalAlpha = p.random(90, 220);

          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.4, 0.4),
            vy: p.random(-0.4, 0.4),
            size,
            color: p.color(r, g, b, originalAlpha),
            originalAlpha
          });
        }
      };

      p.draw = () => {
        p.clear();
        p.background(5, 8, 22); // Deep premium dark background #050816

        // Draw connections and update positions
        for (let i = 0; i < particles.length; i++) {
          const pt1 = particles[i];
          
          // Constant slow drift
          pt1.x += pt1.vx;
          pt1.y += pt1.vy;

          // Boundary bounce
          if (pt1.x < 0 || pt1.x > p.width) pt1.vx *= -1;
          if (pt1.y < 0 || pt1.y > p.height) pt1.vy *= -1;

          // Drawing particle
          p.noStroke();
          p.fill(pt1.color);
          p.ellipse(pt1.x, pt1.y, pt1.size);

          // Draw connections between points (constellation effect)
          for (let j = i + 1; j < particles.length; j++) {
            const pt2 = particles[j];
            const d = p.dist(pt1.x, pt1.y, pt2.x, pt2.y);
            
            if (d < maxConnectionDistance) {
              const alphaValue = p.map(d, 0, maxConnectionDistance, 35, 0);
              p.stroke(139, 92, 246, alphaValue); // Violet secondary color connections
              p.strokeWeight(0.85);
              p.line(pt1.x, pt1.y, pt2.x, pt2.y);
            }
          }

          // Mouse proximity trail and active pull-lines
          const mouseD = p.dist(p.mouseX, p.mouseY, pt1.x, pt1.y);
          if (mouseD < mouseInfluenceDistance && p.mouseX > 0 && p.mouseY > 0) {
            const alphaValue = p.map(mouseD, 0, mouseInfluenceDistance, 50, 0);
            p.stroke(56, 189, 248, alphaValue); // Light primary blue linking lines
            p.strokeWeight(1.1);
            p.line(p.mouseX, p.mouseY, pt1.x, pt1.y);

            // Subtle micro-attraction gravity
            const force = (mouseInfluenceDistance - mouseD) / mouseInfluenceDistance;
            const angle = p.atan2(p.mouseY - pt1.y, p.mouseX - pt1.x);
            pt1.x += p.cos(angle) * force * 0.45;
            pt1.y += p.sin(angle) * force * 0.45;
          }
        }
      };

      p.windowResized = () => {
        if (containerRef.current) {
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          p.resizeCanvas(width, height);
        }
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#050816]">
      {/* Dynamic p5.js canvas container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        id="bg-canvas-wrapper"
      />
      
      {/* Immersive UI Globs & Dot Pattern */}
      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#38bdf8] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-[#8b5cf6] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 dot-pattern opacity-70" />
    </div>
  );
};
export default InteractiveBackground;
