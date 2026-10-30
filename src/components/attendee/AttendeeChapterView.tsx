import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  BarChart3
} from 'lucide-react';
import { ChapterData, AttendeeSession, CommunityType, SharedResponses, CollectiveContribution } from '../../types';
import { StateCueBadge } from '../ui/StateCueBadge';
import { ThemedDoor } from '../doors/ThemedDoor';
import { Chapter1Welcome } from './Chapter1Welcome';
import { Chapter5AlexStory } from '../story/Chapter5AlexStory';
import { ChapterTakeaway } from '../takeaway/ChapterTakeaway';
import { CommunicationRouteGraphic } from '../animation/CommunicationRouteGraphic';
import { AttendeeWebProgress } from '../web/AttendeeWebProgress';
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
  reducedMotion?: boolean;
}

export const AttendeeChapterView: React.FC<AttendeeChapterViewProps> = ({
  chapter,
  session,
  sharedResponses,
  collectiveContributions: _collectiveContributions,
  onSelectCommunity,
  onSubmitAnswer,
  onToggleStoryReveal,
  onNextChapter,
  onPrevChapter,
  onJumpToChapter,
  onTriggerEntryTransition,
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
          onTriggerEntryTransition={onTriggerEntryTransition}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Chapters 2 through 7 */}
      {currentChapterNumber > 1 && (
        <div className="w-full flex flex-col items-center text-center">
          {/* Comic Issue & Mission Header Badge (Chapters 2-6) */}
          {currentChapterNumber < 7 && (
            <div className="w-full mb-3">
              <div className="inline-block bg-spider-red text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-comic -rotate-1 mb-2">
                ISSUE #{currentChapterNumber} &bull; {currentChapterNumber === 6 ? 'CROSSROADS: SUPERPOWER ADAPTATION' : currentChapterNumber === 5 ? 'DOSSIER: LIFE BEHIND THE DEADBOLT' : currentChapterNumber === 4 ? 'MISSION: TRANSMISSION LANGUAGES' : currentChapterNumber === 3 ? 'MISSION: RELATIONSHIP DYNAMICS' : 'MISSION: THE INVISIBLE RESIDENT'}
              </div>
              <h1 className="font-comic text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight drop-shadow-[2px_2px_0px_#000]">
                {chapter.title}
              </h1>
              <p className="text-xs sm:text-sm font-sans text-gray-300 max-w-sm mx-auto mt-1 leading-snug">
                {chapter.introduction}
              </p>
            </div>
          )}

          {/* Chapter Themed Door Graphic (Chapters 2-6) */}
          {currentChapterNumber < 7 && (
            <ThemedDoor
              chapterNumber={currentChapterNumber}
              doorTheme={chapter.doorTheme}
              isOpen={hasAnswered || currentChapterNumber === 5}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Chapter 5 Story Discovery: Behind Alex's Closed Door */}
          {currentChapterNumber === 5 && chapter.storyDetails && (
            <Chapter5AlexStory
              storyDetails={chapter.storyDetails}
              revealedIds={session.revealedStoryIds}
              onToggleReveal={onToggleStoryReveal}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Chapters 2, 3, 4, 6 Decision Scenarios */}
          {chapter.hasDecision && chapter.options && (
            <div className="w-full mt-3">
              {/* Situation Brief Panel */}
              {chapter.situation && (
                <div className="w-full bg-[#080D1A] border-3 border-black p-3.5 sm:p-4 rounded-sm shadow-comic mb-4 text-left">
                  <div className="flex items-center justify-between mb-1.5 border-b border-gray-800 pb-1">
                    <span className="text-[10px] font-mono font-bold text-spider-yellow uppercase tracking-wider">
                      NARRATION // SITUATION BRIEF
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      PANEL #{currentChapterNumber}.1
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-gray-100 leading-snug font-medium">
                    {chapter.situation}
                  </p>
                </div>
              )}

              {/* Scope Note (for Chapter 3 boundary protocols) */}
              {chapter.scopeNote && (
                <div className="p-2.5 bg-black/60 border border-spider-cyan/40 rounded-xs text-[11px] font-mono text-gray-300 leading-normal text-left mb-4">
                  <span className="text-spider-cyan font-bold">NOTE: </span>
                  {chapter.scopeNote}
                </div>
              )}

              {/* Chapter 6: Recall and explicitly reference Chapter 4 choice */}
              {currentChapterNumber === 6 && ch4Details && (
                <div className="w-full p-3.5 bg-gradient-to-r from-spider-dark via-[#180A18] to-spider-dark border-2 border-spider-magenta/80 rounded-sm shadow-comic text-left mb-4">
                  <div className="flex items-center gap-1.5 text-spider-magenta text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                    <span>PAST DECISION RECALLED</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-gray-200 leading-snug">
                    Earlier in Chapter 4, you chose:{' '}
                    <span className="font-comic text-sm sm:text-base text-white px-2 py-0.5 bg-spider-magenta/30 border border-spider-magenta rounded-xs inline-block my-0.5">
                      "{ch4Details.label}"
                    </span>
                  </p>
                  <p className="text-[11px] font-sans text-gray-400 mt-1">
                    {ch4Details.channelType === 'groupchat'
                      ? "Alex explained that large group chats are routinely muted due to work shifts. Now choose how you adapt your outreach."
                      : "Your earlier choice already favored direct messaging! Alex's reality confirms that direct check-ins work best. Now refine your approach."}
                  </p>
                </div>
              )}

              {/* Decision Prompt Banner */}
              <div className="w-full text-left mb-2.5">
                <span className="bg-spider-yellow text-black px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wide border border-black shadow-comic-sm">
                  YOUR DECISION
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white mt-1">
                  {chapter.decisionPrompt}
                </h3>
              </div>

              {/* 4 Interactive Option Cards */}
              <div className="space-y-2.5 mb-4 text-left">
                {chapter.options.map((opt) => {
                  const isSelected = userChoice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        soundEngine.playThwip();
                        onSubmitAnswer(currentChapterNumber, opt.id);
                      }}
                      className={`w-full min-h-[54px] p-3.5 sm:p-4 border-2 rounded-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
                        isSelected
                          ? 'bg-spider-red text-white border-black shadow-comic font-bold'
                          : 'bg-black/60 hover:bg-spider-cyan/15 border-gray-700 hover:border-spider-cyan text-gray-200 font-medium'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-sans pr-2 leading-snug">
                        {opt.label}
                      </span>
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

              {/* Chapter 4 Route Graphic */}
              {currentChapterNumber === 4 && hasAnswered && ch4Details && (
                <div className="w-full my-3">
                  <CommunicationRouteGraphic
                    channelType={ch4Details.channelType}
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}

              {/* Dynamic Consideration Callout for Selected Option */}
              {selectedOptionObj?.consideration && (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-3 bg-black/70 border border-spider-cyan/60 rounded-xs text-xs sm:text-sm font-sans text-gray-200 leading-snug text-left mb-3"
                >
                  <span className="font-bold text-spider-cyan font-mono text-xs uppercase block mb-0.5">
                    Strategic Tradeoff to Weigh:
                  </span>
                  {selectedOptionObj.consideration}
                </motion.div>
              )}
            </div>
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
                    userChoice={userChoice}
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

          {/* Chapter 7: Simplified Personal Takeaway & Exploration */}
          {currentChapterNumber === 7 && (
            <div className="w-full my-3">
              <Chapter7Conclusion
                session={session}
                sharedResponses={sharedResponses}
                onJumpToChapter={onJumpToChapter}
                reducedMotion={reducedMotion}
              />
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
