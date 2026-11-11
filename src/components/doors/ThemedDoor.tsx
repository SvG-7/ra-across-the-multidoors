import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { ChapterPortalScene } from './ChapterPortalScene';
import { soundEngine } from '../../audio/soundEffects';

interface ThemedDoorProps {
  chapterNumber: number;
  chapterTitle?: string;
  doorTheme: string;
  isOpen: boolean;
  reducedMotion?: boolean;
  showReplay?: boolean;
}

export const ThemedDoor: React.FC<ThemedDoorProps> = ({
  chapterNumber,
  chapterTitle = 'Chapter Portal',
  doorTheme,
  isOpen: initialIsOpen,
  reducedMotion = false,
  showReplay = true,
}) => {
  const [manualOpen, setManualOpen] = useState(false);
  const [replayTick, setReplayTick] = useState(0);
  const isOpen = initialIsOpen || manualOpen;

  const getDoorColor = () => {
    switch (chapterNumber) {
      case 1:
        return '#FF1744';
      case 2:
        return '#1E293B';
      case 3:
        return '#0F172A';
      case 4:
        return '#0A192F';
      case 5:
        return '#111827';
      case 6:
        return '#270817';
      default:
        return '#0B1120';
    }
  };

  const hasAnimatedScene =
    chapterNumber === 2 ||
    chapterNumber === 3 ||
    chapterNumber === 4 ||
    chapterNumber === 5 ||
    chapterNumber === 6;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Main Visual Stage */}
      <div
        className={`relative w-full max-w-[440px] lg:max-w-none ${
          chapterNumber === 7 ? 'h-[200px] sm:h-[225px] lg:h-[340px]' : 'h-[240px] sm:h-[285px] lg:h-[400px]'
        } bg-black border-3 sm:border-4 border-black rounded-sm shadow-comic overflow-hidden`}
        style={{ perspective: 1000 }}
        onClick={() => {
          if (!isOpen) {
            soundEngine.playThwip();
            setManualOpen(true);
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <ChapterPortalScene
            key={`${chapterNumber}-${replayTick}`}
            isRevealed={isOpen}
            replayKey={replayTick}
            chapterNumber={chapterNumber}
            chapterTitle={chapterTitle}
            doorTheme={doorTheme}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Optional Swing Overlay only when explicitly closed */}
        {!isOpen && (
          <motion.div
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { rotateY: 0, transformOrigin: 'left center' }
            }
            className="absolute inset-0 border-r-4 border-black p-4 flex flex-col justify-between shadow-2xl z-20 cursor-pointer"
            style={{ backgroundColor: getDoorColor(), backfaceVisibility: 'hidden' }}
          >
            <div className="bg-black/85 border border-white/20 px-3 py-1.5 rounded-xs w-fit font-mono text-xs font-bold text-spider-cyan uppercase">
              Door 0{chapterNumber}
            </div>
            <div className="self-end w-6 h-6 rounded-full bg-spider-yellow border-2 border-black shadow-comic-sm" />
            <div className="text-xs font-mono text-white/80 uppercase">Tap to open</div>
          </motion.div>
        )}

        {/* Discreet Corner Replay Trigger (no competing text chrome) */}
        {isOpen && showReplay && hasAnimatedScene && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playClick();
              setReplayTick((t) => t + 1);
            }}
            className="absolute top-2.5 right-2.5 z-30 inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 hover:bg-black text-gray-200 hover:text-spider-cyan border border-white/20 hover:border-spider-cyan/60 rounded-xs text-[11px] font-mono uppercase cursor-pointer backdrop-blur-xs transition-colors"
            title="Replay scene"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        )}
      </div>
    </div>
  );
};
