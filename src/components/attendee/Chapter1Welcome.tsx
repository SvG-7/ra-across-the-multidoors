import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  Play,
  BarChart3,
} from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { CommunityType, DecisionOption } from '../../types';
import { ThemedDoor } from '../doors/ThemedDoor';
import { GroupDistributionResults } from '../results/GroupDistributionResults';
import { CinematicSpiderManEntrance } from '../animation/CinematicSpiderManEntrance';

interface Chapter1WelcomeProps {
  chapterTitle: string;
  selectedCommunity?: CommunityType;
  selectedVideoChoice?: string;
  videoOptions?: DecisionOption[];
  videoCounts?: Record<string, number>;
  onSelectCommunity: (community: CommunityType) => void;
  onSelectVideoObservation: (optionId: string) => void;
  onContinue: () => void;
  onTriggerEntryTransition?: () => void;
  reducedMotion?: boolean;
}

const VIDEO_TILE_STYLES = [
  {
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
    border: 'border-amber-400/75 hover:border-amber-400',
    selected: 'bg-[#281E07] border-amber-400 ring-2 ring-amber-400/50',
    chipBg: 'bg-amber-400 text-black',
    shape: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
        <circle cx="8" cy="8" r="6" />
      </svg>
    ),
  },
];

export const Chapter1Welcome: React.FC<Chapter1WelcomeProps> = ({
  chapterTitle,
  selectedCommunity,
  selectedVideoChoice,
  videoOptions = [],
  videoCounts = {},
  onSelectCommunity,
  onSelectVideoObservation,
  onContinue,
  reducedMotion = false,
}) => {
  const [showCinematicEntrance, setShowCinematicEntrance] = useState(false);
  const [showRoomVotes, setShowRoomVotes] = useState(false);

  const communityPills: { type: CommunityType; label: string }[] = [
    { type: 'Residence hall', label: 'Residence Hall' },
    { type: 'Apartment community', label: 'Apartment' },
    { type: 'Both', label: 'Both' },
    { type: 'New to the RA role', label: 'New RA' },
  ];

  const selectedVideoOption = videoOptions.find((o) => o.id === selectedVideoChoice);

  return (
    <div className="w-full font-sans">
      <CinematicSpiderManEntrance
        isOpen={showCinematicEntrance}
        onClose={() => setShowCinematicEntrance(false)}
        reducedMotion={reducedMotion}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Visual Hero Stage (Left on Desktop, Top on Mobile) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between lg:hidden">
            <span className="font-mono text-xs font-bold text-spider-cyan">1 / 7</span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setShowCinematicEntrance(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-spider-cyan hover:text-white cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch intro</span>
            </button>
          </div>

          <div className="text-left lg:hidden">
            <h1 className="font-comic text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none">
              {chapterTitle}
            </h1>
          </div>

          <ThemedDoor
            chapterNumber={1}
            chapterTitle={chapterTitle}
            doorTheme={chapterTitle}
            isOpen={true}
            reducedMotion={reducedMotion}
            showReplay={false}
          />
        </div>

        {/* Right Column: Background Pill Selector + Separate Video Observation Question */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="hidden lg:block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-spider-cyan">1 / 7</span>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowCinematicEntrance(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-spider-cyan hover:text-white cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch intro</span>
              </button>
            </div>
            <h1 className="font-comic text-4xl xl:text-5xl text-white uppercase tracking-wide leading-none">
              {chapterTitle}
            </h1>
          </div>

          {/* 1. Opening Community Background Selection (for the personal guide later) */}
          <div className="p-3 bg-[#0A101E] border border-gray-800 rounded-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300 font-bold">
                Your own RA community
              </span>
              {selectedCommunity && (
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  ✓ {selectedCommunity === 'New to the RA role' ? 'New RA' : selectedCommunity}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {communityPills.map((pill) => {
                const active = selectedCommunity === pill.type;
                return (
                  <button
                    key={pill.type}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectCommunity(pill.type);
                    }}
                    className={`min-h-[40px] px-2.5 py-1.5 rounded-xs border text-xs font-sans font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-spider-yellow text-black border-black font-bold shadow-comic-sm'
                        : 'bg-[#0F172A] text-gray-200 border-gray-700 hover:border-spider-cyan'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Separate Spoken-Discussion Observation Question About the Video */}
          <div className="space-y-3 pt-1">
            <div className="space-y-2.5">
              <div className="bg-[#0B1528] border-l-4 border-spider-cyan px-3.5 py-2.5 rounded-r-xs">
                <p className="text-[20px] sm:text-[21px] font-sans font-semibold text-[#F8FAFC] leading-[1.35]">
                  Think about the morning video before we share out loud.
                </p>
              </div>
              <h2 className="font-sans font-extrabold text-[22px] sm:text-2xl text-white leading-tight">
                Which community looked more connected?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {videoOptions.map((opt, idx) => {
                const isSelected = selectedVideoChoice === opt.id;
                const theme = VIDEO_TILE_STYLES[idx % VIDEO_TILE_STYLES.length];
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playThwip();
                      onSelectVideoObservation(opt.id);
                    }}
                    className={`w-full min-h-[58px] p-3.5 rounded-sm border-2 flex items-center gap-3 text-left transition-all active:scale-[0.98] cursor-pointer shadow-comic-sm ${
                      isSelected ? theme.selected : `bg-[#0D1322] ${theme.border}`
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xs flex items-center justify-center flex-shrink-0 border border-black/40 ${theme.chipBg}`}
                      aria-hidden="true"
                    >
                      {theme.shape}
                    </span>
                    <span className="flex-1 font-sans font-semibold text-base text-white">
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

            {selectedVideoOption?.consideration && (
              <p className="text-sm font-sans text-spider-cyan bg-[#0A1324] border border-spider-cyan/40 rounded-xs px-3.5 py-2.5 leading-snug">
                {selectedVideoOption.consideration}
              </p>
            )}

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
                    options={videoOptions}
                    counts={videoCounts}
                    userChoice={selectedVideoChoice}
                    reducedMotion={reducedMotion}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onContinue();
            }}
            className="w-full min-h-[54px] py-3.5 px-6 bg-spider-red hover:bg-spider-crimson text-white font-comic text-xl sm:text-2xl uppercase tracking-wider border-3 border-black rounded-sm shadow-comic flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
