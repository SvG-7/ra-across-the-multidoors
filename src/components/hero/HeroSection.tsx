import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, DoorClosed, KeyRound, Sparkles } from 'lucide-react';
import { WebShooterButton } from './WebShooterButton';

interface HeroSectionProps {
  onEnterMultiverse: () => void;
  reducedMotion?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterMultiverse,
  reducedMotion = false,
}) => {
  const [showUniverseGuide, setShowUniverseGuide] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center text-center">
      {/* Spider-Verse Conference Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-spider-yellow text-black border-2 border-black font-comic text-xs uppercase tracking-wider mb-4 shadow-comic-sm">
        <Sparkles className="w-3.5 h-3.5 fill-black" />
        <span>RA LEADERSHIP CONFERENCE</span>
      </div>

      {/* Main Heading */}
      <h1
        className="font-comic text-4xl sm:text-5xl tracking-wide text-white uppercase leading-none drop-shadow-comic chromatic-shift mb-3"
        data-text="RA: ACROSS THE MULTI-DOORS"
      >
        <span className="text-spider-red">RA: </span>
        <span className="text-white">ACROSS </span>
        <span className="text-spider-cyan">THE </span>
        <span className="text-spider-yellow">MULTI-DOORS</span>
      </h1>

      {/* Subtitle Badge */}
      <div className="inline-block bg-spider-red px-4 py-1.5 border-3 border-black shadow-comic -rotate-1 mb-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-widest text-white leading-none">
          One Mission. <span className="text-spider-yellow">Two Worlds.</span>
        </h2>
      </div>

      {/* Minimal Supporting Text (1 concise sentence) */}
      <p className="text-base sm:text-lg font-sans text-gray-200 leading-snug max-w-sm mb-6">
        Every RA has a mission. But what happens when the universe changes?
      </p>

      {/* Primary Action Button: ENTER THE MULTIVERSE */}
      <div className="w-full flex justify-center mb-6">
        <WebShooterButton onEnter={onEnterMultiverse} reducedMotion={reducedMotion} />
      </div>

      {/* Optional Context Expansion (Clean, user-controlled) */}
      <div className="w-full border-t border-gray-800/80 pt-4 mt-2">
        <button
          onClick={() => setShowUniverseGuide(!showUniverseGuide)}
          className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 bg-black/60 border border-gray-700 hover:border-spider-cyan rounded-xs text-xs font-mono text-gray-300 hover:text-white transition-all"
        >
          <span className="font-semibold text-spider-cyan">
            {showUniverseGuide ? '[-] Hide Universe Comparison' : '[+] Compare the Two Worlds'}
          </span>
          {showUniverseGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showUniverseGuide && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 space-y-3 text-left overflow-hidden"
            >
              {/* World 1 Card */}
              <div className="p-4 bg-[#0E1528] border-2 border-black rounded-xs shadow-comic-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-spider-red border border-black text-white">
                    <DoorClosed className="w-4 h-4" />
                  </div>
                  <h3 className="font-comic text-lg text-white">EARTH-TRAD: RESIDENCE HALLS</h3>
                </div>
                <p className="text-base text-gray-300 leading-relaxed font-sans">
                  High-density communal living. Residents share hallways and bathrooms, creating accidental collisions and immediate crisis visibility.
                </p>
              </div>

              {/* World 2 Card */}
              <div className="p-4 bg-[#0D1826] border-2 border-black rounded-xs shadow-comic-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-spider-cyan border border-black text-black">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <h3 className="font-comic text-lg text-white">EARTH-APPT: APARTMENT SUITES</h3>
                </div>
                <p className="text-base text-gray-300 leading-relaxed font-sans">
                  High-autonomy living behind locked deadbolts. Residents share full kitchens and chores, requiring proactive, intentional outreach.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
