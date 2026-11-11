import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Layers, ChevronDown } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { CHAPTERS_DATA } from '../../data/chaptersData';

interface ComicNavbarProps {
  reducedMotion: boolean;
  onToggleMotion: (reduced: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  currentChapter: number;
  onSelectChapter?: (chapterNumber: number) => void;
}

export const ComicNavbar: React.FC<ComicNavbarProps> = ({
  reducedMotion,
  onToggleMotion,
  soundEnabled,
  onToggleSound,
  currentChapter,
  onSelectChapter,
}) => {
  const [showChapterMenu, setShowChapterMenu] = useState(false);

  return (
    <header className="relative z-40 w-full bg-spider-dark/95 backdrop-blur-md border-b-2 border-black shadow-comic-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Logo & Compact Step Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 flex-shrink-0 bg-spider-red border-2 border-black shadow-comic-sm flex items-center justify-center -rotate-2">
            <span className="font-comic text-lg text-white leading-none">RA</span>
          </div>
          <div className="truncate">
            <span className="font-comic text-base sm:text-lg text-white leading-tight block truncate tracking-wide">
              ACROSS THE MULTI-DOORS
            </span>
          </div>
        </div>

        {/* Navigation & Accessibility Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onSelectChapter && (
            <div className="relative">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowChapterMenu(!showChapterMenu);
                }}
                title="Jump to chapter"
                aria-label="Jump to chapter"
                className="h-10 px-2.5 flex items-center gap-1.5 rounded-sm bg-black/60 hover:bg-black border border-gray-700 hover:border-spider-cyan text-gray-200 hover:text-spider-cyan text-xs font-mono active:scale-95 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-spider-cyan" />
                <span className="font-mono font-bold">{currentChapter} / 7</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {showChapterMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setShowChapterMenu(false)}
                  />
                  <div className="absolute right-0 top-12 z-50 w-64 bg-[#0A0E1A] border-2 border-black rounded-sm shadow-comic p-2 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-gray-400 uppercase px-2 py-1 border-b border-gray-800">
                      Jump to chapter
                    </div>
                    {CHAPTERS_DATA.map((ch) => (
                      <button
                        key={ch.number}
                        onClick={() => {
                          soundEngine.playClick();
                          onSelectChapter(ch.number);
                          setShowChapterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xs flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          currentChapter === ch.number
                            ? 'bg-spider-red text-white font-bold'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="truncate">
                          <span className="font-mono text-[10px] text-spider-yellow mr-1.5">
                            {ch.number}.
                          </span>
                          {ch.title}
                        </span>
                        {currentChapter === ch.number && (
                          <span className="text-[10px] font-mono text-white">&bull;</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMotion(!reducedMotion);
            }}
            title={reducedMotion ? 'Enable Full Motion' : 'Reduce Motion'}
            aria-label={reducedMotion ? 'Enable Full Motion' : 'Reduce Motion'}
            className={`w-10 h-10 flex items-center justify-center rounded-sm border-2 transition-all active:scale-95 cursor-pointer ${
              reducedMotion
                ? 'bg-spider-yellow text-black border-black shadow-comic-sm font-bold'
                : 'bg-black/60 text-gray-300 border-gray-700 hover:border-spider-cyan hover:text-spider-cyan'
            }`}
          >
            {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              const next = !soundEnabled;
              soundEngine.setMuted(!next);
              if (next) soundEngine.playClick();
              onToggleSound(next);
            }}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            className={`w-10 h-10 flex items-center justify-center rounded-sm border-2 transition-all active:scale-95 cursor-pointer ${
              soundEnabled
                ? 'bg-spider-red text-white border-black shadow-comic-sm'
                : 'bg-black/60 text-gray-300 border-gray-700 hover:border-spider-cyan hover:text-spider-cyan'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
