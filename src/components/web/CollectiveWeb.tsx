import React, { useEffect, useRef } from 'react';
import { CollectiveContribution } from '../../types';

interface CollectiveWebProps {
  contributions: CollectiveContribution[];
  isDemoData?: boolean;
  reducedMotion?: boolean;
}

export const CollectiveWeb: React.FC<CollectiveWebProps> = ({
  contributions,
  isDemoData = false,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 340);
    let height = (canvas.height = 220);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 340;
      height = canvas.height = 220;
    };

    window.addEventListener('resize', handleResize);

    // Create web nodes for each contribution
    const nodes = contributions.map((c, i) => {
      const angle = (i / Math.max(contributions.length, 1)) * Math.PI * 2;
      const radius = 40 + (i % 3) * 25;
      return {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: c.nodeColor || '#00F0FF',
        attendeeId: c.attendeeId,
      };
    });

    // Add central core node (The Multiverse Conclave)
    nodes.unshift({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      color: '#FF1744',
      attendeeId: 'core-nexus',
    });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting web strands
      ctx.lineWidth = 1.2;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        if (!reducedMotion && i !== 0) {
          n1.x += n1.vx;
          n1.y += n1.vy;
          if (n1.x < 15 || n1.x > width - 15) n1.vx *= -1;
          if (n1.y < 15 || n1.y > height - 15) n1.vy *= -1;
        }

        // Connect to center core node
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(nodes[0].x, nodes[0].y);
          ctx.strokeStyle = `rgba(0, 240, 255, 0.4)`;
          ctx.stroke();
        }

        // Connect to adjacent neighbor nodes
        if (i > 1) {
          const prev = nodes[i - 1];
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(prev.x, prev.y);
          ctx.strokeStyle = `rgba(255, 23, 68, 0.3)`;
          ctx.stroke();
        }
      }

      // Draw node spheres
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, i === 0 ? 8 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [contributions, reducedMotion]);

  return (
    <div className="w-full bg-[#070A14] border-3 border-black rounded-sm p-4 my-3 shadow-comic">
      <div className="flex items-center justify-between text-xs font-mono mb-2">
        <span className="text-spider-cyan font-bold uppercase tracking-wider">
          SHARED MULTIVERSE WEB
        </span>
        <span className="text-gray-300">
          {contributions.length} CONTRIBUTING RAs
        </span>
      </div>

      {isDemoData && (
        <div className="mb-2 py-0.5 px-2 bg-amber-950/60 border border-amber-500/60 text-amber-300 text-[10px] font-mono rounded-xs text-center">
          DEMONSTRATION DATA (REHEARSAL MODE)
        </div>
      )}

      <div className="relative w-full h-[220px] rounded-xs border border-gray-800/80 overflow-hidden bg-black/60">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="mt-2 text-center text-xs font-sans text-gray-300">
        Every strand represents an RA decision made during this presentation.
      </div>
    </div>
  );
};
