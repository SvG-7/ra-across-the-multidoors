import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface MotionToggleProps {
  reducedMotion: boolean;
  onToggle: (reduced: boolean) => void;
}

export const MotionToggle: React.FC<MotionToggleProps> = ({ reducedMotion, onToggle }) => {
  const toggle = () => {
    soundEngine.playClick();
    onToggle(!reducedMotion);
  };

  return (
    <button
      onClick={toggle}
      title={reducedMotion ? "Enable Spider-Verse Dynamic Motion" : "Reduce Animations for Accessibility"}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 font-display text-sm tracking-wider uppercase transition-all duration-200 ${
        reducedMotion
          ? 'bg-amber-400 text-black border-black shadow-comic-sm font-bold'
          : 'bg-black/60 text-gray-300 border-gray-700 hover:border-spider-cyan hover:text-spider-cyan'
      }`}
    >
      {reducedMotion ? (
        <EyeOff className="w-4 h-4 text-black" />
      ) : (
        <Eye className="w-4 h-4 text-gray-400" />
      )}
      <span>{reducedMotion ? 'MOTION: REDUCED' : 'MOTION: FULL'}</span>
    </button>
  );
};
