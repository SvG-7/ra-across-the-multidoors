import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface WebShooterButtonProps {
  onEnter: () => void;
  reducedMotion?: boolean;
}

interface WebStrand {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
}

export const WebShooterButton: React.FC<WebShooterButtonProps> = ({ onEnter, reducedMotion = false }) => {
  const [isFiring, setIsFiring] = useState(false);
  const [strands, setStrands] = useState<WebStrand[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFiring) return;

    // Trigger synthesized comic THWIP sound
    soundEngine.playThwip();

    if (reducedMotion) {
      onEnter();
      return;
    }

    setIsFiring(true);

    // Calculate button coordinates
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      // Generate radiating web anchor strands to screen corners & edges
      const newStrands: WebStrand[] = [
        { id: 1, startX: originX, startY: originY, targetX: 0, targetY: 0, color: '#FFFFFF' },
        { id: 2, startX: originX, startY: originY, targetX: window.innerWidth, targetY: 0, color: '#00F0FF' },
        { id: 3, startX: originX, startY: originY, targetX: 0, targetY: window.innerHeight, color: '#FF1744' },
        { id: 4, startX: originX, startY: originY, targetX: window.innerWidth, targetY: window.innerHeight, color: '#FFE600' },
        { id: 5, startX: originX, startY: originY, targetX: window.innerWidth * 0.5, targetY: 0, color: '#FFFFFF' },
        { id: 6, startX: originX, startY: originY, targetX: 0, targetY: window.innerHeight * 0.5, color: '#00F0FF' },
        { id: 7, startX: originX, startY: originY, targetX: window.innerWidth, targetY: window.innerHeight * 0.5, color: '#FF1744' },
      ];

      setStrands(newStrands);
    }

    // Delay slightly to let the web lines shoot across screen, then trigger warp
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center">
      {/* Radiating Web-Shoot Overlay across Viewport */}
      {isFiring && strands.length > 0 && (
        <svg
          className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="webGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {strands.map((s) => (
            <g key={s.id}>
              {/* Web Silk Line */}
              <motion.line
                x1={s.startX}
                y1={s.startY}
                x2={s.startX}
                y2={s.startY}
                animate={{ x2: s.targetX, y2: s.targetY }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                stroke={s.color}
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#webGlow)"
              />
              {/* Secondary tension fiber */}
              <motion.path
                d={`M ${s.startX} ${s.startY} Q ${(s.startX + s.targetX) / 2 + 20} ${(s.startY + s.targetY) / 2 - 20} ${s.targetX} ${s.targetY}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
            </g>
          ))}
        </svg>
      )}

      {/* Floating THWIP Burst on fire */}
      <AnimatePresence>
        {isFiring && (
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1.1], rotate: [0, 10, -6], opacity: 1 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-14 right-2 z-40 pointer-events-none select-none"
          >
            <div className="relative">
              <svg viewBox="0 0 160 80" className="w-28 sm:w-32 h-auto drop-shadow-[4px_4px_0px_#000]">
                <polygon
                  points="80,5 98,25 145,15 125,45 155,70 115,70 95,85 75,70 30,80 45,50 5,45 35,25 20,5 60,18"
                  fill="#FFE600"
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <text
                  x="80"
                  y="52"
                  textAnchor="middle"
                  fontFamily="Bangers, cursive"
                  fontSize="30"
                  fill="#000000"
                  fontWeight="bold"
                >
                  THWIP!
                </text>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Multiverse CTA Button (Min 52px touch height, full width on phone) */}
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isFiring}
        whileHover={reducedMotion ? {} : { scale: 1.02 }}
        whileTap={reducedMotion ? {} : { scale: 0.97 }}
        onMouseEnter={() => soundEngine.playClick()}
        className="group relative w-full cursor-pointer min-h-[52px] py-4 px-6 bg-gradient-to-r from-spider-red via-spider-crimson to-spider-hotpink text-white font-comic text-xl sm:text-2xl tracking-widest uppercase border-3 border-black rounded-sm shadow-comic hover:shadow-neon-red active:shadow-comic-sm transition-all select-none overflow-hidden"
      >
        {/* Comic Halftone texture overlay */}
        <span className="absolute inset-0 bg-halftone opacity-35 pointer-events-none" />

        {/* Crosshair Spidersilk Corners */}
        <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-spider-cyan pointer-events-none" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-spider-cyan pointer-events-none" />
        <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-spider-cyan pointer-events-none" />
        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-spider-cyan pointer-events-none" />

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center gap-2.5 drop-shadow-[2px_2px_0px_#000]">
          <Zap className="w-5 h-5 text-spider-yellow fill-spider-yellow flex-shrink-0" />
          <span className="truncate">
            {isFiring ? 'WARPING REALITY...' : 'ENTER THE MULTIVERSE'}
          </span>
          <Zap className="w-5 h-5 text-spider-yellow fill-spider-yellow flex-shrink-0" />
        </span>
      </motion.button>
    </div>
  );
};
