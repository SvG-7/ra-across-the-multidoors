import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Monitor, 
  Smartphone,
  Lock
} from 'lucide-react';
import { ChapterData, SharedResponses } from '../../types';
import { soundEngine } from '../../audio/soundEffects';

interface PresenterViewProps {
  chapters: ChapterData[];
  sharedResponses: SharedResponses;
  onExitAdmin: () => void;
  onOpenDisplay: () => void;
}

export const PresenterView: React.FC<PresenterViewProps> = ({
  chapters,
  sharedResponses,
  onExitAdmin,
  onOpenDisplay,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const currentVotesCount = currentChapter.options
    ? Object.values(
        (sharedResponses[
          `chapter${currentChapter.number}` as 'chapter2' | 'chapter3' | 'chapter4' | 'chapter6'
        ] as Record<string, number>) || {}
      ).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 text-white font-sans">
      {/* Presenter Top Bar */}
      <div className="bg-[#0C1222] border-3 border-black p-4 rounded-sm shadow-comic mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-spider-yellow" />
            <h1 className="font-comic text-2xl sm:text-3xl tracking-wide text-white">
              PRESENTER COMMAND NEXUS (PROTECTED)
            </h1>
          </div>
          <p className="text-xs font-mono text-gray-400">
            Presentation Team Rehearsal & Live Audience Response Monitor
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDisplay}
            className="px-3 py-1.5 bg-black/60 hover:bg-spider-cyan/20 border border-spider-cyan text-spider-cyan text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Open Big Screen Display</span>
          </button>
          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 bg-black/60 hover:bg-spider-yellow/20 border border-spider-yellow text-spider-yellow text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Back to Attendee Experience</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-[#090D1A] border-2 border-black rounded-xs shadow-comic-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <Users className="w-4 h-4 text-spider-cyan" />
            <span>TOTAL PARTICIPANTS</span>
          </div>
          <div className="font-comic text-3xl text-spider-cyan">
            {sharedResponses.totalParticipants}
          </div>
        </div>

        <div className="p-3 bg-[#090D1A] border-2 border-black rounded-xs shadow-comic-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <BarChart3 className="w-4 h-4 text-spider-yellow" />
            <span>CH. {currentChapter.number} RESPONSES</span>
          </div>
          <div className="font-comic text-3xl text-spider-yellow">
            {currentVotesCount}
          </div>
        </div>

        <div className="p-3 bg-[#090D1A] border-2 border-black rounded-xs shadow-comic-sm">
          <div className="text-xs font-mono text-gray-400 mb-1">STATUS</div>
          <div className="font-comic text-xl text-emerald-400 uppercase">
            AUDIENCE INDEPENDENT
          </div>
        </div>
      </div>

      {/* Chapter Selection Strip */}
      <div className="bg-[#090D1A] border-2 border-black p-4 rounded-sm shadow-comic-sm mb-6">
        <div className="text-xs font-mono text-gray-400 uppercase mb-2">
          Select Presentation Chapter to Review:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {chapters.map((ch, idx) => (
            <button
              key={ch.number}
              onClick={() => {
                soundEngine.playClick();
                setActiveChapterIndex(idx);
              }}
              className={`p-2.5 rounded-sm border-2 text-left transition-all cursor-pointer ${
                activeChapterIndex === idx
                  ? 'bg-spider-red text-white border-black shadow-comic-sm font-bold'
                  : 'bg-black/60 text-gray-300 border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="text-[10px] font-mono text-white/70">CH. {ch.number}</div>
              <div className="font-comic text-sm truncate">{ch.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chapter Details & Speaker Briefing */}
      <div className="bg-[#0E1528] border-3 border-black p-6 rounded-sm shadow-comic-lg mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-4">
          <div>
            <span className="bg-spider-yellow text-black text-xs font-mono font-bold px-2 py-0.5 rounded-xs">
              CHAPTER {currentChapter.number} OF 7
            </span>
            <h2 className="font-comic text-3xl text-white tracking-wide uppercase mt-1">
              {currentChapter.title}
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-400">
            THEME: {currentChapter.doorTheme}
          </div>
        </div>

        {/* Presenter Talking Notes */}
        <div className="p-3 bg-black/60 border border-gray-800 rounded-sm mb-6 text-sm font-sans text-gray-300">
          <strong className="text-spider-cyan block font-mono text-xs mb-1">
            SPEAKER NARRATIVE BRIEF:
          </strong>
          {currentChapter.situation || currentChapter.introduction}
        </div>

        {/* Current Poll Results */}
        {currentChapter.options && (
          <div className="p-4 bg-black/40 border border-gray-800 rounded-sm mb-6">
            <span className="text-xs font-mono text-spider-yellow uppercase tracking-wider block mb-2">
              AUDIENCE RESPONSES FOR THIS CHAPTER:
            </span>
            <div className="space-y-2">
              {currentChapter.options.map((opt) => {
                const count =
                  (sharedResponses[
                    `chapter${currentChapter.number}` as 'chapter2' | 'chapter3' | 'chapter4' | 'chapter6'
                  ] as Record<string, number>)?.[opt.id] || 0;
                return (
                  <div key={opt.id} className="flex justify-between items-center text-sm font-sans">
                    <span className="text-gray-200">{opt.label}</span>
                    <span className="font-mono text-spider-cyan font-bold">
                      {count} votes
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Core Takeaway */}
        <div className="p-4 bg-spider-red/20 border border-spider-red/50 rounded-sm text-center">
          <span className="text-xs font-mono text-spider-yellow uppercase tracking-wider block mb-1">
            CORE TAKEAWAY:
          </span>
          <p className="font-comic text-xl text-white">
            "{currentChapter.takeaway}"
          </p>
        </div>
      </div>
    </div>
  );
};
