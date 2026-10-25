import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Sparkles, Network, Shield, Compass, SlidersHorizontal, DoorClosed } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface UniverseSelectPlaceholderProps {
  onReturnHome: () => void;
  reducedMotion?: boolean;
}

export const UniverseSelectPlaceholder: React.FC<UniverseSelectPlaceholderProps> = ({
  onReturnHome,
  reducedMotion = false,
}) => {
  const leadershipThemes = [
    {
      name: 'Connector',
      subtitle: 'The Web Weaver',
      icon: Network,
      color: 'text-spider-cyan border-spider-cyan/40 bg-spider-cyan/10',
      desc: 'Creates high-frequency community bridges and spontaneous collisions across residents.',
    },
    {
      name: 'Guardian',
      subtitle: 'The Hall Sentinel',
      icon: Shield,
      color: 'text-spider-red border-spider-red/40 bg-spider-red/10',
      desc: 'De-escalates crises, protects physical boundaries, and upholds campus safety protocols.',
    },
    {
      name: 'Strategist',
      subtitle: 'Community Architect',
      icon: Compass,
      color: 'text-spider-yellow border-spider-yellow/40 bg-spider-yellow/10',
      desc: 'Navigates autonomous apartment suites and designs structured intentional engagement.',
    },
    {
      name: 'Adapter',
      subtitle: 'Dimension Hopper',
      icon: SlidersHorizontal,
      color: 'text-spider-gwenPink border-spider-gwenPink/40 bg-spider-gwenPink/10',
      desc: 'Flexibly shifts leadership posture between communal dorm chaos and apartment quietude.',
    },
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
      {/* Return button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => {
            soundEngine.playClick();
            onReturnHome();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-spider-dark border-2 border-black shadow-comic-sm hover:border-spider-cyan text-gray-200 hover:text-white font-display uppercase tracking-wider text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-spider-cyan" />
          <span>Return to Nexus Home</span>
        </button>
      </div>

      {/* Header Banner */}
      <motion.div
        initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-10 max-w-3xl"
      >
        <div className="inline-block bg-spider-cyan text-black px-4 py-1 border-3 border-black shadow-comic-sm font-comic text-sm tracking-wider uppercase mb-3">
          PHASE 2 INTERACTIVE EXPERIENCES // SYSTEM TEASER
        </div>

        <h1 className="font-comic text-4xl sm:text-6xl text-white tracking-wider uppercase drop-shadow-[4px_4px_0px_#000]">
          TWO WORLDS. <span className="text-spider-red">ONE CHOICE.</span>
        </h1>

        <p className="font-sans text-gray-300 text-base sm:text-lg mt-2">
          During the 50-minute conference presentation, attendees will leap into parallel universes to solve live dilemma scenarios and unlock their leadership archetype.
        </p>
      </motion.div>

      {/* Universe Portal Selection Preview (2 Parallel Cards) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Universe A: Earth-TRAD */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-[#0E1529] border-4 border-black p-6 shadow-comic-red overflow-hidden group"
        >
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-spider-red/50 text-spider-red text-xs font-mono rounded-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>PRESENTER LOCKED</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-spider-red border-2 border-black shadow-comic-sm">
              <DoorClosed className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono text-spider-red uppercase tracking-wider block">DIMENSION 01</span>
              <h2 className="font-comic text-2xl sm:text-3xl text-white">EARTH-TRAD: RESIDENCE HALLS</h2>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed font-sans">
            Step through the door of traditional residence life. Navigate open hallway policies, high-visibility community building, midnight roommate mediation, and fire drill chaos.
          </p>

          <div className="bg-black/50 border border-gray-800 p-3 rounded-xs text-xs font-mono space-y-1.5">
            <div className="text-spider-yellow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming Mission 01: The Midnight Noise Complaint</span>
            </div>
            <div className="text-gray-400">Response Mode: Anonymous Live Polling</div>
          </div>
        </motion.div>

        {/* Universe B: Earth-APPT */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-[#0D1A2B] border-4 border-black p-6 shadow-comic-cyan overflow-hidden group"
        >
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-spider-cyan/50 text-spider-cyan text-xs font-mono rounded-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>PRESENTER LOCKED</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-spider-cyan border-2 border-black shadow-comic-sm">
              <DoorClosed className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-xs font-mono text-spider-cyan uppercase tracking-wider block">DIMENSION 02</span>
              <h2 className="font-comic text-2xl sm:text-3xl text-white">EARTH-APPT: APARTMENT SUITES</h2>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed font-sans">
            Infiltrate the autonomous apartment complex. Discover how to build community behind closed deadbolts, solve kitchen conflict, and establish leadership without hallway serendipity.
          </p>

          <div className="bg-black/50 border border-gray-800 p-3 rounded-xs text-xs font-mono space-y-1.5">
            <div className="text-spider-cyan flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming Mission 02: The Kitchen Dish Cold War</span>
            </div>
            <div className="text-gray-400">Response Mode: Anonymous Live Polling</div>
          </div>
        </motion.div>
      </div>

      {/* Leadership Archetypes Section Preview */}
      <div className="w-full">
        <div className="text-center mb-6">
          <h3 className="font-comic text-2xl sm:text-3xl text-spider-yellow uppercase tracking-wider drop-shadow-[2px_2px_0px_#000]">
            THE 4 LEADERSHIP ARCHETYPES PREVIEW
          </h3>
          <p className="text-xs font-mono text-gray-400">
            Attendees will uncover their core Spider-Verse RA identity as they complete conference missions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leadershipThemes.map((theme, i) => {
            const Icon = theme.icon;
            return (
              <motion.div
                key={theme.name}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className={`p-4 border-2 border-black rounded-sm shadow-comic-sm ${theme.color}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" />
                  <h4 className="font-comic text-xl leading-none text-white">{theme.name}</h4>
                </div>
                <div className="text-xs font-mono font-bold text-white/90 mb-1">{theme.subtitle}</div>
                <p className="text-xs text-gray-300 leading-snug">{theme.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom return button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            soundEngine.playClick();
            onReturnHome();
          }}
          className="px-8 py-3 bg-spider-red hover:bg-spider-crimson text-white font-comic text-xl border-3 border-black shadow-comic transition-all"
        >
          RETURN TO HOMEPAGE NEXUS
        </button>
      </div>
    </div>
  );
};
