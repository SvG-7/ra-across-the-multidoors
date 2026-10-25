import React from 'react';
import { motion } from 'framer-motion';

interface ThemedDoorProps {
  chapterNumber: number;
  doorTheme: string;
  isOpen: boolean;
  reducedMotion?: boolean;
}

export const ThemedDoor: React.FC<ThemedDoorProps> = ({
  chapterNumber,
  doorTheme,
  isOpen,
  reducedMotion = false,
}) => {
  // Bespoke door styling per chapter
  const getDoorDetails = () => {
    switch (chapterNumber) {
      case 1:
        return {
          doorColor: '#FF1744',
          accent: '#FFE600',
          numberLabel: 'DOOR 101 // TWO WORLDS',
          subLabel: 'TRADITIONAL & APARTMENT',
        };
      case 2:
        return {
          doorColor: '#1E293B',
          accent: '#00F0FF',
          numberLabel: 'ROOM 204 // ALEX',
          subLabel: 'THE QUIET CORRIDOR',
        };
      case 3:
        return {
          doorColor: '#0F172A',
          accent: '#FF1744',
          numberLabel: 'DOOR 312 // PEER REALITY',
          subLabel: 'COMMUNAL BOUNDARIES',
        };
      case 4:
        return {
          doorColor: '#0A192F',
          accent: '#FFE600',
          numberLabel: 'PORTAL 408 // SIGNALS',
          subLabel: 'COMMUNICATION CHANNELS',
        };
      case 5:
        return {
          doorColor: '#111827',
          accent: '#00FFA3',
          numberLabel: 'APT 502 // ALEX’S SUITE',
          subLabel: 'INDEPENDENCE & DEMANDS',
        };
      case 6:
        return {
          doorColor: '#270817',
          accent: '#FF007F',
          numberLabel: 'WARP 601 // GLITCH',
          subLabel: 'ADAPTIVE SHIFT',
        };
      case 7:
      default:
        return {
          doorColor: '#0B1120',
          accent: '#00F0FF',
          numberLabel: 'NEXUS // THE MULTIVERSE',
          subLabel: 'SHARED WEB OF RAs',
        };
    }
  };

  const details = getDoorDetails();

  return (
    <div className="w-full flex flex-col items-center my-3 select-none">
      {/* Door Frame Container */}
      <div
        className="relative w-44 sm:w-52 h-44 sm:h-52 bg-black border-4 border-black rounded-sm shadow-comic overflow-hidden"
        style={{ perspective: 900 }}
      >
        {/* Background Behind the Door (Revealed when door swings open) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#05060A] flex flex-col items-center justify-center p-3 text-center">
          <div className="absolute inset-0 bg-halftone opacity-30" />
          <div className="relative z-10">
            <span className="font-comic text-xs uppercase tracking-widest text-spider-yellow">
              CHAPTER {chapterNumber}
            </span>
            <div className="font-comic text-base sm:text-lg text-white leading-tight mt-1">
              PORTAL UNLOCKED
            </div>
            <div className="w-8 h-1 bg-spider-cyan mx-auto mt-2 rounded-full animate-pulse" />
          </div>
        </div>

        {/* The Swinging Door Leaf */}
        <motion.div
          initial={false}
          animate={
            reducedMotion
              ? { opacity: isOpen ? 0.15 : 1 }
              : {
                  rotateY: isOpen ? -85 : 0,
                  transformOrigin: 'left center',
                }
          }
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 border-r-4 border-black p-3 flex flex-col justify-between shadow-lg z-20 cursor-default"
          style={{
            backgroundColor: details.doorColor,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Halftone texture overlay */}
          <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />

          {/* Door Dec / Room Number Plate */}
          <div className="relative z-10 bg-black/85 border border-white/20 p-1.5 rounded-xs shadow-sm">
            <div className="text-[10px] font-mono font-bold tracking-wider" style={{ color: details.accent }}>
              {details.numberLabel}
            </div>
            <div className="text-[9px] font-sans text-gray-300 tracking-wide uppercase">
              {details.subLabel}
            </div>
          </div>

          {/* Door Peephole and Hardware */}
          <div className="relative z-10 flex items-center justify-end pr-2">
            <div className="w-4 h-4 rounded-full bg-spider-yellow border-2 border-black shadow-comic-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>

          {/* Bottom Door Kickplate */}
          <div className="relative z-10 border-t-2 border-black/80 pt-1 flex justify-between items-center text-[9px] font-mono text-white/70">
            <span>CH. {chapterNumber}</span>
            <span className="uppercase text-[8px] tracking-wider text-spider-yellow">
              {isOpen ? 'OPEN' : 'LOCKED'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Door Subtitle Caption */}
      <div className="mt-1.5 text-center">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          {doorTheme}
        </span>
      </div>
    </div>
  );
};
