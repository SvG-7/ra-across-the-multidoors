import React, { useEffect, useRef } from 'react';
import { WebPoint } from '../../types';

interface SpiderwebCanvasProps {
  reducedMotion?: boolean;
}

export const SpiderwebCanvas: React.FC<SpiderwebCanvasProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef<number>(0);
  const pointsRef = useRef<WebPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initPoints();
    };

    window.addEventListener('resize', handleResize);

    // Initialize Spiderweb Nodes
    const initPoints = () => {
      const pts: WebPoint[] = [];
      const numPoints = Math.min(Math.floor((width * height) / 18000), 75);

      // Radial rings from center-top to simulate anchor points
      const centerX = width * 0.5;
      const centerY = height * 0.35;

      pts.push({
        x: centerX,
        y: centerY,
        originX: centerX,
        originY: centerY,
        vx: 0,
        vy: 0,
        radius: 4,
        connections: [],
        energy: 1,
        color: '#FF1744'
      });

      for (let i = 1; i < numPoints; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * (Math.max(width, height) * 0.7);
        const px = centerX + Math.cos(angle) * dist;
        const py = centerY + Math.sin(angle) * dist;

        const colors = ['#FF1744', '#00F0FF', '#FFFFFF', '#0066FF'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        pts.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 2.5,
          connections: [],
          energy: Math.random(),
          color: color
        });
      }

      // Compute nearest connections
      for (let i = 0; i < pts.length; i++) {
        const distances: { index: number; d: number }[] = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const dx = pts[i].originX - pts[j].originX;
          const dy = pts[i].originY - pts[j].originY;
          const dist = Math.hypot(dx, dy);
          if (dist < 260) {
            distances.push({ index: j, d: dist });
          }
        }
        distances.sort((a, b) => a.d - b.d);
        pts[i].connections = distances.slice(0, 4).map(d => d.index);
      }

      pointsRef.current = pts;
    };

    initPoints();

    // Mouse Parallax & Interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);

    let tick = 0;

    // Render loop
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      const pts = pointsRef.current;
      const mouse = mouseRef.current;

      // Draw web lines
      ctx.lineWidth = 1;

      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];

        if (!reducedMotion) {
          // Tension physics returning to origin
          const homeDx = p1.originX - p1.x;
          const homeDy = p1.originY - p1.y;
          p1.vx += homeDx * 0.015;
          p1.vy += homeDy * 0.015;

          // Mouse deflection
          if (mouse.active) {
            const mdx = p1.x - mouse.x;
            const mdy = p1.y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < 160 && mDist > 0) {
              const force = (160 - mDist) / 160;
              p1.vx += (mdx / mDist) * force * 1.8;
              p1.vy += (mdy / mDist) * force * 1.8;
              p1.energy = Math.min(p1.energy + 0.1, 1);
            }
          }

          // Damping
          p1.vx *= 0.88;
          p1.vy *= 0.88;

          p1.x += p1.vx;
          p1.y += p1.vy;

          // Energy decay
          p1.energy = Math.max(p1.energy - 0.01, 0.2);
        }

        // Draw connections
        for (const targetIdx of p1.connections) {
          if (targetIdx <= i) continue; // avoid duplicate lines
          const p2 = pts[targetIdx];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Alpha based on distance and energy
          const alpha = Math.max(0, 1 - dist / 260) * 0.45;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, p1.color === '#FF1744' ? `rgba(255, 23, 68, ${alpha})` : `rgba(0, 240, 255, ${alpha})`);
          grad.addColorStop(1, p2.color === '#FF1744' ? `rgba(255, 23, 68, ${alpha})` : `rgba(0, 240, 255, ${alpha})`);
          
          ctx.strokeStyle = grad;
          ctx.stroke();

          // Electrical pulse along line
          if (!reducedMotion && (p1.energy > 0.4 || p2.energy > 0.4 || (tick + i * 13) % 180 < 25)) {
            const progress = ((tick * 1.8 + i * 17) % 100) / 100;
            const pulseX = p1.x + (p2.x - p1.x) * progress;
            const pulseY = p1.y + (p2.y - p1.y) * progress;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fillStyle = (i % 2 === 0) ? '#00F0FF' : '#FF1744';
            ctx.shadowColor = (i % 2 === 0) ? '#00F0FF' : '#FF1744';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        if (p1.energy > 0.5) {
          ctx.shadowColor = p1.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] opacity-75 transition-opacity duration-700"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
