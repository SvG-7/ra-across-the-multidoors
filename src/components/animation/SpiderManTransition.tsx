import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

export type TransitionType = 
  | 'entry_to_1'
  | '1_to_2'
  | '2_to_3'
  | '3_to_4'
  | '4_to_5'
  | '5_to_6'
  | '6_to_7'
  | 'backward';

interface SpiderManTransitionProps {
  isActive: boolean;
  transitionType: TransitionType;
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const getTransitionDurationMs = (type: TransitionType): number => {
  if (type === 'backward') return 550;
  if (type === '6_to_7') return 3400; // 3.4 seconds for radiant finale
  return 2500; // 2.5 seconds for normal forward transitions
};

export const SpiderManTransition: React.FC<SpiderManTransitionProps> = ({
  isActive,
  transitionType,
  onComplete,
  reducedMotion = false,
}) => {
  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      const timer = setTimeout(() => onComplete(), 50);
      return () => clearTimeout(timer);
    }

    soundEngine.playThwip();

    const durationMs = getTransitionDurationMs(transitionType);

    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isActive, transitionType, onComplete, reducedMotion]);

  if (!isActive || reducedMotion || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div 
        key={transitionType}
        className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
      >
        {/* Fullscreen Dimming Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.65, 0.65, 0.1, 0] }}
          transition={{ duration: getTransitionDurationMs(transitionType) / 1000, times: [0, 0.2, 0.75, 0.9, 1] }}
          className="absolute inset-0 bg-[#060810]"
        />

        {/* Skip Animation Control Button */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="pointer-events-auto px-3 py-1.5 bg-black/85 hover:bg-black text-gray-200 hover:text-spider-cyan border border-gray-600 hover:border-spider-cyan rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-comic active:scale-95 transition-all cursor-pointer"
            title="Skip transition animation"
          >
            <span>Skip</span>
            <FastForward className="w-3.5 h-3.5 text-spider-yellow" />
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 1: ENTRY -> CHAPTER 1 (2.5s)                             */}
        {/* Stage 1: Spider-Man enters -> Stage 2: Web shoots -> Stage 3: Pull */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === 'entry_to_1' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Door Panel: Traditional Residence Hall */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: ['0%', '0%', '-110%', '-110%'] }}
              transition={{ duration: 2.5, times: [0, 0.55, 0.85, 1], ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#1A080E] border-r-4 border-black z-20 flex flex-col items-end justify-center pr-4 shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="text-right">
                <span className="font-mono text-[10px] text-spider-yellow uppercase block font-bold">WORLD 1</span>
                <span className="font-comic text-2xl sm:text-3xl text-spider-red uppercase leading-tight">RESIDENCE HALLS</span>
              </div>
            </motion.div>

            {/* Right Door Panel: Apartment Community */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: ['0%', '0%', '110%', '110%'] }}
              transition={{ duration: 2.5, times: [0, 0.55, 0.85, 1], ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#081524] border-l-4 border-black z-20 flex flex-col items-start justify-center pl-4 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="text-left">
                <span className="font-mono text-[10px] text-spider-yellow uppercase block font-bold">WORLD 2</span>
                <span className="font-comic text-2xl sm:text-3xl text-spider-cyan uppercase leading-tight">APARTMENTS</span>
              </div>
            </motion.div>

            {/* Stage 2: Web Strands shooting outward from wrists */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="50%"
                y1="60%"
                x2="15%"
                y2="50%"
                stroke="#00F0FF"
                strokeWidth="4.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.35, 0.58, 0.85, 1] }}
              />
              <motion.line
                x1="50%"
                y1="60%"
                x2="85%"
                y2="50%"
                stroke="#FF1744"
                strokeWidth="4.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.35, 0.58, 0.85, 1] }}
              />
            </svg>

            {/* Stage 1 & 3: Spider-Man dual web-shooter character */}
            <motion.div
              initial={{ scale: 0.5, y: 220, opacity: 0 }}
              animate={{
                scale: [0.5, 1.1, 1.0, 1.0, 0.9],
                y: [220, 60, 40, 40, 20],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.3, 0.6, 0.85, 1], ease: 'easeOut' }}
              className="absolute z-40 w-48 sm:w-64 h-auto filter drop-shadow-[0_12px_28px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman_PNG11.png')}
                alt="Spider-Man Pulling Entrance"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Action Sound Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: [0, 0, 1.3, 1, 0], rotate: [-15, -15, -8, -6, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.5, 0.65, 0.88, 1] }}
              className="absolute top-1/4 z-50 bg-spider-yellow text-black font-comic text-2xl sm:text-3xl px-4 py-1.5 border-3 border-black shadow-comic"
            >
              THWIP! TWO WORLDS UNLOCKED!
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 2: CHAPTER 1 -> CHAPTER 2 (2.5s)                         */}
        {/* Swings across on anchored web, pulling comic panel into view       */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '1_to_2' && (
          <div className="absolute inset-0 overflow-hidden">
            {/* Parabolic Curved Web Line SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M 280 0 Q 240 240 180 380"
                stroke="#00F0FF"
                strokeWidth="5"
                strokeDasharray="8 4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0.9, 1, 0.8, 0] }}
                transition={{ duration: 2.5, times: [0, 0.35, 0.8, 1], ease: 'easeOut' }}
              />
            </svg>

            {/* Trailing Comic Panel Border pulled by his momentum */}
            <motion.div
              initial={{ x: '100%', rotate: 4 }}
              animate={{ x: ['100%', '100%', '0%', '-5%', '-5%'], rotate: [4, 4, -1, 0, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.45, 0.75, 0.9, 1], ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-20 right-4 left-4 sm:left-auto sm:right-12 sm:w-80 bg-spider-dark/95 border-4 border-spider-red z-30 shadow-comic flex items-center justify-center p-5 text-center"
            >
              <div>
                <span className="font-mono text-xs text-spider-yellow font-bold uppercase tracking-wider block mb-1">
                  PULLING INCOMING PANEL &bull; ISSUE #2
                </span>
                <span className="font-comic text-2xl sm:text-3xl text-white uppercase leading-tight">
                  THE INVISIBLE RESIDENT
                </span>
              </div>
            </motion.div>

            {/* Swinging Spider-Man */}
            <motion.div
              initial={{ left: '-25%', top: '15%', rotate: -25, scale: 0.85 }}
              animate={{
                left: ['-25%', '15%', '50%', '110%'],
                top: ['15%', '38%', '32%', '18%'],
                rotate: [-25, 2, 18, 30],
                scale: [0.85, 1.25, 1.15, 0.9],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.35, 0.68, 1], ease: 'easeInOut' }}
              className="absolute w-44 sm:w-56 h-auto z-40 filter drop-shadow-[0_12px_28px_rgba(255,23,68,0.75)]"
            >
              <img
                src={getAssetUrl('images/spiderman-swinging.png')}
                alt="Spider-Man Web Swinging"
                className="w-full h-auto object-contain"
              />
              <div className="absolute top-2 -right-2 bg-spider-yellow text-black font-comic text-xl px-2.5 py-0.5 border-2 border-black shadow-comic -rotate-12">
                *SWING!*
              </div>
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 3: CHAPTER 2 -> CHAPTER 3 (2.5s)                         */}
        {/* Shoots web to next panel; attaches, tightens, pulls panel forward  */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '2_to_3' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Target Comic Panel pulled forward */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 60 }}
              animate={{
                scale: [0.75, 0.75, 1.08, 1.0, 1.0],
                opacity: [0, 0.4, 1.0, 1.0, 0],
                y: [60, 60, -5, 0, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.4, 0.75, 0.9, 1], ease: 'easeOut' }}
              className="absolute z-20 w-[88%] max-w-md p-6 bg-gradient-to-b from-[#140C20] to-[#0A0D18] border-3 border-spider-cyan shadow-comic text-center"
            >
              <span className="font-mono text-xs text-spider-yellow uppercase font-bold tracking-wider block mb-1">
                ATTACHED TO CHAPTER 3
              </span>
              <h3 className="font-comic text-3xl text-white uppercase tracking-wide">
                SAME TITLE, DIFFERENT RELATIONSHIPS
              </h3>
            </motion.div>

            {/* Direct Web Strand line */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="22%"
                y1="68%"
                x2="78%"
                y2="38%"
                stroke="#00F0FF"
                strokeWidth="4.5"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.25, 0.55, 0.85, 1] }}
              />
              {/* Web Impact Splat */}
              <motion.circle
                cx="78%"
                cy="38%"
                r="20"
                fill="#FF1744"
                stroke="#000"
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1.4, 1.1, 0] }}
                transition={{ duration: 2.5, times: [0, 0.5, 0.65, 0.85, 1] }}
              />
            </svg>

            {/* Spider-Man Lunging Pull Pose */}
            <motion.div
              initial={{ x: -160, y: 140, scale: 0.9 }}
              animate={{
                x: [-160, -10, -35, -70],
                y: [140, 95, 120, 140],
                scale: [0.9, 1.2, 1.05, 0.95],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.35, 0.75, 1] }}
              className="absolute left-6 bottom-12 z-40 w-44 sm:w-60 h-auto filter drop-shadow-[0_12px_24px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman_PNG10.png')}
                alt="Spider-Man Pulling Panel"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Sound stamp */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1.35, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.48, 0.65, 0.88, 1] }}
              className="absolute top-1/3 right-10 z-50 bg-spider-red text-white font-comic text-2xl sm:text-3xl px-3.5 py-1 border-2 border-black shadow-comic rotate-6"
            >
              *YANK!*
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 4: CHAPTER 3 -> CHAPTER 4 (2.5s)                         */}
        {/* Two webs shoot toward separate points & spread into routes         */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '3_to_4' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Communication Route Node Left (In-Person Route) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0, 1.2, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
              transition={{ duration: 2.5, times: [0, 0.45, 0.65, 0.85, 1] }}
              className="absolute top-28 left-6 sm:left-20 z-20 p-2.5 bg-[#180A10] border-2 border-spider-red rounded-xs text-center"
            >
              <span className="font-comic text-xs text-spider-red uppercase block">ROUTE A: IN-PERSON</span>
              <span className="font-mono text-[10px] text-gray-300">High Density Pulse</span>
            </motion.div>

            {/* Communication Route Node Right (Digital Route) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0, 1.2, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
              transition={{ duration: 2.5, times: [0, 0.45, 0.65, 0.85, 1] }}
              className="absolute top-28 right-6 sm:right-20 z-20 p-2.5 bg-[#081622] border-2 border-spider-cyan rounded-xs text-center"
            >
              <span className="font-comic text-xs text-spider-cyan uppercase block">ROUTE B: DIGITAL</span>
              <span className="font-mono text-[10px] text-gray-300">Asynchronous Link</span>
            </motion.div>

            {/* SVG Dual Strands that branch out */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M 50% 65% Q 30% 50% 18% 34%"
                stroke="#FF1744"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.3, 0.6, 0.85, 1] }}
              />
              <motion.path
                d="M 50% 65% Q 70% 50% 82% 34%"
                stroke="#00F0FF"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.3, 0.6, 0.85, 1] }}
              />
            </svg>

            {/* Spider-Man dual-wrist firing pose */}
            <motion.div
              initial={{ scale: 0.6, y: 160, opacity: 0 }}
              animate={{
                scale: [0.6, 1.15, 1.0, 1.0, 0.9],
                y: [160, 60, 45, 45, 30],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.35, 0.65, 0.85, 1] }}
              className="absolute z-40 w-48 sm:w-64 h-auto filter drop-shadow-[0_12px_24px_rgba(0,240,255,0.6)]"
            >
              <img
                src={getAssetUrl('images/spiderman_PNG11.png')}
                alt="Spider-Man Firing Communication Routes"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1.3, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.45, 0.65, 0.88, 1] }}
              className="absolute top-1/4 z-50 bg-spider-cyan text-black font-comic text-2xl sm:text-3xl px-3.5 py-1 border-2 border-black shadow-comic"
            >
              SIGNALS LINKED!
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 5: CHAPTER 4 -> CHAPTER 5 (2.5s)                         */}
        {/* Spider-Man crawls along edge of comic frame as story panel slides  */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '4_to_5' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Confidential Dossier Panel Sliding Down */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: ['-100%', '0%', '0%', '0%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, times: [0, 0.5, 0.85, 1] }}
              className="absolute z-20 w-[90%] max-w-md p-6 bg-[#0E1524] border-4 border-spider-yellow shadow-comic text-center"
            >
              <div className="inline-block bg-spider-yellow text-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase mb-1">
                TOP SECRET &bull; APARTMENT 502
              </div>
              <h3 className="font-comic text-3xl text-white uppercase">
                DOSSIER: LIFE BEHIND THE DEADBOLT
              </h3>
            </motion.div>

            {/* Spider-Man Crawling along the frame edge */}
            <motion.div
              initial={{ x: -160, y: 70 }}
              animate={{
                x: [-160, 40, 180, 380],
                y: [70, 60, 65, 75],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.35, 0.75, 1], ease: 'linear' }}
              className="absolute top-1/3 z-40 w-36 sm:w-48 h-auto filter drop-shadow-[0_8px_20px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman_PNG54.png')}
                alt="Spider-Man Crawling on Frame"
                className="w-full h-auto object-contain"
              />
              <div className="absolute -top-3 right-0 bg-black text-spider-yellow font-comic text-sm px-2 py-0.2 border border-spider-yellow shadow-comic">
                *SKRRT!*
              </div>
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 6: CHAPTER 5 -> CHAPTER 6 (2.5s)                         */}
        {/* Descends upside down on web, catches corner, turns like comic page */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '5_to_6' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Comic Page Turn Flip Curtain */}
            <motion.div
              initial={{ rotateY: 0, transformOrigin: 'left center' }}
              animate={{ rotateY: [0, 0, -85, -85], opacity: [1, 1, 0, 0] }}
              transition={{ duration: 2.5, times: [0, 0.45, 0.85, 1], ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-4 z-20 bg-gradient-to-r from-[#180A14] to-[#0A1224] border-4 border-black shadow-comic flex items-center justify-center p-6 text-center"
            >
              <span className="font-comic text-3xl sm:text-4xl text-spider-yellow uppercase">
                TURNING PAGE &bull; CHAPTER 6
              </span>
            </motion.div>

            {/* Vertical Bungee Web Strand */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="62%"
                y1="0%"
                x2="62%"
                y2="52%"
                stroke="#00F0FF"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 0.9, 0] }}
                transition={{ duration: 2.5, times: [0, 0.35, 0.8, 1] }}
              />
            </svg>

            {/* Upside Down Hanging Spider-Man character */}
            <motion.div
              initial={{ y: -280, opacity: 0 }}
              animate={{
                y: [-280, 45, 30, -80],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.5, times: [0, 0.4, 0.75, 1] }}
              className="absolute top-0 right-1/4 z-40 w-34 sm:w-48 h-auto filter drop-shadow-[0_12px_24px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman-colgado.png')}
                alt="Spider-Man Hanging Upside Down"
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-2 -left-6 bg-spider-yellow text-black font-comic text-xl px-2.5 py-0.5 border-2 border-black shadow-comic -rotate-12">
                *FLIP!*
              </div>
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TRANSITION 7: CHAPTER 6 -> CHAPTER 7 (3.4s FINALE REVEAL)          */}
        {/* Shoots radial strands spreading into final Spider-Tracker constellation */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === '6_to_7' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Radiant Spider-Tracker Connected Paths Constellation */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              {[
                { x2: '15%', y2: '22%', color: '#FF1744' },
                { x2: '35%', y2: '16%', color: '#00F0FF' },
                { x2: '50%', y2: '12%', color: '#FFE600' },
                { x2: '65%', y2: '16%', color: '#A855F7' },
                { x2: '85%', y2: '22%', color: '#10B981' },
              ].map((s, idx) => (
                <g key={idx}>
                  <motion.line
                    x1="50%"
                    y1="75%"
                    x2={s.x2}
                    y2={s.y2}
                    stroke={s.color}
                    strokeWidth="4"
                    strokeDasharray="6 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                    transition={{ duration: 3.4, times: [0, 0.25, 0.6 + idx * 0.05, 0.88, 1] }}
                  />
                  <motion.circle
                    cx={s.x2}
                    cy={s.y2}
                    r="9"
                    fill={s.color}
                    stroke="#000"
                    strokeWidth="2.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 0, 1.4, 1.1, 0] }}
                    transition={{ duration: 3.4, times: [0, 0.5 + idx * 0.05, 0.75, 0.9, 1] }}
                  />
                </g>
              ))}
            </svg>

            {/* Heroic Landing Spider-Man */}
            <motion.div
              initial={{ scale: 1.5, y: 20, opacity: 0 }}
              animate={{
                scale: [1.5, 1.0, 1.05, 0.95],
                y: [20, 110, 100, 80],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 3.4, times: [0, 0.3, 0.75, 1] }}
              className="absolute bottom-6 z-40 w-48 sm:w-64 h-auto filter drop-shadow-[0_12px_28px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman_PNG40.png')}
                alt="Spider-Man Radiating Tracker Strands"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Multiverse Web Complete Banner */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1.3, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 3.4, times: [0, 0.45, 0.65, 0.88, 1] }}
              className="absolute top-1/3 z-50 bg-spider-yellow text-black font-comic text-2xl sm:text-4xl px-5 py-2 border-3 border-black shadow-comic"
            >
              MULTIVERSE WEB COMPLETE!
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* BACKWARD TRANSITION: RAPID REVERSE WEB-ZIP (0.55s)                 */}
        {/* ------------------------------------------------------------------ */}
        {transitionType === 'backward' && (
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full z-20" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="80%"
                y1="30%"
                x2="10%"
                y2="70%"
                stroke="#00F0FF"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 0.5 }}
              />
            </svg>

            <motion.div
              initial={{ x: 380, y: 140, scale: 0.8 }}
              animate={{ x: -280, y: 180, scale: 1.15 }}
              transition={{ duration: 0.52, ease: 'easeIn' }}
              className="absolute top-1/4 z-40 w-40 sm:w-52 h-auto filter drop-shadow-[0_8px_20px_rgba(0,240,255,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman-swinging.png')}
                alt="Spider-Man Web-Zipping Back"
                className="w-full h-auto object-contain -scale-x-100"
              />
              <div className="absolute top-0 right-0 bg-spider-yellow text-black font-comic text-lg px-2.5 py-0.5 border border-black shadow-comic rotate-12">
                *ZIP!*
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>,
    document.body
  );
};
