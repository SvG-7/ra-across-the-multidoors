import React, { useState } from 'react';
import { 
  Camera, 
  Compass, 
  Share2, 
  ArrowLeft,
  X,
  Target,
  CalendarCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

interface FieldGuideCardProps {
  session: AttendeeSession;
  onClose: () => void;
  onJumpToChapter: (chapterNumber: number) => void;
  initialScreenshotMode?: boolean;
}

export const FieldGuideCard: React.FC<FieldGuideCardProps> = ({
  session,
  onClose,
  onJumpToChapter,
  initialScreenshotMode = false,
}) => {
  const [screenshotMode, setScreenshotMode] = useState(initialScreenshotMode);
  const [copiedLink, setCopiedLink] = useState(false);

  const guide = generateFieldGuide(session);

  const handleToggleScreenshotMode = () => {
    soundEngine.playClick();
    setScreenshotMode(!screenshotMode);
  };

  const handleShare = async () => {
    soundEngine.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My RA Field Guide - Across the Multi-Doors',
          text: `My RA leadership field guide from the conference: ${guide.strengths[0]?.title || 'One Mission, Two Worlds'}.`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-black/92 backdrop-blur-md flex flex-col items-center justify-start ${screenshotMode ? 'p-0 sm:p-4' : 'p-3 sm:p-6'}`}>
      
      {/* Top Floating Control Bar (Hidden when in Screenshot View) */}
      {!screenshotMode && (
        <div className="w-full max-w-lg flex items-center justify-between mb-3 px-1 sticky top-2 z-30">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C121E] hover:bg-[#162035] text-gray-200 border-2 border-black rounded-sm text-xs font-mono shadow-comic-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Tracker</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleScreenshotMode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-spider-cyan hover:bg-[#00D0DF] text-black font-mono font-bold text-xs uppercase tracking-wide border-2 border-black rounded-sm shadow-comic-sm cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Screenshot View</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-sm border border-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screenshot Mode Top Banner */}
      {screenshotMode && (
        <div className="w-full max-w-lg bg-spider-yellow text-black font-mono text-[11px] font-bold py-1.5 px-3 text-center flex items-center justify-between border-b-2 border-black sticky top-0 z-30">
          <span className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            <span>SCREENSHOT VIEW ACTIVATED &bull; CLEAN CAPTURE READY</span>
          </span>
          <button
            onClick={handleToggleScreenshotMode}
            className="text-black underline font-bold text-[11px] ml-2 cursor-pointer"
          >
            Exit
          </button>
        </div>
      )}

      {/* THE FIELD GUIDE PORTRAIT CARD */}
      <div 
        id="ra-field-guide-card"
        className={`w-full max-w-lg bg-[#080B14] border-3 border-black text-white rounded-sm shadow-comic overflow-hidden relative ${screenshotMode ? 'my-2 sm:my-4' : 'mb-8'}`}
      >
        {/* Subtle Web Graphic Background */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-spider-red/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-spider-cyan/10 rounded-full blur-2xl pointer-events-none" />

        {/* 1. Card Header */}
        <div className="relative p-5 pb-4 bg-gradient-to-b from-[#1C0812] via-[#101422] to-[#0A0E1A] border-b-3 border-black">
          {/* Top badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="bg-spider-yellow text-black font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 border border-black shadow-comic-sm">
              RA LEADERSHIP CONCLAVE 2026
            </span>
            <span className="bg-[#1A263D] text-spider-cyan font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black">
              {guide.community}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-comic text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none drop-shadow-[2px_2px_0px_#000]">
                {guide.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-spider-cyan tracking-wide uppercase mt-1 font-semibold">
                {guide.subtitle}
              </p>
            </div>

            {/* Framing Spider-Man Artwork */}
            <div className="w-18 sm:w-22 h-auto flex-shrink-0 -mt-1 -mr-1">
              <img
                src={getAssetUrl('images/spiderman-perched.png')}
                alt="Spider-Man Mascot"
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(255,23,68,0.55)]"
              />
            </div>
          </div>

          {/* Missing Decision Warning (if incomplete) */}
          {!guide.isComplete && (
            <div className="mt-3 p-2 bg-[#2D1600] border-2 border-spider-yellow rounded-xs flex items-center justify-between gap-2">
              <div className="text-[11px] font-sans text-gray-200">
                <span className="font-bold text-spider-yellow font-mono block">
                  PARTIAL FIELD GUIDE ({guide.answeredCount}/4 Decisions Explored)
                </span>
                Chapters {guide.missingChapters.join(', ')} are awaiting your input.
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                  onJumpToChapter(guide.missingChapters[0]);
                }}
                className="px-2.5 py-1 bg-spider-yellow hover:bg-yellow-400 text-black font-mono font-bold text-[10px] uppercase rounded-xs border border-black whitespace-nowrap cursor-pointer"
              >
                Complete Ch. {guide.missingChapters[0]}
              </button>
            </div>
          )}
        </div>

        {/* 2. CORE SCREENSHOT SUMMARY SECTIONS */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Section A: Potential Strengths Supported by Selected Answers */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 bg-spider-red border border-black rotate-45 inline-block" />
              <h2 className="font-comic text-xl text-spider-red uppercase tracking-wide">
                Potential Strengths Observed
              </h2>
            </div>

            <div className="space-y-2.5">
              {guide.strengths.map((s, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-[#0F1424] border-2 border-black rounded-xs shadow-comic-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-comic text-base text-white tracking-wide">
                      {idx + 1}. {s.title}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-spider-cyan mb-1 font-semibold">
                    &bull; {s.evidence}
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
                    {s.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: A Skill to Practice Next (Growth Area) */}
          <div className="p-3.5 bg-[#17130A] border-2 border-spider-yellow/80 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target className="w-4 h-4 text-spider-yellow" />
              <h2 className="font-comic text-lg text-spider-yellow uppercase tracking-wide">
                A Skill to Practice Next: {guide.growthArea.label}
              </h2>
            </div>
            <p className="text-[10px] font-mono text-yellow-300 mb-1.5">
              &bull; {guide.growthArea.evidence}
            </p>
            <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
              {guide.growthArea.text}
            </p>
          </div>

          {/* Section C: Borrow Across Worlds */}
          <div className="p-3.5 bg-[#0A1826] border-2 border-spider-cyan/80 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Compass className="w-4 h-4 text-spider-cyan" />
              <h2 className="font-comic text-lg text-spider-cyan uppercase tracking-wide">
                Strategy to Borrow Across Worlds
              </h2>
            </div>
            <h3 className="font-sans font-bold text-xs text-spider-cyan mb-1">
              {guide.crossWorldLesson.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
              {guide.crossWorldLesson.text}
            </p>
          </div>

          {/* Section D: One Action for This Week */}
          <div className="p-3.5 bg-gradient-to-r from-[#200A10] via-[#160E1A] to-[#0A1220] border-2 border-white/60 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CalendarCheck className="w-4 h-4 text-white" />
              <h2 className="font-comic text-lg text-white uppercase tracking-wide">
                Action to Try This Week: "{guide.actionThisWeek.title}"
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-gray-100 leading-snug">
              {guide.actionThisWeek.action}
            </p>
          </div>

          {/* Section E: Personalized Next Step (Replaces generic closing quote as sole ending) */}
          <div className="p-3 bg-[#111A2E] border-2 border-spider-cyan/70 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-spider-cyan" />
              <span className="font-comic text-sm text-spider-cyan uppercase tracking-wide">
                Personalized Next Step &bull; {guide.personalizedNextStep.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
              {guide.personalizedNextStep.text}
            </p>
          </div>

          {/* Supporting Caption */}
          <div className="text-center pt-1 pb-1">
            <p className="font-comic text-base text-gray-300 uppercase tracking-wide">
              "{guide.supportingQuote}"
            </p>
          </div>

          {/* Mandatory Honest Attribution Note */}
          <div className="pt-2 text-center border-t border-gray-800/80">
            <p className="text-[10px] font-mono text-gray-400 italic">
              {guide.disclaimer}
            </p>
          </div>
        </div>

        {/* 3. TOPIC-BY-TOPIC REFLECTIONS (DEEP DIVE SECTION) */}
        {guide.reflections.length > 0 && (
          <div className="p-4 sm:p-5 pt-0 border-t-2 border-dashed border-gray-800 mt-2">
            <div className="flex items-center gap-1.5 mb-3 pt-4">
              <BookOpen className="w-4 h-4 text-spider-yellow" />
              <h2 className="font-comic text-xl text-spider-yellow uppercase tracking-wide">
                Topic-by-Topic Decision Reflections
              </h2>
            </div>
            <p className="text-xs font-sans text-gray-300 mb-3">
              Detailed breakdown of the principles, tradeoffs, and practical actions behind your specific choices:
            </p>

            <div className="space-y-3.5">
              {guide.reflections.map((r) => (
                <div 
                  key={r.chapter}
                  className="p-3.5 bg-[#0A0E1A] border-2 border-gray-800 rounded-xs space-y-2 text-left"
                >
                  {/* Topic & Choice Header */}
                  <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                    <span className="font-mono text-[11px] text-spider-cyan font-bold uppercase">
                      CH. {r.chapter} &bull; {r.topic}
                    </span>
                    <span className="bg-black/60 text-spider-yellow border border-gray-800 px-1.5 py-0.5 rounded text-[10px] font-mono">
                      Answered
                    </span>
                  </div>

                  {/* You Chose */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">
                      You chose:
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-white">
                      "{r.youChose}"
                    </span>
                  </div>

                  {/* What this prioritizes */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                      What this prioritizes:
                    </span>
                    <p className="text-xs font-sans text-gray-200">
                      {r.whatThisPrioritizes}
                    </p>
                  </div>

                  {/* What to watch for */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                      What to watch for:
                    </span>
                    <p className="text-xs font-sans text-gray-200">
                      {r.whatToWatchFor}
                    </p>
                  </div>

                  {/* Try this */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-spider-cyan block font-bold">
                      Try this:
                    </span>
                    <p className="text-xs font-sans text-gray-100 italic bg-black/40 p-1.5 rounded border border-gray-800">
                      {r.tryThisAction}
                    </p>
                  </div>

                  {/* Cross-Chapter Connection Note (if present) */}
                  {r.crossChapterNote && (
                    <div className="mt-2 p-2 bg-[#1A0F1E] border border-fuchsia-500/50 rounded-xs">
                      <span className="text-[10px] font-mono font-bold text-fuchsia-300 block mb-0.5 uppercase">
                        Cross-Chapter Connection (Ch. 4 &rarr; Ch. 6):
                      </span>
                      <p className="text-xs font-sans text-gray-200">
                        {r.crossChapterNote}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Footer Bar */}
        <div className="p-3 bg-[#05070D] border-t-2 border-black flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span>RA: ACROSS THE MULTI-DOORS</span>
          <span>ONE MISSION. TWO WORLDS.</span>
        </div>
      </div>

      {/* Bottom Sticky Action Bar (Hidden in Screenshot Mode) */}
      {!screenshotMode ? (
        <div className="w-full max-w-lg flex items-center gap-2 mt-2 px-1 mb-8">
          <button
            onClick={handleToggleScreenshotMode}
            className="flex-1 py-3 px-4 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-xl uppercase tracking-wider border-3 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>Open Screenshot View</span>
          </button>

          <button
            onClick={handleShare}
            className="py-3 px-4 bg-[#141C2E] hover:bg-[#1E2A45] text-white border-3 border-black rounded-sm shadow-comic flex items-center justify-center gap-1.5 text-xs font-mono font-bold cursor-pointer"
            title="Share or copy URL"
          >
            <Share2 className="w-4 h-4 text-spider-cyan" />
            <span>{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg p-3 text-center mb-8">
          <button
            onClick={handleToggleScreenshotMode}
            className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-mono text-xs uppercase tracking-wider border-2 border-white/40 rounded-sm shadow-comic cursor-pointer"
          >
            &larr; Exit Screenshot View (Return to Full Controls)
          </button>
        </div>
      )}
    </div>
  );
};
