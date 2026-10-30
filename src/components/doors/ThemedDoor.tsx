import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterPortalScene } from './ChapterPortalScene';
import { soundEngine } from '../../audio/soundEffects';

interface ThemedDoorProps {
  chapterNumber: number;
  chapterTitle?: string;
  doorTheme: string;
  isOpen: boolean;
  reducedMotion?: boolean;
}

export const ThemedDoor: React.FC<ThemedDoorProps> = ({
  chapterNumber,
  chapterTitle = 'Chapter Portal',
  doorTheme,
  isOpen: initialIsOpen,
  reducedMotion = false,
}) => {
  // Allow user to tap and inspect the portal scene anytime
  const [manualOpen, setManualOpen] = useState(false);
  const isOpen = initialIsOpen || manualOpen;

  // Bespoke door styling per chapter
  const getDoorDetails = () => {
    switch (chapterNumber) {
      case 1:
        return {
          doorColor: '#FF1744',
          accent: '#FFE600',
          numberLabel: 'DOOR 101 // TWO WORLDS',
          subLabel: 'TRADITIONAL & APARTMENT',
          title: 'One Mission, Two Worlds',
        };
      case 2:
        return {
          doorColor: '#1E293B',
          accent: '#00F0FF',
          numberLabel: 'ROOM 204 // ALEX',
          subLabel: 'THE QUIET CORRIDOR',
          title: 'The Invisible Resident',
        };
      case 3:
        return {
          doorColor: '#0F172A',
          accent: '#FF1744',
          numberLabel: 'DOOR 312 // PEER REALITY',
          subLabel: 'COMMUNAL BOUNDARIES',
          title: 'Same Title, Different Relationships',
        };
      case 4:
        return {
          doorColor: '#0A192F',
          accent: '#FFE600',
          numberLabel: 'PORTAL 408 // SIGNALS',
          subLabel: 'COMMUNICATION CHANNELS',
          title: 'Two Communication Languages',
        };
      case 5:
        return {
          doorColor: '#111827',
          accent: '#00FFA3',
          numberLabel: 'APT 502 // ALEX’S SUITE',
          subLabel: 'INDEPENDENCE & DEMANDS',
          title: 'Independence Doesn’t Mean Isolation',
        };
      case 6:
        return {
          doorColor: '#270817',
          accent: '#FF007F',
          numberLabel: 'WARP 601 // GLITCH',
          subLabel: 'ADAPTIVE SHIFT',
          title: 'When Superpowers Fail',
        };
      case 7:
      default:
        return {
          doorColor: '#0B1120',
          accent: '#00F0FF',
          numberLabel: 'NEXUS // THE MULTIVERSE',
          subLabel: 'SHARED WEB OF RAs',
          title: 'The Multiverse RA',
        };
    }
  };

  const details = getDoorDetails();
  const effectiveTitle = chapterTitle !== 'Chapter Portal' ? chapterTitle : details.title;

  return (
    <div className="w-full flex flex-col items-center my-3 select-none">
      {/* Door Frame Container */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[380px] h-[210px] sm:h-[230px] bg-black border-3 sm:border-4 border-black rounded-sm shadow-comic overflow-hidden cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => {
          if (!isOpen) {
            soundEngine.playThwip();
            setManualOpen(true);
          }
        }}
        title={isOpen ? 'Portal Open' : 'Tap to open door portal'}
      >
        {/* Background Behind the Door: Distinct Illustrated Spider-Man Scene */}
        <div className="absolute inset-0 z-0">
          <ChapterPortalScene
            chapterNumber={chapterNumber}
            chapterTitle={effectiveTitle}
            doorTheme={doorTheme}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* The Swinging Door Leaf */}
        <motion.div
          initial={false}
          animate={
            reducedMotion
              ? { opacity: isOpen ? 0.08 : 1, pointerEvents: isOpen ? 'none' : 'auto' }
              : {
                  rotateY: isOpen ? -96 : 0,
                  transformOrigin: 'left center',
                  pointerEvents: isOpen ? 'none' : 'auto',
                }
          }
          transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 border-r-4 border-black p-3.5 flex flex-col justify-between shadow-2xl z-20"
          style={{
            backgroundColor: details.doorColor,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Halftone texture overlay */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

          {/* Door Dec / Room Number Plate */}
          <div className="relative z-10 bg-black/90 border border-white/20 p-2 rounded-xs shadow-md">
            <div className="text-[11px] font-mono font-bold tracking-wider" style={{ color: details.accent }}>
              {details.numberLabel}
            </div>
            <div className="text-[9.5px] font-sans text-gray-200 tracking-wide uppercase font-medium">
              {details.subLabel}
            </div>
          </div>

          {/* Door Peephole and Hardware */}
          <div className="relative z-10 flex items-center justify-end pr-3">
            <div className="w-5 h-5 rounded-full bg-spider-yellow border-2 border-black shadow-comic-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>
          </div>

          {/* Bottom Door Kickplate */}
          <div className="relative z-10 border-t-2 border-black/80 pt-1.5 flex justify-between items-center text-[10px] font-mono text-white/80">
            <span>CH. {chapterNumber} &bull; TAP TO ENTER</span>
            <span className="uppercase text-[9px] tracking-wider text-spider-yellow font-bold">
              {isOpen ? 'OPEN' : 'LOCKED'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Door Subtitle Caption */}
      <div className="mt-1.5 text-center flex items-center gap-1.5">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
          {doorTheme}
        </span>
        {!isOpen && (
          <span className="text-[9px] font-mono text-spider-cyan underline cursor-pointer" onClick={() => setManualOpen(true)}>
            (Open Portal)
          </span>
        )}
      </div>
    </div>
  );
};
