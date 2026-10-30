import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Eye, 
  Wifi, 
  WifiOff, 
  RefreshCw 
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
  // Tabs: 'room' (Our Room), 'my_journey' (My Choices), 'explore_alternatives' (Other Approaches)
  const [activeTab, setActiveTab] = useState<'room' | 'my_journey' | 'explore_alternatives'>('room');
  const [selectedTopicChapter, setSelectedTopicChapter] = useState<number>(2);
  const [previewOptionId, setPreviewOptionId] = useState<string | null>(null);

  const decisionChapters = [
    { number: 2, title: 'Connection' },
    { number: 3, title: 'Trust and Boundaries' },
    { number: 4, title: 'Communication' },
    { number: 6, title: 'Adaptability' },
  ];

  const currentChapterData = CHAPTERS_DATA.find((c) => c.number === selectedTopicChapter);
  const options = currentChapterData?.options || [];
  const mySavedChoice = session.answers[selectedTopicChapter];

  // Distribution data for active chapter
  const getDistForChapter = (ch: number): Record<string, number> => {
    switch (ch) {
      case 2:
        return sharedResponses.chapter2 || {};
      case 3:
        return sharedResponses.chapter3 || {};
      case 4:
        return sharedResponses.chapter4 || {};
      case 6:
        return sharedResponses.chapter6 || {};
      default:
        return {};
    }
  };

  const dist = getDistForChapter(selectedTopicChapter);
  const totalVotes = Object.values(dist).reduce((acc, v) => acc + v, 0);

  // Connection status indicator
  const connectionStatus = sharedResponses.connectionStatus || 'connected_empty';
  const isOffline = connectionStatus === 'error';

  return (
    <div className="w-full bg-[#080B14] border-3 border-black text-white rounded-sm shadow-comic p-3 sm:p-5 select-none">
      {/* 1. Header with Multi-Device Room Participant Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-800 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-spider-cyan animate-pulse" />
            <h2 className="font-comic text-xl sm:text-2xl text-white uppercase tracking-wide">
              Shared Multiverse Hub
            </h2>
          </div>
          <p className="font-sans text-xs text-gray-300">
            Here are some other approaches people explored across different communities.
          </p>
        </div>

        {/* Live sync pill badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-gray-700 rounded-xs text-[11px] font-mono">
            {isOffline ? (
              <WifiOff className="w-3.5 h-3.5 text-spider-red" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span className="text-gray-300">
              {sharedResponses.totalParticipants > 0
                ? `${sharedResponses.totalParticipants} ${sharedResponses.totalParticipants === 1 ? 'attendee' : 'attendees'} answered`
                : '1 attendee active (you)'}
            </span>
          </div>

          {isOffline && onRetryConnection && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onRetryConnection();
              }}
              className="p-1 bg-spider-red hover:bg-spider-crimson text-white rounded-xs border border-black cursor-pointer"
              title="Retry sync connection"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
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
          Other Approaches
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
                    className={`p-2 rounded-xs border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#141C30] border-spider-cyan shadow-comic-sm'
                        : 'bg-black/50 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-gray-400 uppercase">
                        Ch. {hub.number}
                      </span>
                      {hasMyAnswer && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Answered" />
                      )}
                    </div>
                    <div className={`font-comic text-xs uppercase tracking-wide truncate ${
                      isSelected ? 'text-spider-cyan font-bold' : 'text-gray-200'
                    }`}>
                      {hub.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Topic Banner */}
          <div className="p-2.5 bg-[#0C1220] border border-gray-800 rounded-xs flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-[10px] text-spider-yellow uppercase block font-bold">
                Chapter {selectedTopicChapter}: {currentChapterData?.title}
              </span>
              <p className="font-sans text-xs text-gray-300">
                "{currentChapterData?.situation}"
              </p>
            </div>
            {mySavedChoice ? (
              <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] uppercase rounded-xs flex-shrink-0">
                Route Selected
              </span>
            ) : (
              <button
                onClick={() => onJumpToChapter(selectedTopicChapter)}
                className="px-2 py-0.5 bg-spider-yellow text-black font-comic text-[10px] uppercase rounded-xs border border-black shadow-comic-sm cursor-pointer"
              >
                Choose Route &rarr;
              </button>
            )}
          </div>

          {/* Answer Options & Group Distribution */}
          <div className="space-y-2.5">
            {options.map((opt) => {
              const count = dist[opt.id] || (mySavedChoice === opt.id ? 1 : 0);
              const effectiveTotal = Math.max(totalVotes, mySavedChoice ? 1 : 0);
              const percentage = effectiveTotal > 0 ? Math.round((count / effectiveTotal) * 100) : 0;
              const isMyChoice = mySavedChoice === opt.id;
              const isPreviewing = previewOptionId === opt.id;
              const learningAngle = TOPIC_LEARNING_ANGLES[opt.id];

              const barColor = isMyChoice
                ? 'bg-spider-cyan'
                : 'bg-gradient-to-r from-spider-red to-spider-crimson';

              return (
                <div
                  key={opt.id}
                  className={`p-3 rounded-xs border-2 transition-all ${
                    isMyChoice
                      ? 'bg-[#0E1729] border-spider-cyan shadow-comic-sm'
                      : 'bg-black/60 border-gray-800'
                  }`}
                >
                  {/* Option Title & My Choice Badge */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-sans text-xs sm:text-sm font-semibold text-white leading-snug">
                      {opt.label}
                    </span>
                    {isMyChoice && (
                      <span className="px-2 py-0.5 bg-spider-cyan text-black font-mono text-[10px] font-extrabold uppercase rounded-xs border border-black flex-shrink-0">
                        YOUR ROUTE
                      </span>
                    )}
                  </div>

                  {/* Percentage & Vote Count */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
                    <span className="text-[11px] font-bold text-gray-300">
                      {percentage}% of responses
                    </span>
                    <span className="text-[11px]">
                      {count} {count === 1 ? 'peer' : 'peers'}
                    </span>
                  </div>

                  {/* Visual Distribution Progress Bar */}
                  <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800 mb-2">
                    <motion.div
                      initial={reducedMotion ? false : { width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`h-full ${barColor} rounded-full`}
                    />
                  </div>

                  {/* What this prioritizes */}
                  <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-gray-300 text-[11px]">
                      {learningAngle?.whatYouLeanedToward}
                    </span>

                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setPreviewOptionId(isPreviewing ? null : opt.id);
                      }}
                      className="text-[10px] font-mono text-spider-yellow hover:underline flex items-center gap-1 ml-2 flex-shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{isPreviewing ? 'Hide Details' : 'Details'}</span>
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isPreviewing && learningAngle && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 pt-2.5 border-t border-dashed border-gray-800 text-xs space-y-1.5 text-left"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-spider-yellow font-bold block">
                          Another approach to explore:
                        </span>
                        <p className="text-gray-200 font-sans text-xs">
                          {learningAngle.anotherApproachToExplore}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                          Something to try in your community:
                        </span>
                        <p className="text-gray-200 font-sans text-xs bg-black/60 p-1.5 rounded border border-gray-800">
                          {learningAngle.somethingToTry}
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
            Perspectives reflect varying community cultures &bull; Every approach offers valuable tools for different situations
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
                      <span className="text-spider-cyan font-mono text-[10px] uppercase font-bold block">
                        What you leaned toward:
                      </span>
                      {learning.whatYouLeanedToward}
                    </p>
                    <p className="text-xs font-sans text-gray-300 mt-1">
                      <span className="text-spider-yellow font-mono text-[10px] uppercase font-bold block">
                        Another approach to explore:
                      </span>
                      {learning.anotherApproachToExplore}
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
      {/* TAB 3: EXPLORE OTHER APPROACHES                                    */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'explore_alternatives' && (
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
            Here are some other approaches people explored:
          </span>
          <p className="text-xs font-sans text-gray-300 mb-2">
            Exploring different approaches expands your RA toolkit. Preview their principles and nuances:
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
                        <div key={opt.id} className="p-2.5 bg-[#0E1524] border border-gray-700/60 rounded-xs space-y-1">
                          <span className="font-sans text-xs font-bold text-white block">
                            "{opt.label}"
                          </span>
                          <p className="text-xs font-sans text-gray-300">
                            <span className="text-spider-cyan font-mono text-[10px] uppercase font-bold block">
                              What this prioritizes:
                            </span>
                            {angle.whatYouLeanedToward}
                          </p>
                          <p className="text-xs font-sans text-gray-300">
                            <span className="text-spider-yellow font-mono text-[10px] uppercase font-bold block">
                              Another approach to explore:
                            </span>
                            {angle.anotherApproachToExplore}
                          </p>
                          <p className="text-xs font-sans text-gray-300">
                            <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold block">
                              Something to try:
                            </span>
                            {angle.somethingToTry}
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
