import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoorClosed, KeyRound, Sparkles, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { CommunityType } from '../../types';
import { getAssetUrl } from '../../utils/assets';
import { ThemedDoor } from '../doors/ThemedDoor';

interface Chapter1WelcomeProps {
  selectedCommunity?: CommunityType;
  onSelectCommunity: (community: CommunityType) => void;
  onContinue: () => void;
  onTriggerEntryTransition?: () => void;
  reducedMotion?: boolean;
}

export const Chapter1Welcome: React.FC<Chapter1WelcomeProps> = ({
  selectedCommunity,
  onSelectCommunity,
  onContinue,
  onTriggerEntryTransition,
  reducedMotion = false,
}) => {
  // Auto-play Entry -> Chapter 1 transition on first arrival
  useEffect(() => {
    if (typeof window !== 'undefined' && !reducedMotion && onTriggerEntryTransition) {
      const hasOpened = sessionStorage.getItem('ra_entry_opened');
      if (!hasOpened) {
        sessionStorage.setItem('ra_entry_opened', 'true');
        const timer = setTimeout(() => {
          onTriggerEntryTransition();
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [onTriggerEntryTransition, reducedMotion]);

  const communities: CommunityType[] = [
    'Residence hall',
    'Apartment community',
    'Both',
    'New to the RA role',
  ];

  const getPersonalizedNote = (c: CommunityType) => {
    switch (c) {
      case 'Residence hall':
        return 'You know traditional halls: high density, spontaneous hall chatter, and quick door-knocks.';
      case 'Apartment community':
        return 'You know apartment life: high resident independence, physical distance, and deliberate outreach behind deadbolts.';
      case 'Both':
        return 'You’ve crossed dimensions! You know how community building transforms across different building architectures.';
      case 'New to the RA role':
        return 'Welcome to the multiverse! You’re stepping into the RA community-building journey for the first time.';
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center font-sans">
      {/* 1. Subdued Red Comic-Art Hero Stage with Layered Composition */}
      <div className="relative w-full overflow-hidden rounded-sm border-3 border-black bg-gradient-to-b from-[#2B060C] via-[#140810] to-[#090D18] p-4 pt-3 pb-5 mb-4 shadow-comic">
        {/* Halftone and Speedline Overlays */}
        <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-spider-red/20 rounded-full blur-3xl pointer-events-none" />

        {/* Comic Issue Caption Badge */}
        <div className="relative z-10 flex items-center justify-between mb-2">
          <span className="bg-spider-yellow text-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider border border-black shadow-comic-sm">
            ISSUE #1 &bull; NEXUS THRESHOLD
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-spider-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEADERSHIP CONCLAVE</span>
          </span>
        </div>

        {/* Character & Layered Watermark */}
        <div className="relative flex flex-col items-center justify-center my-1">
          {/* Subtle Background Watermark Layer */}
          <div className="absolute top-2 select-none font-comic text-6xl sm:text-7xl font-extrabold text-spider-red/15 tracking-widest uppercase pointer-events-none">
            MULTIVERSE
          </div>

          {/* Prominent 3D Spider-Man Hero Portrait */}
          <motion.div
            initial={reducedMotion ? false : { scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-20"
          >
            <img
              src={getAssetUrl('images/spiderman-hero-portrait.png')}
              alt="Spider-Man Character Portrait"
              className="w-56 sm:w-72 h-auto max-h-52 sm:max-h-60 object-contain filter drop-shadow-[0_12px_28px_rgba(230,36,41,0.55)]"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Event Title with Comic 3D Extrusion */}
        <div className="relative z-20 mt-1">
          <h1 className="font-comic text-4xl sm:text-5xl text-white tracking-wide uppercase leading-none comic-text-3d">
            RA: ACROSS THE MULTI-DOORS
          </h1>

          <div className="inline-block bg-spider-red px-3.5 py-1 border-2 border-black shadow-comic -rotate-1 mt-2.5 mb-2">
            <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-widest text-white leading-none">
              One Mission. <span className="text-spider-yellow">Two Worlds.</span>
            </h2>
          </div>

          {/* Brief Description */}
          <p className="text-sm sm:text-base font-sans text-gray-200 leading-snug max-w-sm mx-auto mt-1">
            Explore two RA worlds, make a few decisions, and build a web of approaches together.
          </p>

          {/* Replay Spider-Man Entrance Action Button */}
          {onTriggerEntryTransition && (
            <div className="mt-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onTriggerEntryTransition();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121B2C] hover:bg-[#1A2842] text-spider-cyan border border-spider-cyan/50 text-[11px] font-mono rounded-xs shadow-comic-sm cursor-pointer transition-all active:scale-95"
              >
                <Play className="w-3 h-3 fill-spider-cyan" />
                <span>Watch Spider-Man Pull Entrance Doors</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chapter 1 Portal Scene: Spider-Man Between Two Entrances */}
      <ThemedDoor
        chapterNumber={1}
        chapterTitle="One Mission, Two Worlds"
        doorTheme="Nexus Threshold // Parallel Dorms"
        isOpen={true}
        reducedMotion={reducedMotion}
      />

      {/* 2. Interactive Entry Action: "Which community have you worked in?" */}
      <div className="w-full bg-[#0C1222] border-3 border-black p-4 sm:p-5 rounded-sm shadow-comic text-left mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-spider-yellow uppercase tracking-wider block mb-0.5">
              COMMUNITY ORIENTATION
            </span>
            <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
              Which community have you worked in?
            </h3>
          </div>
          {selectedCommunity && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Selected</span>
            </span>
          )}
        </div>

        {/* 4 Interactive Option Cards */}
        <div className="space-y-2.5">
          {communities.map((c) => {
            const isSelected = selectedCommunity === c;
            return (
              <button
                key={c}
                onClick={() => {
                  soundEngine.playThwip();
                  onSelectCommunity(c);
                }}
                className={`w-full min-h-[52px] p-3.5 border-2 rounded-sm flex items-center justify-between active:scale-[0.98] transition-all shadow-sm cursor-pointer ${
                  isSelected
                    ? 'bg-spider-red text-white border-black shadow-comic-sm font-bold'
                    : 'bg-black/60 hover:bg-spider-cyan/15 border-gray-700 hover:border-spider-cyan text-gray-100 font-semibold'
                }`}
              >
                <span className="text-base font-sans">{c}</span>
                <span
                  className={`text-xs font-mono uppercase ${
                    isSelected ? 'text-spider-yellow font-bold' : 'text-spider-cyan'
                  }`}
                >
                  {isSelected ? '✓ CHOSEN' : 'SELECT →'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Personalized Welcoming Card */}
        {selectedCommunity && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-black/70 border border-spider-cyan/50 rounded-xs text-xs sm:text-sm font-sans text-gray-200 leading-snug"
          >
            <span className="font-bold text-spider-cyan block mb-0.5">
              Dimension Confirmed: {selectedCommunity}
            </span>
            {getPersonalizedNote(selectedCommunity)}
          </motion.div>
        )}
      </div>

      {/* 3. Two-World Visual Comparison */}
      <div className="w-full bg-[#0A0E1A] border-3 border-black p-4 rounded-sm shadow-comic mb-5">
        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-2 text-left">
          THE TWO MULTIVERSE REALITIES:
        </span>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-[#18090E] border-2 border-spider-red rounded-xs flex flex-col items-center text-center">
            <DoorClosed className="w-6 h-6 text-spider-red mb-1.5" />
            <span className="font-comic text-base text-white tracking-wide">RESIDENCE HALL</span>
            <span className="text-xs font-sans text-gray-200 mt-0.5 font-medium">High Density</span>
            <span className="text-[11px] font-mono text-gray-400 mt-1">Open doors & corridor traffic</span>
          </div>

          <div className="p-3 bg-[#071524] border-2 border-spider-cyan rounded-xs flex flex-col items-center text-center">
            <KeyRound className="w-6 h-6 text-spider-cyan mb-1.5" />
            <span className="font-comic text-base text-white tracking-wide">APARTMENT</span>
            <span className="text-xs font-sans text-gray-200 mt-0.5 font-medium">High Autonomy</span>
            <span className="text-[11px] font-mono text-gray-400 mt-1">Closed deadbolts & distance</span>
          </div>
        </div>

        <div className="p-2.5 bg-black/60 border border-gray-800 rounded-xs">
          <p className="font-comic text-xl text-white tracking-wide uppercase">
            "Same mission. Different surroundings."
          </p>
        </div>
      </div>

      {/* 4. Primary Entry Action Button */}
      <div className="w-full">
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="w-full min-h-[54px] py-4 px-6 bg-spider-red hover:bg-spider-crimson text-white font-comic text-2xl uppercase tracking-wider border-3 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>ENTER CHAPTER 2</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
