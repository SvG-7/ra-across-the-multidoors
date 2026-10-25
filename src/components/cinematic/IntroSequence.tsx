import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, SkipForward } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface IntroSequenceProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, reducedMotion = false }) => {
  useEffect(() => {
    soundEngine.playThwip();

    if (reducedMotion) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-[#06070B] flex items-center justify-center cursor-pointer select-none overflow-hidden px-4"
    >
      {/* Background speedlines & halftones */}
      <div className="absolute inset-0 comic-speedlines opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />

      {/* Shutter Panel Left */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ delay: 1.8, duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#0C111F] border-r-3 border-black z-30 flex items-center justify-end pr-4"
      >
        <span className="font-comic text-2xl text-spider-red opacity-20 -rotate-90">TRADITIONAL</span>
      </motion.div>

      {/* Shutter Panel Right */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ delay: 1.8, duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#0F1B2B] border-l-3 border-black z-30 flex items-center justify-start pl-4"
      >
        <span className="font-comic text-2xl text-spider-cyan opacity-20 rotate-90">APARTMENTS</span>
      </motion.div>

      {/* Center Cinematic Comic Splash Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 320, damping: 22 }}
        className="relative z-40 w-full max-w-sm p-6 bg-spider-dark border-3 border-black shadow-comic text-center"
      >
        {/* Comic Issue Header */}
        <div className="bg-spider-yellow text-black font-display font-bold text-xs tracking-widest px-2.5 py-0.5 border-2 border-black inline-block mb-3 shadow-comic-sm">
          RA LEADERSHIP SYMPOSIUM
        </div>

        {/* Comic Glitch Title */}
        <h1 className="font-comic text-3xl sm:text-4xl text-white tracking-wider uppercase mb-1 drop-shadow-[3px_3px_0px_#000]">
          <span className="text-spider-red">ONE MISSION.</span> <br />
          <span className="text-spider-cyan">TWO WORLDS.</span>
        </h1>

        <p className="text-gray-300 font-sans text-sm mt-1 mb-4">
          Traditional Halls vs. Apartment Communities
        </p>

        {/* Comic Action Stamp */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-spider-red border-2 border-black text-white font-comic text-base shadow-comic-cyan">
          <Zap className="w-4 h-4 text-spider-yellow fill-spider-yellow" />
          <span>ENTERING MULTIVERSE...</span>
        </div>

        {/* Tap anywhere prompt */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-mono text-gray-400">
          <SkipForward className="w-3.5 h-3.5" />
          <span>Tap anywhere to continue</span>
        </div>
      </motion.div>
    </div>
  );
};
