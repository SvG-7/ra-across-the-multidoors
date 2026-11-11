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

interface EmblemLegPairConfig {
  ch: number;
  controlTitle: string;
  controlSub: string;
  leftPath: string;
  rightPath: string;
  leftHit: string;
  rightHit: string;
}

// Solid angular chest-emblem leg blades mirrored symmetrically across x = 190 in 380x310 viewBox.
// Matches the Spider-Man suit chest emblem silhouette: two swept-up upper pairs + two diagonally angled lower pairs.
const EMBLEM_LEG_PAIRS: EmblemLegPairConfig[] = [
  {
    ch: 2,
    controlTitle: 'Legs 1-2 (Ch 2)',
    controlSub: 'Connection',
    leftPath: 'M 176 112 L 136 91 Q 134 66 147 41 Q 124 70 119 98 L 174 116 Z',
    rightPath: 'M 204 112 L 244 91 Q 246 66 233 41 Q 256 70 261 98 L 206 116 Z',
    leftHit: 'M 142 93 L 134 68 L 147 41',
    rightHit: 'M 238 93 L 246 68 L 233 41',
  },
  {
    ch: 3,
    controlTitle: 'Legs 3-4 (Ch 3)',
    controlSub: 'Boundaries',
    leftPath: 'M 173 117 L 106 96 Q 106 59 126 25 Q 96 60 88 94 L 171 121 Z',
    rightPath: 'M 207 117 L 274 96 Q 274 59 254 25 Q 284 60 292 94 L 209 121 Z',
    leftHit: 'M 110 96 L 94 92 Q 100 58 124 26',
    rightHit: 'M 270 96 L 286 92 Q 280 58 256 26',
  },
  {
    ch: 4,
    controlTitle: 'Legs 5-6 (Ch 4)',
    controlSub: 'Communication',
    leftPath: 'M 172 122 L 116 141 Q 125 190 153 236 Q 136 188 131 147 L 171 126 Z',
    rightPath: 'M 208 122 L 264 141 Q 255 190 227 236 Q 244 188 249 147 L 209 126 Z',
    leftHit: 'M 129 147 Q 137 190 153 236',
    rightHit: 'M 251 147 Q 243 190 227 236',
  },
  {
    ch: 6,
    controlTitle: 'Legs 7-8 (Ch 6)',
    controlSub: 'Adaptability',
    leftPath: 'M 171 127 L 94 147 Q 95 206 135 280 Q 107 204 108 153 L 171 131 Z',
    rightPath: 'M 209 127 L 286 147 Q 285 206 245 280 Q 273 204 272 153 L 209 131 Z',
    leftHit: 'M 99 152 Q 102 206 135 280',
    rightHit: 'M 281 152 Q 278 206 245 280',
  },
];

export const AttendeeWebProgress: React.FC<AttendeeWebProgressProps> = ({
  connectionsCount: propCount,
  answers = {},
  ch4Choice,
  ch6Choice,
  reducedMotion = false,
  isFinale: _isFinale = false,
}) => {
  const effectiveAnswers: Record<number, string> = { ...answers };
  if (ch4Choice && !effectiveAnswers[4]) effectiveAnswers[4] = ch4Choice;
  if (ch6Choice && !effectiveAnswers[6]) effectiveAnswers[6] = ch6Choice;

  const answeredMap: Record<number, boolean> = {
    2: !!effectiveAnswers[2],
    3: !!effectiveAnswers[3],
    4: !!effectiveAnswers[4],
    6: !!effectiveAnswers[6],
  };

  const actualCount = Object.values(answeredMap).filter(Boolean).length;
  const count = propCount !== undefined ? Math.max(propCount, actualCount) : actualCount;
  const isComplete = count >= 4;

  const [selectedLegPair, setSelectedLegPair] = useState<number | null>(null);

  const handleToggleLegPair = (ch: number) => {
    soundEngine.playClick();
    setSelectedLegPair((prev) => (prev === ch ? null : ch));
  };

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
      <div className="flex items-center justify-between gap-2 border-b border-gray-800 pb-2 mb-2">
        <span className="font-comic text-base sm:text-lg text-white uppercase tracking-wide">
          Your Personal Web
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-mono uppercase px-2 py-0.5 rounded-xs border font-bold ${
            isComplete
              ? 'bg-spider-yellow text-black border-black shadow-comic-sm'
              : 'bg-black/60 text-spider-cyan border-spider-cyan/40'
          }`}
        >
          {isComplete ? 'SPIDER FORMATION COMPLETE' : `${count} OF 4 DECISIONS WOVEN`}
        </span>
      </div>

      <p className="text-xs font-sans text-gray-300 mb-2.5 leading-snug">
        {isComplete
          ? 'Your four decisions have woven together into a complete eight-legged spider. Tap any pair of legs to inspect your path.'
          : 'Your web is taking shape. Each decision you explore adds a matching pair of legs and anchors the central spider body.'}
      </p>

      {/* Large Suit Chest Emblem Canvas (Unclipped across phones and wide desktop panels) */}
      <div
        className="relative w-full h-[270px] sm:h-[310px] border-2 border-black rounded-xs overflow-hidden flex items-center justify-center shadow-inner"
        style={{ background: 'radial-gradient(circle at 50% 40%, #C81424 0%, #8B0B17 75%)' }}
      >
        <svg
          viewBox="0 0 380 310"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Spider-Man suit chest emblem representing your four chapter decisions"
        >
          <defs>
            {/* Rich suit crimson shading across chest */}
            <radialGradient id="suitRedGrad" cx="50%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#E11D2F" />
              <stop offset="55%" stopColor="#C81424" />
              <stop offset="100%" stopColor="#8B0B17" />
            </radialGradient>

            {/* Dark sapphire-blue side suit panel shading */}
            <linearGradient id="suitBlueLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E2346" />
              <stop offset="100%" stopColor="#1D447B" />
            </linearGradient>
            <linearGradient id="suitBlueRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0E2346" />
              <stop offset="100%" stopColor="#1D447B" />
            </linearGradient>

            {/* Subtle honeycomb / micro-brick suit fabric texture on red chest */}
            <pattern id="redFabricWeave" width="8" height="6" patternUnits="userSpaceOnUse">
              <path d="M 0 3 L 4 0 L 8 3 L 4 6 Z" fill="none" stroke="#6B0510" strokeWidth="0.65" opacity="0.34" />
              <path d="M 0 0 L 8 0 M 0 3 L 8 3" stroke="#991B1B" strokeWidth="0.35" opacity="0.22" />
            </pattern>

            {/* Micro-mesh texture on blue suit sides */}
            <pattern id="blueFabricMesh" width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="3.5" cy="3.5" r="1.4" fill="#071327" opacity="0.45" />
            </pattern>

            {/* Soft vignette for sculptural suit contour */}
            <linearGradient id="chestContour" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="48%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
            </linearGradient>
          </defs>

          {/* 1. Crimson Suit Chest Base + Micro-Texture (Extended horizontally for wide desktop panels) */}
          <rect x="-240" y="-20" width="860" height="350" fill="url(#suitRedGrad)" />
          <rect x="-240" y="-20" width="860" height="350" fill="url(#redFabricWeave)" />

          {/* Subtle Pec / Pectoral Depth Shadow */}
          <ellipse cx="122" cy="112" rx="68" ry="44" fill="#FF4D5E" opacity="0.09" />
          <ellipse cx="258" cy="112" rx="68" ry="44" fill="#FF4D5E" opacity="0.09" />
          <rect x="-240" y="-20" width="860" height="350" fill="url(#chestContour)" />

          {/* 2. Black Raised Suit Webbing Across the Red Chest */}
          <g stroke="#121318" strokeLinecap="round" fill="none">
            {/* Radial spokes anchored at upper center chest (190, 74) */}
            <g strokeWidth="1.7" opacity="0.88">
              <path d="M 190 0 L 190 310" />
              <path d="M 190 74 Q 158 36 126 -10" />
              <path d="M 190 74 Q 222 36 254 -10" />
              <path d="M 190 78 Q 112 46 36 -10" />
              <path d="M 190 78 Q 268 46 344 -10" />
              <path d="M 190 86 Q 74 72 -140 32" />
              <path d="M 190 86 Q 306 72 520 32" />
              <path d="M 190 118 Q 80 116 -140 116" />
              <path d="M 190 118 Q 300 116 520 116" />
              <path d="M 190 144 Q 90 166 -120 228" />
              <path d="M 190 144 Q 290 166 500 228" />
              <path d="M 190 176 Q 130 224 60 320" />
              <path d="M 190 176 Q 250 224 320 320" />
            </g>

            {/* Concave suit-style concentric scalloped cross-webs */}
            <g strokeWidth="1.55" opacity="0.84">
              {/* Row 1 (Upper shoulder ring) */}
              <path d="M -80 6 Q 14 34 105 32 Q 148 36 190 22 Q 232 36 275 32 Q 366 34 460 6" />
              {/* Row 2 (Mid pecs) */}
              <path d="M -110 54 Q 24 84 96 76 Q 144 86 190 72 Q 236 86 284 76 Q 356 84 490 54" />
              {/* Row 3 (Mid ribcage) */}
              <path d="M -110 132 Q 44 146 116 134 Q 154 146 190 138 Q 226 146 264 134 Q 336 146 490 132" />
              {/* Row 4 (Lower chest / waist) */}
              <path d="M -60 226 Q 72 220 134 202 Q 162 212 190 202 Q 218 212 246 202 Q 308 220 440 226" />
              {/* Row 5 (Lower torso) */}
              <path d="M 60 288 Q 118 288 154 274 Q 172 280 190 272 Q 208 280 226 274 Q 262 288 320 288" />
            </g>
          </g>

          {/* 3. Dark Blue Suit Waist Framing Edges */}
          <g>
            <path d="M -100 112 Q 28 176 52 320 L -240 320 L -240 112 Z" fill="url(#suitBlueLeft)" />
            <path d="M -100 112 Q 28 176 52 320 L -240 320 L -240 112 Z" fill="url(#blueFabricMesh)" />
            <path d="M -20 128 Q 30 184 52 320" stroke="#0B111C" strokeWidth="2.2" fill="none" />

            <path d="M 480 112 Q 352 176 328 320 L 620 320 L 620 112 Z" fill="url(#suitBlueRight)" />
            <path d="M 480 112 Q 352 176 328 320 L 620 320 L 620 112 Z" fill="url(#blueFabricMesh)" />
            <path d="M 400 128 Q 350 184 328 320" stroke="#0B111C" strokeWidth="2.2" fill="none" />
          </g>

          {/* 4. Faint Recessed Suit Blueprint Outline ONLY for Unanswered Leg Pairs */}
          {!isComplete && (
            <g fill="none" stroke="#2D0409" strokeWidth="1.15" strokeDasharray="3 3" opacity="0.55">
              {count === 0 && (
                <>
                  <path d="M 176 98 L 185 96 L 190 99 L 195 96 L 204 98 L 206 108 L 201 113 L 179 113 L 174 108 Z" />
                  <path d="M 176 118 L 190 116 L 204 118 L 210 131 L 202 158 L 190 182 L 178 158 L 170 131 Z" />
                </>
              )}
              {EMBLEM_LEG_PAIRS.filter((pair) => !answeredMap[pair.ch]).map((pair) => (
                <g key={`ghost-${pair.ch}`}>
                  <path d={pair.leftPath} />
                  <path d={pair.rightPath} />
                </g>
              ))}
            </g>
          )}

          {/* 5. Solid Black Central Spider-Man Emblem Body (Reveals when >=1 decision answered) */}
          {count > 0 && (
            <motion.g
              initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ transformOrigin: '190px 135px' }}
            >
              {/* Cephalothorax (Angular flat-top chest emblem head block) */}
              <path
                d="M 176 98 L 185 96 L 190 99 L 195 96 L 204 98 L 206 108 L 201 113 L 179 113 L 174 108 Z"
                fill="#0B0B0F"
                stroke="#27272A"
                strokeWidth="0.7"
              />
              {/* Faceted Angular Spider-Man Emblem Abdomen */}
              <path
                d="M 176 118 L 190 116 L 204 118 L 210 131 L 202 158 L 190 182 L 178 158 L 170 131 Z"
                fill="#0B0B0F"
                stroke="#27272A"
                strokeWidth="0.7"
              />
            </motion.g>
          )}

          {/* 6. Selectable Solid Black Leg Pairs (Non-overlapping generous blade hit cushions + clean selection outline above) */}
          {EMBLEM_LEG_PAIRS.map((pair) => {
            const isAnswered = answeredMap[pair.ch];
            if (!isAnswered) return null;
            const isSelected = selectedLegPair === pair.ch;

            return (
              <motion.g
                key={pair.ch}
                data-leg-pair={pair.ch}
                onClick={() => handleToggleLegPair(pair.ch)}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{
                  opacity: 1,
                  scale: isSelected && !reducedMotion ? [1, 1.025, 1] : 1,
                }}
                transition={{ duration: isSelected ? 0.25 : 0.38, ease: 'easeOut' }}
                style={{ transformOrigin: '190px 124px', pointerEvents: 'all' }}
                className="cursor-pointer"
              >
                {/* Solid Black Spider-Man Emblem Leg Pair */}
                <path
                  d={pair.leftPath}
                  fill="#0B0B0F"
                  stroke="#26272B"
                  strokeWidth={0.6}
                  strokeLinejoin="round"
                />
                <path
                  d={pair.rightPath}
                  fill="#0B0B0F"
                  stroke="#26272B"
                  strokeWidth={0.6}
                  strokeLinejoin="round"
                />

                {/* Generous Transparent Touch Cushion Centered Along Distinct Blade & Tip */}
                <path
                  d={pair.leftHit}
                  stroke="transparent"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ pointerEvents: 'stroke' }}
                />
                <path
                  d={pair.rightHit}
                  stroke="transparent"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ pointerEvents: 'stroke' }}
                />
              </motion.g>
            );
          })}

          {/* Crisp Contrasting Highlight Overlay Rendered On Top For Selected Pair */}
          {selectedLegPair !== null && (() => {
            const selPair = EMBLEM_LEG_PAIRS.find((p) => p.ch === selectedLegPair);
            if (!selPair || !answeredMap[selPair.ch]) return null;
            return (
              <g style={{ pointerEvents: 'none' }} className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.75)]">
                <path
                  d={selPair.leftPath}
                  fill="#0B0B0F"
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />
                <path
                  d={selPair.rightPath}
                  fill="#0B0B0F"
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Four Compact Chapter Controls Beneath the Suit Emblem */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {EMBLEM_LEG_PAIRS.map((pair) => {
          const answered = answeredMap[pair.ch];
          const isSelected = selectedLegPair === pair.ch;
          return (
            <button
              key={pair.ch}
              type="button"
              onClick={() => handleToggleLegPair(pair.ch)}
              disabled={!answered}
              aria-pressed={isSelected}
              className={`py-2 px-2 rounded-xs border text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-spider-yellow text-black border-white shadow-comic-sm font-extrabold'
                  : answered
                    ? 'bg-[#0C1324] hover:bg-black text-white border-slate-700 hover:border-slate-400'
                    : 'opacity-40 bg-gray-900 border-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="truncate">{pair.controlTitle}</span>
              <span
                className={`text-[9px] font-sans font-semibold mt-0.5 ${
                  isSelected ? 'text-black/80' : answered ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {answered ? pair.controlSub : 'Unwoven'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Response Details Below the Chapter Controls */}
      <AnimatePresence mode="wait">
        {activeDetail && activeDetail.answered && (
          <motion.div
            key={selectedLegPair}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-3.5 bg-[#0B101E] border-2 border-spider-cyan/80 rounded-xs text-left shadow-comic-sm space-y-2.5 relative"
          >
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setSelectedLegPair(null);
              }}
              aria-label="Close leg pair details"
              className="absolute top-2.5 right-2.5 text-gray-300 hover:text-white bg-black/50 hover:bg-black border border-slate-700 rounded-xs p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 border-b border-gray-800 pb-1.5 pr-8">
              <span className="w-2 h-2 rounded-xs bg-spider-yellow rotate-45 flex-shrink-0" />
              <span className="font-mono text-[11px] text-spider-yellow uppercase font-bold tracking-wider">
                CHAPTER {selectedLegPair}: {activeDetail.topic} &bull; LEGS{' '}
                {selectedLegPair === 2
                  ? '1 & 2'
                  : selectedLegPair === 3
                    ? '3 & 4'
                    : selectedLegPair === 4
                      ? '5 & 6'
                      : '7 & 8'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-spider-cyan uppercase font-bold block mb-0.5">
                What you leaned toward:
              </span>
              <p className="font-sans text-sm sm:text-base font-bold text-white leading-snug">
                &ldquo;{activeDetail.label}&rdquo;
              </p>
              <p className="font-sans text-xs sm:text-sm text-gray-200 mt-1 leading-relaxed">
                {activeDetail.whatYouLeanedToward}
              </p>
            </div>

            {activeDetail.anotherApproachToExplore && (
              <div className="pt-2 border-t border-gray-800/80">
                <span className="text-[10px] font-mono text-spider-yellow uppercase font-bold block mb-0.5">
                  Another approach to explore:
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {activeDetail.anotherApproachToExplore}
                </p>
              </div>
            )}

            {activeDetail.somethingToTry && (
              <div className="pt-2 border-t border-gray-800/80">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-0.5">
                  Something to try in your community:
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">
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
