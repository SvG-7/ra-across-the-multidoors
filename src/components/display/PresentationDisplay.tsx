import React, { useState } from 'react';
import { Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { ChapterData, SharedResponses, CollectiveContribution } from '../../types';
import { ThemedDoor } from '../doors/ThemedDoor';
import { GroupDistributionResults } from '../results/GroupDistributionResults';
import { ChapterTakeaway } from '../takeaway/ChapterTakeaway';
import { CollectiveWeb } from '../web/CollectiveWeb';

interface PresentationDisplayProps {
  chapters: ChapterData[];
  sharedResponses: SharedResponses;
  collectiveContributions: CollectiveContribution[];
  reducedMotion?: boolean;
}

export const PresentationDisplay: React.FC<PresentationDisplayProps> = ({
  chapters,
  sharedResponses,
  collectiveContributions,
  reducedMotion = false,
}) => {
  const [displayChapterIndex, setDisplayChapterIndex] = useState(0);
  const currentChapter = chapters[displayChapterIndex] || chapters[0];

  return (
    <div className="min-h-screen bg-[#06080E] text-white p-6 sm:p-8 flex flex-col justify-between select-none overflow-x-hidden font-sans">
      {/* Top Conference Stage Banner */}
      <header className="flex items-center justify-between border-b-2 border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-spider-red border-2 border-black shadow-comic-sm flex items-center justify-center -rotate-2">
            <span className="font-comic text-2xl text-white">RA</span>
          </div>
          <div>
            <h1 className="font-comic text-2xl sm:text-3xl tracking-wide text-white leading-none">
              RA: ACROSS THE MULTI-DOORS
            </h1>
            <p className="text-xs font-mono text-spider-cyan tracking-wider mt-0.5">
              ONE MISSION &bull; TWO WORLDS &bull; LEADERSHIP WORKSHOP STAGE
            </p>
          </div>
        </div>

        {/* Live Audience Counter & Chapter Pill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-spider-cyan/40 rounded-xs font-mono text-xs text-spider-cyan">
            <Users className="w-4 h-4 text-spider-cyan" />
            <span>{sharedResponses.totalParticipants} ATTENDEES ACTIVE</span>
          </div>
          <div className="px-3 py-1.5 bg-spider-yellow text-black font-comic text-sm tracking-wider uppercase border border-black shadow-comic-sm">
            CHAPTER {currentChapter.number} OF 7
          </div>
        </div>
      </header>

      {/* Main Big-Screen Stage Area */}
      <main className="flex-1 my-6 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        {currentChapter.number < 7 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
            {/* Left: Themed 3D Door Visual */}
            <div className="flex flex-col items-center justify-center">
              <div className="inline-block px-3 py-1 bg-spider-red border-2 border-black shadow-comic text-white font-comic text-sm uppercase tracking-wider mb-3">
                {currentChapter.doorTheme}
              </div>
              <ThemedDoor
                chapterNumber={currentChapter.number}
                chapterTitle={currentChapter.title}
                doorTheme={currentChapter.doorTheme}
                isOpen={true}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Right: Situation, Poll Results & Core Takeaway */}
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <h2 className="font-comic text-4xl sm:text-5xl text-white uppercase tracking-wide leading-tight">
                  {currentChapter.title}
                </h2>
                <p className="text-base text-gray-300 font-sans mt-1">
                  {currentChapter.introduction}
                </p>
              </div>

              {currentChapter.situation && (
                <div className="p-4 bg-[#090D1A] border-2 border-black rounded-sm shadow-comic">
                  <span className="text-xs font-mono font-bold text-spider-yellow uppercase tracking-wider block mb-1">
                    SCENARIO
                  </span>
                  <p className="font-sans text-lg text-white leading-snug">
                    {currentChapter.situation}
                  </p>
                </div>
              )}

              {/* Group Distribution Poll Results */}
              {currentChapter.options && (
                <GroupDistributionResults
                  options={currentChapter.options}
                  counts={
                    (sharedResponses[
                      `chapter${currentChapter.number}` as 'chapter2' | 'chapter3' | 'chapter4' | 'chapter6'
                    ] as Record<string, number>) || {}
                  }
                  reducedMotion={reducedMotion}
                />
              )}

              {/* Core Chapter Takeaway */}
              <ChapterTakeaway
                chapterNumber={currentChapter.number}
                takeaway={currentChapter.takeaway}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        ) : (
          /* Chapter 7: The Grand Multiverse Web */
          <div className="w-full max-w-4xl text-center">
            <h2 className="font-comic text-5xl sm:text-6xl text-white tracking-wide uppercase mb-2">
              THE MULTIVERSE RA: OUR SHARED WEB
            </h2>
            <p className="font-sans text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              Every outreach strategy explored across dorms and apartments connects into our leadership community.
            </p>

            <div className="bg-[#090D1A] border-3 border-black p-6 rounded-sm shadow-comic mb-6">
              <CollectiveWeb
                contributions={collectiveContributions}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="p-6 bg-gradient-to-r from-spider-red via-[#B71C1C] to-spider-red border-4 border-black text-white text-center shadow-comic-lg rounded-sm">
              <p className="font-comic text-3xl sm:text-4xl tracking-wide uppercase leading-snug">
                "Take one approach from the other world into your own community."
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Stage Display Stage Controls (Subtle bottom bar for stage AV operator) */}
      <footer className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-gray-800 pt-3">
        <span>PROJECTOR STAGE DISPLAY &bull; INDEPENDENT AUDIENCE SYNC</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDisplayChapterIndex((p) => Math.max(0, p - 1))}
            disabled={displayChapterIndex === 0}
            className="px-2.5 py-1 bg-black/60 hover:bg-black border border-gray-700 disabled:opacity-30 text-gray-300 rounded cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-3 h-3" /> Prev
          </button>
          <span>CH. {displayChapterIndex + 1} / 7</span>
          <button
            onClick={() => setDisplayChapterIndex((p) => Math.min(6, p + 1))}
            disabled={displayChapterIndex === 6}
            className="px-2.5 py-1 bg-black/60 hover:bg-black border border-gray-700 disabled:opacity-30 text-gray-300 rounded cursor-pointer flex items-center gap-1"
          >
            Next <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </div>
  );
};
