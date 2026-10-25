import React from 'react';
import { CheckCircle2, Zap, BookOpen } from 'lucide-react';

interface StateCueBadgeProps {
  currentChapter: number;
  totalChapters?: number;
  hasAnswered?: boolean;
  hasDecision?: boolean;
  guideCue?: string;
  reducedMotion?: boolean;
}

export const StateCueBadge: React.FC<StateCueBadgeProps> = ({
  currentChapter,
  totalChapters = 7,
  hasAnswered = false,
  hasDecision = false,
  guideCue,
  reducedMotion = false,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 py-2 select-none border-b border-gray-800/80 mb-3">
      {/* Chapter Indicator */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-gray-700 rounded-xs text-xs font-mono text-gray-300">
        <span className="text-spider-cyan font-bold">Chapter {currentChapter}</span>
        <span className="text-gray-500">of {totalChapters}</span>
      </div>

      {/* Dynamic Status Cue */}
      {hasDecision && !hasAnswered && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 bg-spider-yellow text-black border-2 border-black rounded-xs shadow-comic-sm font-comic text-sm tracking-wider uppercase ${
            reducedMotion ? '' : 'animate-bounce'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-black text-black" />
          <span>YOUR TURN</span>
        </div>
      )}

      {hasDecision && hasAnswered && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-black border-2 border-black rounded-xs shadow-comic-sm font-comic text-sm tracking-wider uppercase">
          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
          <span>CHOICE SAVED</span>
        </div>
      )}

      {!hasDecision && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E1B2E] text-spider-cyan border border-spider-cyan/50 rounded-xs font-sans text-xs font-medium tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-spider-cyan" />
          <span>{guideCue || 'Story & Insights'}</span>
        </div>
      )}
    </div>
  );
};
