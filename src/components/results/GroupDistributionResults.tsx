import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Eye } from 'lucide-react';
import { DecisionOption } from '../../types';
import { TOPIC_LEARNING_ANGLES } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';

interface GroupDistributionResultsProps {
  options: DecisionOption[];
  counts: Record<string, number>;
  userChoice?: string;
  isDemoData?: boolean;
  reducedMotion?: boolean;
}

export const GroupDistributionResults: React.FC<GroupDistributionResultsProps> = ({
  options,
  counts,
  userChoice,
  isDemoData = false,
  reducedMotion = false,
}) => {
  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);
  const totalVotes = options.reduce((sum, opt) => sum + (counts[opt.id] || 0), 0);

  return (
    <div className="w-full bg-[#0A0F1D] border-3 border-black p-4 rounded-sm shadow-comic my-3 text-left">
      <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-3 border-b border-gray-800 pb-2">
        <span className="text-spider-cyan font-bold uppercase tracking-wider">
          OUR ROOM &bull; ANONYMOUS TOTALS
        </span>
        <span className="font-bold text-white">
          {totalVotes} {totalVotes === 1 ? 'RESPONSE' : 'RESPONSES'}
        </span>
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
          const isMyChoice = userChoice === opt.id;
          const isExpanded = expandedOptionId === opt.id;
          const learningAngle = TOPIC_LEARNING_ANGLES[opt.id];

          const barColors = ['bg-spider-cyan', 'bg-spider-yellow', 'bg-spider-red', 'bg-purple-500'];
          const barColor = barColors[idx % barColors.length];

          return (
            <div 
              key={opt.id} 
              className={`p-2.5 rounded-xs border transition-all ${
                isMyChoice
                  ? 'bg-[#121E33] border-spider-cyan shadow-comic-sm'
                  : 'bg-black/40 border-gray-800'
              }`}
            >
              <div className="flex items-start justify-between text-xs sm:text-sm font-sans text-gray-200 mb-1">
                <div className="pr-2">
                  <span className="font-semibold text-white block leading-snug">{opt.label}</span>
                  {isMyChoice && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-spider-cyan font-bold uppercase mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Your choice</span>
                    </span>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-bold text-white block">
                    {percentage}%
                  </span>
                  <span className="font-mono text-[9px] text-gray-400">
                    ({count})
                  </span>
                </div>
              </div>

              {/* Percentage Bar Track */}
              <div className="w-full h-2.5 bg-black/80 rounded-full border border-gray-700 overflow-hidden mb-1.5">
                <motion.div
                  initial={reducedMotion ? false : { width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full ${barColor} rounded-full`}
                />
              </div>

              {/* Alternative Approach Preview Action */}
              {learningAngle && (
                <div className="pt-1.5 border-t border-gray-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-400 truncate mr-2">
                    Prioritizes: {learningAngle.whatThisPrioritizes}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setExpandedOptionId(isExpanded ? null : opt.id);
                    }}
                    className="text-spider-yellow hover:underline flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
                  >
                    <Eye className="w-2.5 h-2.5" />
                    <span>{isExpanded ? 'Hide' : 'Tradeoff'}</span>
                  </button>
                </div>
              )}

              {/* Expanded Tradeoff Insight */}
              {isExpanded && learningAngle && (
                <div className="mt-2 p-2 bg-black/60 border border-gray-800 rounded-xs text-xs font-sans text-gray-300 space-y-1">
                  <p className="text-[11px] text-amber-300">
                    <span className="font-mono uppercase font-bold text-[10px] block">What to watch for:</span>
                    {learningAngle.whatToWatchFor}
                  </p>
                  <p className="text-[11px] text-spider-cyan italic">
                    <span className="font-mono uppercase font-bold text-[10px] block">Try this:</span>
                    {learningAngle.tryThisAction}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] font-mono text-gray-400 text-center">
        Different perspectives reflect different building architectures &bull; An unchosen option is an alternative to explore, not a weakness
      </div>
    </div>
  );
};
