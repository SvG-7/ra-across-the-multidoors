import React from 'react';
import { GraduationCap, Briefcase, Home, Clock } from 'lucide-react';
import { ChapterStoryDetail } from '../../types';

interface Chapter5AlexStoryProps {
  storyDetails: ChapterStoryDetail[];
  revealedIds?: string[];
  onToggleReveal?: (id: string) => void;
  reducedMotion?: boolean;
}

export const Chapter5AlexStory: React.FC<Chapter5AlexStoryProps> = ({
  storyDetails,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-spider-cyan flex-shrink-0" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-400 flex-shrink-0" />;
      case 'Home':
        return <Home className="w-5 h-5 text-spider-red flex-shrink-0" />;
      case 'Clock':
      default:
        return <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="w-full space-y-3.5 text-left">
      <div className="bg-[#0B1528] border-l-4 border-amber-400 px-3.5 py-2.5 rounded-r-xs">
        <p className="font-sans font-bold text-[20px] sm:text-[22px] text-[#F8FAFC] leading-[1.35]">
          What might you be missing about Ned’s day?
        </p>
      </div>

      {/* Everyday Schedule Context (No communication preferences revealed yet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {storyDetails.map((detail) => (
          <div
            key={detail.id}
            className="p-3 bg-[#0C1220] border-2 border-slate-700/80 rounded-sm flex items-start gap-2.5 shadow-comic-sm"
          >
            <div className="p-1.5 bg-black/70 border border-slate-700 rounded-xs flex-shrink-0">
              {getIcon(detail.iconName)}
            </div>
            <div className="min-w-0">
              <span className="font-comic text-base text-white uppercase tracking-wide block leading-tight">
                {detail.label}
              </span>
              <span className="text-xs font-sans text-gray-300 leading-snug block mt-0.5">
                {detail.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[19px] sm:text-[20px] font-sans font-semibold text-amber-200 leading-[1.35] pt-1">
        Being independent does not mean Ned needs zero connection.
      </p>
    </div>
  );
};
