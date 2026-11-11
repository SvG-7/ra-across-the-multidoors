import React, { useState } from 'react';
import {
  DoorClosed,
  KeyRound,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  Play,
} from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { CommunityType } from '../../types';
import { ThemedDoor } from '../doors/ThemedDoor';
import { CinematicSpiderManEntrance } from '../animation/CinematicSpiderManEntrance';

interface Chapter1WelcomeProps {
  selectedCommunity?: CommunityType;
  onSelectCommunity: (community: CommunityType) => void;
  onContinue: () => void;
  onTriggerEntryTransition?: () => void;
  reducedMotion?: boolean;
}

export const Chapter1Welcome: React.FC<Chapter1WelcomeProps> = ({
  selectedCommunity,
  onSelectCommunity,
  onContinue,
  reducedMotion = false,
}) => {
  const [showCinematicEntrance, setShowCinematicEntrance] = useState(false);

  const communityTiles: {
    type: CommunityType;
    label: string;
    hint: string;
    accentBorder: string;
    activeFill: string;
    badgeBg: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: 'Residence hall',
      label: 'Residence Hall',
      hint: 'Shared corridors & halls',
      accentBorder: 'border-spider-red/70 hover:border-spider-red',
      activeFill: 'bg-[#2B0C14] border-spider-red ring-2 ring-spider-red/50',
      badgeBg: 'bg-spider-red text-white',
      icon: <DoorClosed className="w-5 h-5" />,
    },
    {
      type: 'Apartment community',
      label: 'Apartment',
      hint: 'Separate doors & leases',
      accentBorder: 'border-spider-cyan/70 hover:border-spider-cyan',
      activeFill: 'bg-[#082032] border-spider-cyan ring-2 ring-spider-cyan/50',
      badgeBg: 'bg-spider-cyan text-black',
      icon: <KeyRound className="w-5 h-5" />,
    },
    {
      type: 'Both',
      label: 'Both',
      hint: 'Working across both styles',
      accentBorder: 'border-amber-400/70 hover:border-amber-400',
      activeFill: 'bg-[#261D07] border-amber-400 ring-2 ring-amber-400/50',
      badgeBg: 'bg-amber-400 text-black',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      type: 'New to the RA role',
      label: 'New RA',
      hint: 'Starting out in the role',
      accentBorder: 'border-purple-400/70 hover:border-purple-400',
      activeFill: 'bg-[#1D1030] border-purple-400 ring-2 ring-purple-400/50',
      badgeBg: 'bg-purple-500 text-white',
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full font-sans">
      <CinematicSpiderManEntrance
        isOpen={showCinematicEntrance}
        onClose={() => setShowCinematicEntrance(false)}
        reducedMotion={reducedMotion}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
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

          <div className="text-center lg:text-left lg:hidden">
            <h1 className="font-comic text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none">
              Same Role. Different World.
            </h1>
            <p className="text-sm text-gray-300 mt-1.5">
              Same mission of community and care, shaped by the doors we work behind.
            </p>
          </div>

          <ThemedDoor
            chapterNumber={1}
            chapterTitle="Same Role. Different World."
            doorTheme="Two Worlds"
            isOpen={true}
            reducedMotion={reducedMotion}
            showReplay={false}
          />
        </div>

        {/* Heading + Community Picker + Next (Right on Desktop) */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="hidden lg:block space-y-2">
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
              Same Role. Different World.
            </h1>
            <p className="text-base text-gray-300">
              Same mission of community and care, shaped by the doors we work behind.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-lg sm:text-xl text-white mb-2.5">
              Which community fits your role?
            </h2>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {communityTiles.map((tile) => {
                const isSelected = selectedCommunity === tile.type;
                return (
                  <button
                    key={tile.type}
                    type="button"
                    onClick={() => {
                      soundEngine.playThwip();
                      onSelectCommunity(tile.type);
                    }}
                    className={`min-h-[74px] p-3.5 rounded-sm border-2 text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between gap-2 shadow-comic-sm ${
                      isSelected
                        ? tile.activeFill
                        : `bg-[#0D1322] ${tile.accentBorder}`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`w-8 h-8 rounded-xs flex items-center justify-center border border-black/40 ${tile.badgeBg}`}>
                        {tile.icon}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-mono font-bold text-spider-yellow uppercase">
                          <Check className="w-3.5 h-3.5" />
                          Selected
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-comic text-base sm:text-lg text-white uppercase tracking-wide block leading-tight">
                        {tile.label}
                      </span>
                      <span className="text-xs font-sans text-gray-300 block mt-0.5 leading-snug">
                        {tile.hint}
                      </span>
                    </div>
                  </button>
                );
              })}
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
