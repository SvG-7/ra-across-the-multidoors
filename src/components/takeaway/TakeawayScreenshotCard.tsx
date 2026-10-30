import React from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { AttendeeSession } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { getAssetUrl } from '../../utils/assets';
import { soundEngine } from '../../audio/soundEffects';

interface TakeawayScreenshotCardProps {
  session: AttendeeSession;
  onBack: () => void;
}

export const TakeawayScreenshotCard: React.FC<TakeawayScreenshotCardProps> = ({
  session,
  onBack,
}) => {
  const guide = generateFieldGuide(session);

  return (
    <div className="w-full flex flex-col items-center select-none pb-12">
      {/* 1. Header Return Navigation Bar */}
      <div className="w-full max-w-sm sm:max-w-md flex items-center justify-between mb-3 bg-[#0B101E] border-2 border-black p-2.5 rounded-sm shadow-comic">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-spider-yellow hover:bg-[#FFE600] text-black font-comic text-xs uppercase tracking-wider rounded-xs border border-black shadow-comic-sm cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Takeaway</span>
        </button>

        <span className="font-mono text-[11px] text-gray-300 font-bold uppercase tracking-wider">
          Screenshot Ready
        </span>
      </div>

      {/* 2. THE DEDICATED STATIC SCREENSHOT CARD (Free of floating controls and internal scroll) */}
      <div
        id="takeaway-screenshot-card"
        className="w-full max-w-sm sm:max-w-md bg-[#080B14] border-4 border-black rounded-sm shadow-2xl p-4 sm:p-6 text-white relative"
      >
        {/* Subtle Halftone Background Texture */}
        <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none rounded-xs" />

        {/* Card Header Banner */}
        <div className="relative z-10 flex items-start justify-between border-b-2 border-gray-800 pb-3 mb-3">
          <div>
            <div className="inline-block bg-spider-yellow text-black font-mono font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 border border-black shadow-comic-sm mb-1">
              RA: ACROSS THE MULTI-DOORS
            </div>
            <h1 className="font-comic text-2xl sm:text-3xl text-white tracking-wide uppercase leading-none">
              Your RA Takeaway
            </h1>
            <p className="font-mono text-[11px] text-spider-cyan uppercase tracking-wider mt-0.5 font-bold">
              Community: {guide.community === 'Apartment community' ? 'Apartment Community' : 'Residence Hall'}
            </p>
          </div>

          {/* Spider-Man illustration strictly constrained inside card */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 flex items-center justify-center -mt-1">
            <img
              src={getAssetUrl('images/spiderman-perched.png')}
              alt="Spider-Man Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(255,23,68,0.6)]"
              loading="eager"
            />
          </div>
        </div>

        {/* Mini 8-Legged Personal Spider Web Insignia */}
        <div className="relative z-10 my-2.5 p-2 bg-[#050811] border border-gray-800 rounded-xs flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 70" className="w-14 h-10" fill="none">
              {/* Spider Body */}
              <ellipse cx="50" cy="30" rx="6" ry="5" fill="#FF1744" stroke="#00F0FF" strokeWidth="1.2" />
              <ellipse cx="50" cy="46" rx="9" ry="12" fill="#0A0E1A" stroke="#FF1744" strokeWidth="1.2" />
              {/* 8 Legs */}
              <path d="M 45 28 Q 30 14 18 16" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 55 28 Q 70 14 82 16" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 44 32 Q 25 26 12 34" stroke="#FFE600" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 56 32 Q 75 26 88 34" stroke="#FFE600" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 43 42 Q 22 52 14 62" stroke="#00FFA3" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 57 42 Q 78 52 86 62" stroke="#00FFA3" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 46 50 Q 32 64 24 70" stroke="#FF007F" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 54 50 Q 68 64 76 70" stroke="#FF007F" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div>
              <span className="font-mono text-[10px] text-spider-yellow uppercase font-bold block">
                Personal Web Insignia
              </span>
              <span className="text-[9px] font-sans text-gray-300">
                4 decisions woven into 8 spider legs
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-spider-cyan font-bold uppercase">
            COMPLETE
          </span>
        </div>

        {/* 1. What You Leaned Toward */}
        <div className="relative z-10 mb-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-spider-red rotate-45" />
            <h2 className="font-comic text-sm sm:text-base text-spider-red uppercase tracking-wide">
              What You Leaned Toward
            </h2>
          </div>

          <div className="space-y-1.5">
            {guide.strengths.slice(0, 2).map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#0E1526] border border-gray-800 rounded-xs space-y-0.5"
              >
                <div className="font-comic text-xs sm:text-sm text-white uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{idx + 1}. {s.title}</span>
                </div>
                <div className="font-mono text-[9.5px] text-spider-cyan pl-4">
                  {s.evidence}
                </div>
                <p className="font-sans text-xs text-gray-200 leading-snug pl-4">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Another Approach to Explore */}
        <div className="relative z-10 mb-3 p-2.5 bg-[#171305] border-2 border-spider-yellow/70 rounded-xs space-y-0.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-spider-yellow flex-shrink-0" />
            <h2 className="font-comic text-xs sm:text-sm text-spider-yellow uppercase tracking-wide">
              Another Approach to Explore: {guide.anotherApproachToExplore.label}
            </h2>
          </div>
          <div className="font-mono text-[9.5px] text-gray-400 pl-5">
            {guide.anotherApproachToExplore.evidence}
          </div>
          <p className="font-sans text-xs text-gray-200 leading-snug pl-5">
            {guide.anotherApproachToExplore.text}
          </p>
        </div>

        {/* 3. Something to Try in Your Community */}
        <div className="relative z-10 mb-3 p-2.5 bg-gradient-to-r from-[#1A0A10] to-[#0A1422] border border-white/40 rounded-xs space-y-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <h2 className="font-comic text-xs sm:text-sm text-white uppercase tracking-wide">
              Something to Try: "{guide.actionThisWeek.title}"
            </h2>
          </div>
          <p className="font-sans text-xs text-gray-200 leading-snug pl-5">
            {guide.actionThisWeek.action}
          </p>
        </div>

        {/* 4. Cross-World Insight */}
        <div className="relative z-10 mb-3 p-2 bg-[#0A0E18] border border-gray-800 rounded-xs text-left">
          <span className="font-mono text-[9px] uppercase font-bold text-emerald-400 block mb-0.5">
            Cross-World Strategy ({guide.crossWorldLesson.worldContext})
          </span>
          <p className="font-sans text-[11px] text-gray-300 leading-snug">
            {guide.crossWorldLesson.text}
          </p>
        </div>

        {/* Honest Attribution Footer */}
        <div className="relative z-10 pt-2 border-t border-gray-800 text-center">
          <p className="font-mono text-[9px] text-gray-400 italic">
            Based on your choices in today’s scenarios. These observations reflect prioritized approaches, not evaluations of competence.
          </p>
        </div>
      </div>
    </div>
  );
};
