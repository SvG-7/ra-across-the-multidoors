import React, { useState } from 'react';
import {
  Camera,
  Compass,
  ArrowLeft,
  CheckCircle2,
  Target,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Download,
  ChevronLeft,
  RotateCcw,
} from 'lucide-react';
import { AttendeeSession, SharedResponses } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { downloadFullFieldGuidePng } from '../../utils/exportFieldGuide';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';
import { TakeawayScreenshotCard } from '../takeaway/TakeawayScreenshotCard';
import { SpiderTracker } from '../tracker/SpiderTracker';
import { MultiverseComparisonHub } from '../results/MultiverseComparisonHub';
import { AttendeeWebProgress } from '../web/AttendeeWebProgress';
import { ThemedDoor } from '../doors/ThemedDoor';
import { sessionManager } from '../../sync/syncClient';

interface Chapter7ConclusionProps {
  session: AttendeeSession;
  sharedResponses: SharedResponses;
  onJumpToChapter: (chapterNumber: number) => void;
  onPrevChapter?: () => void;
  reducedMotion?: boolean;
}

export const Chapter7Conclusion: React.FC<Chapter7ConclusionProps> = ({
  session,
  sharedResponses,
  onJumpToChapter,
  onPrevChapter,
  reducedMotion = false,
}) => {
  const [viewMode, setViewMode] = useState<'guide' | 'explore' | 'screenshot'>('guide');
  const [showEvidence, setShowEvidence] = useState(false);
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  const guide = generateFieldGuide(session);

  const formatCommunityLabel = () => {
    switch (guide.community) {
      case 'Apartment community':
        return 'Apartment Community';
      case 'Residence hall':
        return 'Residence Hall';
      case 'New to the RA role':
        return 'New to the RA Role';
      default:
        return 'Residence Hall & Apartment';
    }
  };

  const handleDownload = () => {
    soundEngine.playClick();
    downloadFullFieldGuidePng(guide);
    setDownloadedNotice(true);
    window.setTimeout(() => setDownloadedNotice(false), 3000);
  };

  if (viewMode === 'screenshot') {
    return (
      <TakeawayScreenshotCard
        session={session}
        onBack={() => setViewMode('guide')}
      />
    );
  }

  if (viewMode === 'explore') {
    return (
      <div className="w-full space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0B101E] border-2 border-black p-3 rounded-sm shadow-comic">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setViewMode('guide');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-spider-yellow hover:bg-[#FFE600] text-black font-comic text-sm uppercase tracking-wider rounded-xs border border-black shadow-comic-sm cursor-pointer active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Field Guide</span>
          </button>

          <span className="font-mono text-xs text-spider-cyan font-bold uppercase tracking-wider">
            Neighborhood Map &amp; Room Responses
          </span>
        </div>

        <SpiderTracker
          session={session}
          onJumpToChapter={onJumpToChapter}
          onSelectComparisonChapter={() => {
            const el = document.getElementById('room-comparison-hub');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          reducedMotion={reducedMotion}
        />

        <div id="room-comparison-hub">
          <MultiverseComparisonHub
            session={session}
            sharedResponses={sharedResponses}
            onJumpToChapter={onJumpToChapter}
            onRetryConnection={() => sessionManager.retryConnection()}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="text-center pt-2 pb-4">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setViewMode('guide');
            }}
            className="py-3 px-6 bg-[#111A2E] hover:bg-[#182440] text-spider-cyan font-comic text-base uppercase tracking-wider border-2 border-spider-cyan/60 rounded-sm shadow-comic cursor-pointer"
          >
            &larr; Return to My RA Field Guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 text-left">
      {/* Top Progress + Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-spider-cyan block mb-1">
            7 / 7 &bull; {formatCommunityLabel()}
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none">
            {guide.title}
          </h1>
          <p className="text-sm sm:text-base font-sans text-gray-300 mt-1.5">
            {guide.answeredCount} of {guide.totalDecisions} scenarios answered.
            {!guide.isComplete &&
              guide.missingChapters.length > 0 &&
              ` Remaining scenarios (Ch. ${guide.missingChapters.join(', ')}) are left blank rather than guessed.`}
          </p>
        </div>

        {/* Save / Share / Explore Secondary Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-2 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-sm uppercase tracking-wider border-2 border-black rounded-xs shadow-comic-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{downloadedNotice ? 'Saved Full PNG ✓' : 'Save Guide PNG'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setViewMode('screenshot');
            }}
            className="px-3.5 py-2 bg-[#121A2C] hover:bg-[#1A253F] text-white font-comic text-sm uppercase tracking-wider border-2 border-gray-700 hover:border-spider-cyan rounded-xs shadow-comic-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4 text-spider-cyan" />
            <span>Screenshot View</span>
          </button>
        </div>
      </div>

      {/* Finale Visual Trio + Personal 8-Legged Web */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 flex items-center">
          <ThemedDoor
            chapterNumber={7}
            chapterTitle="My RA Field Guide"
            doorTheme="Multiverse RA"
            isOpen={true}
            reducedMotion={reducedMotion}
            showReplay={false}
          />
        </div>
        <div className="lg:col-span-7">
          <AttendeeWebProgress
            answers={session.answers}
            connectionsCount={guide.answeredCount}
            isFinale={true}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* CORE PERSONALIZED GUIDE SECTIONS (DETAILED, SCROLLABLE)             */}
      {/* =================================================================== */}
      <div className="bg-[#080B14] border-3 border-black rounded-sm shadow-comic p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Card Header Strip */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h2 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
              Personal Field Notes
            </h2>
            <p className="text-xs sm:text-sm font-sans text-gray-400 mt-0.5">
              Written from your saved decisions for you to keep after the session.
            </p>
          </div>
          <img
            src={getAssetUrl('images/spiderman-perched.png')}
            alt="Spider-Man Mascot"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain flex-shrink-0 filter drop-shadow-[0_4px_10px_rgba(255,23,68,0.5)]"
          />
        </div>

        {/* 1. YOUR STRENGTHS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <h3 className="font-comic text-xl sm:text-2xl text-emerald-400 uppercase tracking-wide">
              Your strengths
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {guide.strengths.map((s, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#0D1424] border-2 border-emerald-500/40 rounded-xs space-y-2"
              >
                <h4 className="font-sans font-bold text-base sm:text-lg text-white leading-snug">
                  {s.title}
                </h4>
                <p className="font-mono text-xs text-spider-cyan">
                  {s.evidence}
                </p>
                <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. WHAT YOU COULD WORK ON */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <h3 className="font-comic text-xl sm:text-2xl text-amber-400 uppercase tracking-wide">
              What you could work on
            </h3>
          </div>

          <div className="space-y-3">
            {guide.opportunities.map((opp, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#171307] border-2 border-amber-500/55 rounded-xs space-y-2"
              >
                <h4 className="font-sans font-bold text-base sm:text-lg text-white leading-snug">
                  {opp.label}
                </h4>
                <p className="font-mono text-xs text-amber-300">
                  {opp.evidence}
                </p>
                <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed">
                  {opp.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. WHAT TO TRY NEXT */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-spider-cyan flex-shrink-0" />
            <h3 className="font-comic text-xl sm:text-2xl text-spider-cyan uppercase tracking-wide">
              What to try next
            </h3>
          </div>

          <div className="space-y-3">
            {guide.actions.map((act, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#091524] border-2 border-spider-cyan/55 rounded-xs space-y-2.5"
              >
                <h4 className="font-sans font-bold text-base sm:text-lg text-white leading-snug">
                  {act.title}
                </h4>
                <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed">
                  {act.action}
                </p>
                {act.exampleScript && (
                  <div className="p-3 bg-black/55 border-l-3 border-spider-yellow rounded-r-xs">
                    <span className="font-mono text-[11px] uppercase font-bold text-spider-yellow block mb-0.5">
                      Example to say or text
                    </span>
                    <p className="font-sans text-sm text-gray-100 italic leading-snug">
                      {act.exampleScript}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Community Context Note */}
        <section className="p-4 bg-[#0D1020] border border-slate-700 rounded-xs space-y-1.5">
          <span className="font-mono text-xs font-bold uppercase text-purple-300 block">
            {guide.crossWorldLesson.title} ({guide.crossWorldLesson.worldContext})
          </span>
          <p className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed">
            {guide.crossWorldLesson.text}
          </p>
        </section>

        {/* Expandable Supporting Evidence (Optional Drill-down) */}
        {guide.reflections.length > 0 && (
          <div className="border-t border-gray-800 pt-4">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setShowEvidence(!showEvidence);
              }}
              className="w-full py-2.5 px-3 bg-[#0D1322] hover:bg-[#141D33] border border-gray-700 rounded-xs flex items-center justify-between text-xs sm:text-sm font-mono text-gray-200 cursor-pointer"
            >
              <span>See your choices &amp; supporting evidence ({guide.answeredCount} chapters)</span>
              {showEvidence ? (
                <ChevronUp className="w-4 h-4 text-spider-cyan" />
              ) : (
                <ChevronDown className="w-4 h-4 text-spider-cyan" />
              )}
            </button>

            {showEvidence && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {guide.reflections.map((r) => (
                  <div
                    key={r.chapter}
                    className="p-3.5 bg-[#0A0E1A] border border-gray-800 rounded-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-spider-cyan">
                      <span className="font-bold uppercase">
                        Ch. {r.chapter} &bull; {r.topic}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          onJumpToChapter(r.chapter);
                        }}
                        className="text-spider-yellow hover:underline cursor-pointer"
                      >
                        Change choice
                      </button>
                    </div>
                    <p className="font-sans font-semibold text-sm text-white">
                      Chose: “{r.youChose}”
                    </p>
                    <p className="font-sans text-xs text-gray-300 leading-snug">
                      {r.crossChapterNote || r.whatYouLeanedToward}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-xs font-mono text-gray-400 text-center border-t border-gray-800 pt-3">
          {guide.disclaimer}
        </p>
      </div>

      {/* Bottom Secondary Controls: Explore Map/Room + Save + Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setViewMode('explore');
          }}
          className="py-3.5 px-5 bg-[#121A2E] hover:bg-[#192542] text-white font-comic text-base sm:text-lg uppercase tracking-wider border-2 border-spider-yellow/70 rounded-sm shadow-comic flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 text-spider-yellow" />
          <span>Explore Map &amp; Room Responses</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="py-3.5 px-5 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-base sm:text-lg uppercase tracking-wider border-2 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <Download className="w-5 h-5 text-black" />
          <span>{downloadedNotice ? 'Full Guide Downloaded ✓' : 'Download Full Field Guide'}</span>
        </button>
      </div>

      <div className="pt-2 border-t border-gray-800 flex items-center justify-between gap-3">
        {onPrevChapter && (
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onPrevChapter();
            }}
            className="min-h-[48px] px-4 py-2.5 bg-[#0C111E] hover:bg-black text-gray-200 border-2 border-gray-700 rounded-sm font-comic text-base uppercase tracking-wide flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onJumpToChapter(1);
          }}
          className="ml-auto min-h-[48px] px-5 py-2.5 bg-spider-red hover:bg-spider-crimson text-white font-comic text-base uppercase tracking-wider border-2 border-black rounded-sm shadow-comic flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
};
