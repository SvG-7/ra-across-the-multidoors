import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  BarChart3,
  Check
} from 'lucide-react';
import { ChapterData, AttendeeSession, CommunityType, SharedResponses, CollectiveContribution } from '../../types';
import { StateCueBadge } from '../ui/StateCueBadge';
import { ThemedDoor } from '../doors/ThemedDoor';
import { Chapter1Welcome } from './Chapter1Welcome';
import { Chapter5AlexStory } from '../story/Chapter5AlexStory';
import { ChapterTakeaway } from '../takeaway/ChapterTakeaway';
import { CommunicationRouteGraphic } from '../animation/CommunicationRouteGraphic';
import { AttendeeWebProgress } from '../web/AttendeeWebProgress';
import { CollectiveWeb } from '../web/CollectiveWeb';
import { SpiderTracker } from '../tracker/SpiderTracker';
import { GroupDistributionResults } from '../results/GroupDistributionResults';
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
  reducedMotion?: boolean;
}

export const AttendeeChapterView: React.FC<AttendeeChapterViewProps> = ({
  chapter,
  session,
  sharedResponses,
  collectiveContributions,
  onSelectCommunity,
  onSubmitAnswer,
  onToggleStoryReveal,
  onNextChapter,
  onPrevChapter,
  onJumpToChapter,
  reducedMotion = false,
}) => {
  const currentChapterNumber = chapter.number;
  const userChoice = session.answers[currentChapterNumber];
  const hasAnswered = !!userChoice;
  const [showSharedResults, setShowSharedResults] = useState(false);

  // Retrieve Chapter 4 choice for Chapter 6 recall
  const ch4OptionId = session.answers[4];
  const getCh4Details = () => {
    if (!ch4OptionId) return null;
    switch (ch4OptionId) {
      case 'opt_c4_groupchat':
        return { label: 'Community group chat', channelType: 'groupchat' as const };
      case 'opt_c4_directmsg':
        return { label: 'Personal message', channelType: 'directmsg' as const };
      case 'opt_c4_inperson':
        return { label: 'In-person conversation', channelType: 'inperson' as const };
      case 'opt_c4_email':
        return { label: 'Short email', channelType: 'email' as const };
      default:
        return null;
    }
  };
  const ch4Details = getCh4Details();

  // Find active option details
  const selectedOptionObj = chapter.options?.find((o) => o.id === userChoice);

  // Count web connections formed
  const webConnectionsCount = Object.keys(session.answers).length;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 pb-24 flex flex-col items-center select-none font-sans">
      {/* 1. Header Progress & State Cue Badge */}
      <StateCueBadge
        currentChapter={currentChapterNumber}
        totalChapters={7}
        hasAnswered={hasAnswered}
        hasDecision={chapter.hasDecision}
        guideCue={chapter.guideCue}
        reducedMotion={reducedMotion}
      />

      {/* Chapter 1: Introduction & World Selection */}
      {currentChapterNumber === 1 && (
        <Chapter1Welcome
          selectedCommunity={session.selectedCommunity}
          onSelectCommunity={onSelectCommunity}
          onContinue={onNextChapter}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Chapters 2 through 7 */}
      {currentChapterNumber > 1 && (
        <div className="w-full flex flex-col items-center text-center">
          {/* Comic Issue & Mission Header Badge (Chapters 2-6) */}
          {currentChapterNumber < 7 && (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-spider-red text-white font-mono text-[11px] font-bold uppercase tracking-wider border-2 border-black shadow-comic-sm mb-2 -rotate-1">
                <span>ISSUE #{currentChapterNumber}</span>
                <span className="text-spider-yellow">&bull;</span>
                <span>
                  {currentChapterNumber === 2 ? 'MISSION: THE INVISIBLE RESIDENT'
                    : currentChapterNumber === 3 ? 'MISSION: RELATIONSHIP DYNAMICS'
                    : currentChapterNumber === 4 ? 'MISSION: TRANSMISSION SIGNALS'
                    : currentChapterNumber === 5 ? 'DOSSIER: LIFE BEHIND THE DEADBOLT'
                    : 'CROSSROADS: SUPERPOWER ADAPTATION'}
                </span>
              </div>

              {/* Chapter Title */}
              <h2 className="font-comic text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight mt-1 mb-1">
                {chapter.title}
              </h2>

              {/* Short Introduction connecting to presentation */}
              <p className="text-xs sm:text-sm font-sans text-gray-300 leading-snug max-w-sm mb-3">
                {chapter.introduction}
              </p>

              {/* Themed Door Animation (Chapters 2-6) */}
              <ThemedDoor
                chapterNumber={currentChapterNumber}
                doorTheme={chapter.doorTheme}
                isOpen={true}
                reducedMotion={reducedMotion}
              />
            </>
          )}

          {/* Situation Brief styled as a comic narration box (Chapters 2-6) */}
          {chapter.situation && currentChapterNumber < 7 && (
            <div className="w-full relative bg-[#0C1222] border-3 border-black p-4 rounded-sm shadow-comic my-2.5 text-left overflow-hidden">
              <div className="absolute inset-0 bg-halftone-cyan opacity-10 pointer-events-none" />
              <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2 relative z-10">
                <span className="text-[10px] font-mono font-bold text-spider-yellow uppercase tracking-widest bg-black/70 px-2 py-0.5 border border-spider-yellow/40 rounded-xs">
                  NARRATION // SITUATION BRIEF
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  PANEL #{currentChapterNumber}.1
                </span>
              </div>
              <p className="font-sans text-base text-gray-100 leading-snug relative z-10">
                {chapter.situation}
              </p>
            </div>
          )}

          {/* Scope Note (for Chapter 3: opening approaches vs complete policy) */}
          {chapter.scopeNote && (
            <div className="w-full p-2.5 bg-black/40 border border-gray-700/60 rounded-xs text-left mb-2">
              <p className="text-xs font-mono text-gray-400 leading-relaxed">
                <span className="text-spider-cyan font-bold">NOTE: </span>
                {chapter.scopeNote}
              </p>
            </div>
          )}

          {/* Chapter 6 Special Recall: Shows earlier Chapter 4 choice */}
          {currentChapterNumber === 6 && (
            <div className="w-full bg-[#160B1C] border-2 border-spider-gwenPink/60 p-3.5 rounded-sm shadow-sm my-2 text-left">
              <span className="text-[10px] font-mono font-bold text-spider-gwenPink uppercase tracking-wider block mb-1">
                PAST DECISION RECALLED
              </span>
              {ch4Details ? (
                <div>
                  <p className="font-sans text-base text-gray-200 leading-snug">
                    Earlier in Chapter 4, you chose:{' '}
                    <span className="font-bold text-white bg-black/60 px-2 py-0.5 border border-spider-gwenPink rounded-xs inline-block mt-0.5">
                      "{ch4Details.label}"
                    </span>
                  </p>
                  <p className="text-xs font-sans text-gray-300 mt-2 leading-snug">
                    {ch4OptionId === 'opt_c4_directmsg'
                      ? 'Your earlier choice already favored direct messaging! Alex’s reality confirms that direct check-ins work best. Now refine your approach.'
                      : 'Alex explains why broad group channels and unexpected visits are difficult to sustain with an intense routine. How would you adapt?'}
                  </p>
                </div>
              ) : (
                <p className="font-sans text-sm text-gray-300 leading-snug">
                  In Chapter 4, initial communication channels were explored. Now, Alex shares that short direct messages are far easier to manage.
                </p>
              )}
            </div>
          )}

          {/* Chapter 5 Story Reveal (Alex's Details) */}
          {currentChapterNumber === 5 && chapter.storyDetails && (
            <Chapter5AlexStory
              storyDetails={chapter.storyDetails}
              revealedIds={session.revealedStoryIds}
              onToggleReveal={onToggleStoryReveal}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Interactive Decision Section (Chapters 2, 3, 4, 6) */}
          {chapter.hasDecision && chapter.options && (
            <div className="w-full my-3">
              <div className="relative bg-[#090D1A] border-3 border-black p-4 rounded-sm shadow-comic text-left overflow-hidden">
                <div className="absolute inset-0 bg-halftone-cyan opacity-10 pointer-events-none" />
                <div className="mb-3 relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-block bg-spider-yellow text-black text-[11px] font-mono font-bold px-2 py-0.5 rounded-xs border border-black shadow-comic-sm">
                      YOUR DECISION
                    </span>
                    {hasAnswered && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tap any option to revise</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-white leading-snug">
                    {chapter.decisionPrompt}
                  </h3>
                </div>

                {/* Option Buttons */}
                <div className="space-y-2.5 relative z-10">
                  {chapter.options.map((opt) => {
                    const isSelected = userChoice === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          soundEngine.playThwip();
                          onSubmitAnswer(currentChapterNumber, opt.id);
                        }}
                        className={`w-full min-h-[52px] p-3.5 text-left rounded-sm border-2 transition-all active:scale-[0.98] shadow-sm flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-spider-red text-white border-black shadow-comic font-bold ring-2 ring-spider-yellow'
                            : 'bg-black/70 hover:bg-spider-cyan/15 border-gray-700 hover:border-spider-cyan text-gray-100 font-semibold'
                        }`}
                      >
                        <span className="text-base font-sans leading-snug">{opt.label}</span>
                        <span
                          className={`text-xs font-mono uppercase flex-shrink-0 ${
                            isSelected ? 'text-spider-yellow font-bold' : 'text-spider-cyan'
                          }`}
                        >
                          {isSelected ? '✓ CHOSEN' : 'SELECT →'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consideration Feedback Card (Shown immediately upon choosing) */}
              <AnimatePresence>
                {selectedOptionObj && selectedOptionObj.consideration && (
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full p-4 bg-[#0A1424] border-2 border-emerald-500/80 rounded-sm shadow-comic text-left mt-3"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-comic text-base uppercase tracking-wider mb-1.5">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>APPROACH CONSIDERATION</span>
                    </div>
                    <p className="text-sm font-sans text-gray-200 leading-snug">
                      {selectedOptionObj.consideration}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Chapter 4 Communication Signal Route Visualizer */}
          {currentChapterNumber === 4 && selectedOptionObj && selectedOptionObj.channelType && (
            <CommunicationRouteGraphic
              channelType={selectedOptionObj.channelType}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Chapter 6 Adapted Communication Path Visualizer */}
          {currentChapterNumber === 6 && ch4Details && (
            <CommunicationRouteGraphic
              channelType={ch4Details.channelType}
              isAdapted={true}
              adaptedOptionId={userChoice}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Shared Audience Responses (Expandable & Non-intrusive) */}
          {chapter.hasDecision && chapter.options && (
            <div className="w-full my-2">
              <button
                onClick={() => setShowSharedResults(!showSharedResults)}
                className="w-full py-2 px-3 bg-black/40 hover:bg-black/60 border border-gray-800 rounded-sm text-xs font-mono text-gray-400 hover:text-spider-cyan flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-spider-cyan" />
                  <span>
                    {showSharedResults ? 'Hide Audience Poll Distribution' : 'View Audience Poll Distribution'}
                  </span>
                </span>
                <span className="text-[10px] text-gray-500">
                  {showSharedResults ? '▲ Close' : '▼ Expand'}
                </span>
              </button>

              {showSharedResults && (
                <div className="mt-2">
                  <GroupDistributionResults
                    options={chapter.options}
                    counts={
                      (sharedResponses[
                        `chapter${currentChapterNumber}` as 'chapter2' | 'chapter3' | 'chapter4' | 'chapter6'
                      ] || {})
                    }
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}
            </div>
          )}

          {/* Personal Growing Spiderweb (Chapters 2-6) */}
          {webConnectionsCount > 0 && currentChapterNumber < 7 && (
            <AttendeeWebProgress
              connectionsCount={webConnectionsCount}
              ch4Choice={session.answers[4]}
              ch6Choice={session.answers[6]}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Core Chapter Takeaway Banner (Chapters 2-6) */}
          {currentChapterNumber < 7 && (
            <ChapterTakeaway
              chapterNumber={currentChapterNumber}
              takeaway={chapter.takeaway}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Chapter 7: The Multiverse RA Conclusion View with Interactive Spider-Tracker */}
          {currentChapterNumber === 7 && (
            <div className="w-full my-3">
              {/* Interactive Spider-Tracker Map & List View with Perched Spider-Man */}
              <SpiderTracker
                session={session}
                onJumpToChapter={onJumpToChapter}
                reducedMotion={reducedMotion}
              />

              {/* Shared Collective Web Canvas */}
              <div className="w-full bg-[#080D1A] border-3 border-black p-4 rounded-sm shadow-comic mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2 border-b border-gray-800 pb-2">
                  <span className="text-spider-cyan font-bold uppercase tracking-wider">
                    SHARED MULTIVERSE WEB
                  </span>
                  <span>{collectiveContributions.length} CONNECTED AGENTS</span>
                </div>

                <CollectiveWeb
                  contributions={collectiveContributions}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          )}

          {/* Navigation Bar (Next & Back Buttons) */}
          <div className="w-full mt-4 pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
            {/* Back Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onPrevChapter();
              }}
              className="py-3 px-4 bg-black/60 hover:bg-black text-gray-300 hover:text-white text-sm font-comic tracking-wide uppercase border border-gray-700 rounded-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Ch. {currentChapterNumber - 1}</span>
            </button>

            {/* Next Button */}
            {currentChapterNumber < 7 && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNextChapter();
                }}
                className="flex-1 py-3.5 px-5 bg-spider-red hover:bg-spider-crimson text-white text-lg font-comic tracking-wider uppercase border-2 border-black rounded-sm shadow-comic flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer min-h-[50px]"
              >
                <span>Continue to Ch. {currentChapterNumber + 1}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {currentChapterNumber === 7 && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onJumpToChapter(1);
                }}
                className="py-3 px-4 bg-spider-cyan hover:bg-spider-blue text-black font-comic text-sm tracking-wide uppercase border-2 border-black rounded-sm shadow-comic flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Return to Start</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
