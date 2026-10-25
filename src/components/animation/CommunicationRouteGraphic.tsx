import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Smartphone, Users, Mail, Sparkles, Check } from 'lucide-react';

interface CommunicationRouteGraphicProps {
  channelType?: 'groupchat' | 'directmsg' | 'inperson' | 'email';
  isAdapted?: boolean;
  adaptedOptionId?: string;
  reducedMotion?: boolean;
}

export const CommunicationRouteGraphic: React.FC<CommunicationRouteGraphicProps> = ({
  channelType,
  isAdapted = false,
  reducedMotion = false,
}) => {
  if (!channelType) return null;

  const getChannelDetails = (type: string) => {
    switch (type) {
      case 'groupchat':
        return {
          title: 'Community Group Chat',
          icon: <Users className="w-4 h-4 text-spider-yellow" />,
          color: '#FFE600',
          speed: 1.5,
          tag: 'Broad Broadcast Route',
        };
      case 'directmsg':
        return {
          title: 'Personal Message',
          icon: <Smartphone className="w-4 h-4 text-spider-cyan" />,
          color: '#00F0FF',
          speed: 1.2,
          tag: 'Direct 1-on-1 Route',
        };
      case 'inperson':
        return {
          title: 'In-Person Conversation',
          icon: <MessageSquare className="w-4 h-4 text-spider-red" />,
          color: '#FF1744',
          speed: 1.8,
          tag: 'Physical Threshold Route',
        };
      case 'email':
      default:
        return {
          title: 'Short Email',
          icon: <Mail className="w-4 h-4 text-purple-400" />,
          color: '#C084FC',
          speed: 1.6,
          tag: 'Formal Inbox Route',
        };
    }
  };

  const details = getChannelDetails(channelType);
  const wasAlreadyDirect = channelType === 'directmsg';

  return (
    <div className="w-full bg-[#070B14] border-2 border-black p-3.5 rounded-sm shadow-sm my-3 select-none">
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2 border-b border-gray-800 pb-1.5">
        <span className="flex items-center gap-1.5 text-spider-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAdapted ? 'ADAPTED COMMUNICATION PATH' : 'TRANSMISSION ROUTE VISUALIZER'}</span>
        </span>
        <span className="text-gray-400 font-bold">{details.tag}</span>
      </div>

      {/* Visual Signal SVG Canvas */}
      <div className="relative py-2">
        <svg viewBox="0 0 360 80" className="w-full h-20 overflow-visible">
          {/* Background grid line */}
          <line x1="50" y1="40" x2="310" y2="40" stroke="#1F293D" strokeWidth="2" strokeDasharray="3 3" />

          {/* RA Node */}
          <g transform="translate(45, 40)">
            <circle r="22" fill="#0E1528" stroke="#FF1744" strokeWidth="2.5" />
            <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              RA
            </text>
            <text x="0" y="32" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
              You
            </text>
          </g>

          {/* Signal Route Line */}
          {isAdapted ? (
            <>
              {/* Previous faded/dashed route */}
              <path
                d="M 68 40 Q 180 15 290 40"
                fill="none"
                stroke={details.color}
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              {/* Newly Adapted direct path */}
              <motion.path
                d="M 68 40 Q 180 65 290 40"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {/* Pulse along adapted route */}
              {!reducedMotion && (
                <motion.g
                  initial={{ x: 68, y: 40, opacity: 0 }}
                  animate={{
                    x: [68, 180, 290],
                    y: [40, 65, 40],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <circle r="5" fill="#34D399" />
                </motion.g>
              )}
            </>
          ) : (
            <>
              {/* Standard Active Transmission Path */}
              <motion.path
                d="M 68 40 L 290 40"
                fill="none"
                stroke={details.color}
                strokeWidth="3"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              {/* Traveling Web Pulse */}
              {!reducedMotion && (
                <motion.g
                  initial={{ x: 68, y: 40, opacity: 0 }}
                  animate={{
                    x: [68, 290],
                    y: [40, 40],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: details.speed,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <circle r="5" fill={details.color} />
                </motion.g>
              )}
            </>
          )}

          {/* Alex / Apt 502 Node */}
          <g transform="translate(315, 40)">
            <circle
              r="22"
              fill="#0E1528"
              stroke={isAdapted ? '#10B981' : '#00F0FF'}
              strokeWidth="2.5"
            />
            <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              ALEX
            </text>
            <text x="0" y="32" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
              Apt 502
            </text>
          </g>
        </svg>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs mt-1 pt-2 border-t border-gray-800">
        <span className="flex items-center gap-1.5 text-gray-300 font-sans">
          {details.icon}
          <span className="font-semibold">{details.title}</span>
        </span>

        {isAdapted ? (
          <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>{wasAlreadyDirect ? 'Refined Timing Window' : 'Shifted to Low-Friction Channel'}</span>
          </span>
        ) : (
          <span className="font-mono text-[11px] text-spider-cyan flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-spider-cyan animate-ping" />
            <span>Signal Active</span>
          </span>
        )}
      </div>
    </div>
  );
};
