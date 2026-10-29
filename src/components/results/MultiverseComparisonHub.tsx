import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  Eye, 
  AlertCircle,
  RefreshCw,
  Edit3
} from 'lucide-react';
import { AttendeeSession, SharedResponses } from '../../types';
import { CHAPTERS_DATA } from '../../data/chaptersData';
import { TOPIC_LEARNING_ANGLES } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';

interface MultiverseComparisonHubProps {
  session: AttendeeSession;
  sharedResponses: SharedResponses;
  onJumpToChapter: (chapterNumber: number) => void;
  onRetryConnection?: () => void;
  reducedMotion?: boolean;
}

export const MultiverseComparisonHub: React.FC<MultiverseComparisonHubProps> = ({
  session,
  sharedResponses,
  onJumpToChapter,
  onRetryConnection,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<'room' | 'my_journey' | 'explore_alternatives'>('room');
  const [selectedTopicChapter, setSelectedTopicChapter] = useState<number>(2);
  const [previewOptionId, setPreviewOptionId] = useState<string | null>(null);

  const decisionChapters = [
    { number: 2, title: 'Connection', prompt: 'Connecting with Alex' },
    { number: 3, title: 'Trust & Boundaries', prompt: 'Addressing peer accountability' },
    { number: 4, title: 'Communication Channel', prompt: 'Invitation channel for Alex' },
    { number: 6, title: 'Adaptability', prompt: 'Refining approach after learning routine' },
  ];

  const activeChapterData = CHAPTERS_DATA.find((c) => c.number === selectedTopicChapter) || CHAPTERS_DATA[1];
  const activeOptions = activeChapterData.options || [];

  // Determine current room counts for the selected chapter
  const getCountsForChapter = (ch: number): Record<string, number> => {
    switch (ch) {
      case 2: return sharedResponses.chapter2 || {};
      case 3: return sharedResponses.chapter3 || {};
      case 4: return sharedResponses.chapter4 || {};
      case 6: return sharedResponses.chapter6 || {};
      default: return {};
    }
  };

  const counts = getCountsForChapter(selectedTopicChapter);
  const totalVotesForChapter = activeOptions.reduce((sum, opt) => sum + (counts[opt.id] || 0), 0);
  const myChoiceId = session.answers[selectedTopicChapter];

  // Status message and styling
  const status = sharedResponses.connectionStatus || 'has_contributions';
  const getStatusBadge = () => {
    switch (status) {
      case 'loading':
        return (
          <span className="flex items-center gap-1.5 text-spider-cyan font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded border border-spider-cyan/40">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Connecting to conference room...</span>
          </span>
        );
      case 'connected_empty':
        return (
          <span className="flex items-center gap-1.5 text-gray-300 font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded border border-gray-700">
            <Users className="w-3.5 h-3.5 text-spider-yellow" />
            <span>Connected &bull; Awaiting room contributions</span>
          </span>
        );
      case 'only_me':
        return (
          <span className="flex items-center gap-1.5 text-spider-yellow font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded border border-spider-yellow/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-spider-yellow" />
            <span>Connected &bull; You're the first in the room to record an answer</span>
          </span>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-rose-400 font-mono text-[11px] bg-rose-950/60 px-2.5 py-1 rounded border border-rose-500/50">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Room connection offline</span>
            {onRetryConnection && (
              <button
                onClick={onRetryConnection}
                className="underline font-bold text-white ml-1 cursor-pointer"
              >
                Retry
              </button>
            )}
          </div>
        );
      case 'has_contributions':
      default:
        return (
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded border border-emerald-500/40">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{sharedResponses.totalParticipants} Attendees who have answered</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-[#080D1A] border-3 border-black rounded-sm shadow-comic p-4 sm:p-5 my-4 text-left">
      {/* 1. Header & Consolidated Participant Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-spider-yellow uppercase tracking-wider block mb-0.5">
            CONFERENCE PARTICIPATION
          </span>
          <h2 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
            Shared Multiverse Web
          </h2>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      {/* 2. Cohesive 3-in-1 View Switcher */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-black/80 border-2 border-black rounded-sm mb-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('room');
          }}
          className={`py-2 px-1 text-center font-comic text-sm uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
            activeTab === 'room'
              ? 'bg-spider-red text-white shadow-comic-sm font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Our Room
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('my_journey');
          }}
          className={`py-2 px-1 text-center font-comic text-sm uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
            activeTab === 'my_journey'
              ? 'bg-spider-cyan text-black shadow-comic-sm font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Choices
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('explore_alternatives');
          }}
          className={`py-2 px-1 text-center font-comic text-sm uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
            activeTab === 'explore_alternatives'
              ? 'bg-spider-yellow text-black shadow-comic-sm font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Explore Other
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: OUR ROOM (ANONYMOUS TOTALS + TOPIC HUBS & ANSWER BRANCHES)   */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'room' && (
        <div className="space-y-4">
          {/* Topic Hub Selector Bar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
              Select Decision Topic Hub:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {decisionChapters.map((hub) => {
                const isSelected = selectedTopicChapter === hub.number;
                const hasMyAnswer = !!session.answers[hub.number];
                return (
                  <button
                    key={hub.number}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedTopicChapter(hub.number);
                      setPreviewOptionId(null);
                    }}
                    className={`p-2 border rounded-xs text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#182238] border-spider-cyan text-white shadow-comic-sm'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                      <span className="font-bold">HUB #{hub.number}</span>
                      {hasMyAnswer && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="You answered" />
                      )}
                    </div>
                    <div className="font-comic text-xs uppercase truncate leading-tight">
                      {hub.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Topic Brief */}
          <div className="p-3 bg-black/60 border border-gray-800 rounded-xs flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-spider-cyan uppercase font-bold block">
                Chapter {activeChapterData.number} Scenario:
              </span>
              <p className="text-xs sm:text-sm font-sans text-white font-semibold">
                {activeChapterData.situation || activeChapterData.introduction}
              </p>
            </div>
            {myChoiceId && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onJumpToChapter(selectedTopicChapter);
                }}
                className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-spider-yellow font-mono text-[10px] uppercase rounded border border-gray-700 flex items-center gap-1 flex-shrink-0 cursor-pointer"
                title="Change your answer in the scenario"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change Answer</span>
              </button>
            )}
          </div>

          {/* Answer Branches with Real Response Counts & Percentages */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
              Room Responses &bull; Total for this question: {totalVotesForChapter}
            </span>

            {activeOptions.map((opt, idx) => {
              const count = counts[opt.id] || 0;
              const percentage = totalVotesForChapter > 0 ? Math.round((count / totalVotesForChapter) * 100) : 0;
              const isMyChoice = myChoiceId === opt.id;
              const isPreviewing = previewOptionId === opt.id;
              const learningAngle = TOPIC_LEARNING_ANGLES[opt.id];

              const barColors = ['bg-spider-cyan', 'bg-spider-yellow', 'bg-spider-red', 'bg-purple-500'];
              const barColor = barColors[idx % barColors.length];

              return (
                <div 
                  key={opt.id}
                  className={`p-3 rounded-xs border-2 transition-all ${
                    isMyChoice
                      ? 'bg-[#121E33] border-spider-cyan shadow-comic-sm'
                      : isPreviewing
                      ? 'bg-[#1A1608] border-spider-yellow'
                      : 'bg-black/50 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-start gap-2">
                      <span className="font-comic text-xs px-1.5 py-0.2 bg-black text-gray-300 rounded border border-gray-700 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div>
                        <span className="text-xs sm:text-sm font-sans font-bold text-white block leading-snug">
                          {opt.label}
                        </span>
                        {isMyChoice && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-spider-cyan text-black font-mono font-bold text-[9px] uppercase rounded-xs mt-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Your Selected Route</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-mono text-sm font-bold text-white block">
                        {percentage}%
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">
                        ({count} {count === 1 ? 'response' : 'responses'})
                      </span>
                    </div>
                  </div>

                  {/* Percentage Bar Track */}
                  <div className="w-full h-2.5 bg-black rounded-full border border-gray-800 overflow-hidden mb-2">
                    <motion.div
                      initial={reducedMotion ? false : { width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`h-full ${barColor} rounded-full`}
                    />
                  </div>

                  {/* Learning Angle Breakdown & Preview Toggle */}
                  <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-gray-300 text-[11px] italic">
                      {learningAngle?.whatThisPrioritizes}
                    </span>

                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setPreviewOptionId(isPreviewing ? null : opt.id);
                      }}
                      className="text-[10px] font-mono text-spider-yellow hover:underline flex items-center gap-1 ml-2 flex-shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{isPreviewing ? 'Hide Details' : 'Preview Tradeoffs'}</span>
                    </button>
                  </div>

                  {/* Expanded Preview Details (Does not change saved answer) */}
                  {isPreviewing && learningAngle && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 pt-2.5 border-t border-dashed border-gray-800 text-xs space-y-1.5 text-left"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                          Tradeoff / What to watch for:
                        </span>
                        <p className="text-gray-200 font-sans text-xs">
                          {learningAngle.whatToWatchFor}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-spider-cyan font-bold block">
                          Try this in practice:
                        </span>
                        <p className="text-gray-200 font-sans text-xs italic bg-black/60 p-1.5 rounded border border-gray-800">
                          {learningAngle.tryThisAction}
                        </p>
                      </div>

                      {!isMyChoice && (
                        <div className="pt-1 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gray-400">
                            Exploring alternative approaches builds range.
                          </span>
                          <button
                            onClick={() => {
                              soundEngine.playClick();
                              onJumpToChapter(selectedTopicChapter);
                            }}
                            className="px-2 py-1 bg-spider-red hover:bg-spider-crimson text-white font-comic text-xs uppercase tracking-wide rounded-xs border border-black cursor-pointer"
                          >
                            Revise My Answer in Ch. {selectedTopicChapter}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-black/40 border border-gray-800 rounded-xs text-[10px] font-mono text-gray-400 text-center">
            Perspectives reflect varying community cultures &bull; The most popular answer is not the single "correct" answer
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: MY CHOICES (RECORDED ANSWERS & JOURNEY)                     */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'my_journey' && (
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
            Your Recorded Decision Pathway:
          </span>

          {decisionChapters.map((hub) => {
            const optId = session.answers[hub.number];
            const learning = optId ? TOPIC_LEARNING_ANGLES[optId] : null;

            return (
              <div 
                key={hub.number}
                className="p-3 bg-[#0A0E1A] border-2 border-gray-800 rounded-xs text-left space-y-1.5"
              >
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <span className="font-mono text-xs text-spider-cyan font-bold uppercase">
                    CH. {hub.number} &bull; {hub.title}
                  </span>
                  {optId ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Answered</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onJumpToChapter(hub.number)}
                      className="text-[10px] font-mono text-spider-yellow hover:underline cursor-pointer"
                    >
                      Answer Now &rarr;
                    </button>
                  )}
                </div>

                {learning ? (
                  <>
                    <div className="font-sans text-xs sm:text-sm font-bold text-white">
                      "{learning.label}"
                    </div>
                    <p className="text-xs font-sans text-gray-300">
                      <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold block">
                        What this prioritizes:
                      </span>
                      {learning.whatThisPrioritizes}
                    </p>
                  </>
                ) : (
                  <p className="text-xs font-sans text-gray-400 italic">
                    Not yet answered. Jump to Chapter {hub.number} to record your approach.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: EXPLORE ALTERNATIVE APPROACHES                               */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'explore_alternatives' && (
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
            Alternatives to Explore (Complementary Muscles):
          </span>
          <p className="text-xs font-sans text-gray-300 mb-2">
            An option you did not choose is an alternative approach to consider, not a weakness. Preview their principles and tradeoffs:
          </p>

          <div className="space-y-3">
            {decisionChapters.map((hub) => {
              const myOpt = session.answers[hub.number];
              const chapterObj = CHAPTERS_DATA.find((c) => c.number === hub.number);
              const unchosenOptions = (chapterObj?.options || []).filter((o) => o.id !== myOpt);

              return (
                <div key={hub.number} className="p-3 bg-black/60 border border-gray-800 rounded-xs space-y-2">
                  <span className="text-xs font-mono font-bold text-spider-cyan uppercase block">
                    Chapter {hub.number} &bull; {hub.title}
                  </span>

                  <div className="space-y-2">
                    {unchosenOptions.map((opt) => {
                      const angle = TOPIC_LEARNING_ANGLES[opt.id];
                      if (!angle) return null;

                      return (
                        <div key={opt.id} className="p-2 bg-[#0E1524] border border-gray-700/60 rounded-xs">
                          <span className="font-sans text-xs font-bold text-white block mb-0.5">
                            {opt.label}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 block mb-1">
                            Useful principle: {angle.whatThisPrioritizes}
                          </span>
                          <p className="text-xs font-sans text-gray-300 italic">
                            Tradeoff: {angle.whatToWatchFor}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
