import React, { useState } from 'react';
import { Camera, Compass, ArrowLeft, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { AttendeeSession, SharedResponses } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';
import { TakeawayScreenshotCard } from '../takeaway/TakeawayScreenshotCard';
import { SpiderTracker } from '../tracker/SpiderTracker';
import { MultiverseComparisonHub } from '../results/MultiverseComparisonHub';
import { sessionManager } from '../../sync/syncClient';

interface Chapter7ConclusionProps {
  session: AttendeeSession;
  sharedResponses: SharedResponses;
  onJumpToChapter: (chapterNumber: number) => void;
  reducedMotion?: boolean;
}

export const Chapter7Conclusion: React.FC<Chapter7ConclusionProps> = ({
  session,
  sharedResponses,
  onJumpToChapter,
  reducedMotion = false,
}) => {
  const [viewMode, setViewMode] = useState<'takeaway' | 'explore' | 'screenshot'>('takeaway');
  const guide = generateFieldGuide(session);

  // 1. SCREENSHOT VIEW
  if (viewMode === 'screenshot') {
    return (
      <TakeawayScreenshotCard
        session={session}
        onBack={() => setViewMode('takeaway')}
      />
    );
  }

  // 2. EXPLORATION VIEW (Neighborhood Map + My Choices / Our Room / Other Approaches)
  if (viewMode === 'explore') {
    return (
      <div className="w-full space-y-4">
        {/* Sticky Back Navigation Bar */}
        <div className="flex items-center justify-between bg-[#0B101E] border-2 border-black p-3 rounded-sm shadow-comic">
          <button
            onClick={() => {
              soundEngine.playClick();
              setViewMode('takeaway');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-spider-yellow hover:bg-[#FFE600] text-black font-comic text-xs uppercase tracking-wider rounded-xs border border-black shadow-comic-sm cursor-pointer active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Your Takeaway</span>
          </button>

          <span className="font-mono text-[11px] text-spider-cyan font-bold uppercase tracking-wider">
            Exploration Mode
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center py-1">
          <h2 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
            Explore the Two Worlds
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-md mx-auto mt-0.5">
            Compare the layout of residence halls and apartment communities, and see how other RAs responded.
          </p>
        </div>

        {/* Illustrated Split Neighborhood Map */}
        <SpiderTracker
          session={session}
          onJumpToChapter={onJumpToChapter}
          onSelectComparisonChapter={() => {
            const el = document.getElementById('room-comparison-hub');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          reducedMotion={reducedMotion}
        />

        {/* Cohesive Multiverse Comparison Hub (My Choices / Our Room / Other Approaches) */}
        <div id="room-comparison-hub">
          <MultiverseComparisonHub
            session={session}
            sharedResponses={sharedResponses}
            onJumpToChapter={onJumpToChapter}
            onRetryConnection={() => sessionManager.retryConnection()}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Bottom Action: Return to Takeaway */}
        <div className="text-center pt-2 pb-4">
          <button
            onClick={() => {
              soundEngine.playClick();
              setViewMode('takeaway');
            }}
            className="py-3 px-6 bg-[#111A2E] hover:bg-[#182440] text-spider-cyan font-comic text-sm uppercase tracking-wider border-2 border-spider-cyan/50 rounded-sm shadow-comic cursor-pointer"
          >
            &larr; Return to Your Personal Takeaway
          </button>
        </div>
      </div>
    );
  }

  // 3. DEFAULT SIMPLIFIED TAKEAWAY VIEW
  return (
    <div className="w-full space-y-4">
      {/* Primary Takeaway Card */}
      <div className="w-full bg-[#080B14] border-3 border-black text-white rounded-sm shadow-comic p-4 sm:p-6 relative overflow-hidden">
        {/* Subtle Background Halftone Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-spider-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-spider-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Title and Community Badge */}
        <div className="flex items-start justify-between gap-3 border-b-2 border-gray-800 pb-4 mb-4">
          <div>
            <div className="inline-block bg-spider-yellow text-black font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 border border-black shadow-comic-sm mb-1.5">
              CONFERENCE SUMMARY
            </div>
            <h1 className="font-comic text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none">
              Your RA Takeaway
            </h1>
            <p className="font-mono text-xs sm:text-sm text-spider-cyan tracking-wide uppercase mt-1 font-semibold">
              Community: {guide.community === 'Apartment community' ? 'Apartment Community' : 'Residence Hall'}
            </p>
          </div>

          {/* Framed Spider-Man Mascot */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center -mt-1">
            <img
              src={getAssetUrl('images/spiderman-perched.png')}
              alt="Spider-Man Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(255,23,68,0.55)]"
            />
          </div>
        </div>

        {/* 1. Two Potential Strengths */}
        <div className="mb-4 space-y-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-spider-red rotate-45 flex-shrink-0" />
            <h2 className="font-comic text-base sm:text-lg text-spider-red uppercase tracking-wide">
              Potential Strengths Observed
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {guide.strengths.slice(0, 2).map((s, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#0D1424] border-2 border-gray-800 rounded-xs space-y-1"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-comic text-sm sm:text-base text-white uppercase tracking-wide">
                    {idx + 1}. {s.title}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-spider-cyan pl-5">
                  {s.evidence}
                </div>
                <p className="font-sans text-xs sm:text-sm text-gray-200 leading-snug pl-5">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. One Specific Skill to Practice */}
        <div className="mb-4 p-3.5 bg-[#171305] border-2 border-spider-yellow/70 rounded-xs space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-spider-yellow flex-shrink-0" />
            <h2 className="font-comic text-sm sm:text-base text-spider-yellow uppercase tracking-wide">
              Skill to Practice: {guide.growthArea.label}
            </h2>
          </div>
          <div className="font-mono text-[11px] text-gray-300 pl-6">
            {guide.growthArea.evidence}
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-200 leading-snug pl-6">
            {guide.growthArea.text}
          </p>
        </div>

        {/* 3. One Concrete Action to Try This Week */}
        <div className="mb-4 p-3.5 bg-gradient-to-r from-[#1E0911] via-[#120E18] to-[#0A1422] border-2 border-white/50 rounded-xs space-y-1.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white flex-shrink-0" />
            <h2 className="font-comic text-sm sm:text-base text-white uppercase tracking-wide">
              Action This Week: "{guide.actionThisWeek.title}"
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-100 leading-snug pl-6">
            {guide.actionThisWeek.action}
          </p>
        </div>

        {/* Honest Attribution Footer Note */}
        <div className="pt-2 border-t border-gray-800 text-center">
          <p className="font-mono text-[10px] text-gray-400 italic">
            Based on your choices in today's scenarios. These observations reflect prioritized approaches, not evaluations of competence.
          </p>
        </div>
      </div>

      {/* Two Obvious Primary Actions Directly Below Takeaway */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => {
            soundEngine.playClick();
            setViewMode('screenshot');
          }}
          className="py-3.5 px-4 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-base sm:text-lg uppercase tracking-wider border-2 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <Camera className="w-5 h-5 text-black" />
          <span>Screenshot my takeaway</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setViewMode('explore');
          }}
          className="py-3.5 px-4 bg-spider-red hover:bg-spider-crimson text-white font-comic text-base sm:text-lg uppercase tracking-wider border-2 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 text-spider-yellow" />
          <span>Explore the two worlds</span>
        </button>
      </div>
    </div>
  );
};
