import React, { useState } from 'react';
import { 
  Camera, 
  Compass, 
  Share2, 
  ArrowLeft,
  X,
  Target,
  CalendarCheck
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
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col items-center justify-start ${screenshotMode ? 'p-0 sm:p-4' : 'p-3 sm:p-6'}`}>
      
      {/* Top Floating Control Bar (Hidden when in Screenshot View) */}
      {!screenshotMode && (
        <div className="w-full max-w-lg flex items-center justify-between mb-3 px-1 sticky top-2 z-20">
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
        <div className="w-full max-w-lg bg-spider-yellow text-black font-mono text-[11px] font-bold py-1.5 px-3 text-center flex items-center justify-between border-b-2 border-black sticky top-0 z-20">
          <span className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            <span>SCREENSHOT VIEW ACTIVATED &bull; READY TO CAPTURE</span>
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
        {/* Subtle Web Graphic Header Background */}
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
              <h1 className="font-comic text-4xl sm:text-5xl text-white tracking-wide uppercase leading-none drop-shadow-[2px_2px_0px_#000]">
                {guide.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-spider-cyan tracking-wide uppercase mt-1 font-semibold">
                {guide.subtitle}
              </p>
            </div>

            {/* Small Framing Spider-Man Artwork */}
            <div className="w-20 sm:w-24 h-auto flex-shrink-0 -mt-1 -mr-1">
              <img
                src={getAssetUrl('images/spiderman-perched.png')}
                alt="Spider-Man Guide Mascot"
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(255,23,68,0.55)]"
              />
            </div>
          </div>

          {/* Missing Decision Warning (if incomplete) */}
          {!guide.isComplete && (
            <div className="mt-3 p-2 bg-[#2D1600] border-2 border-spider-yellow rounded-xs flex items-center justify-between gap-2">
              <div className="text-[11px] font-sans text-gray-200">
                <span className="font-bold text-spider-yellow font-mono block">
                  PARTIAL FIELD GUIDE ({guide.answeredCount}/4 Decisions)
                </span>
                Answers for Chapters {guide.missingChapters.join(', ')} are still open.
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

        {/* 2. Card Content Sections */}
        <div className="p-4 sm:p-5 space-y-4">

          {/* Section A: Potential Strengths */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 bg-spider-red border border-black rotate-45 inline-block" />
              <h2 className="font-comic text-xl text-spider-red uppercase tracking-wide">
                Potential Strengths
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
                    <span className="text-[9px] font-mono text-gray-400 bg-black/60 px-1.5 py-0.5 rounded border border-gray-800">
                      {s.choiceSource}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
                    {s.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: A Skill to Practice Next */}
          <div className="p-3.5 bg-[#17130A] border-2 border-spider-yellow/80 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target className="w-4 h-4 text-spider-yellow" />
              <h2 className="font-comic text-lg text-spider-yellow uppercase tracking-wide">
                {guide.growthArea.label}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
              {guide.growthArea.text}
            </p>
            <span className="text-[9px] font-mono text-gray-400 block mt-1.5">
              {guide.growthArea.choiceSource}
            </span>
          </div>

          {/* Section C: Borrow Across Worlds */}
          <div className="p-3.5 bg-[#0A1826] border-2 border-spider-cyan/80 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Compass className="w-4 h-4 text-spider-cyan" />
              <h2 className="font-comic text-lg text-spider-cyan uppercase tracking-wide">
                Borrow Across Worlds
              </h2>
            </div>
            <h3 className="font-sans font-bold text-xs text-white mb-1">
              {guide.crossWorldLesson.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
              {guide.crossWorldLesson.text}
            </p>
            <span className="text-[9px] font-mono text-spider-cyan/80 block mt-1.5">
              {guide.crossWorldLesson.worldContext}
            </span>
          </div>

          {/* Section D: One Action for This Week */}
          <div className="p-3.5 bg-gradient-to-r from-[#200A10] via-[#160E1A] to-[#0A1220] border-2 border-white/60 rounded-xs shadow-comic-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CalendarCheck className="w-4 h-4 text-white" />
              <h2 className="font-comic text-lg text-white uppercase tracking-wide">
                Try This Week
              </h2>
            </div>
            <h3 className="font-comic text-base text-spider-yellow tracking-wide mb-1">
              "{guide.actionThisWeek.title}"
            </h3>
            <p className="text-xs sm:text-sm font-sans text-gray-100 leading-snug">
              {guide.actionThisWeek.action}
            </p>
          </div>

          {/* Decision Summary Chips */}
          {guide.scenariosSummary.length > 0 && (
            <div className="pt-2 border-t border-gray-800">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Your Explored Pathways:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {guide.scenariosSummary.map((s) => (
                  <div 
                    key={s.chapter}
                    className="p-1.5 bg-black/60 border border-gray-800 rounded-xs flex items-center justify-between text-[10px] font-mono"
                  >
                    <span className="text-gray-400 font-bold">Ch. {s.chapter}:</span>
                    <span className="text-gray-200 truncate ml-1 text-right">{s.chosenLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Honest Attribution Note */}
          <div className="pt-2 text-center border-t border-gray-800/60">
            <p className="text-[11px] font-mono text-gray-400 italic">
              {guide.disclaimer}
            </p>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="p-3 bg-[#05070D] border-t-2 border-black flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span>RA: ACROSS THE MULTI-DOORS</span>
          <span>ONE MISSION. TWO WORLDS.</span>
        </div>
      </div>

      {/* Bottom Sticky Action Bar (Hidden in Screenshot Mode) */}
      {!screenshotMode ? (
        <div className="w-full max-w-lg flex items-center gap-2 mt-2 px-1">
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
        <div className="w-full max-w-lg p-3 text-center mb-6">
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
