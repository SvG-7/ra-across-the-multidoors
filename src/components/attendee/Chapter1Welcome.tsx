import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DoorClosed, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Layers
} from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { CommunityType } from '../../types';
import { getAssetUrl } from '../../utils/assets';
import { ThemedDoor } from '../doors/ThemedDoor';
import { CinematicSpiderManEntrance } from '../animation/CinematicSpiderManEntrance';

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
  onTriggerEntryTransition: _onTriggerEntryTransition,
  reducedMotion = false,
}) => {
  const [showCinematicEntrance, setShowCinematicEntrance] = useState(false);
  const [animatingChoice, setAnimatingChoice] = useState<CommunityType | null>(null);

  const dimensionChoices: {
    type: CommunityType;
    title: string;
    sublabel: string;
    description: string;
    badgeColor: string;
    borderColor: string;
    bgGradient: string;
    icon: React.ReactNode;
    features: string[];
  }[] = [
    {
      type: 'Residence hall',
      title: 'Enter the Residence Hall Dimension',
      sublabel: 'TRADITIONAL HIGH-DENSITY LIVING',
      description: 'Shared corridors, neighboring doors, central lounges, and spontaneous communal interactions.',
      badgeColor: 'bg-spider-red text-white',
      borderColor: 'border-spider-red',
      bgGradient: 'from-[#1A0A10] via-[#12080E] to-[#0A060A]',
      icon: <DoorClosed className="w-6 h-6 text-spider-red" />,
      features: ['Shared double doors', 'Hallway bulletin boards', 'Spontaneous knock-and-chats'],
    },
    {
      type: 'Apartment community',
      title: 'Enter the Apartment Dimension',
      sublabel: 'AUTONOMOUS INDEPENDENT SUITES',
      description: 'Separate entrances, physical distance between units, exterior breezeways, and standalone schedules.',
      badgeColor: 'bg-spider-cyan text-black',
      borderColor: 'border-spider-cyan',
      bgGradient: 'from-[#071322] via-[#08101C] to-[#050810]',
      icon: <KeyRound className="w-6 h-6 text-spider-cyan" />,
      features: ['Individual deadbolt doors', 'Exterior courtyards', 'Deliberate asynchronous outreach'],
    },
    {
      type: 'Both',
      title: 'Enter Between Two Worlds',
      sublabel: 'THE CROSS-DIMENSIONAL NEXUS',
      description: 'Bridging traditional dorm visibility with autonomous apartment realities through connected web routes.',
      badgeColor: 'bg-spider-yellow text-black',
      borderColor: 'border-spider-yellow',
      bgGradient: 'from-[#1A1408] via-[#100D06] to-[#080704]',
      icon: <Layers className="w-6 h-6 text-spider-yellow" />,
      features: ['Dual-world perspective', 'Connected web pathways', 'Full multiverse exploration'],
    },
  ];

  const handleSelectDimension = (c: CommunityType) => {
    soundEngine.playThwip();
    setAnimatingChoice(c);
    
    // Quick portal zoom transition before confirming
    if (!reducedMotion) {
      setTimeout(() => {
        onSelectCommunity(c);
        setAnimatingChoice(null);
      }, 450);
    } else {
      onSelectCommunity(c);
      setAnimatingChoice(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center font-sans">
      {/* Cinematic Entrance Modal */}
      <CinematicSpiderManEntrance
        isOpen={showCinematicEntrance}
        onClose={() => setShowCinematicEntrance(false)}
        reducedMotion={reducedMotion}
      />

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
              alt="Classic Spider-Man Character Portrait"
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

          {/* Rebuilt Cinematic Entrance Trigger Button */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setShowCinematicEntrance(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#121B2C] hover:bg-[#1A2842] text-spider-cyan border-2 border-spider-cyan text-xs font-mono font-bold rounded-xs shadow-comic cursor-pointer transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-spider-cyan" />
              <span>Watch Spider-Man Cinematic Entrance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter 1 Portal Scene: Classic Spider-Man Between Two Entrances */}
      <ThemedDoor
        chapterNumber={1}
        chapterTitle="One Mission, Two Worlds"
        doorTheme="Nexus Threshold // Parallel Dorms"
        isOpen={true}
        reducedMotion={reducedMotion}
      />

      {/* ================================================================= */}
      {/* 2. DIMENSION ENTRANCE: "CHOOSE YOUR UNIVERSE"                      */}
      {/* Rebuilt illustrated dimensional doorways with immediate tap feedback */}
      {/* and smooth expansion carrying the attendee into their chosen world */}
      {/* ================================================================= */}
      <div className="w-full bg-[#0A0D18] border-3 border-black p-4 sm:p-5 rounded-sm shadow-comic text-left mb-5">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-spider-yellow uppercase tracking-wider block mb-0.5">
              DIMENSION ENTRANCE &bull; STEP FORWARD
            </span>
            <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
              Choose Your Universe
            </h3>
          </div>
          {selectedCommunity && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0 bg-emerald-950/60 border border-emerald-500/40 px-2 py-1 rounded-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmed</span>
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm font-sans text-gray-300 mb-3 leading-snug">
          Select your campus living environment to enter its dimension. You will explore both worlds throughout the presentation.
        </p>

        {/* 3 Illustrated Dimension Cards */}
        <div className="space-y-3">
          {dimensionChoices.map((choice) => {
            const isSelected = selectedCommunity === choice.type;
            const isExpanding = animatingChoice === choice.type;

            return (
              <motion.div
                key={choice.type}
                animate={isExpanding ? { scale: [1, 1.04, 1.02] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative w-full rounded-sm border-2 overflow-hidden transition-all shadow-comic-sm ${
                  isSelected
                    ? `${choice.borderColor} bg-gradient-to-r ${choice.bgGradient} ring-2 ring-spider-yellow/70`
                    : 'border-gray-800 bg-[#0C1120] hover:border-gray-700'
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/10 bg-black/40">
                  <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded-2xs ${choice.badgeColor}`}>
                    {choice.sublabel}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">
                    {isSelected ? '✓ UNIVERSE CHOSEN' : 'OPEN PORTAL'}
                  </span>
                </div>

                {/* Card Content & Illustration */}
                <div className="p-3.5 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-black/60 border border-white/15 rounded-xs mt-0.5 flex-shrink-0">
                      {choice.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-comic text-lg sm:text-xl text-white uppercase tracking-wide leading-tight">
                        {choice.title}
                      </h4>
                      <p className="text-xs font-sans text-gray-200 mt-1 leading-snug">
                        {choice.description}
                      </p>

                      {/* Key Architectural Features */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {choice.features.map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[9.5px] font-mono text-gray-300 bg-black/50 border border-white/10 px-2 py-0.5 rounded-2xs"
                          >
                            &bull; {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Unmistakable Tap Target Button */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10.5px] font-mono text-gray-400">
                      {isSelected ? 'Ready to advance' : 'Tap to enter universe'}
                    </span>

                    <button
                      onClick={() => handleSelectDimension(choice.type)}
                      className={`min-h-[44px] px-4 py-1.5 rounded-xs font-comic text-xs sm:text-sm uppercase tracking-wider border-2 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm ${
                        isSelected
                          ? 'bg-spider-yellow text-black border-black font-extrabold shadow-comic-sm'
                          : 'bg-black/80 hover:bg-black text-white border-gray-600 hover:border-white'
                      }`}
                    >
                      <span>{isSelected ? 'Universe Selected ✓' : 'Select Dimension →'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* New to RA Role Option Card (Preserved Accessibility) */}
        <div className="mt-3 p-3 bg-black/50 border border-gray-800 rounded-xs flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-gray-300 font-bold block">
              New to the RA role?
            </span>
            <span className="text-[11px] font-sans text-gray-400">
              Entering the community-building journey for the first time.
            </span>
          </div>

          <button
            onClick={() => handleSelectDimension('New to the RA role')}
            className={`min-h-[38px] px-3 py-1 text-xs font-mono uppercase rounded-xs border transition-all cursor-pointer ${
              selectedCommunity === 'New to the RA role'
                ? 'bg-spider-cyan text-black border-black font-bold'
                : 'bg-gray-900 text-gray-300 border-gray-700 hover:text-white'
            }`}
          >
            {selectedCommunity === 'New to the RA role' ? '✓ Newcomer Selected' : 'Select Newcomer'}
          </button>
        </div>

        {/* Personalized Welcoming Banner */}
        {selectedCommunity && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-black/80 border-2 border-spider-cyan rounded-xs text-xs sm:text-sm font-sans text-gray-200 leading-snug"
          >
            <div className="flex items-center gap-1.5 text-spider-yellow font-mono text-[11px] uppercase font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-spider-cyan" />
              <span>Universe Confirmed: {selectedCommunity}</span>
            </div>
            <p className="text-gray-200">
              {selectedCommunity === 'Residence hall' &&
                'You know traditional halls: high density, spontaneous hall chatter, and quick door-knocks.'}
              {selectedCommunity === 'Apartment community' &&
                'You know apartment life: high resident independence, physical distance, and deliberate outreach behind deadbolts.'}
              {selectedCommunity === 'Both' &&
                'You’ve crossed dimensions! You know how community building transforms across different building architectures.'}
              {selectedCommunity === 'New to the RA role' &&
                'Welcome to the multiverse! You’re stepping into the RA community-building journey for the first time.'}
            </p>
          </motion.div>
        )}
      </div>

      {/* 3. Primary Entry Action Button */}
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
