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

interface LegPairConfig {
  ch: number;
  legsTag: string;
  topicTag: string;
  btnLabel: string;
  accent: string;
  leftPath: string;
  leftSilk: string;
  rightPath: string;
  rightSilk: string;
  leftJoint: [number, number];
  rightJoint: [number, number];
  leftTip: [number, number];
  rightTip: [number, number];
  labelBox: { x: number; y: number; w: number; h: number };
  drawDuration: number;
}

// Bilateral coordinates centered on (190, 128) in 380x280 viewBox.
// Outer label margins (x: 8..90 and x: 290..372) stay clear of all leg strands.
const LEG_PAIRS: LegPairConfig[] = [
  {
    ch: 2,
    legsTag: 'CH.2 · 1–2',
    topicTag: 'OUTREACH',
    btnLabel: 'Legs 1-2 (Ch 2)',
    accent: '#38BDF8',
    leftPath: 'M 177 102 L 140 58 Q 124 47 108 42',
    leftSilk: 'M 176 105 Q 154 78 139 60 Q 124 49 109 44',
    rightPath: 'M 203 102 L 240 58 Q 256 47 272 42',
    rightSilk: 'M 204 105 Q 226 78 241 60 Q 256 49 271 44',
    leftJoint: [140, 58],
    rightJoint: [240, 58],
    leftTip: [108, 42],
    rightTip: [272, 42],
    labelBox: { x: 8, y: 28, w: 82, h: 26 },
    drawDuration: 0.95,
  },
  {
    ch: 3,
    legsTag: 'CH.3 · 3–4',
    topicTag: 'BOUNDARIES',
    btnLabel: 'Legs 3-4 (Ch 3)',
    accent: '#F59E0B',
    leftPath: 'M 174 112 L 126 86 Q 110 92 98 104',
    leftSilk: 'M 174 115 Q 146 98 126 88 Q 112 95 99 106',
    rightPath: 'M 206 112 L 254 86 Q 270 92 282 104',
    rightSilk: 'M 206 115 Q 234 98 254 88 Q 268 95 281 106',
    leftJoint: [126, 86],
    rightJoint: [254, 86],
    leftTip: [98, 104],
    rightTip: [282, 104],
    labelBox: { x: 8, y: 91, w: 82, h: 26 },
    drawDuration: 1.05,
  },
  {
    ch: 4,
    legsTag: 'CH.4 · 5–6',
    topicTag: 'CHANNELS',
    btnLabel: 'Legs 5-6 (Ch 4)',
    accent: '#F43F5E',
    leftPath: 'M 174 122 L 128 150 Q 112 167 98 186',
    leftSilk: 'M 175 125 Q 148 142 129 152 Q 114 169 100 187',
    rightPath: 'M 206 122 L 252 150 Q 268 167 282 186',
    rightSilk: 'M 205 125 Q 232 142 251 152 Q 266 169 280 187',
    leftJoint: [128, 150],
    rightJoint: [252, 150],
    leftTip: [98, 186],
    rightTip: [282, 186],
    labelBox: { x: 290, y: 173, w: 82, h: 26 },
    drawDuration: 1.15,
  },
  {
    ch: 6,
    legsTag: 'CH.6 · 7–8',
    topicTag: 'PLAN B',
    btnLabel: 'Legs 7-8 (Ch 6)',
    accent: '#A78BFA',
    leftPath: 'M 178 132 L 144 198 Q 130 225 116 246',
    leftSilk: 'M 180 134 Q 158 176 146 200 Q 132 226 118 247',
    rightPath: 'M 202 132 L 236 198 Q 250 225 264 246',
    rightSilk: 'M 200 134 Q 222 176 234 200 Q 248 226 262 247',
    leftJoint: [144, 198],
    rightJoint: [236, 198],
    leftTip: [116, 246],
    rightTip: [264, 246],
    labelBox: { x: 290, y: 233, w: 82, h: 26 },
    drawDuration: 1.25,
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
  const [rippleTick, setRippleTick] = useState(0);

  const handleToggleLegPair = (ch: number) => {
    soundEngine.playClick();
    if (selectedLegPair === ch) {
      setSelectedLegPair(null);
    } else {
      setSelectedLegPair(ch);
      setRippleTick((t) => t + 1);
    }
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
      {/* Header Banner (Static spider indicator — zero continuous pulse) */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-800 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-spider-cyan/90 rotate-45 flex-shrink-0" />
          <span className="font-comic text-base sm:text-lg text-white uppercase tracking-wide">
            Your Personal Web
          </span>
        </div>
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

      {/* Delicate Silk Spider Canvas (380 x 280) */}
      <div className="relative w-full h-60 sm:h-68 bg-[#070B14] border-2 border-slate-800 rounded-xs overflow-hidden flex items-center justify-center p-1">
        <svg
          viewBox="0 0 380 280"
          className="w-full h-full max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Personal eight-legged spider web diagram reflecting your chapter choices"
        >
          {/* Quiet Archival Silk Background Threads (Low-contrast radial spokes & delicate scalloped silk rings) */}
          <g stroke="#1E293B" strokeWidth="0.65" opacity="0.52">
            {/* Radial silk threads */}
            <line x1="190" y1="128" x2="105" y2="18" />
            <line x1="190" y1="128" x2="275" y2="18" />
            <line x1="190" y1="128" x2="36" y2="90" />
            <line x1="190" y1="128" x2="344" y2="90" />
            <line x1="190" y1="128" x2="48" y2="215" />
            <line x1="190" y1="128" x2="332" y2="215" />
            <line x1="190" y1="128" x2="190" y2="12" />
            <line x1="190" y1="128" x2="190" y2="268" />

            {/* Subtle scalloped cobweb capture rings (inner, mid, outer) */}
            <path d="M 190 74 Q 168 78 152 79 Q 134 100 120 112 Q 122 140 126 164 Q 158 182 190 184 Q 222 182 254 164 Q 258 140 260 112 Q 246 100 228 79 Q 212 78 190 74 Z" />
            <path d="M 190 42 Q 152 48 128 48 Q 98 78 78 100 Q 82 150 86 192 Q 138 220 190 224 Q 242 220 294 192 Q 298 150 302 100 Q 282 78 252 48 Q 228 48 190 42 Z" />
          </g>

          {/* Subtle Blueprint Outline for Unwoven Legs */}
          {!isComplete && (
            <g stroke="#293548" strokeWidth="1" strokeDasharray="3 3" opacity="0.55">
              {count === 0 && (
                <>
                  <path d="M 190 94 C 202 94 207 104 206 114 C 205 123 197 129 190 130 C 183 129 175 123 174 114 C 173 104 178 94 190 94 Z" />
                  <path d="M 190 133 C 208 135 215 154 211 174 C 207 192 197 204 190 208 C 183 204 173 192 169 174 C 165 154 172 135 190 133 Z" />
                </>
              )}
              {LEG_PAIRS.filter((pair) => !answeredMap[pair.ch]).map((pair) => (
                <g key={`ghost-${pair.ch}`}>
                  <path d={pair.leftPath} />
                  <path d={pair.rightPath} />
                </g>
              ))}
            </g>
          )}

          {/* Sculpted Central Spider Silhouette (Grows when decisions are woven) */}
          {count > 0 && (
            <g
              opacity={selectedLegPair !== null ? 0.92 : 1}
              className="transition-opacity duration-200"
            >
              {/* Front pedipalps */}
              <path d="M 184 95 Q 178 86 183 80" stroke="#94A3B8" strokeWidth="1.25" strokeLinecap="round" />
              <path d="M 196 95 Q 202 86 197 80" stroke="#94A3B8" strokeWidth="1.25" strokeLinecap="round" />

              {/* Abdomen (Teardrop obsidian body with subtle crimson dorsal hourglass) */}
              <motion.path
                d="M 190 132 C 209 135 215 154 211 174 C 207 192 197 205 190 209 C 183 205 173 192 169 174 C 165 154 171 135 190 132 Z"
                initial={reducedMotion ? false : { scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                fill="#0D1424"
                stroke={isComplete ? '#94A3B8' : '#475569'}
                strokeWidth="1.4"
              />
              {/* Delicate dorsal spine & crimson Spider mark inside abdomen */}
              <path d="M 190 137 L 190 203" stroke="#334155" strokeWidth="0.9" />
              <path
                d="M 185 152 L 195 152 L 191.5 162 L 195 172 L 185 172 L 188.5 162 Z"
                fill="#BE123C"
                opacity="0.88"
              />
              <path d="M 176 152 Q 190 160 204 152" stroke="#334155" strokeWidth="0.75" fill="none" />
              <path d="M 175 173 Q 190 181 205 173" stroke="#334155" strokeWidth="0.75" fill="none" />

              {/* Waist pedicel */}
              <rect x="187" y="128.5" width="6" height="5" rx="1.5" fill="#1E293B" stroke="#64748B" strokeWidth="0.9" />

              {/* Cephalothorax (Sculpted Head & Carapace) */}
              <motion.path
                d="M 190 94 C 201 94 207 104 205.5 114 C 204.5 123 197 129 190 130 C 183 129 175.5 123 174.5 114 C 173 104 179 94 190 94 Z"
                initial={reducedMotion ? false : { scale: 0.65, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                fill="#7F1D1D"
                stroke={isComplete ? '#E2E8F0' : '#94A3B8'}
                strokeWidth="1.35"
              />
              {/* Angular Stylized Spider-Man Mask Eyes */}
              <path d="M 180 101 Q 186 100 187.5 107 Q 181.5 108.5 180 101 Z" fill="#F8FAFC" />
              <path d="M 200 101 Q 194 100 192.5 107 Q 198.5 108.5 200 101 Z" fill="#F8FAFC" />
              <text x="190" y="122" textAnchor="middle" fill="#E2E8F0" fontSize="6" fontFamily="monospace" fontWeight="bold">
                RA
              </text>
            </g>
          )}

          {/* Render Woven Leg Pairs with Restrained Silk Styling, Clear Labels & Interactive Ripple */}
          {LEG_PAIRS.map((pair) => {
            const isAnswered = answeredMap[pair.ch];
            const isSelected = selectedLegPair === pair.ch;
            const isDimmed = selectedLegPair !== null && !isSelected;

            const opacityValue = !isAnswered ? 0 : isDimmed ? 0.28 : isSelected ? 1 : 0.86;

            return (
              <g
                key={pair.ch}
                onClick={() => isAnswered && handleToggleLegPair(pair.ch)}
                style={{ opacity: opacityValue, transition: 'opacity 220ms ease' }}
                className={isAnswered ? 'cursor-pointer' : 'pointer-events-none'}
              >
                {isAnswered && (
                  <>
                    {/* Generous Invisible Mobile Touch Targets along both legs */}
                    <path d={pair.leftPath} stroke="transparent" strokeWidth="30" fill="none" />
                    <path d={pair.rightPath} stroke="transparent" strokeWidth="30" fill="none" />

                    {/* Soft Selected Halo (Strictly when selected, no constant idle glow) */}
                    {isSelected && (
                      <>
                        <path
                          d={pair.leftPath}
                          stroke={pair.accent}
                          strokeWidth="6"
                          strokeOpacity="0.24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d={pair.rightPath}
                          stroke={pair.accent}
                          strokeWidth="6"
                          strokeOpacity="0.24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </>
                    )}

                    {/* One-Shot Silk Tension Ripple on Selection (settles completely) */}
                    {isSelected && !reducedMotion && (
                      <g key={`ripple-${pair.ch}-${rippleTick}`}>
                        <motion.path
                          d={pair.leftPath}
                          stroke="#F8FAFC"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeWidth: 5.5, strokeOpacity: 0.9 }}
                          animate={{ strokeWidth: 1.5, strokeOpacity: 0 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                        <motion.path
                          d={pair.rightPath}
                          stroke="#F8FAFC"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeWidth: 5.5, strokeOpacity: 0.9 }}
                          animate={{ strokeWidth: 1.5, strokeOpacity: 0 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                      </g>
                    )}

                    {/* Primary Articulated Leg Strands */}
                    <motion.path
                      d={pair.leftPath}
                      initial={reducedMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: pair.drawDuration, ease: [0.22, 1, 0.36, 1] }}
                      stroke={pair.accent}
                      strokeWidth={isSelected ? 3.1 : 2.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <motion.path
                      d={pair.rightPath}
                      initial={reducedMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: pair.drawDuration, ease: [0.22, 1, 0.36, 1] }}
                      stroke={pair.accent}
                      strokeWidth={isSelected ? 3.1 : 2.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/* Fine Secondary Hairline Silk Strand for organic depth */}
                    <path
                      d={pair.leftSilk}
                      stroke="#E2E8F0"
                      strokeWidth={isSelected ? 0.9 : 0.65}
                      strokeOpacity={isSelected ? 0.6 : 0.32}
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={pair.rightSilk}
                      stroke="#E2E8F0"
                      strokeWidth={isSelected ? 0.9 : 0.65}
                      strokeOpacity={isSelected ? 0.6 : 0.32}
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Refined Subtle Joint & Tarsus Tip Anchors (no oversized neon dots) */}
                    <circle
                      cx={pair.leftJoint[0]}
                      cy={pair.leftJoint[1]}
                      r={isSelected ? 3.2 : 2.1}
                      fill="#0B1120"
                      stroke={pair.accent}
                      strokeWidth="1.4"
                    />
                    <circle
                      cx={pair.rightJoint[0]}
                      cy={pair.rightJoint[1]}
                      r={isSelected ? 3.2 : 2.1}
                      fill="#0B1120"
                      stroke={pair.accent}
                      strokeWidth="1.4"
                    />
                    <circle cx={pair.leftTip[0]} cy={pair.leftTip[1]} r={isSelected ? 2.6 : 1.7} fill={pair.accent} />
                    <circle cx={pair.rightTip[0]} cy={pair.rightTip[1]} r={isSelected ? 2.6 : 1.7} fill={pair.accent} />

                    {/* Outer Margin Chapter Label Badge (Clear of all strands + state distinct) */}
                    <g>
                      <rect
                        x={pair.labelBox.x}
                        y={pair.labelBox.y}
                        width={pair.labelBox.w}
                        height={pair.labelBox.h}
                        rx="3"
                        fill={isSelected ? '#FFE600' : '#0B1221'}
                        stroke={isSelected ? '#FFFFFF' : pair.accent}
                        strokeWidth={isSelected ? 1.6 : 1}
                      />
                      <text
                        x={pair.labelBox.x + pair.labelBox.w / 2}
                        y={pair.labelBox.y + 10.5}
                        textAnchor="middle"
                        fill={isSelected ? '#000000' : '#F8FAFC'}
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {isSelected ? `▶ ${pair.legsTag}` : pair.legsTag}
                      </text>
                      <text
                        x={pair.labelBox.x + pair.labelBox.w / 2}
                        y={pair.labelBox.y + 20.5}
                        textAnchor="middle"
                        fill={isSelected ? '#111827' : pair.accent}
                        fontSize="6.5"
                        fontFamily="sans-serif"
                        fontWeight="700"
                      >
                        {pair.topicTag}
                      </text>
                    </g>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Leg Pair Selector Buttons (Equally Usable Touch Controls) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5">
        {LEG_PAIRS.map((pair) => {
          const answered = answeredMap[pair.ch];
          const isSelected = selectedLegPair === pair.ch;
          return (
            <button
              key={pair.ch}
              type="button"
              onClick={() => handleToggleLegPair(pair.ch)}
              disabled={!answered}
              aria-pressed={isSelected}
              className={`py-2 px-1.5 rounded-xs border text-[10px] sm:text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-spider-yellow text-black border-white shadow-comic-sm font-extrabold'
                  : answered
                    ? 'bg-black/65 hover:bg-black text-gray-200 border-slate-700 hover:border-slate-500'
                    : 'opacity-40 bg-gray-900 border-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="truncate">{pair.btnLabel}</span>
              <span className="text-[8.5px] font-normal uppercase mt-0.5">
                {isSelected ? 'Selected • Close' : answered ? 'Inspect' : 'Unwoven'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Readable Detail Area Below Controls (Never Covers Spider SVG) */}
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

            {/* Saved Choice + Existing Explanation */}
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
