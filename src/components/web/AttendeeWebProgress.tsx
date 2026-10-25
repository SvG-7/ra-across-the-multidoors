import React from 'react';
import { motion } from 'framer-motion';

interface AttendeeWebProgressProps {
  connectionsCount: number; // 0 to 4
  ch4Choice?: string;
  ch6Choice?: string;
  reducedMotion?: boolean;
}

export const AttendeeWebProgress: React.FC<AttendeeWebProgressProps> = ({
  connectionsCount,
  ch4Choice,
  ch6Choice,
  reducedMotion = false,
}) => {
  return (
    <div className="w-full bg-[#080D1A] border-2 border-black rounded-sm p-3 my-3 shadow-comic-sm">
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
        <span className="text-spider-cyan font-bold uppercase">YOUR PERSONAL WEB</span>
        <span>{connectionsCount} OF 4 STRANDS FORMED</span>
      </div>

      <div className="relative h-28 w-full overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 320 110"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Web Radial Background Grid */}
          <ellipse cx="160" cy="55" rx="140" ry="45" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="160" cy="55" rx="90" ry="30" stroke="#1E293B" strokeWidth="1" strokeDasharray="2 2" />

          {/* Central Anchor Node: The RA */}
          <circle cx="160" cy="55" r="7" fill="#FF1744" stroke="#000" strokeWidth="2" />
          <text x="160" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
            RA
          </text>

          {/* Strand 1 (Chapter 2 Decision) */}
          {connectionsCount >= 1 && (
            <g>
              <motion.line
                x1="160"
                y1="55"
                x2="60"
                y2="30"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
                stroke="#00F0FF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="30" r="5" fill="#00F0FF" stroke="#000" strokeWidth="1.5" />
              <text x="60" y="20" textAnchor="middle" fill="#00F0FF" fontSize="8" fontFamily="monospace">
                CH.2
              </text>
            </g>
          )}

          {/* Strand 2 (Chapter 3 Decision) */}
          {connectionsCount >= 2 && (
            <g>
              <motion.line
                x1="160"
                y1="55"
                x2="260"
                y2="30"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
                stroke="#FFE600"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="260" cy="30" r="5" fill="#FFE600" stroke="#000" strokeWidth="1.5" />
              <text x="260" y="20" textAnchor="middle" fill="#FFE600" fontSize="8" fontFamily="monospace">
                CH.3
              </text>
            </g>
          )}

          {/* Strand 3 (Chapter 4 Decision) */}
          {connectionsCount >= 3 && (
            <g>
              <motion.line
                x1="160"
                y1="55"
                x2="80"
                y2="85"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
                stroke={ch6Choice ? '#475569' : '#FF007F'} // Fades if adapted in Ch 6
                strokeWidth={ch6Choice ? 1.5 : 2.5}
                strokeDasharray={ch6Choice ? '3 3' : undefined}
                strokeLinecap="round"
              />
              <circle cx="80" cy="85" r="5" fill={ch6Choice ? '#475569' : '#FF007F'} stroke="#000" strokeWidth="1.5" />
              <text x="80" y="98" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                CH.4 {ch4Choice ? `(${ch4Choice.replace('opt_c4_', '')})` : ''}
              </text>
            </g>
          )}

          {/* Strand 4 (Chapter 6 Adaptation) */}
          {connectionsCount >= 4 && (
            <g>
              {/* Vibrant re-woven line from Ch 4 node to Ch 6 adapted node */}
              <motion.path
                d="M 80 85 Q 160 105 240 85"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                stroke="#00FFA3"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="240" cy="85" r="6" fill="#00FFA3" stroke="#000" strokeWidth="2" />
              <text x="240" y="98" textAnchor="middle" fill="#00FFA3" fontSize="8" fontFamily="monospace" fontWeight="bold">
                CH.6 ADAPTED
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
