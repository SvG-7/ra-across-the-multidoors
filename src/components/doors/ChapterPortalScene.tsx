import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../../utils/assets';
import {
  MessageSquare,
  Mail,
  Users,
  DoorClosed,
  Lock,
  ArrowRight,
  Clock,
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
    const tPause = window.setTimeout(() => setCh6Phase('pause'), 1100);
    const tStep = window.setTimeout(() => setCh6Phase('step'), 1900);
    return () => {
      window.clearTimeout(tPause);
      window.clearTimeout(tStep);
    };
  }, [chapterNumber, isRevealed, replayKey, reducedMotion]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060810] flex flex-col select-none">
      {/* Subtle Background Texture & Accent */}
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none z-0" />

      <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
        {/* ================================================================= */}
        {/* CHAPTER 1: ONE MISSION, TWO WORLDS                                */}
        {/* ================================================================= */}
        {chapterNumber === 1 && (
          <div className="relative w-full h-full flex items-center justify-between px-4 sm:px-6 bg-gradient-to-b from-[#070B14] to-[#05070C]">
            {/* Left Abstract Apartment Entrance */}
            <div className="w-[30%] h-[78%] bg-[#0A1424] border-2 border-spider-cyan/60 rounded-xs p-2.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-spider-cyan">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase">Apt</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="w-10 h-14 sm:w-12 sm:h-16 mx-auto bg-[#060C16] border border-slate-600 rounded-xs relative flex items-center justify-end pr-1.5">
                <div className="w-2 h-2 rounded-full bg-spider-yellow" />
              </div>
              <span className="font-sans text-[11px] sm:text-xs text-gray-300 text-center">
                Private doors
              </span>
            </div>

            {/* Center: Classic Spider-Man Linking Both Settings */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="relative z-20 w-[38%] h-full flex items-center justify-center py-2"
            >
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 100">
                <line x1="50" y1="45" x2="-15" y2="28" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="50" y1="45" x2="115" y2="28" stroke="#FF1744" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
              <img
                src={getAssetUrl('images/spiderman-perched.png')}
                alt="Spider-Man connecting residence hall and apartment living"
                className="h-auto max-h-[88%] w-auto max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(255,23,68,0.65)]"
                loading="eager"
              />
            </motion.div>

            {/* Right Abstract Residence Hall Entrance */}
            <div className="w-[30%] h-[78%] bg-[#1C0911] border-2 border-spider-red/60 rounded-xs p-2.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-spider-yellow">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase">Hall</span>
                <DoorClosed className="w-3.5 h-3.5" />
              </div>
              <div className="w-12 h-14 sm:w-14 sm:h-16 mx-auto bg-gradient-to-t from-spider-red/30 to-spider-yellow/20 border border-spider-yellow/50 rounded-xs flex items-center justify-center">
                <div className="w-0.5 h-12 bg-black/70" />
              </div>
              <span className="font-sans text-[11px] sm:text-xs text-gray-200 text-center">
                Shared halls
              </span>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 2: THE QUIET DOOR (SPIDER-MAN NOIR — FULL-BODY UNCLIPPED) */}
        {/* ================================================================= */}
        {chapterNumber === 2 && (
          <div className="relative w-full h-full flex items-end justify-between px-3 sm:px-5 pt-2 pb-1 overflow-hidden bg-gradient-to-b from-[#080B12] via-[#0E1420] to-[#05070D]">
            {/* Directional Light Shaft & Perspective Lines */}
            <div className="absolute top-0 left-0 w-[68%] h-full bg-gradient-to-r from-amber-100/15 via-white/5 to-transparent pointer-events-none" />
            <motion.div
              initial={reducedMotion ? false : { x: -6 }}
              animate={reducedMotion ? undefined : { x: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none opacity-25 bg-[repeating-linear-gradient(-35deg,rgba(0,0,0,0.85)_0px,rgba(0,0,0,0.85)_14px,transparent_14px,transparent_28px)]"
            />

            {/* Foreground Web Accent */}
            <svg className="absolute top-0 left-0 w-24 h-16 pointer-events-none z-20 opacity-55" viewBox="0 0 120 80">
              <line x1="0" y1="0" x2="95" y2="42" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 2" />
            </svg>

            {/* Left: Abstract Quiet Door 204 */}
            <div className="relative z-10 w-[40%] h-[88%] mb-2 bg-[#0A0F1A] border-2 border-slate-600/80 rounded-xs p-2.5 sm:p-3.5 flex flex-col justify-between shadow-[6px_6px_18px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between bg-[#121929] border border-slate-600 px-2 py-1 rounded-2xs">
                <span className="font-mono text-xs sm:text-sm text-spider-yellow font-bold tracking-wider">
                  204
                </span>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
              </div>

              <div className="w-full flex-1 my-2.5 bg-[#080C15] border border-slate-700/70 rounded-2xs flex items-center justify-end pr-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300/80 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              </div>

              {/* Warm under-door light strip */}
              <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-85" />
            </div>

            {/* Right: Full-Body Unclipped Spider-Man Noir */}
            <motion.div
              initial={reducedMotion ? false : { x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative z-20 w-[56%] h-full min-h-0 flex items-end justify-center pt-1"
            >
              <div className="absolute inset-x-4 top-4 bottom-2 rounded-full bg-[radial-gradient(ellipse_at_50%_42%,rgba(226,232,240,0.18),transparent_72%)] pointer-events-none" />
              <img
                src={getAssetUrl('images/spiderman-noir.png')}
                alt="Spider-Man Noir beside a quiet hallway door"
                className="relative z-10 h-auto max-h-[95%] w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_0_6px_rgba(226,232,240,0.22)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]"
                loading="eager"
              />
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 3: PEER TENSION (REALISTIC VENOM LARGE & WELL-SEPARATED)   */}
        {/* ================================================================= */}
        {chapterNumber === 3 && (
          <div className="relative w-full h-full flex items-end justify-between px-3 sm:px-5 pt-2 pb-1 overflow-hidden bg-gradient-to-b from-[#090B12] via-[#101828] to-[#05070C]">
            {/* Left: Minimal Wall Policy Notice */}
            <div className="relative z-10 w-[34%] h-[82%] mb-3 bg-[#17130A] border-2 border-spider-yellow/85 rounded-xs p-2.5 sm:p-3.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center gap-1.5 text-spider-yellow border-b border-spider-yellow/35 pb-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                  Peer Issue
                </span>
              </div>

              <div className="space-y-1.5 my-auto">
                <div className="bg-spider-yellow/20 border-l-2 border-spider-yellow px-2 py-1 text-[11px] sm:text-xs font-sans font-semibold text-white">
                  Shared Agreement
                </div>
                <div className="bg-white/5 border-l-2 border-slate-500 px-2 py-1 text-[10px] sm:text-xs font-sans text-gray-300">
                  Room &amp; Hall Boundaries
                </div>
              </div>

              <span className="text-[10px] font-mono text-gray-400">Same-age peer</span>
            </div>

            {/* Right: Large Realistic Venom with Restrained Rim Light */}
            <div className="relative z-20 w-[62%] h-full min-h-0 flex items-end justify-center pt-1 overflow-hidden">
              <motion.div
                animate={reducedMotion ? undefined : { opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-2 top-2 bottom-2 rounded-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(148,163,184,0.38),rgba(56,189,248,0.16)_50%,transparent_75%)] pointer-events-none z-0"
              />

              {/* Subtle Symbiote Boundary Strands */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 140 220"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 140 220 L 140 124 Q 126 150 121 190 Q 112 168 117 220 Z"
                  fill="#06080E"
                  stroke="#64748B"
                  strokeOpacity="0.65"
                  strokeWidth="1.1"
                  animate={reducedMotion ? undefined : { opacity: [0.55, 0.82, 0.55] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M 140 42 Q 128 70 132 110 Q 136 142 140 162 Z"
                  fill="#070A12"
                  stroke="#64748B"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  animate={reducedMotion ? undefined : { opacity: [0.42, 0.72, 0.42] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
              </svg>

              <motion.div
                initial={reducedMotion || !isRevealed ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="relative z-20 w-full h-full min-h-0 flex items-end justify-center"
              >
                <img
                  src={getAssetUrl('images/venom-character.png')}
                  alt="Venom facing peer accountability scenario"
                  className="h-auto max-h-[95%] w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_0_6px_rgba(148,163,184,0.48)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 4: HOW WOULD YOU REACH THEM? (COMMUNICATION CHANNELS)      */}
        {/* ================================================================= */}
        {chapterNumber === 4 && (
          <div className="relative w-full h-full flex items-center justify-center px-4 bg-gradient-to-b from-[#070E1A] to-[#050811]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 220">
              <line x1="180" y1="110" x2="54" y2="55" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="4 3" />
              <line x1="180" y1="110" x2="54" y2="165" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="4 3" />
              <line x1="180" y1="110" x2="306" y2="55" stroke="#FF1744" strokeWidth="2.5" strokeDasharray="4 3" />
              <line x1="180" y1="110" x2="306" y2="165" stroke="#C084FC" strokeWidth="2.5" strokeDasharray="4 3" />
            </svg>

            {/* Left Nodes */}
            <div className="absolute inset-y-0 left-3 sm:left-6 flex flex-col justify-around py-5 pointer-events-none z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#191506] border-2 border-spider-yellow flex items-center justify-center shadow-comic-sm">
                  <Users className="w-5 h-5 text-spider-yellow" />
                </div>
                <span className="font-mono text-[10px] text-spider-yellow font-bold">Group chat</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#081A28] border-2 border-spider-cyan flex items-center justify-center shadow-comic-sm">
                  <MessageSquare className="w-5 h-5 text-spider-cyan" />
                </div>
                <span className="font-mono text-[10px] text-spider-cyan font-bold">Personal</span>
              </div>
            </div>

            {/* Right Nodes */}
            <div className="absolute inset-y-0 right-3 sm:right-6 flex flex-col justify-around py-5 pointer-events-none z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#220912] border-2 border-spider-red flex items-center justify-center shadow-comic-sm">
                  <DoorClosed className="w-5 h-5 text-spider-red" />
                </div>
                <span className="font-mono text-[10px] text-spider-red font-bold">In person</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#170E29] border-2 border-purple-400 flex items-center justify-center shadow-comic-sm">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-mono text-[10px] text-purple-300 font-bold">Short email</span>
              </div>
            </div>

            {/* Center: Large Spider-Man */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="relative z-20 h-full flex items-center justify-center py-3"
            >
              <img
                src={getAssetUrl('images/spiderman-hero-portrait.png')}
                alt="Spider-Man choosing between communication channels"
                className="h-auto max-h-[82%] w-auto max-w-[165px] sm:max-w-[200px] lg:max-w-[250px] object-contain filter drop-shadow-[0_10px_22px_rgba(0,240,255,0.45)]"
                loading="eager"
              />
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 5: CLOSED DOOR, FULL PLATE (REFLECTIVE ROOFTOP SCENE)     */}
        {/* ================================================================= */}
        {chapterNumber === 5 && (
          <div className="relative w-full h-full flex items-end justify-center px-3 overflow-hidden bg-gradient-to-b from-[#080C17] via-[#101829] to-[#060910]">
            {/* Background Illuminated Apartment Windows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute left-6 sm:left-10 bottom-5 w-32 sm:w-44 h-[78%] bg-[#090E1A]/90 border border-slate-700/50 rounded-t-xs p-3 grid grid-cols-3 gap-2">
                {[0.35, 0.85, 0.25, 0.7, 0.2, 0.9, 0.45, 0.75, 0.3].map((baseOp, idx) => (
                  <motion.div
                    key={idx}
                    animate={reducedMotion ? undefined : { opacity: [baseOp, Math.min(0.95, baseOp + 0.2), baseOp] }}
                    transition={{ duration: 4.5 + idx * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-4 sm:h-5 rounded-[1px] bg-amber-300/65 border border-amber-200/30"
                  />
                ))}
              </div>
              <div className="absolute right-6 sm:right-12 top-6 w-28 sm:w-36 h-[68%] bg-[#080C16]/85 border border-slate-800/70 rounded-t-xs p-2.5 grid grid-cols-2 gap-2 opacity-70">
                {[0.55, 0.2, 0.75, 0.3, 0.65, 0.25].map((op, idx) => (
                  <div key={idx} style={{ opacity: op }} className="h-4 rounded-[1px] bg-amber-200/45" />
                ))}
              </div>
            </div>

            {/* Gently Swaying Foreground Web Strand */}
            <motion.svg
              animate={reducedMotion ? undefined : { rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top right' }}
              className="absolute -top-1 right-0 w-24 h-24 pointer-events-none z-30 opacity-65"
              viewBox="0 0 80 80"
            >
              <line x1="78" y1="0" x2="18" y2="58" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="55" y1="0" x2="36" y2="40" stroke="#94A3B8" strokeWidth="0.8" />
            </motion.svg>

            {/* Reflective Classic Spider-Man Seated Quietly on Rooftop Ledge */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative z-20 w-full h-full min-h-0 flex flex-col items-center justify-end pt-2"
            >
              <div className="relative z-10 w-full h-[90%] min-h-0 flex items-end justify-center">
                <div className="absolute inset-x-10 top-4 bottom-2 rounded-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(251,191,36,0.22),rgba(56,189,248,0.1)_52%,transparent_75%)] pointer-events-none" />
                <img
                  src={getAssetUrl('images/spiderman-reflective.png')}
                  alt="Classic Spider-Man sitting thoughtfully on a rooftop ledge overlooking apartment windows"
                  className="relative z-10 h-auto max-h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_0_8px_rgba(251,191,36,0.22)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.92)]"
                  loading="eager"
                />
              </div>
              <div className="relative z-20 w-[86%] h-3.5 bg-gradient-to-b from-slate-600/90 to-slate-900 border-t-2 border-slate-400/55 rounded-t-2xs shadow-[0_-2px_8px_rgba(0,0,0,0.65)]" />
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 6: PLAN B (POWERLESS GROUNDED SPIDER-MAN)                 */}
        {/* ================================================================= */}
        {chapterNumber === 6 && (
          <div className="relative w-full h-full flex items-end justify-between px-3 sm:px-5 pb-2 pt-2 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#101624] to-[#06090F]">
            <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black/85 to-slate-900/40 border-t border-white/10 pointer-events-none" />

            {/* Left Quiet Understated Humor Cue ("Plan A stalled") */}
            <div className="relative z-10 w-[24%] h-[82%] mb-2 flex flex-col justify-center">
              <div className="p-2 sm:p-2.5 bg-[#0F1523]/90 border border-slate-700 rounded-xs text-center">
                <span className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase font-bold block line-through decoration-spider-red">
                  Plan A
                </span>
                <span className="text-[10px] sm:text-xs font-sans text-gray-400 block mt-0.5">
                  Didn&apos;t land
                </span>
              </div>
            </div>

            {/* Center: Grounded Powerless Classic Spider-Man */}
            <div className="relative z-20 w-[42%] h-full min-h-0 flex items-end justify-center pt-1">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0.92, x: -4 }}
                animate={{
                  x: ch6Phase === 'step' ? 6 : 0,
                  opacity: ch6Phase === 'check' ? 0.94 : 1,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full h-full min-h-0 flex items-end justify-center"
              >
                <div className="absolute -bottom-0.5 w-20 h-3 bg-black/85 rounded-full blur-[2px] pointer-events-none" />
                <img
                  src={getAssetUrl('images/spiderman-grounded.png')}
                  alt="Classic Spider-Man standing grounded beside Plan B doorway"
                  className="h-auto max-h-[95%] w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_0_5px_rgba(148,163,184,0.3)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]"
                  loading="eager"
                />
              </motion.div>
            </div>

            {/* Right: Lit Open Doorway ("Plan B") */}
            <motion.div
              animate={{
                borderColor: ch6Phase === 'step' ? 'rgba(251, 191, 36, 0.85)' : 'rgba(251, 191, 36, 0.45)',
                boxShadow: ch6Phase === 'step' ? '0 0 26px rgba(251, 191, 36, 0.25)' : '0 0 8px rgba(251, 191, 36, 0.08)',
              }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-[30%] h-[88%] mb-1 bg-gradient-to-t from-amber-500/20 via-amber-200/10 to-[#0C121E] border-2 rounded-xs p-2 sm:p-3 flex flex-col justify-between items-center text-center"
            >
              <div className="flex items-center gap-1 text-amber-300 font-mono text-[10px] sm:text-xs font-bold uppercase">
                <span>Try</span>
                <ArrowRight className="w-3 h-3" />
              </div>

              <div className="w-10 h-16 sm:w-14 sm:h-20 bg-gradient-to-b from-amber-100/35 via-amber-200/20 to-amber-500/40 border border-amber-300/65 rounded-2xs flex items-end justify-center pb-1.5">
                <div className="w-5 h-1 bg-amber-200/95 rounded-full blur-[1px]" />
              </div>

              <span className="font-comic text-base sm:text-xl text-amber-200 uppercase leading-none tracking-wide">
                Plan B
              </span>
            </motion.div>
          </div>
        )}

        {/* ================================================================= */}
        {/* CHAPTER 7: ALL THREE SPIDER-MEN                                   */}
        {/* ================================================================= */}
        {chapterNumber === 7 && (
          <div className="relative w-full h-full flex items-center justify-around px-3 py-3 bg-gradient-to-b from-[#0A1122] via-[#080D1A] to-[#050811]">
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.12),rgba(255,23,68,0.08)_50%,transparent_75%)] pointer-events-none" />
            <motion.div
              initial={reducedMotion ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full h-full flex items-center justify-around gap-2"
            >
              <div className="w-[30%] h-full flex items-center justify-center">
                <img
                  src={getAssetUrl('images/spiderman-noir.png')}
                  alt="Spider-Man Noir"
                  className="h-auto max-h-[86%] w-auto max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(226,232,240,0.22)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)]"
                />
              </div>
              <div className="w-[36%] h-full flex items-center justify-center">
                <img
                  src={getAssetUrl('images/spiderman-perched.png')}
                  alt="Classic Spider-Man"
                  className="h-auto max-h-[90%] w-auto max-w-full object-contain filter drop-shadow-[0_6px_16px_rgba(255,23,68,0.6)]"
                />
              </div>
              <div className="w-[30%] h-full flex items-center justify-center">
                <img
                  src={getAssetUrl('images/spiderman-miles.png')}
                  alt="Miles Morales"
                  className="h-auto max-h-[84%] w-auto max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(255,230,0,0.5)]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
