import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface AudioToggleProps {
  onToggle?: (enabled: boolean) => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ onToggle }) => {
  const [enabled, setEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    soundEngine.setMuted(!nextState);
    if (nextState) {
      soundEngine.playClick();
    }
    if (onToggle) onToggle(nextState);
  };

  return (
    <button
      onClick={toggleSound}
      title={enabled ? "Mute Comic Audio" : "Enable Spider-Verse Web Audio"}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 font-display text-sm tracking-wider uppercase transition-all duration-200 ${
        enabled
          ? 'bg-spider-red text-white border-black shadow-comic-sm hover:translate-x-[1px] hover:translate-y-[1px]'
          : 'bg-black/60 text-gray-300 border-gray-700 hover:border-spider-cyan hover:text-spider-cyan'
      }`}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-white animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-spider-cyan" />
      )}
      <span className="font-bold">
        SFX: {enabled ? 'ON' : 'OFF'}
      </span>
      {enabled && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spider-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-spider-cyan"></span>
        </span>
      )}
    </button>
  );
};
