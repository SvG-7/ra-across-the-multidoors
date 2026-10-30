import React, { useState, useRef } from 'react';
import { ArrowLeft, Share2, Check, Sparkles } from 'lucide-react';
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
  const [copiedLink, setCopiedLink] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const guide = generateFieldGuide(session);

  const handleShare = async () => {
    soundEngine.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My RA Takeaway - Across the Multi-Doors',
          text: `My RA leadership takeaway from the conference: ${guide.strengths[0]?.title || 'One Mission, Two Worlds'}.`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback
      }
    }
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#05070E] py-4 px-3 sm:px-6 flex flex-col items-center justify-start select-none">
      {/* Top Static Bar (Not part of the screenshot card) */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C121E] hover:bg-[#162035] text-white border-2 border-black rounded-sm text-xs font-mono shadow-comic-sm cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Takeaway</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-spider-cyan hover:bg-[#00D0DF] text-black font-mono font-bold text-xs uppercase tracking-wide border-2 border-black rounded-sm shadow-comic-sm cursor-pointer active:scale-95 transition-all"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Helpful Screenshot Notice for Attendees */}
      <div className="w-full max-w-md bg-[#131B2E] border border-spider-cyan/40 px-3 py-1.5 rounded-xs mb-3 text-center">
        <p className="font-mono text-[11px] text-spider-cyan tracking-wide">
          SCREENSHOT READY &bull; Take a screen capture to save to your photos
        </p>
      </div>

      {/* THE DEDICATED STATIC SCREENSHOT CARD */}
      <div
        ref={cardRef}
        id="takeaway-screenshot-card"
        className="w-full max-w-md bg-[#080B14] border-3 border-black text-white rounded-sm shadow-comic p-4 sm:p-5 relative overflow-hidden"
      >
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-spider-red/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-spider-cyan/15 rounded-full blur-2xl pointer-events-none" />

        {/* 1. Header with Compact In-Frame Spider-Man Mascot */}
        <div className="flex items-start justify-between gap-2 border-b-2 border-gray-800 pb-3 mb-3">
          <div className="space-y-1">
            <span className="inline-block bg-spider-yellow text-black font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 border border-black shadow-comic-sm">
              RA LEADERSHIP 2026
            </span>
            <h1 className="font-comic text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight">
              YOUR RA TAKEAWAY
            </h1>
            <span className="inline-block bg-[#111A2E] text-spider-cyan border border-spider-cyan/60 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
              {guide.community === 'Apartment community' ? 'Apartment Community' : 'Residence Hall'}
            </span>
          </div>

          {/* Small Spider-Man illustration strictly constrained inside card */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center -mt-1">
            <img
              src={getAssetUrl('images/spiderman-perched.png')}
              alt="Spider-Man Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(255,23,68,0.6)]"
              loading="eager"
            />
          </div>
        </div>

        {/* 2. Potential Strengths Observed */}
        <div className="mb-3.5 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-spider-red rotate-45" />
            <h2 className="font-comic text-sm sm:text-base text-spider-red uppercase tracking-wide">
              Potential Strengths Observed
            </h2>
          </div>

          <div className="space-y-2">
            {guide.strengths.slice(0, 2).map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#0E1526] border border-gray-800 rounded-xs space-y-1"
              >
                <div className="font-comic text-xs sm:text-sm text-white uppercase tracking-wide">
                  {idx + 1}. {s.title}
                </div>
                <div className="font-mono text-[10px] text-spider-cyan">
                  {s.evidence}
                </div>
                <p className="font-sans text-xs text-gray-200 leading-snug">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Skill to Practice Next */}
        <div className="mb-3.5 p-2.5 bg-[#171305] border-2 border-spider-yellow/70 rounded-xs space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-spider-yellow flex-shrink-0" />
            <h2 className="font-comic text-xs sm:text-sm text-spider-yellow uppercase tracking-wide">
              Skill to Practice: {guide.growthArea.label}
            </h2>
          </div>
          <div className="font-mono text-[10px] text-gray-400">
            {guide.growthArea.evidence}
          </div>
          <p className="font-sans text-xs text-gray-200 leading-snug">
            {guide.growthArea.text}
          </p>
        </div>

        {/* 4. Action to Try This Week */}
        <div className="mb-3.5 p-2.5 bg-gradient-to-r from-[#1A0A10] to-[#0A1422] border border-white/40 rounded-xs space-y-1">
          <h2 className="font-comic text-xs sm:text-sm text-white uppercase tracking-wide">
            Action This Week: "{guide.actionThisWeek.title}"
          </h2>
          <p className="font-sans text-xs text-gray-200 leading-snug">
            {guide.actionThisWeek.action}
          </p>
        </div>

        {/* 5. One Lesson to Borrow Across Worlds */}
        <div className="mb-3 p-2.5 bg-[#0B1220] border border-gray-800 rounded-xs space-y-1">
          <div className="font-mono text-[10px] text-spider-cyan uppercase font-bold">
            Borrowing Across Worlds &bull; {guide.crossWorldLesson.title}
          </div>
          <p className="font-sans text-xs text-gray-300 leading-snug">
            {guide.crossWorldLesson.text}
          </p>
        </div>

        {/* 6. Honest Attribution Note */}
        <div className="pt-2 border-t border-gray-800 text-center">
          <p className="font-mono text-[9px] text-gray-400 italic">
            Based on your choices in today's scenarios. Reflects prioritized approaches, not evaluations of competence.
          </p>
        </div>
      </div>

      {/* Bottom Return Button */}
      <div className="w-full max-w-md mt-4 text-center">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="w-full py-3 bg-[#0C121E] hover:bg-[#162035] text-gray-200 hover:text-white font-comic text-sm uppercase tracking-wider border-2 border-gray-800 rounded-sm shadow-comic cursor-pointer"
        >
          Return to Takeaway &bull; Explore Two Worlds
        </button>
      </div>
    </div>
  );
};
