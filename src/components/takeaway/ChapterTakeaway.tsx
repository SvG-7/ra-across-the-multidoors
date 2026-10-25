import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ChapterTakeawayProps {
  takeaway: string;
  chapterNumber: number;
  reducedMotion?: boolean;
}

export const ChapterTakeaway: React.FC<ChapterTakeawayProps> = ({
  takeaway,
  chapterNumber,
  reducedMotion = false,
}) => {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full my-4 p-4 bg-gradient-to-r from-[#170E28] via-[#101935] to-[#170E28] border-3 border-spider-yellow rounded-sm shadow-comic text-center"
    >
      <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-spider-yellow uppercase tracking-widest mb-1.5">
        <Sparkles className="w-3.5 h-3.5 fill-spider-yellow" />
        <span>CHAPTER {chapterNumber} CORE TAKEAWAY</span>
        <Sparkles className="w-3.5 h-3.5 fill-spider-yellow" />
      </div>

      <p className="font-comic text-xl sm:text-2xl text-white tracking-wide leading-snug drop-shadow-sm">
        "{takeaway}"
      </p>
    </motion.div>
  );
};
