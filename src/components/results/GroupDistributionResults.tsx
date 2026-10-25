import React from 'react';
import { motion } from 'framer-motion';
import { DecisionOption } from '../../types';

interface GroupDistributionResultsProps {
  options: DecisionOption[];
  counts: Record<string, number>;
  isDemoData?: boolean;
  reducedMotion?: boolean;
}

export const GroupDistributionResults: React.FC<GroupDistributionResultsProps> = ({
  options,
  counts,
  isDemoData = false,
  reducedMotion = false,
}) => {
  const totalVotes = options.reduce((sum, opt) => sum + (counts[opt.id] || 0), 0);

  return (
    <div className="w-full bg-[#0A0F1D] border-3 border-black p-4 rounded-sm shadow-comic my-3 text-left">
      <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-3 border-b border-gray-800 pb-2">
        <span className="text-spider-cyan font-bold uppercase tracking-wider">
          AUDIENCE DISTRIBUTION
        </span>
        <span>{totalVotes} RESPONSES</span>
      </div>

      {isDemoData && (
        <div className="mb-3 py-1 px-2.5 bg-amber-950/60 border border-amber-500/60 text-amber-300 text-xs font-mono rounded-xs text-center font-bold">
          DEMONSTRATION DATA (REHEARSAL MODE)
        </div>
      )}

      <div className="space-y-3">
        {options.map((opt, idx) => {
          const count = counts[opt.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const barColors = ['bg-spider-cyan', 'bg-spider-yellow', 'bg-spider-red', 'bg-spider-gwenPink'];
          const barColor = barColors[idx % barColors.length];

          return (
            <div key={opt.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm sm:text-base font-sans text-gray-200">
                <span className="font-medium pr-2 leading-snug">{opt.label}</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-white flex-shrink-0">
                  {percentage}% <span className="text-gray-400 font-normal">({count})</span>
                </span>
              </div>

              {/* Percentage Bar Track */}
              <div className="w-full h-3 bg-black/80 rounded-full border border-gray-700 overflow-hidden">
                <motion.div
                  initial={reducedMotion ? false : { width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full ${barColor} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400 text-center">
        Perspectives vary based on campus culture &bull; Tradeoffs discussed by presenters
      </div>
    </div>
  );
};
