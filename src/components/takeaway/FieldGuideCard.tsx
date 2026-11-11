import React, { useState } from 'react';
import {
  Camera,
  Download,
  ArrowLeft,
  X,
  Target,
  CalendarCheck,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { downloadFullFieldGuidePng } from '../../utils/exportFieldGuide';
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
  const [showChoices, setShowChoices] = useState(false);

  const guide = generateFieldGuide(session);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/92 backdrop-blur-md flex flex-col items-center justify-start ${
        screenshotMode ? 'p-0 sm:p-4' : 'p-3 sm:p-6'
      }`}
    >
      {!screenshotMode && (
        <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C121E] hover:bg-[#162035] text-gray-200 border-2 border-black rounded-sm text-xs font-mono shadow-comic-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                downloadFullFieldGuidePng(guide);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-spider-cyan hover:bg-[#00D0DF] text-black font-mono font-bold text-xs uppercase border-2 border-black rounded-sm shadow-comic-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PNG</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setScreenshotMode(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121B2E] text-white font-mono text-xs border border-gray-700 rounded-sm cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Clean View</span>
            </button>

            <button
              type="button"
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

      {screenshotMode && (
        <div className="w-full max-w-2xl bg-spider-yellow text-black font-mono text-xs font-bold py-1.5 px-3 flex items-center justify-between border-b-2 border-black">
          <span>Clean Screenshot View</span>
          <button
            type="button"
            onClick={() => setScreenshotMode(false)}
            className="underline cursor-pointer"
          >
            Exit
          </button>
        </div>
      )}

      <div
        id="ra-field-guide-card"
        className="w-full max-w-2xl bg-[#080B14] border-3 border-black text-white rounded-sm shadow-comic p-5 sm:p-7 space-y-5 mb-8 text-left"
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-800 pb-4">
          <div>
            <span className="inline-block bg-spider-yellow text-black font-mono font-bold text-[10px] uppercase px-2 py-0.5 border border-black mb-1.5">
              {guide.community}
            </span>
            <h1 className="font-comic text-3xl sm:text-4xl text-white uppercase leading-none">
              {guide.title}
            </h1>
          </div>
          <img
            src={getAssetUrl('images/spiderman-perched.png')}
            alt="Spider-Man Mascot"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Your strengths */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="font-comic text-xl text-emerald-400 uppercase">Your strengths</h2>
          </div>
          {guide.strengths.map((s, idx) => (
            <div key={idx} className="p-3.5 bg-[#0F1424] border border-emerald-500/35 rounded-xs space-y-1">
              <div className="font-sans font-bold text-base text-white">{s.title}</div>
              <div className="font-mono text-xs text-spider-cyan">{s.evidence}</div>
              <p className="font-sans text-sm text-gray-200 leading-relaxed">{s.explanation}</p>
            </div>
          ))}
        </div>

        {/* What you could work on */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-400" />
            <h2 className="font-comic text-xl text-amber-400 uppercase">What you could work on</h2>
          </div>
          {guide.opportunities.map((opp, idx) => (
            <div key={idx} className="p-3.5 bg-[#17130A] border border-amber-500/45 rounded-xs space-y-1">
              <div className="font-sans font-bold text-base text-white">{opp.label}</div>
              <div className="font-mono text-xs text-amber-300">{opp.evidence}</div>
              <p className="font-sans text-sm text-gray-200 leading-relaxed">{opp.text}</p>
            </div>
          ))}
        </div>

        {/* What to try next */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-spider-cyan" />
            <h2 className="font-comic text-xl text-spider-cyan uppercase">What to try next</h2>
          </div>
          {guide.actions.map((act, idx) => (
            <div key={idx} className="p-3.5 bg-[#0A1424] border border-spider-cyan/45 rounded-xs space-y-1.5">
              <div className="font-sans font-bold text-base text-white">{act.title}</div>
              <p className="font-sans text-sm text-gray-200 leading-relaxed">{act.action}</p>
              {act.exampleScript && (
                <p className="font-sans text-xs text-amber-200 italic bg-black/50 p-2 rounded-2xs border-l-2 border-amber-400">
                  {act.exampleScript}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Expandable Evidence */}
        {guide.reflections.length > 0 && !screenshotMode && (
          <div>
            <button
              type="button"
              onClick={() => setShowChoices(!showChoices)}
              className="w-full py-2 px-3 bg-[#0D1322] border border-gray-700 rounded-xs flex items-center justify-between text-xs font-mono text-gray-200 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-spider-cyan" />
                <span>Supporting choices ({guide.reflections.length})</span>
              </span>
              {showChoices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showChoices && (
              <div className="mt-2.5 space-y-2">
                {guide.reflections.map((r) => (
                  <div key={r.chapter} className="p-3 bg-[#0A0E1A] border border-gray-800 rounded-xs text-xs space-y-1">
                    <div className="flex justify-between font-mono text-spider-cyan">
                      <span>Ch. {r.chapter} &bull; {r.topic}</span>
                      <button type="button" onClick={() => onJumpToChapter(r.chapter)} className="text-amber-300 underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <div className="font-bold text-white">“{r.youChose}”</div>
                    <div className="text-gray-300">{r.crossChapterNote || r.whatYouLeanedToward}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-[11px] font-mono text-gray-400 text-center border-t border-gray-800 pt-3">
          {guide.disclaimer}
        </p>
      </div>
    </div>
  );
};
