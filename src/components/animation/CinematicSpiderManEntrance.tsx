import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

interface CinematicEntranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion?: boolean;
}

export const CinematicEntranceModal: React.FC<CinematicEntranceModalProps> = ({
  isOpen,
  onClose,
  reducedMotion: _reducedMotion = false,
}) => {
  const [playKey, setPlayKey] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    if (soundEnabled) {
      soundEngine.playThwip();
    }
  }, [isOpen, playKey, soundEnabled]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] bg-black/95 flex items-center justify-center p-3 select-none">
        {/* Cinematic Viewport Container */}
        <div className="relative w-full max-w-md h-[540px] sm:h-[580px] bg-[#070B16] border-4 border-black rounded-sm shadow-comic overflow-hidden flex flex-col justify-between">
          {/* Halftone Overlay */}
          <div className="absolute inset-0 bg-halftone opacity-35 pointer-events-none z-0" />

          {/* Top Controls Bar: Sound, Replay, Skip, Close */}
          <div className="relative z-50 flex items-center justify-between p-3 bg-black/75 border-b border-gray-800">
            <span className="font-mono text-[10px] text-spider-yellow uppercase font-bold tracking-wider">
              CINEMATIC ENTRANCE &bull; PETER PARKER
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 bg-[#121929] hover:bg-[#1A2438] text-gray-300 hover:text-white border border-gray-700 rounded-2xs text-xs cursor-pointer"
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-spider-cyan" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
              </button>

              <button
                onClick={() => setPlayKey((k) => k + 1)}
                className="flex items-center gap-1 px-2 py-1 bg-[#121929] hover:bg-[#1A2438] text-gray-300 hover:text-white border border-gray-700 rounded-2xs text-[10px] font-mono uppercase cursor-pointer"
                title="Replay sequence"
              >
                <RotateCcw className="w-3 h-3 text-spider-yellow" />
                <span>Replay</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-1 px-2 py-1 bg-[#1E1118] hover:bg-[#2C1824] text-spider-red border border-spider-red/50 rounded-2xs text-[10px] font-mono uppercase cursor-pointer"
                title="Skip to Chapter 1"
              >
                <FastForward className="w-3 h-3 text-spider-red" />
                <span>Skip</span>
              </button>
            </div>
          </div>

          {/* Dynamic 7-Step Sequence Stage */}
          <div key={playKey} className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
            {/* Step 1: Architectural Anchor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 flex flex-col justify-between p-4 opacity-40 pointer-events-none"
            >
              <div className="flex justify-between items-start">
                <div className="w-20 h-28 border-2 border-dashed border-spider-cyan/40 rounded-xs p-1">
                  <span className="font-mono text-[8px] text-spider-cyan">APT HIGH-RISE</span>
                </div>
                <div className="w-20 h-28 border-2 border-dashed border-spider-red/40 rounded-xs p-1">
                  <span className="font-mono text-[8px] text-spider-red">RES HALL CORRIDOR</span>
                </div>
              </div>
              <div className="w-full text-center font-mono text-[9px] text-gray-400">
                CAMPUS NEXUS HUB // ALTITUDE 40FT
              </div>
            </motion.div>

            {/* Step 2: Perched Character Anticipation */}
            <motion.div
              initial={{ y: -160, opacity: 0, scale: 0.8 }}
              animate={{
                y: [-160, -80, -80, -60],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.95],
              }}
              transition={{
                duration: 1.6,
                times: [0, 0.35, 0.8, 1],
                ease: 'easeInOut',
              }}
              className="absolute top-10 z-20 flex flex-col items-center"
            >
              <img
                src={getAssetUrl('images/spiderman-crouching.png')}
                alt="Spider-Man Perched"
                className="w-28 sm:w-32 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,23,68,0.7)]"
              />
              <span className="font-comic text-xs text-spider-yellow bg-black/80 px-2 py-0.5 rounded border border-gray-700 mt-1 uppercase">
                Locking Anchor...
              </span>
            </motion.div>

            {/* Step 3 & 4: Wrist Web Fire & Taut Web Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 400 480">
              {/* Web Shot Line 1 */}
              <motion.line
                x1="200"
                y1="100"
                x2="60"
                y2="30"
                stroke="#00F0FF"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 0.9, 0] }}
                transition={{ duration: 1.8, times: [0.35, 0.5, 0.85, 1] }}
              />
              {/* Web Shot Line 2 (Anchor) */}
              <motion.line
                x1="200"
                y1="100"
                x2="340"
                y2="30"
                stroke="#FF1744"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 0.9, 0] }}
                transition={{ duration: 1.8, times: [0.38, 0.53, 0.85, 1] }}
              />

              {/* Taut Web Swing Tether */}
              <motion.line
                x1="200"
                y1="0"
                x2="200"
                y2="240"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                initial={{ opacity: 0, y2: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x2: [80, 200, 310, 200],
                  y2: [180, 260, 220, 360],
                }}
                transition={{
                  duration: 2.1,
                  times: [0, 0.25, 0.65, 1],
                  delay: 0.9,
                  ease: 'easeInOut',
                }}
              />
            </svg>

            {/* Step 5: Pendulum Arc Swing */}
            <motion.div
              initial={{ x: -220, y: 120, rotate: -35, opacity: 0, scale: 0.85 }}
              animate={{
                x: [-220, -100, 0, 120, 0],
                y: [120, 180, 220, 190, 290],
                rotate: [-35, -15, 0, 20, 0],
                opacity: [0, 1, 1, 1, 0],
                scale: [0.85, 1.1, 1.2, 1.05, 1],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 0.95,
                ease: 'easeInOut',
              }}
              className="absolute z-35 pointer-events-none"
            >
              <img
                src={getAssetUrl('images/spiderman-swinging.png')}
                alt="Spider-Man Web Swinging"
                className="w-36 sm:w-44 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,240,255,0.7)]"
              />
              {/* Comic Action Sound Effect */}
              <div className="absolute -top-4 -right-6 bg-spider-cyan text-black font-comic text-xs px-2 py-0.5 border border-black shadow-comic uppercase rotate-6">
                *THWIP!*
              </div>
            </motion.div>

            {/* Step 6 & 7: Hero Three-Point Landing & Hold Settle */}
            <motion.div
              initial={{ y: 220, opacity: 0, scale: 0.7 }}
              animate={{
                y: [140, 0, -8, 0],
                opacity: [0, 1, 1, 1],
                scale: [0.75, 1.08, 1, 1],
              }}
              transition={{
                duration: 4.2,
                times: [0, 0.68, 0.75, 0.82, 1],
                ease: 'easeOut',
              }}
              className="absolute inset-x-0 bottom-6 z-40 flex flex-col items-center"
            >
              {/* Radial Ground Impact Shockwave */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 0, 1.8, 2.2, 0], opacity: [0, 0, 0.9, 0.7, 0] }}
                transition={{ duration: 4.2, times: [0, 0.72, 0.78, 0.88, 1] }}
                className="absolute bottom-2 w-48 h-12 bg-spider-red/30 rounded-full border-2 border-spider-cyan blur-[2px] pointer-events-none"
              />

              <img
                src={getAssetUrl('images/spiderman-hero-character.png')}
                alt="Spider-Man Hero Landing Pose"
                className="w-48 sm:w-56 h-auto object-contain filter drop-shadow-[0_16px_32px_rgba(255,23,68,0.85)]"
              />

              {/* Comic Sound and Landing Placard */}
              <div className="bg-spider-yellow text-black font-comic text-lg sm:text-xl px-4 py-1 border-3 border-black shadow-comic -rotate-2 -mt-4 z-50">
                *KRAK-THOOM!* HERO LANDING
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer Controls & Settle Prompt */}
          <div className="relative z-50 p-3 bg-black/80 border-t border-gray-800 flex items-center justify-between">
            <span className="text-[11px] font-sans text-gray-300">
              Nexus Anchor Secured. Ready to enter Chapter 1.
            </span>
            <button
              onClick={onClose}
              className="py-1.5 px-4 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-xs uppercase tracking-wider rounded-xs border border-black shadow-comic-sm font-bold cursor-pointer"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export const CinematicSpiderManEntrance = CinematicEntranceModal;
export default CinematicEntranceModal;
