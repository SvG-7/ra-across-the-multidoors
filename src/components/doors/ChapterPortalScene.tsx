import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../../utils/assets';
import { 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Users, 
  Phone, 
  DoorClosed, 
  Lock, 
  Home, 
  Clock, 
  Briefcase, 
  GraduationCap,
  Eye,
  ArrowRight
} from 'lucide-react';

interface ChapterPortalSceneProps {
  chapterNumber: number;
  chapterTitle: string;
  doorTheme: string;
  isRevealed?: boolean;
  replayKey?: number;
  reducedMotion?: boolean;
}

export const ChapterPortalScene: React.FC<ChapterPortalSceneProps> = ({
  chapterNumber,
  chapterTitle,
  doorTheme,
  isRevealed = true,
  replayKey = 0,
  reducedMotion = false,
}) => {
  const [ch6Phase, setCh6Phase] = useState<'check' | 'pause' | 'step'>(
    reducedMotion ? 'step' : 'check'
  );

  useEffect(() => {
    if (chapterNumber !== 6) return;
    if (reducedMotion) {
      setCh6Phase('step');
      return;
    }
    if (!isRevealed) {
      setCh6Phase('check');
      return;
    }
    setCh6Phase('check');
    const tPause = window.setTimeout(() => setCh6Phase('pause'), 1550);
    const tStep = window.setTimeout(() => setCh6Phase('step'), 2650);
    return () => {
      window.clearTimeout(tPause);
      window.clearTimeout(tStep);
    };
  }, [chapterNumber, isRevealed, replayKey, reducedMotion]);
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060810] flex flex-col justify-between p-2.5 sm:p-3 select-none">
      {/* Background Halftone & Ambient Glow */}
      <div className="absolute inset-0 bg-halftone opacity-35 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-36 h-36 bg-spider-red/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-spider-cyan/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header: Supporting Caption & Chapter Title */}
      <div className="relative z-20 flex items-start justify-between gap-2 border-b border-white/15 pb-1.5 bg-black/50 px-2 py-1 rounded-xs backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-spider-cyan animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-spider-yellow font-bold">
              PORTAL UNLOCKED &bull; CH. {chapterNumber}
            </span>
            {chapterNumber === 2 && (
              <span className="text-[8px] font-mono uppercase bg-white/15 text-gray-200 px-1 rounded-2xs border border-white/20">
                NOIR INVESTIGATION
              </span>
            )}
            {chapterNumber === 3 && (
              <span className="text-[8px] font-mono uppercase bg-slate-800/90 text-gray-200 px-1.5 rounded-2xs border border-slate-500/60">
                SYMBIOTE BOUNDARIES
              </span>
            )}
            {chapterNumber === 5 && (
              <span className="text-[8px] font-mono uppercase bg-amber-950/75 text-amber-200 px-1.5 rounded-2xs border border-amber-500/45">
                REAL CONVERSATION
              </span>
            )}
            {chapterNumber === 6 && (
              <span className="text-[8px] font-mono uppercase bg-slate-900/90 text-gray-200 px-1.5 rounded-2xs border border-gray-600/70">
                GROUNDED APPROACH
              </span>
            )}
          </div>
          <h3 className="font-comic text-base sm:text-lg text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {chapterTitle}
          </h3>
        </div>
        <span className="text-[9px] font-mono text-gray-300 bg-white/10 px-1.5 py-0.5 rounded-xs border border-white/10 flex-shrink-0">
          {chapterNumber === 7 ? 'FINALE' : `ISSUE #${chapterNumber}`}
        </span>
      </div>

      {/* Central Illustrated Scene per Chapter */}
      <div className="relative z-10 flex-1 min-h-0 w-full my-1 flex items-center justify-center overflow-hidden">
        {/* ================================================================= */}
        {/* CHAPTER 1: ONE MISSION, TWO WORLDS (CLASSIC SPIDER-MAN)           */}
        {/* ================================================================= */}
        {chapterNumber === 1 && (
          <div className="relative w-full h-full flex items-center justify-between px-2">
            {/* Left: Apartment Entrance (Exterior breezeway, deadbolt, porch lamp) */}
            <div className="w-[34%] h-[92%] bg-[#0A1220] border border-spider-cyan/50 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-[8px] font-mono text-spider-cyan">
                <span className="font-bold">APT 502</span>
                <Lock className="w-2.5 h-2.5" />
              </div>
              <div className="my-auto text-center">
                <div className="w-8 h-12 mx-auto bg-[#070D18] border border-gray-600 rounded-xs flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-spider-yellow absolute right-1" />
                </div>
                <span className="text-[7.5px] font-sans text-gray-300 block mt-1">Outdoor Breezeway</span>
              </div>
              <div className="text-[7px] font-mono text-gray-400 text-center border-t border-gray-800 pt-0.5">
                APARTMENTS
              </div>
            </div>

            {/* Center: Classic Spider-Man Anchoring Both Worlds */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-col items-center justify-center w-[30%]"
            >
              {/* Web lines extending to both entrances */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 100">
                <line x1="50" y1="50" x2="-20" y2="25" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="50" y1="50" x2="120" y2="25" stroke="#FF1744" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
              <img
                src={getAssetUrl('images/spiderman-hero-character.png')}
                alt="Classic Spider-Man between Worlds"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,23,68,0.7)]"
              />
            </motion.div>

            {/* Right: Residence Hall Entrance (Communal double doors, interior glow) */}
            <div className="w-[34%] h-[92%] bg-[#1E0911] border border-spider-red/50 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-[8px] font-mono text-spider-yellow">
                <span className="font-bold">HALL 101</span>
                <DoorClosed className="w-2.5 h-2.5" />
              </div>
              <div className="my-auto text-center">
                <div className="w-10 h-12 mx-auto bg-gradient-to-t from-spider-red/30 to-spider-yellow/20 border border-spider-yellow/40 rounded-xs flex items-center justify-center">
                  <div className="w-0.5 h-10 bg-black/60" />
                </div>
                <span className="text-[7.5px] font-sans text-gray-200 block mt-1">Shared Corridor</span>
              </div>
              <div className="text-[7px] font-mono text-gray-300 text-center border-t border-gray-800 pt-0.5">
                RESIDENCE HALL
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 2: THE INVISIBLE RESIDENT — SPIDER-MAN NOIR CORRIDOR SCENE */}
        {/* Rebuilt: Recognizable apartment corridor, Ned's door, directional  */}
        {/* lighting, soft moving shadows, prominent Spider-Man Noir in depth */}
        {/* ================================================================= */}
        {chapterNumber === 2 && (
          <div className="relative w-full h-full flex items-center justify-between px-2 overflow-hidden bg-gradient-to-b from-[#080B12] via-[#0E1420] to-[#05070D]">
            {/* Background 1: Wood Plank Flooring with Perspective Depth Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 360 220" preserveAspectRatio="none">
              {/* Floorboard lines converging to horizon */}
              <line x1="0" y1="220" x2="140" y2="130" stroke="#253248" strokeWidth="1" />
              <line x1="90" y1="220" x2="165" y2="130" stroke="#253248" strokeWidth="1" />
              <line x1="180" y1="220" x2="190" y2="130" stroke="#253248" strokeWidth="1" />
              <line x1="270" y1="220" x2="215" y2="130" stroke="#253248" strokeWidth="1" />
              <line x1="360" y1="220" x2="240" y2="130" stroke="#253248" strokeWidth="1" />
              {/* Horizontal Floorboard Joints */}
              <line x1="40" y1="180" x2="320" y2="180" stroke="#1B2638" strokeWidth="0.8" />
              <line x1="90" y1="150" x2="270" y2="150" stroke="#1B2638" strokeWidth="0.8" />
            </svg>

            {/* Background 2: Moving Venetian Blind Shadow Slats across the corridor */}
            <motion.div
              initial={reducedMotion ? false : { x: -8 }}
              animate={reducedMotion ? undefined : { x: [ -8, 6, -8 ] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(-35deg,rgba(0,0,0,0.85)_0px,rgba(0,0,0,0.85)_14px,transparent_14px,transparent_28px)]"
            />

            {/* Directional Corridor Light Beam from Left Sconce / Window */}
            <div className="absolute top-0 left-0 w-[65%] h-full bg-gradient-to-r from-amber-100/15 via-white/5 to-transparent pointer-events-none" />

            {/* Foreground Noir Taut Web Strand in top corner (Depth Layer) */}
            <svg className="absolute top-0 right-0 w-32 h-20 pointer-events-none z-30 opacity-70" viewBox="0 0 120 80">
              <line x1="120" y1="0" x2="20" y2="45" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="120" y1="15" x2="50" y2="60" stroke="#C8D2E0" strokeWidth="0.9" />
              <circle cx="20" cy="45" r="2" fill="#FFFFFF" />
            </svg>

            {/* LEFT / MID-GROUND: Ned's Door 204 with Architectural Molding */}
            <div className="relative z-10 w-[47%] h-[94%] bg-[#0A0F1A] border-2 border-gray-700/80 rounded-xs p-2 flex flex-col justify-between shadow-[4px_4px_16px_rgba(0,0,0,0.9)]">
              {/* Door Molding Header & Vintage Plaque */}
              <div className="border-b border-gray-700/80 pb-1">
                <div className="bg-[#121929] border border-gray-600 px-1.5 py-0.5 rounded-2xs flex items-center justify-between">
                  <span className="font-mono text-[8.5px] text-spider-yellow font-bold uppercase tracking-wider">
                    DOOR 204 &bull; NED
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#FBBF24]" />
                </div>
                <span className="text-[7px] font-mono text-gray-400 block mt-0.5 pl-0.5">
                  Apartment Corridor
                </span>
              </div>

              {/* Wooden Door Panels & Antique Deadbolt */}
              <div className="my-auto py-1 flex flex-col items-center justify-center">
                <div className="w-full h-16 bg-[#0E1524] border border-gray-700 rounded-2xs p-1.5 flex flex-col justify-between relative shadow-inner">
                  {/* Upper Inset Panel */}
                  <div className="w-full h-6 bg-[#080D17] border border-gray-800 rounded-2xs flex items-center justify-between px-2">
                    <span className="text-[6.5px] font-mono text-gray-400">STUDIO RESIDENCE</span>
                    <Lock className="w-2.5 h-2.5 text-spider-yellow" />
                  </div>
                  {/* Lower Inset Panel & Brass Knocker */}
                  <div className="w-full h-6 bg-[#080D17] border border-gray-800 rounded-2xs flex items-center justify-between px-2">
                    <span className="text-[6.5px] font-mono text-gray-400">PRIVATE SPACE</span>
                    <div className="w-2.5 h-2.5 rounded-full border border-amber-300/80 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Warm Amber Glow Seeping from under the Door (Independent Life Inside) */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-[1.5px] mt-1 opacity-80" />
              </div>

              {/* Bottom Observation Cue: Thoughtful outreach, not surveillance */}
              <div className="text-[7px] font-mono text-gray-300 flex items-center gap-1 border-t border-gray-800/80 pt-1">
                <Eye className="w-2.5 h-2.5 text-spider-cyan flex-shrink-0" />
                <span className="truncate">Respecting Autonomy</span>
              </div>
            </div>

            {/* RIGHT / FOREGROUND: SPIDER-MAN NOIR (Full Unclipped Head-to-Boot Framing) */}
            <motion.div
              initial={reducedMotion ? false : { x: 18, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-20 w-[49%] h-full min-h-0 flex flex-col items-center justify-end pt-2 pb-1"
            >
              {/* Subtle Ambient Movement: Gentle Downward Settle Keeps Full Hat Clearance */}
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, 2, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full min-h-0 flex items-end justify-center"
              >
                {/* Dramatic Cast Shadow underneath boots */}
                <div className="absolute -bottom-0.5 w-24 h-3.5 bg-black/90 rounded-full blur-[3px] pointer-events-none" />

                {/* Spider-Man Noir Full Character Image */}
                <img
                  src={getAssetUrl('images/spiderman-noir.png')}
                  alt="Spider-Man Noir observing Ned's doorway"
                  className="h-[92%] max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] contrast-110"
                  loading="eager"
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 3: SAME TITLE, DIFFERENT RELATIONSHIPS (VENOM)            */}
        {/* Symbiote boundary entrance & communal accountability dynamics      */}
        {/* ================================================================= */}
        {chapterNumber === 3 && (
          <div className="relative w-full h-full flex items-center justify-between px-2 overflow-hidden bg-gradient-to-b from-[#090B12] via-[#0C101B] to-[#05070C]">
            {/* Left Corridor Door */}
            <div className="relative z-10 w-[25%] h-[92%] bg-[#0F131F] border border-gray-700 rounded-xs p-1.5 flex flex-col justify-between">
              <span className="font-mono text-[8px] text-gray-300 font-bold">ROOM 301</span>
              <div className="w-full h-12 bg-black/50 border border-gray-800 rounded-xs flex items-center justify-center">
                <span className="text-[7px] font-mono text-gray-400">STUDENT</span>
              </div>
              <span className="text-[7px] font-mono text-gray-400 text-center">PEER DOOR</span>
            </div>

            {/* Center: Community Noticeboard (Readable & Clear of Tendrils) */}
            <div className="relative z-10 w-[34%] h-[94%] bg-[#18140C] border-2 border-spider-yellow/90 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="text-[8px] font-mono font-bold text-spider-yellow uppercase border-b border-spider-yellow/40 pb-0.5 text-center">
                HALL BULLETIN
              </div>
              <div className="space-y-1 text-left px-0.5">
                <div className="bg-spider-yellow/20 border-l border-spider-yellow p-0.5 text-[7px] font-sans text-white">
                  &bull; Quiet Hours: 10 PM
                </div>
                <div className="bg-spider-cyan/20 border-l border-spider-cyan p-0.5 text-[7px] font-sans text-white">
                  &bull; Floor Standards
                </div>
              </div>
              <div className="text-[6.5px] font-mono text-gray-300 text-center leading-tight">
                SHARED ACCOUNTABILITY
              </div>
            </div>

            {/* Right: VENOM with Restrained Boundary Symbiote Entrance */}
            <div className="relative z-20 w-[39%] h-full min-h-0 flex items-end justify-center pt-1.5 pb-0.5 overflow-hidden">
              {/* Restrained Perimeter Tendrils Anchored Strictly to Frame Boundary */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 140 220"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 140 220 L 140 120 Q 124 148 118 188 Q 108 164 114 220 Z"
                  fill="#05070C"
                  stroke="#334155"
                  strokeWidth="1.2"
                  initial={reducedMotion || !isRevealed ? false : { opacity: 0.9, scaleY: 0.25 }}
                  animate={{ opacity: [0.85, 0.55], scaleY: 1 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  style={{ transformOrigin: 'bottom right' }}
                />
                <motion.path
                  d="M 140 50 Q 126 75 130 110 Q 134 140 140 155 Z"
                  fill="#070A12"
                  stroke="#334155"
                  strokeWidth="1"
                  initial={reducedMotion || !isRevealed ? false : { opacity: 0.8, scaleX: 0.2 }}
                  animate={{ opacity: [0.8, 0.45], scaleX: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  style={{ transformOrigin: 'center right' }}
                />
              </svg>

              {/* Venom Coalescing with Subtle Resting Symbiote Breathing */}
              <motion.div
                initial={reducedMotion || !isRevealed ? false : { opacity: 0, scale: 0.92, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="relative z-20 w-full h-full min-h-0 flex items-end justify-center"
              >
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, 2, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-full min-h-0 flex items-end justify-center"
                >
                  <div className="absolute -bottom-0.5 w-24 h-3.5 bg-black/90 rounded-full blur-[3px] pointer-events-none" />
                  <img
                    src={getAssetUrl('images/venom-character.png')}
                    alt="Venom beside residence hall corridor bulletin board"
                    className="h-[94%] max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 4: TWO COMMUNICATION LANGUAGES (CLASSIC SPIDER-MAN)       */}
        {/* ================================================================= */}
        {chapterNumber === 4 && (
          <div className="relative w-full h-full flex items-center justify-center px-1">
            {/* Communication Symbols Matrix */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
              {/* Left Symbols */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C1A2E] border-2 border-spider-cyan flex items-center justify-center shadow-comic-sm">
                  <Phone className="w-4 h-4 text-spider-cyan" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#181126] border-2 border-spider-yellow flex items-center justify-center shadow-comic-sm">
                  <MessageSquare className="w-4 h-4 text-spider-yellow" />
                </div>
              </div>

              {/* Right Symbols */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#200A15] border-2 border-spider-red flex items-center justify-center shadow-comic-sm">
                  <Users className="w-4 h-4 text-spider-red" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0D1F1C] border-2 border-emerald-400 flex items-center justify-center shadow-comic-sm">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Radiating Web Strands connecting all 4 symbols */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 300 120">
              <line x1="150" y1="60" x2="35" y2="30" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="35" y2="90" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="265" y2="30" stroke="#FF1744" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="265" y2="90" stroke="#00FFA3" strokeWidth="2.5" strokeDasharray="3 2" />
            </svg>

            {/* Center: Dynamic Classic Spider-Man Connecting Symbols */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-col items-center"
            >
              <img
                src={getAssetUrl('images/spiderman-hero-portrait.png')}
                alt="Spider-Man Connecting Communication Symbols"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,240,255,0.7)]"
              />
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 5: INDEPENDENCE DOESN'T MEAN ISOLATION (JEAN GREY - BND)  */}
        {/* Brand New Day evening/transit-light aesthetic & real conversation */}
        {/* ================================================================= */}
        {chapterNumber === 5 && (
          <div className="relative w-full h-full flex items-center justify-between px-2 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#131422] to-[#080910]">
            {/* Warm Evening Apartment & Street Transit Window Light */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute right-4 top-2 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl" />
              <div className="absolute right-12 bottom-3 w-20 h-20 bg-orange-600/10 rounded-full blur-xl" />
            </div>

            {/* Left: Apartment Evening Schedule & Realities */}
            <div className="relative z-10 w-[55%] h-[94%] bg-[#090E1A]/90 border-2 border-gray-700/90 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between border-b border-gray-700 pb-1">
                <span className="font-mono text-[8px] text-amber-300 font-bold uppercase">
                  NED&apos;S REALITIES // 502
                </span>
                <span className="text-[7px] font-mono text-amber-200/80">EVENING</span>
              </div>

              {/* Resident Realities Grid */}
              <div className="grid grid-cols-2 gap-1 py-1">
                <div className="p-1 bg-[#11192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-spider-cyan flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Classes</span>
                </div>
                <div className="p-1 bg-[#11192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-spider-yellow flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Work Shift</span>
                </div>
                <div className="p-1 bg-[#11192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Home className="w-3 h-3 text-spider-red flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Home Care</span>
                </div>
                <div className="p-1 bg-[#11192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Tight Time</span>
                </div>
              </div>

              <div className="text-[7px] font-mono text-amber-100/85 text-center border-t border-gray-800 pt-0.5 truncate">
                Seeing Beyond Impressions
              </div>
            </div>

            {/* Right: Jean Grey (Brand New Day) Clearly Framed with Warm Evening Transit Light */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative z-20 w-[43%] h-full min-h-0 flex flex-col items-center justify-end pt-1.5 pb-0.5"
            >
              <motion.div
                animate={reducedMotion ? undefined : { opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-3 top-4 bottom-3 rounded-full bg-amber-500/15 blur-xl pointer-events-none"
              />
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, 1.5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full h-full min-h-0 flex items-end justify-center"
              >
                <img
                  src={getAssetUrl('images/jean-grey-bnd.png')}
                  alt="Jean Grey in evening transit light representing seeing beyond first impressions through real conversation"
                  className="h-[94%] max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]"
                  loading="eager"
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 6: WHEN SUPERPOWERS FAIL (POWERLESS GROUNDED SPIDER-MAN)  */}
        {/* Inactive wrist-shooter -> quiet pause -> ordinary step toward door */}
        {/* ================================================================= */}
        {chapterNumber === 6 && (
          <div className="relative w-full h-full flex items-end justify-between px-2 pb-2 pt-1 overflow-hidden bg-gradient-to-b from-[#0A0E17] via-[#0F141F] to-[#07090E]">
            {/* Grounded Corridor Floor Plane */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-slate-900/40 border-t border-white/10 pointer-events-none" />

            {/* Left Quiet Context Cue: Usual Superpowers Inactive (No Glow, No Sparks) */}
            <div className="relative z-10 w-[27%] h-[88%] flex flex-col justify-between">
              <div className="p-1.5 bg-[#101622]/90 border border-gray-700/80 rounded-xs text-left">
                <span className="text-[7px] font-mono text-gray-400 uppercase block font-bold">
                  HABIT PAUSED
                </span>
                <span className="text-[6.5px] font-sans text-gray-300 leading-tight block mt-0.5">
                  Broadcast &amp; quick fix fail
                </span>
              </div>

              <div className="bg-black/85 border border-gray-700 px-1.5 py-1 rounded-2xs text-left">
                <span className="block text-[6px] font-mono uppercase text-gray-400">
                  {ch6Phase === 'check' ? '01 // WRIST CHECK' : ch6Phase === 'pause' ? '02 // QUIET PAUSE' : '03 // NEXT STEP'}
                </span>
                <span className="block text-[7px] font-sans text-gray-200 font-medium leading-tight">
                  {ch6Phase === 'check'
                    ? 'Nothing happens'
                    : ch6Phase === 'pause'
                    ? 'Grounded stillness'
                    : 'A different approach'}
                </span>
              </div>
            </div>

            {/* Center: Grounded Powerless Classic Spider-Man Sequence */}
            <div className="relative z-20 w-[39%] h-full min-h-0 flex items-end justify-center pt-1">
              {ch6Phase !== 'step' ? (
                <motion.div
                  key="wrist-pose"
                  initial={reducedMotion ? false : { opacity: 0.9 }}
                  animate={
                    ch6Phase === 'check' && !reducedMotion
                      ? { rotate: [0, -1.5, 0.8, 0], opacity: 1 }
                      : { rotate: 0, y: reducedMotion ? 0 : [0, 1.5], opacity: 1 }
                  }
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="relative w-full h-full min-h-0 flex items-end justify-center"
                >
                  <img
                    src={getAssetUrl('images/spiderman-powerless-wrist.png')}
                    alt="Spider-Man standing quietly checking an inactive wrist-shooter"
                    className="h-[92%] max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.8)]"
                    loading="eager"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="step-pose"
                  initial={reducedMotion ? false : { opacity: 0.35, x: -6 }}
                  animate={{ opacity: 1, x: 2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative w-full h-full min-h-0 flex items-end justify-center"
                >
                  <img
                    src={getAssetUrl('images/spiderman-powerless-step.png')}
                    alt="Spider-Man taking a deliberate ordinary step toward a different approach"
                    className="h-[92%] max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.8)]"
                    loading="eager"
                  />
                </motion.div>
              )}
            </div>

            {/* Right: Illuminated Calm Route Doorway ("A DIFFERENT APPROACH") */}
            <motion.div
              animate={{
                borderColor: ch6Phase === 'step' ? 'rgba(251, 191, 36, 0.78)' : 'rgba(251, 191, 36, 0.38)',
                boxShadow: ch6Phase === 'step' ? '0 0 24px rgba(251, 191, 36, 0.22)' : '0 0 8px rgba(251, 191, 36, 0.08)',
              }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-[31%] h-[92%] bg-gradient-to-t from-amber-500/20 via-amber-200/10 to-[#0C121E] border-2 rounded-xs p-1.5 flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-1 text-amber-300">
                <span className="text-[7px] font-mono uppercase font-bold tracking-wider">OPEN ROUTE</span>
                <ArrowRight className="w-2.5 h-2.5 flex-shrink-0" />
              </div>

              <div className="my-auto mx-auto w-10 h-14 bg-gradient-to-b from-amber-100/30 via-amber-200/20 to-amber-500/35 border border-amber-300/60 rounded-2xs flex items-end justify-center pb-1">
                <div className="w-5 h-1 bg-amber-200/90 rounded-full blur-[1px]" />
              </div>

              <div>
                <span className="block font-comic text-[11px] sm:text-xs text-amber-200 uppercase leading-none tracking-wide">
                  A different approach
                </span>
                <span className="block text-[6.5px] font-sans text-gray-300 mt-0.5">
                  Personal &amp; low-pressure
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 7: THE MULTIVERSE RA (ALL THREE SPIDER-MEN)                */}
        {/* Worlds converge around the personal web finale                    */}
        {/* ================================================================= */}
        {chapterNumber === 7 && (
          <div className="relative w-full h-full flex items-center justify-between px-2 bg-[#080D1A]">
            {/* Left: Glowing Spider Silhouette Constellation */}
            <div className="w-[46%] h-[94%] bg-[#080D1A] border-2 border-spider-cyan rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between border-b border-gray-800 pb-0.5">
                <span className="font-mono text-[7.5px] text-spider-yellow uppercase font-bold">
                  YOUR PERSONAL WEB
                </span>
                <Sparkles className="w-3 h-3 text-spider-cyan" />
              </div>

              {/* Mini Spider Web Insignia */}
              <div className="my-auto flex items-center justify-center">
                <svg viewBox="0 0 100 80" className="w-20 h-14" fill="none">
                  {/* Central Body */}
                  <ellipse cx="50" cy="35" rx="7" ry="6" fill="#FF1744" stroke="#00F0FF" strokeWidth="1.5" />
                  <ellipse cx="50" cy="50" rx="10" ry="14" fill="#FF1744" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* 8 Legs */}
                  <path d="M 45 32 Q 30 18 18 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 55 32 Q 70 18 82 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 44 36 Q 25 30 12 38" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 56 36 Q 75 30 88 38" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 43 45 Q 22 55 14 68" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 57 45 Q 78 55 86 68" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 46 54 Q 30 72 24 78" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 54 54 Q 70 72 76 78" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="text-[6.5px] font-mono text-gray-300 text-center border-t border-gray-800 pt-0.5">
                4 DECISIONS &bull; 8 LEGS COMPLETE
              </div>
            </div>

            {/* Right: TRIO OF HEROES (Classic, Miles, and Noir Together) */}
            <motion.div
              initial={reducedMotion ? false : { x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[52%] h-full flex items-center justify-around px-1 relative"
            >
              {/* Spider-Man Noir on Left */}
              <div className="flex flex-col items-center">
                <img
                  src={getAssetUrl('images/spiderman-noir-portrait.png')}
                  alt="Spider-Man Noir"
                  className="w-12 sm:w-14 h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                />
                <span className="text-[6px] font-mono text-gray-300">NOIR</span>
              </div>

              {/* Classic Peter Parker in Center */}
              <div className="flex flex-col items-center -mt-2">
                <img
                  src={getAssetUrl('images/spiderman-perched.png')}
                  alt="Classic Spider-Man"
                  className="w-14 sm:w-16 h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(255,23,68,0.7)]"
                />
                <span className="text-[6px] font-mono text-spider-red font-bold">PETER</span>
              </div>

              {/* Miles Morales on Right */}
              <div className="flex flex-col items-center">
                <img
                  src={getAssetUrl('images/spiderman-miles.png')}
                  alt="Miles Morales"
                  className="w-12 sm:w-14 h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(255,230,0,0.6)]"
                />
                <span className="text-[6px] font-mono text-spider-yellow">MILES</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Footer Caption */}
      <div className="relative z-20 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded-xs border border-white/10">
        <span className="text-spider-cyan truncate">{doorTheme}</span>
        <span className="uppercase text-spider-yellow font-bold flex-shrink-0">STAGE ACTIVE</span>
      </div>
    </div>
  );
};
