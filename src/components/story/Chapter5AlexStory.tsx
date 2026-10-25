import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Home, Clock, Check, Eye } from 'lucide-react';
import { ChapterStoryDetail } from '../../types';
import { soundEngine } from '../../audio/soundEffects';

interface Chapter5AlexStoryProps {
  storyDetails: ChapterStoryDetail[];
  revealedIds: string[];
  onToggleReveal: (id: string) => void;
  reducedMotion?: boolean;
}

export const Chapter5AlexStory: React.FC<Chapter5AlexStoryProps> = ({
  storyDetails,
  revealedIds,
  onToggleReveal,
  reducedMotion = false,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-spider-cyan flex-shrink-0" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-spider-yellow flex-shrink-0" />;
      case 'Home':
        return <Home className="w-5 h-5 text-spider-red flex-shrink-0" />;
      case 'Clock':
      default:
        return <Clock className="w-5 h-5 text-spider-gwenPink flex-shrink-0" />;
    }
  };

  const allRevealed = storyDetails.every((d) => revealedIds.includes(d.id));

  return (
    <div className="w-full my-3">
      <div className="relative bg-[#090E1C] border-3 border-black p-4 rounded-sm shadow-comic">
        <div className="text-center mb-3">
          <span className="bg-spider-cyan text-black px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider uppercase inline-block shadow-comic-sm">
            BEHIND APARTMENT 502 // ALEX’S SCHEDULE
          </span>
          <p className="text-sm font-sans text-gray-200 mt-2">
            Why was Alex hard to catch? Tap each card to uncover the daily realities behind their closed deadbolt:
          </p>
        </div>

        {/* Story Reveal Cards */}
        <div className="space-y-2.5 mt-3">
          {storyDetails.map((detail) => {
            const isRevealed = revealedIds.includes(detail.id);

            return (
              <button
                key={detail.id}
                onClick={() => {
                  soundEngine.playClick();
                  onToggleReveal(detail.id);
                }}
                className={`w-full p-3 rounded-sm border-2 text-left transition-all active:scale-[0.99] cursor-pointer flex items-start gap-3 ${
                  isRevealed
                    ? 'bg-black/70 border-spider-cyan/60 shadow-comic-sm'
                    : 'bg-black/40 hover:bg-black/60 border-gray-700'
                }`}
              >
                <div className="p-1.5 bg-gray-900 border border-gray-700 rounded-xs mt-0.5 flex-shrink-0">
                  {getIcon(detail.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-comic text-base text-white tracking-wide">
                      {detail.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                      {isRevealed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> UNLOCKED
                        </span>
                      ) : (
                        <span className="text-spider-cyan font-semibold flex items-center gap-0.5">
                          <Eye className="w-3 h-3" /> TAP TO REVEAL
                        </span>
                      )}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isRevealed ? (
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm font-sans text-gray-300 leading-snug mt-1.5 pt-1.5 border-t border-gray-800"
                      >
                        {detail.description}
                      </motion.div>
                    ) : (
                      <div className="text-xs font-mono text-gray-500 italic mt-0.5">
                        Hidden reality... tap to see details.
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>

        {allRevealed && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-spider-cyan/10 border border-spider-cyan/40 rounded-xs text-center text-xs font-mono text-spider-cyan"
          >
            All schedule factors uncovered: Alex’s distance was shaped by heavy commitments, not disinterest.
          </motion.div>
        )}
      </div>
    </div>
  );
};
