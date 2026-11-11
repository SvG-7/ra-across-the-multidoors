import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BarChart3,
  Check,
} from 'lucide-react';
import {
  ChapterData,
  AttendeeSession,
  CommunityType,
  SharedResponses,
  CollectiveContribution,
} from '../../types';
import { ThemedDoor } from '../doors/ThemedDoor';
import { Chapter1Welcome } from './Chapter1Welcome';
import { Chapter5AlexStory } from '../story/Chapter5AlexStory';
import { GroupDistributionResults } from '../results/GroupDistributionResults';
import { Chapter7Conclusion } from './Chapter7Conclusion';
import { soundEngine } from '../../audio/soundEffects';

interface AttendeeChapterViewProps {
  chapter: ChapterData;
  session: AttendeeSession;
  sharedResponses: SharedResponses;
  collectiveContributions: CollectiveContribution[];
  onSelectCommunity: (community: CommunityType) => void;
  onSubmitAnswer: (chapterNumber: number, optionId: string) => void;
  onToggleStoryReveal: (id: string) => void;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onJumpToChapter: (chapterNumber: number) => void;
  onTriggerEntryTransition?: () => void;
  onReplayTransition?: (type: '4_to_5' | 'entry_to_1') => void;
  reducedMotion?: boolean;
}

const TILE_STYLES = [
  {
    name: 'red',
    border: 'border-spider-red/75 hover:border-spider-red',
    selected: 'bg-[#2C0B14] border-spider-red ring-2 ring-spider-red/50',
    chipBg: 'bg-spider-red text-white',
    shape: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
        <polygon points="8,2 14,13 2,13" />
      </svg>
    ),
  },
  {
    name: 'cyan',
    border: 'border-spider-cyan/75 hover:border-spider-cyan',
    selected: 'bg-[#082235] border-spider-cyan ring-2 ring-spider-cyan/50',
    chipBg: 'bg-spider-cyan text-black',
    shape: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
        <polygon points="8,1 15,8 8,15 1,8" />
      </svg>
    ),
  },
  {
    name: 'amber',
    border: 'border-amber-400/75 hover:border-amber-400',
    selected: 'bg-[#281E07] border-amber-400 ring-2 ring-amber-400/50',
    chipBg: 'bg-amber-400 text-black',
    shape: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
        <circle cx="8" cy="8" r="6" />
      </svg>
    ),
  },
  {
    name: 'purple',
    border: 'border-purple-400/75 hover:border-purple-400',
    selected: 'bg-[#1D1030] border-purple-400 ring-2 ring-purple-400/50',
    chipBg: 'bg-purple-500 text-white',
    shape: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
        <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
      </svg>
    ),
  },
];

export const AttendeeChapterView: React.FC<AttendeeChapterViewProps> = ({
  chapter,
  session,
  sharedResponses,
  onSelectCommunity,
  onSubmitAnswer,
  onNextChapter,
  onPrevChapter,
  onJumpToChapter,
  onTriggerEntryTransition,
  onReplayTransition,
  reducedMotion = false,
}) => {
  const currentChapterNumber = chapter.number;
  const userChoice = session.answers[currentChapterNumber];
  const [showRoomVotes, setShowRoomVotes] = useState(false);

  const selectedOptionObj = chapter.options?.find((o) => o.id === userChoice);

  return (
    <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 py-4 sm:py-6 pb-16 select-none font-sans">
      {/* Chapter 1: Opening Screen (Separate RA Setting + Video Observation Question) */}
      {currentChapterNumber === 1 && (
        <Chapter1Welcome
          chapterTitle={chapter.title}
          selectedCommunity={session.selectedCommunity}
          selectedVideoChoice={session.answers[1]}
          videoOptions={chapter.options}
          videoCounts={sharedResponses.chapter1 || {}}
          onSelectCommunity={onSelectCommunity}
          onSelectVideoObservation={(optId) => onSubmitAnswer(1, optId)}
          onContinue={onNextChapter}
          onTriggerEntryTransition={onTriggerEntryTransition}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Chapters 2–6: Kahoot-Style Visual Clarity */}
      {currentChapterNumber > 1 && currentChapterNumber < 7 && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Mobile Header above artwork */}
          <div className="lg:hidden space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-spider-cyan">
                {currentChapterNumber} / 7
              </span>
              {currentChapterNumber === 5 && onReplayTransition && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    onReplayTransition('4_to_5');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Ch. 4&rarr;5</span>
                </button>
              )}
            </div>
            <h1 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide leading-tight">
              {chapter.title}
            </h1>
          </div>

          {/* Left Column (Desktop) / Top Visual (Mobile): Large Visual Focus */}
          <div className="lg:col-span-6">
            <ThemedDoor
              key={currentChapterNumber}
              chapterNumber={currentChapterNumber}
              chapterTitle={chapter.title}
              doorTheme={chapter.doorTheme}
              isOpen={true}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Right Column (Desktop) / Lower Stack (Mobile): Question, Tiles, Nav */}
          <div className="lg:col-span-6 flex flex-col space-y-4 text-left">
            {/* Desktop Heading & Progress */}
            <div className="hidden lg:block space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-spider-cyan">
                  {currentChapterNumber} / 7
                </span>
                {currentChapterNumber === 5 && onReplayTransition && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onReplayTransition('4_to_5');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Ch. 4&rarr;5</span>
                  </button>
                )}
              </div>
              <h1 className="font-comic text-3xl xl:text-4xl text-white uppercase tracking-wide leading-tight">
                {chapter.title}
              </h1>
            </div>

            {/* Chapter 5 (No Question): Short Cue & Visible Schedule */}
            {currentChapterNumber === 5 && chapter.storyDetails && (
              <Chapter5AlexStory storyDetails={chapter.storyDetails} reducedMotion={reducedMotion} />
            )}

            {/* Question Chapters (2, 3, 4, 6) */}
            {chapter.hasDecision && chapter.options && (
              <div className="space-y-3.5">
                {/* Chapter 6: Show the 3 Important New Facts clearly before asking "What would you change?" */}
                {currentChapterNumber === 6 && (
                  <div className="p-3 bg-[#0C1220] border border-amber-400/50 rounded-xs space-y-1.5">
                    <span className="font-mono text-[11px] uppercase font-bold text-amber-300 block">
                      What you just learned about Ned
                    </span>
                    <ul className="text-sm font-sans text-gray-200 space-y-0.5 list-disc list-inside">
                      <li>Ned mutes group chats.</li>
                      <li>Unexpected visits are difficult.</li>
                      <li>Short direct messages are easier to answer.</li>
                    </ul>
                  </div>
                )}

                {/* Essential Context (for Chapters 2, 3, 4) + Question */}
                <div className="space-y-1">
                  {chapter.situation && currentChapterNumber !== 6 && (
                    <p className="text-sm sm:text-base font-sans text-gray-300 leading-snug">
                      {chapter.situation}
                    </p>
                  )}
                  <h2 className="font-sans font-bold text-xl sm:text-2xl text-white leading-tight pt-0.5">
                    {chapter.decisionPrompt}
                  </h2>
                  {chapter.scopeNote && (
                    <p className="text-xs font-mono text-gray-400 pt-0.5">
                      {chapter.scopeNote}
                    </p>
                  )}
                </div>

                {/* Large Kahoot-Style Answer Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {chapter.options.map((opt, idx) => {
                    const isSelected = userChoice === opt.id;
                    const theme = TILE_STYLES[idx % TILE_STYLES.length];
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playThwip();
                          onSubmitAnswer(currentChapterNumber, opt.id);
                        }}
                        className={`w-full min-h-[64px] sm:min-h-[74px] p-3.5 rounded-sm border-2 flex items-center gap-3 text-left transition-all active:scale-[0.98] cursor-pointer shadow-comic-sm ${
                          isSelected
                            ? theme.selected
                            : `bg-[#0D1322] ${theme.border}`
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xs flex items-center justify-center flex-shrink-0 border border-black/40 ${theme.chipBg}`}
                          aria-hidden="true"
                        >
                          {theme.shape}
                        </span>
                        <span className="flex-1 font-sans font-semibold text-sm sm:text-base text-white leading-snug">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-spider-yellow text-black flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Brief Immediate Feedback Line */}
                {selectedOptionObj?.consideration && (
                  <p className="text-sm font-sans text-spider-cyan bg-[#0A1324] border border-spider-cyan/40 rounded-xs px-3.5 py-2.5 leading-snug">
                    {selectedOptionObj.consideration}
                  </p>
                )}

                {/* Discreet Optional Room Poll Peek */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setShowRoomVotes(!showRoomVotes);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-spider-cyan cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>{showRoomVotes ? 'Hide room responses' : 'See room responses'}</span>
                  </button>

                  {showRoomVotes && (
                    <div className="mt-2">
                      <GroupDistributionResults
                        options={chapter.options}
                        counts={
                          sharedResponses[
                            `chapter${currentChapterNumber}` as
                              | 'chapter2'
                              | 'chapter3'
                              | 'chapter4'
                              | 'chapter6'
                          ] || {}
                        }
                        userChoice={userChoice}
                        reducedMotion={reducedMotion}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Clear Back & Next Navigation */}
            <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onPrevChapter();
                }}
                className="min-h-[48px] px-4 py-2.5 bg-[#0C111E] hover:bg-black text-gray-200 border-2 border-gray-700 hover:border-gray-500 rounded-sm font-comic text-base uppercase tracking-wide flex items-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNextChapter();
                }}
                className="flex-1 min-h-[48px] px-6 py-2.5 bg-spider-red hover:bg-spider-crimson text-white font-comic text-lg sm:text-xl uppercase tracking-wider border-2 border-black rounded-sm shadow-comic flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter 7: Detailed Scrollable Field Guide + Explorer */}
      {currentChapterNumber === 7 && (
        <div className="w-full space-y-4">
          <Chapter7Conclusion
            session={session}
            sharedResponses={sharedResponses}
            onJumpToChapter={onJumpToChapter}
            onPrevChapter={onPrevChapter}
            reducedMotion={reducedMotion}
          />
        </div>
      )}
    </div>
  );
};
