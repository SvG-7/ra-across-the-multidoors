import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

interface SpideySwingingTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  direction?: 'forward' | 'backward';
  reducedMotion?: boolean;
}

export const SpideySwingingTransition: React.FC<SpideySwingingTransitionProps> = ({
  isActive,
  onComplete,
  direction = 'forward',
  reducedMotion = false,
}) => {
  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      const timer = setTimeout(() => onComplete(), 50);
      return () => clearTimeout(timer);
    }

    soundEngine.playThwip();

    const timer = setTimeout(() => {
      onComplete();
    }, 1350);

    return () => clearTimeout(timer);
  }, [isActive, onComplete, reducedMotion]);

  if (!isActive || reducedMotion || typeof document === 'undefined') return null;

  const isForward = direction === 'forward';

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none">
        {/* Parabolic Swinging Web Line SVG anchored offscreen top */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d={
              isForward
                ? "M 500 -10 Q 550 200 700 350"
                : "M 400 -10 Q 350 200 200 350"
            }
            stroke="#00F0FF"
            strokeWidth="3.5"
            strokeDasharray="6 3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: [0.9, 1, 0] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>

        {/* Dynamic Curved Swinging Spider-Man Character */}
        <motion.div
          initial={{
            x: isForward ? -220 : 460,
            y: 100,
            rotate: isForward ? -25 : 25,
            scale: 0.85,
          }}
          animate={{
            x: isForward ? 460 : -220,
            y: [100, 320, 120],
            rotate: isForward ? [-25, 4, 25] : [25, -4, -25],
            scale: [0.85, 1.15, 0.9],
          }}
          transition={{
            duration: 1.3,
            ease: 'easeInOut',
          }}
          className="absolute top-0 w-48 sm:w-64 h-auto filter drop-shadow-[0_12px_28px_rgba(255,23,68,0.7)]"
        >
          <img
            src={getAssetUrl('images/spiderman-swinging.png')}
            alt="Spider-Man Swinging"
            className="w-full h-auto object-contain"
          />
          {/* Comic "THWIP!" action sound badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [0, 1.25, 1], rotate: -12 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-2 -right-6 bg-spider-yellow text-black font-comic text-2xl px-3 py-0.5 border-2 border-black shadow-comic"
          >
            THWIP!
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
