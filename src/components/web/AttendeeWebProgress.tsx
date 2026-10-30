import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TOPIC_LEARNING_ANGLES } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';

interface AttendeeWebProgressProps {
  connectionsCount?: number;
  answers?: Record<number, string>;
  ch4Choice?: string;
  ch6Choice?: string;
  reducedMotion?: boolean;
  isFinale?: boolean;
}

export const AttendeeWebProgress: React.FC<AttendeeWebProgressProps> = ({
  connectionsCount: propCount,
  answers = {},
  ch4Choice,
  ch6Choice,
  reducedMotion = false,
  isFinale: _isFinale = false,
}) => {
  // Consolidate answers from props
  const effectiveAnswers: Record<number, string> = { ...answers };
  if (ch4Choice && !effectiveAnswers[4]) effectiveAnswers[4] = ch4Choice;
  if (ch6Choice && !effectiveAnswers[6]) effectiveAnswers[6] = ch6Choice;

  // Answered decision keys: 2, 3, 4, 6
  const hasCh2 = !!effectiveAnswers[2];
  const hasCh3 = !!effectiveAnswers[3];
  const hasCh4 = !!effectiveAnswers[4];
  const hasCh6 = !!effectiveAnswers[6];

  const actualCount = [hasCh2, hasCh3, hasCh4, hasCh6].filter(Boolean).length;
  const count = propCount !== undefined ? Math.max(propCount, actualCount) : actualCount;
  const isComplete = count >= 4;

  // Selected leg pair state for interactive inspection
  const [selectedLegPair, setSelectedLegPair] = useState<number | null>(null);

  // Helper to retrieve topic and readable reflection
  const getLegDetails = (ch: number) => {
    const optId = effectiveAnswers[ch];
    if (!optId || !TOPIC_LEARNING_ANGLES[optId]) {
      switch (ch) {
        case 2:
          return { topic: 'Connection', answered: false, label: 'Awaiting your choice in Chapter 2' };
        case 3:
          return { topic: 'Trust and boundaries', answered: false, label: 'Awaiting your choice in Chapter 3' };
        case 4:
          return { topic: 'Communication', answered: false, label: 'Awaiting your choice in Chapter 4' };
        case 6:
          return { topic: 'Adaptability', answered: false, label: 'Awaiting your choice in Chapter 6' };
        default:
          return null;
      }
    }
    const data = TOPIC_LEARNING_ANGLES[optId];
    return {
      topic: data.topic,
      answered: true,
      label: data.label,
      whatYouLeanedToward: data.whatYouLeanedToward,
      anotherApproachToExplore: data.anotherApproachToExplore,
      somethingToTry: data.somethingToTry,
    };
  };

  const activeDetail = selectedLegPair ? getLegDetails(selectedLegPair) : null;

  return (
    <div className="w-full bg-[#080D1A] border-3 border-black rounded-sm p-3.5 sm:p-4 my-3 shadow-comic select-none">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-spider-cyan animate-pulse" />
          <span className="font-comic text-base sm:text-lg text-white uppercase tracking-wide">
            Your Personal Web
          </span>
        </div>
        <span className={`text-[10px] sm:text-[11px] font-mono uppercase px-2 py-0.5 rounded-xs border font-bold ${
          isComplete
            ? 'bg-spider-yellow text-black border-black shadow-comic-sm'
            : 'bg-black/60 text-spider-cyan border-spider-cyan/40'
        }`}>
          {isComplete ? 'SPIDER FORMATION COMPLETE' : `${count} OF 4 DECISIONS WOVEN`}
        </span>
      </div>

      <p className="text-xs font-sans text-gray-300 mb-2 leading-snug">
        {isComplete
          ? 'Your four decisions have woven together into a complete eight-legged spider. Tap any pair of legs to inspect your path.'
          : 'Your web is taking shape. Each decision you explore adds a matching pair of legs and anchors the central spider body.'}
      </p>

      {/* Spider SVG Canvas (360 x 280) */}
      <div className="relative w-full h-56 sm:h-64 bg-[#050811] border-2 border-gray-800 rounded-xs overflow-hidden flex items-center justify-center p-1">
        {/* Subtle Web Radial Spiderweb Background Grid */}
        <svg
          viewBox="0 0 360 280"
          className="w-full h-full max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radial Web Threads (Supportive background web structure) */}
          <g stroke="#172238" strokeWidth="0.75" strokeDasharray="3 3">
            <ellipse cx="180" cy="140" rx="160" ry="120" />
            <ellipse cx="180" cy="140" rx="120" ry="90" />
            <ellipse cx="180" cy="140" rx="80" ry="60" />
            <ellipse cx="180" cy="140" rx="40" ry="30" />
            {/* Diagonal Anchor Strands */}
            <line x1="20" y1="20" x2="340" y2="260" />
            <line x1="340" y1="20" x2="20" y2="260" />
            <line x1="180" y1="10" x2="180" y2="270" />
            <line x1="10" y1="140" x2="350" y2="140" />
          </g>

          {/* GHOST OUTLINE (Shows subtle remaining shape for incomplete web) */}
          <g stroke="#2B3954" strokeWidth="1.25" strokeDasharray="4 3" opacity={isComplete ? 0 : 0.45}>
            {/* Ghost Head & Abdomen */}
            <ellipse cx="180" cy="115" rx="15" ry="13" />
            <ellipse cx="180" cy="158" rx="20" ry="28" />
            {/* Ghost Legs 1 to 4 */}
            {/* Leg Pair 1: Front */}
            <path d="M 172 108 Q 120 50 65 40" />
            <path d="M 188 108 Q 240 50 295 40" />
            {/* Leg Pair 2: Upper Middle */}
            <path d="M 168 116 Q 95 90 40 100" />
            <path d="M 192 116 Q 265 90 320 100" />
            {/* Leg Pair 3: Lower Middle */}
            <path d="M 168 140 Q 100 170 45 200" />
            <path d="M 192 140 Q 260 170 315 200" />
            {/* Leg Pair 4: Rear */}
            <path d="M 172 155 Q 125 220 95 260" />
            <path d="M 188 155 Q 235 220 265 260" />
          </g>

          {/* ============================================================ */}
          {/* ACTIVE CENTRAL SPIDER BODY WEBBING (Grows with decisions)     */}
          {/* ============================================================ */}
          {/* Central Body Web Base */}
          {count > 0 && (
            <g>
              {/* Central Cephalothorax (Head) */}
              <motion.ellipse
                cx="180"
                cy="115"
                rx="15"
                ry="13"
                initial={reducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                fill="#FF1744"
                stroke="#00F0FF"
                strokeWidth={isComplete ? 2.5 : 1.5}
                className="filter drop-shadow-[0_0_8px_rgba(255,23,68,0.7)]"
              />

              {/* Spider Eyes / Cephalic Web Lattice */}
              <ellipse cx="174" cy="112" rx="3" ry="4" fill="#FFFFFF" />
              <ellipse cx="186" cy="112" rx="3" ry="4" fill="#FFFFFF" />

              {/* Central Pedicel (Waist Strands) */}
              <line x1="176" y1="128" x2="184" y2="128" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="178" y1="130" x2="182" y2="130" stroke="#00F0FF" strokeWidth="2" />

              {/* Abdomen (Grows larger with Chapters 3, 4, 6) */}
              <motion.path
                d="M 180 130 C 160 132 158 165 170 182 C 176 190 180 196 180 196 C 180 196 184 190 190 182 C 202 165 200 132 180 130 Z"
                initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                fill="#0A0E1A"
                stroke="#FF1744"
                strokeWidth={isComplete ? 2.5 : 1.5}
                className="filter drop-shadow-[0_0_12px_rgba(255,23,68,0.8)]"
              />

              {/* Internal Abdomen Spiderweb Lattice */}
              <path d="M 180 132 L 180 192" stroke="#00F0FF" strokeWidth="1.5" />
              <path d="M 166 150 Q 180 162 194 150" stroke="#FFE600" strokeWidth="1.5" fill="none" />
              <path d="M 168 168 Q 180 178 192 168" stroke="#00FFA3" strokeWidth="1.5" fill="none" />
              <circle cx="180" cy="195" r="2.5" fill="#FF1744" />
            </g>
          )}

          {/* ============================================================ */}
          {/* LEG PAIR 1 (CHAPTER 2: CONNECTION) — FRONT LEGS L1 & R1       */}
          {/* ============================================================ */}
          {hasCh2 && (
            <g
              onClick={() => {
                soundEngine.playClick();
                setSelectedLegPair(selectedLegPair === 2 ? null : 2);
              }}
              className="cursor-pointer group"
            >
              {/* Hit area for easy mobile tapping */}
              <path d="M 172 108 Q 120 50 65 40" stroke="transparent" strokeWidth="24" fill="none" />
              <path d="M 188 108 Q 240 50 295 40" stroke="transparent" strokeWidth="24" fill="none" />

              {/* Left Front Leg (L1) */}
              <motion.path
                d="M 172 108 Q 120 50 65 40"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                stroke="#00F0FF"
                strokeWidth={selectedLegPair === 2 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#00F0FF]"
              />
              {/* Knee joint and tip nodes */}
              <circle cx="120" cy="62" r={selectedLegPair === 2 ? 5 : 3.5} fill="#00F0FF" stroke="#000" strokeWidth="1.5" />
              <circle cx="65" cy="40" r={selectedLegPair === 2 ? 6 : 4} fill="#FFE600" stroke="#000" strokeWidth="1.5" />

              {/* Right Front Leg (R1) */}
              <motion.path
                d="M 188 108 Q 240 50 295 40"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                stroke="#00F0FF"
                strokeWidth={selectedLegPair === 2 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#00F0FF]"
              />
              <circle cx="240" cy="62" r={selectedLegPair === 2 ? 5 : 3.5} fill="#00F0FF" stroke="#000" strokeWidth="1.5" />
              <circle cx="295" cy="40" r={selectedLegPair === 2 ? 6 : 4} fill="#FFE600" stroke="#000" strokeWidth="1.5" />

              {/* Topic Label Tag */}
              <rect x="42" y="18" width="54" height="16" rx="3" fill="#0C1424" stroke="#00F0FF" strokeWidth="1" />
              <text x="69" y="29" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                CH.2 LEGS
              </text>
            </g>
          )}

          {/* ============================================================ */}
          {/* LEG PAIR 2 (CHAPTER 3: TRUST) — UPPER-MIDDLE LEGS L2 & R2     */}
          {/* ============================================================ */}
          {hasCh3 && (
            <g
              onClick={() => {
                soundEngine.playClick();
                setSelectedLegPair(selectedLegPair === 3 ? null : 3);
              }}
              className="cursor-pointer group"
            >
              {/* Hit area */}
              <path d="M 168 118 Q 95 90 40 100" stroke="transparent" strokeWidth="24" fill="none" />
              <path d="M 192 118 Q 265 90 320 100" stroke="transparent" strokeWidth="24" fill="none" />

              {/* Left Upper-Middle Leg (L2) */}
              <motion.path
                d="M 168 118 Q 95 90 40 100"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
                stroke="#FFE600"
                strokeWidth={selectedLegPair === 3 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#FFE600]"
              />
              <circle cx="95" cy="98" r={selectedLegPair === 3 ? 5 : 3.5} fill="#FFE600" stroke="#000" strokeWidth="1.5" />
              <circle cx="40" cy="100" r={selectedLegPair === 3 ? 6 : 4} fill="#00F0FF" stroke="#000" strokeWidth="1.5" />

              {/* Right Upper-Middle Leg (R2) */}
              <motion.path
                d="M 192 118 Q 265 90 320 100"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
                stroke="#FFE600"
                strokeWidth={selectedLegPair === 3 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#FFE600]"
              />
              <circle cx="265" cy="98" r={selectedLegPair === 3 ? 5 : 3.5} fill="#FFE600" stroke="#000" strokeWidth="1.5" />
              <circle cx="320" cy="100" r={selectedLegPair === 3 ? 6 : 4} fill="#00F0FF" stroke="#000" strokeWidth="1.5" />

              {/* Topic Label Tag */}
              <rect x="18" y="112" width="54" height="16" rx="3" fill="#1C1405" stroke="#FFE600" strokeWidth="1" />
              <text x="45" y="123" textAnchor="middle" fill="#FFE600" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                CH.3 LEGS
              </text>
            </g>
          )}

          {/* ============================================================ */}
          {/* LEG PAIR 3 (CHAPTER 4: COMMUNICATION) — LOWER-MIDDLE LEGS     */}
          {/* ============================================================ */}
          {hasCh4 && (
            <g
              onClick={() => {
                soundEngine.playClick();
                setSelectedLegPair(selectedLegPair === 4 ? null : 4);
              }}
              className="cursor-pointer group"
            >
              {/* Hit area */}
              <path d="M 168 142 Q 100 170 45 200" stroke="transparent" strokeWidth="24" fill="none" />
              <path d="M 192 142 Q 260 170 315 200" stroke="transparent" strokeWidth="24" fill="none" />

              {/* Left Lower-Middle Leg (L3) */}
              <motion.path
                d="M 168 142 Q 100 170 45 200"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, ease: [0.25, 1, 0.5, 1] }}
                stroke="#00FFA3"
                strokeWidth={selectedLegPair === 4 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#00FFA3]"
              />
              <circle cx="102" cy="172" r={selectedLegPair === 4 ? 5 : 3.5} fill="#00FFA3" stroke="#000" strokeWidth="1.5" />
              <circle cx="45" cy="200" r={selectedLegPair === 4 ? 6 : 4} fill="#FF1744" stroke="#000" strokeWidth="1.5" />

              {/* Right Lower-Middle Leg (R3) */}
              <motion.path
                d="M 192 142 Q 260 170 315 200"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, ease: [0.25, 1, 0.5, 1] }}
                stroke="#00FFA3"
                strokeWidth={selectedLegPair === 4 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#00FFA3]"
              />
              <circle cx="258" cy="172" r={selectedLegPair === 4 ? 5 : 3.5} fill="#00FFA3" stroke="#000" strokeWidth="1.5" />
              <circle cx="315" cy="200" r={selectedLegPair === 4 ? 6 : 4} fill="#FF1744" stroke="#000" strokeWidth="1.5" />

              {/* Topic Label Tag */}
              <rect x="290" y="112" width="54" height="16" rx="3" fill="#0A1E18" stroke="#00FFA3" strokeWidth="1" />
              <text x="317" y="123" textAnchor="middle" fill="#00FFA3" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                CH.4 LEGS
              </text>
            </g>
          )}

          {/* ============================================================ */}
          {/* LEG PAIR 4 (CHAPTER 6: ADAPTABILITY) — REAR LEGS L4 & R4       */}
          {/* ============================================================ */}
          {hasCh6 && (
            <g
              onClick={() => {
                soundEngine.playClick();
                setSelectedLegPair(selectedLegPair === 6 ? null : 6);
              }}
              className="cursor-pointer group"
            >
              {/* Hit area */}
              <path d="M 172 155 Q 125 220 95 260" stroke="transparent" strokeWidth="24" fill="none" />
              <path d="M 188 155 Q 235 220 265 260" stroke="transparent" strokeWidth="24" fill="none" />

              {/* Left Rear Leg (L4) */}
              <motion.path
                d="M 172 155 Q 125 220 95 260"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.2, ease: [0.25, 1, 0.5, 1] }}
                stroke="#FF007F"
                strokeWidth={selectedLegPair === 6 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#FF007F]"
              />
              <circle cx="125" cy="222" r={selectedLegPair === 6 ? 5 : 3.5} fill="#FF007F" stroke="#000" strokeWidth="1.5" />
              <circle cx="95" cy="260" r={selectedLegPair === 6 ? 6 : 4} fill="#00FFA3" stroke="#000" strokeWidth="1.5" />

              {/* Right Rear Leg (R4) */}
              <motion.path
                d="M 188 155 Q 235 220 265 260"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.2, ease: [0.25, 1, 0.5, 1] }}
                stroke="#FF007F"
                strokeWidth={selectedLegPair === 6 ? 4.5 : 3}
                strokeLinecap="round"
                fill="none"
                className="transition-all filter drop-shadow-[0_0_6px_#FF007F]"
              />
              <circle cx="235" cy="222" r={selectedLegPair === 6 ? 5 : 3.5} fill="#FF007F" stroke="#000" strokeWidth="1.5" />
              <circle cx="265" cy="260" r={selectedLegPair === 6 ? 6 : 4} fill="#00FFA3" stroke="#000" strokeWidth="1.5" />

              {/* Topic Label Tag */}
              <rect x="264" y="210" width="54" height="16" rx="3" fill="#200A18" stroke="#FF007F" strokeWidth="1" />
              <text x="291" y="221" textAnchor="middle" fill="#FF007F" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                CH.6 LEGS
              </text>
            </g>
          )}

          {/* Central RA Core Badge */}
          <circle cx="180" cy="115" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          <text x="180" y="117.5" textAnchor="middle" fill="#000000" fontSize="5" fontWeight="bold">
            RA
          </text>
        </svg>
      </div>

      {/* Interactive Leg Pair Selector Buttons (Touch Targets) */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {[
          { ch: 2, label: 'Legs 1-2 (Ch 2)', answered: hasCh2, color: 'text-spider-cyan border-spider-cyan' },
          { ch: 3, label: 'Legs 3-4 (Ch 3)', answered: hasCh3, color: 'text-spider-yellow border-spider-yellow' },
          { ch: 4, label: 'Legs 5-6 (Ch 4)', answered: hasCh4, color: 'text-emerald-400 border-emerald-400' },
          { ch: 6, label: 'Legs 7-8 (Ch 6)', answered: hasCh6, color: 'text-pink-400 border-pink-400' },
        ].map((btn) => (
          <button
            key={btn.ch}
            onClick={() => {
              soundEngine.playClick();
              setSelectedLegPair(selectedLegPair === btn.ch ? null : btn.ch);
            }}
            disabled={!btn.answered}
            className={`py-1.5 px-1 rounded-xs border text-[10px] sm:text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
              selectedLegPair === btn.ch
                ? 'bg-spider-yellow text-black border-black shadow-comic-sm font-extrabold'
                : btn.answered
                ? 'bg-black/60 hover:bg-black text-gray-200 border-gray-700'
                : 'opacity-40 bg-gray-900 border-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="truncate">{btn.label}</span>
            <span className="text-[8px] font-normal uppercase">
              {btn.answered ? 'Inspect' : 'Unwoven'}
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Detail Drawer for Tapped Leg Pair */}
      <AnimatePresence>
        {activeDetail && activeDetail.answered && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 p-3 bg-[#0B101E] border-2 border-spider-cyan rounded-xs text-left shadow-comic-sm space-y-2 relative"
          >
            <button
              onClick={() => setSelectedLegPair(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 border-b border-gray-800 pb-1 pr-6">
              <span className="w-2 h-2 rounded-full bg-spider-yellow" />
              <span className="font-mono text-[11px] text-spider-yellow uppercase font-bold tracking-wider">
                CHAPTER {selectedLegPair}: {activeDetail.topic} &bull; LEGS {selectedLegPair === 2 ? '1 & 2' : selectedLegPair === 3 ? '3 & 4' : selectedLegPair === 4 ? '5 & 6' : '7 & 8'}
              </span>
            </div>

            {/* What you leaned toward */}
            <div>
              <span className="text-[10px] font-mono text-spider-cyan uppercase font-bold block mb-0.5">
                What you leaned toward:
              </span>
              <p className="font-sans text-xs sm:text-sm font-bold text-white leading-snug">
                "{activeDetail.label}"
              </p>
              <p className="font-sans text-xs text-gray-300 mt-0.5 leading-snug">
                {activeDetail.whatYouLeanedToward}
              </p>
            </div>

            {/* Another approach to explore */}
            {activeDetail.anotherApproachToExplore && (
              <div className="pt-1.5 border-t border-gray-800/80">
                <span className="text-[10px] font-mono text-spider-yellow uppercase font-bold block mb-0.5">
                  Another approach to explore:
                </span>
                <p className="font-sans text-xs text-gray-200 leading-snug">
                  {activeDetail.anotherApproachToExplore}
                </p>
              </div>
            )}

            {/* Something to try in your community */}
            {activeDetail.somethingToTry && (
              <div className="pt-1.5 border-t border-gray-800/80">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-0.5">
                  Something to try in your community:
                </span>
                <p className="font-sans text-xs text-gray-200 leading-snug">
                  {activeDetail.somethingToTry}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
