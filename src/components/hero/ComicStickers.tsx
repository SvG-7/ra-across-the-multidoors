import React from 'react';
import { motion } from 'framer-motion';

interface ComicStickerProps {
  text: string;
  subtext?: string;
  variant?: 'yellow' | 'red' | 'cyan' | 'gwen';
  className?: string;
  rotation?: number;
  reducedMotion?: boolean;
}

export const ComicSticker: React.FC<ComicStickerProps> = ({
  text,
  subtext,
  variant = 'yellow',
  className = '',
  rotation = -4,
  reducedMotion = false,
}) => {
  const variantStyles = {
    yellow: 'bg-spider-yellow text-black border-black shadow-comic',
    red: 'bg-spider-red text-white border-black shadow-comic-cyan',
    cyan: 'bg-spider-cyan text-black border-black shadow-comic-red',
    gwen: 'bg-spider-gwenPink text-white border-black shadow-comic',
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={reducedMotion ? {} : { scale: 1.1, rotate: rotation + 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{ rotate: `${rotation}deg` }}
      className={`inline-block border-3 px-3 py-1 font-comic uppercase tracking-wider select-none cursor-default ${variantStyles[variant]} ${className}`}
    >
      <div className="text-sm md:text-base leading-none font-bold drop-shadow-sm">
        {text}
      </div>
      {subtext && (
        <div className="text-[10px] font-sans font-extrabold tracking-normal text-black/80">
          {subtext}
        </div>
      )}
    </motion.div>
  );
};

export const ThwipBurst: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Starburst SVG */}
      <svg
        viewBox="0 0 160 80"
        className="w-28 md:w-36 h-auto drop-shadow-[4px_4px_0px_#000000]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="80,5 98,25 145,15 125,45 155,70 115,70 95,85 75,70 30,80 45,50 5,45 35,25 20,5 60,18"
          fill="#FFE600"
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <text
          x="80"
          y="50"
          textAnchor="middle"
          fontFamily="Bangers, cursive"
          fontSize="30"
          fill="#000000"
          fontWeight="bold"
          letterSpacing="2"
        >
          THWIP!
        </text>
      </svg>
    </div>
  );
};

export const SpiderSenseBurst: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      <svg viewBox="0 0 100 40" className="w-20 h-auto" fill="none">
        <path
          d="M10 20 Q 30 5, 50 20 T 90 20"
          stroke="#FF1744"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M20 28 Q 40 13, 60 28 T 80 28"
          stroke="#FFE600"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
