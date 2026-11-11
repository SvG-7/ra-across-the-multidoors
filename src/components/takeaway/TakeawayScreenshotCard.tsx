import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Target,
  CalendarCheck,
  Download,
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { generateFieldGuide } from '../../utils/takeawayGenerator';
import { downloadFullFieldGuidePng } from '../../utils/exportFieldGuide';
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
  const [downloaded, setDownloaded] = useState(false);

  const formatCommunity = () => {
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

  return (
    <div className="w-full flex flex-col items-center select-none pb-12">
      {/* Top Action Bar (Clean, Non-Sticky) */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 mb-4 bg-[#0B101E] border-2 border-black p-3 rounded-sm shadow-comic">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-spider-yellow hover:bg-[#FFE600] text-black font-comic text-xs sm:text-sm uppercase tracking-wider rounded-xs border border-black shadow-comic-sm cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Guide</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            downloadFullFieldGuidePng(guide);
            setDownloaded(true);
            window.setTimeout(() => setDownloaded(false), 3000);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-spider-cyan hover:bg-[#00D0DF] text-black font-comic text-xs sm:text-sm uppercase tracking-wider rounded-xs border border-black shadow-comic-sm cursor-pointer active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{downloaded ? 'Saved PNG ✓' : 'Download Full PNG'}</span>
        </button>
      </div>

      {/* FULL STATIC FIELD GUIDE CARD (Complete Content, Unclipped, Readable) */}
      <div
        id="takeaway-screenshot-card"
        className="w-full max-w-2xl bg-[#080B14] border-4 border-black rounded-sm shadow-2xl p-5 sm:p-7 text-white relative space-y-5"
      >
        <div className="flex items-start justify-between gap-3 border-b-2 border-gray-800 pb-4">
          <div>
            <div className="inline-block bg-spider-yellow text-black font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 border border-black mb-1.5">
              RA: ACROSS THE MULTI-DOORS
            </div>
            <h1 className="font-comic text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none">
              The Multiverse RA
            </h1>
            <p className="font-mono text-xs text-spider-cyan uppercase tracking-wider mt-1 font-bold">
              {formatCommunity()} &bull; {guide.answeredCount} / {guide.totalDecisions} Scenarios
            </p>
          </div>
          <img
            src={getAssetUrl('images/spiderman-perched.png')}
            alt="Spider-Man Mascot"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0 filter drop-shadow-[0_4px_10px_rgba(255,23,68,0.55)]"
            loading="eager"
          />
        </div>

        {/* Compact Personal Spider Web Row */}
        <div className="p-3 bg-[#070B14] border border-gray-800 rounded-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 74" className="w-14 h-10 flex-shrink-0" fill="none">
              <path d="M 50 18 C 55 18 57 22 56 26 C 55.5 29 52.5 31 50 31.5 C 47.5 31 44.5 29 44 26 C 43 22 45 18 50 18 Z" fill="#7F1D1D" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 50 33 C 58 34 61 42 59 50 C 57 57 53 62 50 64 C 47 62 43 57 41 50 C 39 42 42 34 50 33 Z" fill="#0D1424" stroke="#94A3B8" strokeWidth="1" />
              {[
                { ch: 2, l: 'M 44 22 L 30 11 L 19 8', r: 'M 56 22 L 70 11 L 81 8', c: '#38BDF8' },
                { ch: 3, l: 'M 43 26 L 26 20 L 14 27', r: 'M 57 26 L 74 20 L 86 27', c: '#F59E0B' },
                { ch: 4, l: 'M 43 30 L 26 39 L 15 51', r: 'M 57 30 L 74 39 L 85 51', c: '#F43F5E' },
                { ch: 6, l: 'M 45 35 L 33 54 L 24 67', r: 'M 55 35 L 67 54 L 76 67', c: '#A78BFA' },
              ].map((pair) => {
                const active = !!session.answers[pair.ch];
                return (
                  <g key={pair.ch} stroke={active ? pair.c : '#334155'} strokeWidth={active ? 1.5 : 0.9} strokeDasharray={active ? undefined : '2 2'} opacity={active ? 1 : 0.55}>
                    <path d={pair.l} strokeLinecap="round" />
                    <path d={pair.r} strokeLinecap="round" />
                  </g>
                );
              })}
            </svg>
            <div>
              <span className="font-mono text-xs text-spider-yellow uppercase font-bold block">
                Your Personal Web
              </span>
              <span className="text-xs font-sans text-gray-300">
                {guide.answeredCount} of {guide.totalDecisions} decisions woven
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-spider-cyan font-bold uppercase">
            {guide.isComplete ? 'Complete' : `${guide.answeredCount}/${guide.totalDecisions}`}
          </span>
        </div>

        {/* 1. Your Strengths */}
        <div className="space-y-2.5 text-left">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="font-comic text-lg text-emerald-400 uppercase tracking-wide">
              Your strengths
            </h2>
          </div>
          {guide.strengths.map((s, idx) => (
            <div key={idx} className="p-3.5 bg-[#0E1526] border border-emerald-500/35 rounded-xs space-y-1">
              <div className="font-sans font-bold text-sm sm:text-base text-white">{s.title}</div>
              <div className="font-mono text-[11px] text-spider-cyan">{s.evidence}</div>
              <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">{s.explanation}</p>
            </div>
          ))}
        </div>

        {/* 2. What You Could Work On */}
        <div className="space-y-2.5 text-left">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-400" />
            <h2 className="font-comic text-lg text-amber-400 uppercase tracking-wide">
              What you could work on
            </h2>
          </div>
          {guide.opportunities.map((opp, idx) => (
            <div key={idx} className="p-3.5 bg-[#171307] border border-amber-500/50 rounded-xs space-y-1">
              <div className="font-sans font-bold text-sm sm:text-base text-white">{opp.label}</div>
              <div className="font-mono text-[11px] text-amber-300">{opp.evidence}</div>
              <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">{opp.text}</p>
            </div>
          ))}
        </div>

        {/* 3. What To Try Next */}
        <div className="space-y-2.5 text-left">
          <div className="flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-spider-cyan" />
            <h2 className="font-comic text-lg text-spider-cyan uppercase tracking-wide">
              What to try next
            </h2>
          </div>
          {guide.actions.map((act, idx) => (
            <div key={idx} className="p-3.5 bg-[#0A1525] border border-spider-cyan/45 rounded-xs space-y-1.5">
              <div className="font-sans font-bold text-sm sm:text-base text-white">{act.title}</div>
              <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">{act.action}</p>
              {act.exampleScript && (
                <p className="font-sans text-xs text-amber-200 italic bg-black/50 px-2.5 py-2 rounded-2xs border-l-2 border-amber-400">
                  {act.exampleScript}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Across Communities */}
        <div className="p-3.5 bg-[#0B101D] border border-slate-700 rounded-xs text-left space-y-1">
          <span className="font-mono text-[11px] font-bold uppercase text-purple-300 block">
            {guide.crossWorldLesson.title}
          </span>
          <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
            {guide.crossWorldLesson.text}
          </p>
        </div>

        {/* Saved Choices Compact Reference */}
        {guide.reflections.length > 0 && (
          <div className="p-3.5 bg-[#060912] border border-gray-800 rounded-xs text-left space-y-1.5">
            <span className="font-mono text-[11px] font-bold uppercase text-gray-400 block">
              Saved Choices
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-gray-300">
              {guide.reflections.map((r) => (
                <div key={r.chapter}>
                  <span className="font-mono text-spider-cyan">Ch. {r.chapter}:</span> {r.youChose}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="font-mono text-[10px] text-gray-400 text-center border-t border-gray-800 pt-3">
          {guide.disclaimer}
        </p>
      </div>
    </div>
  );
};
