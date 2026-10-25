import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEffects';

interface DimensionWarpProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const DimensionWarp: React.FC<DimensionWarpProps> = ({ onComplete, reducedMotion = false }) => {
  useEffect(() => {
    soundEngine.playWarp();

    if (reducedMotion) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-50 overflow-hidden bg-[#06080E] flex items-center justify-center cursor-pointer select-none px-4"
    >
      {/* Halftone & speedline flash */}
      <div className="absolute inset-0 bg-halftone opacity-40 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 comic-speedlines opacity-40 pointer-events-none" />

      {/* Outer Vortex Rings */}
      <motion.div
        initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.2, 2, 3], rotate: [0, 180, 540], opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full border-6 border-spider-cyan shadow-[0_0_60px_#00F0FF] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.1, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.1, 1.8, 2.8], rotate: [0, -180, -450], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, delay: 0.1, ease: 'easeInOut' }}
        className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full border-6 border-spider-red shadow-[0_0_60px_#FF1744] pointer-events-none"
      />

      {/* Center Comic Pop */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.4 }}
        className="relative z-50 text-center max-w-sm"
      >
        <div className="font-comic text-3xl sm:text-5xl text-white tracking-widest uppercase drop-shadow-[4px_4px_0px_#000]">
          <span className="text-spider-cyan">WARPING </span>
          <span className="text-spider-red">PORTALS!</span>
        </div>
        <div className="bg-black text-spider-yellow font-display text-base sm:text-lg px-3 py-1 border-2 border-spider-yellow inline-block mt-2 shadow-comic-sm">
          TRAVERSING THE MULTI-DOORS
        </div>
      </motion.div>
    </div>
  );
};
