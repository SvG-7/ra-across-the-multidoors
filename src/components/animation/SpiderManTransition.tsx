import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, Sparkles, Eye, Phone, MessageSquare, Users, Mail } from 'lucide-react';
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

export const getTransitionDurationMs = (
  type: TransitionType,
  reducedMotion = false
): number => {
  if (type === '4_to_5') return reducedMotion ? 1100 : 3000;
  if (type === 'backward') return 550;
  if (type === '6_to_7') return 3400; // 3.4 seconds for radiant trio finale
  if (type === 'entry_to_1') return 3200; // 3.2 seconds for cinematic entrance
  return 2600; // 2.6 seconds for normal forward transitions
};

export const SpiderManTransition: React.FC<SpiderManTransitionProps> = ({
  isActive,
  transitionType,
  onComplete,
  reducedMotion = false,
}) => {
  // Preload character assets
  useEffect(() => {
    if (typeof window !== 'undefined') {
      [
        'images/spiderman-hero-character.png',
        'images/spiderman-hero-portrait.png',
        'images/spiderman-noir.png',
        'images/spiderman-noir-portrait.png',
        'images/spiderman-miles.png',
        'images/jean-grey-bnd.png',
        'images/venom-character.png',
        'images/spiderman-powerless-wrist.png',
        'images/spiderman-powerless-step.png',
        'images/spiderman-swinging.png',
        'images/spiderman-crouching.png',
        'images/spiderman-perched.png'
      ].forEach((path) => {
        const img = new Image();
        img.src = getAssetUrl(path);
      });
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion && transitionType !== '4_to_5') {
      const timer = setTimeout(() => onComplete(), 50);
      return () => clearTimeout(timer);
    }

    if (!reducedMotion) {
      soundEngine.playThwip();
    }

    const durationMs = getTransitionDurationMs(transitionType, reducedMotion);

    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isActive, transitionType, onComplete, reducedMotion]);

  if (!isActive || (reducedMotion && transitionType !== '4_to_5') || typeof document === 'undefined') {
    return null;
  }

  const totalDurationSec = getTransitionDurationMs(transitionType, reducedMotion) / 1000;

  return createPortal(
    <AnimatePresence>
      <div 
        key={transitionType}
        className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
      >
        {/* Fullscreen Dimming Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            transitionType === '4_to_5'
              ? reducedMotion
                ? { opacity: [0, 0.88, 0.88, 0] }
                : { opacity: [0, 0.55, 0.95, 0.92, 0] }
              : { opacity: [0, 0.75, 0.75, 0.1, 0] }
          }
          transition={{
            duration: totalDurationSec,
            times: transitionType === '4_to_5' && !reducedMotion ? [0, 0.18, 0.48, 0.8, 1] : [0, 0.2, 0.75, 0.9, 1],
          }}
          className={`absolute inset-0 ${transitionType === '4_to_5' ? 'bg-[#08060B]' : 'bg-[#05070D]'}`}
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

        {/* ================================================================== */}
        {/* TRANSITION 1: ENTRY -> CHAPTER 1 (CLASSIC SPIDER-MAN)              */}
        {/* Cinematic web pull opening the two multiverse doors               */}
        {/* ================================================================== */}
        {transitionType === 'entry_to_1' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Door Panel: Traditional Residence Hall */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: ['0%', '0%', '-110%', '-110%'] }}
              transition={{ duration: 2.8, times: [0, 0.55, 0.85, 1], ease: [0.76, 0, 0.24, 1] }}
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
              transition={{ duration: 2.8, times: [0, 0.55, 0.85, 1], ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#081524] border-l-4 border-black z-20 flex flex-col items-start justify-center pl-4 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="text-left">
                <span className="font-mono text-[10px] text-spider-yellow uppercase block font-bold">WORLD 2</span>
                <span className="font-comic text-2xl sm:text-3xl text-spider-cyan uppercase leading-tight">APARTMENTS</span>
              </div>
            </motion.div>

            {/* Web Strands shooting outward from wrists */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="50%"
                y1="58%"
                x2="15%"
                y2="50%"
                stroke="#00F0FF"
                strokeWidth="4.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.8, times: [0, 0.35, 0.58, 0.85, 1] }}
              />
              <motion.line
                x1="50%"
                y1="58%"
                x2="85%"
                y2="50%"
                stroke="#FF1744"
                strokeWidth="4.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.8, times: [0, 0.35, 0.58, 0.85, 1] }}
              />
            </svg>

            {/* Classic Spider-Man pulling entrance */}
            <motion.div
              initial={{ scale: 0.5, y: 150, opacity: 0 }}
              animate={{
                scale: [0.5, 1.08, 1.0, 1.0, 0.95],
                y: [150, 20, 10, 10, 0],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.8, times: [0, 0.3, 0.6, 0.85, 1], ease: 'easeOut' }}
              className="absolute z-40 w-44 sm:w-60 max-w-[80vw] max-h-[42vh] h-auto flex items-center justify-center filter drop-shadow-[0_12px_28px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman-hero-character.png')}
                alt="Classic Spider-Man Pulling Entrance"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Action Sound Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: [0, 0, 1.3, 1, 0], rotate: [-15, -15, -8, -6, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.8, times: [0, 0.5, 0.65, 0.88, 1] }}
              className="absolute top-16 sm:top-20 z-50 bg-spider-yellow text-black font-comic text-xl sm:text-3xl px-4 py-1.5 border-3 border-black shadow-comic"
            >
              THWIP! TWO WORLDS UNLOCKED!
            </motion.div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 2: CH 1 -> CH 2 (SPIDER-MAN NOIR)                       */}
        {/* Shadow aperture opening into the corridor                          */}
        {/* ================================================================== */}
        {transitionType === '1_to_2' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
            {/* Chiaroscuro Aperture Blades sliding open */}
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: [0, 0.4, 1.6, 2.5], rotate: [-25, -10, 15, 30], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, times: [0, 0.3, 0.75, 1], ease: [0.76, 0, 0.24, 1] }}
              className="absolute w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] border-[30px] sm:border-[45px] border-[#0A0D14] rounded-full z-20 pointer-events-none shadow-[0_0_80px_rgba(0,0,0,1)_inset]"
            />

            {/* Directional Corridor Light Beam slicing through */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.8, 0.9, 0], scaleX: [0, 1, 1.2, 1.4] }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.75, 1] }}
              className="absolute w-full h-[65%] bg-gradient-to-r from-transparent via-amber-100/20 to-transparent transform -skew-y-6 z-10 pointer-events-none"
            />

            {/* Incoming Issue Card: The Invisible Resident */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: [0, 0, 1, 1, 0], y: [40, 40, 0, 0, -20] }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.65, 0.85, 1] }}
              className="absolute top-16 sm:top-20 z-30 bg-[#0E1524] border-2 border-gray-600 px-4 py-2 rounded-xs shadow-comic text-center"
            >
              <div className="flex items-center justify-center gap-1.5 text-spider-yellow font-mono text-[10px] font-bold uppercase tracking-widest">
                <Eye className="w-3 h-3 text-spider-cyan" />
                <span>SHADOW APERTURE &bull; ISSUE #2</span>
              </div>
              <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide mt-0.5">
                THE INVISIBLE RESIDENT
              </h3>
            </motion.div>

            {/* SPIDER-MAN NOIR Stepping Out of Shadow (Bounded Height Prevents Hat Crop) */}
            <motion.div
              initial={{ scale: 0.85, x: 40, opacity: 0 }}
              animate={{
                scale: [0.85, 1.0, 1.0, 1.0, 0.95],
                x: [40, 0, 0, 0, -16],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.65, 0.85, 1], ease: 'easeOut' }}
              className="absolute bottom-10 z-40 h-[44vh] max-h-[340px] w-auto max-w-[85vw] flex flex-col items-center justify-end filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)] contrast-110"
            >
              <img
                src={getAssetUrl('images/spiderman-noir.png')}
                alt="Spider-Man Noir Shadow Entrance"
                className="h-full max-h-full w-auto max-w-full object-contain"
              />
              <div className="mt-1 bg-black/90 text-gray-200 border border-gray-600 font-mono text-[9px] uppercase px-2 py-0.5 shadow-md flex-shrink-0">
                *TRENCHCOAT SWISH* // NOIR ARRIVAL
              </div>
            </motion.div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 3: CH 2 -> CH 3 (VENOM SYMBIOTE)                        */}
        {/* Restrained boundary tendrils coalescing into Venom silhouette      */}
        {/* ================================================================== */}
        {transitionType === '2_to_3' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#07090F]">
            {/* Restrained Symbiote Tendrils Framing Screen Edges Strictly */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.85, 0.6, 0] }}
              transition={{ duration: 2.6, times: [0, 0.3, 0.75, 1], ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black via-[#0B0F17] to-transparent border-r border-slate-700/60 z-10 pointer-events-none"
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.85, 0.6, 0] }}
              transition={{ duration: 2.6, times: [0, 0.3, 0.75, 1], ease: 'easeOut' }}
              className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black via-[#0B0F17] to-transparent border-l border-slate-700/60 z-10 pointer-events-none"
            />

            {/* Readable Editorial Comic Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
              transition={{ duration: 2.6, times: [0, 0.28, 0.8, 1], ease: 'easeOut' }}
              className="absolute top-16 sm:top-20 z-30 w-[86%] max-w-md bg-[#0B0F1A] border-2 border-slate-500/80 px-4 py-2.5 rounded-xs shadow-comic text-center"
            >
              <span className="font-mono text-[9px] text-spider-cyan uppercase font-bold block tracking-wider">
                RELATIONSHIP DYNAMICS &bull; ISSUE #3
              </span>
              <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide mt-0.5">
                SAME TITLE, DIFFERENT RELATIONSHIPS
              </h3>
            </motion.div>

            {/* VENOM Coalescing in Center-Lower Stage */}
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{
                scale: [0.86, 1.03, 1.0, 1.0, 0.96],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.65, 0.85, 1], ease: 'easeOut' }}
              className="absolute bottom-10 z-40 h-[44vh] max-h-[340px] w-auto max-w-[85vw] flex flex-col items-center justify-end filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]"
            >
              <img
                src={getAssetUrl('images/venom-character.png')}
                alt="Venom entering residence hall boundaries scene"
                className="h-full max-h-full w-auto max-w-full object-contain"
              />
              <div className="mt-1 bg-black/90 text-gray-200 border border-slate-600 font-mono text-[9px] uppercase px-2.5 py-0.5 shadow-md flex-shrink-0">
                SYMBIOTE BOUNDARIES // SHARED LIVING
              </div>
            </motion.div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 4: CH 3 -> CH 4 (CLASSIC SPIDER-MAN)                    */}
        {/* Web attachment that pulls the next panel into place                */}
        {/* ================================================================== */}
        {transitionType === '3_to_4' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Incoming Target Communication Panel */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 70 }}
              animate={{
                scale: [0.7, 0.7, 1.08, 1.0, 1.0],
                opacity: [0, 0.3, 1.0, 1.0, 0],
                y: [70, 70, -8, 0, 0],
              }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.65, 0.85, 1], ease: 'easeOut' }}
              className="absolute z-20 w-[88%] max-w-md p-5 bg-gradient-to-b from-[#0A1828] to-[#060D17] border-3 border-spider-cyan shadow-comic text-center"
            >
              <span className="font-mono text-xs text-spider-yellow uppercase font-bold tracking-wider block mb-1">
                COMMUNICATION MATRIX &bull; ISSUE #4
              </span>
              <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
                TWO COMMUNICATION LANGUAGES
              </h3>
            </motion.div>

            {/* Web Strand Attaching and Pulling Panel */}
            <svg className="absolute inset-0 w-full h-full z-30" xmlns="http://www.w3.org/2000/svg">
              <motion.line
                x1="25%"
                y1="75%"
                x2="72%"
                y2="42%"
                stroke="#00F0FF"
                strokeWidth="4.5"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.9, 0] }}
                transition={{ duration: 2.6, times: [0, 0.2, 0.45, 0.85, 1] }}
              />
              <motion.circle
                cx="72%"
                cy="42%"
                r="16"
                fill="#FF1744"
                stroke="#000"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1.5, 1.1, 0] }}
                transition={{ duration: 2.6, times: [0, 0.42, 0.55, 0.85, 1] }}
              />
            </svg>

            {/* Classic Spider-Man Lunging Pull Pose */}
            <motion.div
              initial={{ x: -100, y: 40, scale: 0.85, opacity: 0 }}
              animate={{
                x: [-100, 0, -10, -25],
                y: [40, 0, 5, 15],
                scale: [0.85, 1.15, 1.05, 0.95],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.6, times: [0, 0.35, 0.75, 1] }}
              className="absolute left-4 sm:left-12 bottom-20 z-40 w-40 sm:w-52 max-h-[36vh] h-auto filter drop-shadow-[0_12px_24px_rgba(255,23,68,0.7)]"
            >
              <img
                src={getAssetUrl('images/spiderman-hero-character.png')}
                alt="Classic Spider-Man Pulling Panel"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0, 1.35, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 2.6, times: [0, 0.45, 0.62, 0.88, 1] }}
              className="absolute top-1/3 right-10 z-50 bg-spider-cyan text-black font-comic text-2xl sm:text-3xl px-3.5 py-1 border-2 border-black shadow-comic rotate-6"
            >
              *ATTACH & PULL!*
            </motion.div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 5: CH 4 -> CH 5 (JEAN GREY - BRAND NEW DAY PSYCHIC)     */}
        {/* Leave Ch. 4 -> heat-haze cinnabar-amber refraction -> crisp Ch. 5  */}
        {/* (No text shake, no Phoenix fire, no lightning, with reduced-motion) */}
        {/* ================================================================== */}
        {transitionType === '4_to_5' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {reducedMotion ? (
              /* Calm Reduced-Motion Alternative: Crisp Static Cross-Dissolve */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, times: [0, 0.25, 0.78, 1] }}
                className="relative z-40 w-[88%] max-w-sm p-5 bg-[#0B0F1A] border-2 border-amber-500/60 rounded-sm shadow-comic text-center"
              >
                <img
                  src={getAssetUrl('images/jean-grey-bnd.png')}
                  alt="Jean Grey in evening transit light"
                  className="h-36 sm:h-44 w-auto object-contain mx-auto mb-2.5"
                />
                <div className="inline-block bg-amber-950/75 text-amber-200 border border-amber-500/50 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase mb-1">
                  SEEING BEYOND IMPRESSIONS &bull; CHAPTER 5
                </div>
                <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide">
                  INDEPENDENCE DOESN&apos;T MEAN ISOLATION
                </h3>
              </motion.div>
            ) : (
              <>
                {/* SVG Subtle Atmospheric Heat-Haze Filter (Strictly for Ambient Layer Behind Text) */}
                <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                  <defs>
                    <filter id="bndPsychicHaze">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.012 0.024"
                        numOctaves="2"
                        seed="7"
                        result="noise"
                      />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" />
                    </filter>
                  </defs>
                </svg>

                {/* Phase 1 (0 - 1.3s): Outgoing Chapter 4 Communication Motifs Settling */}
                <motion.div
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 0.35, 0] }}
                  transition={{ duration: 1.25, times: [0, 0.45, 1], ease: 'easeOut' }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-[#0C1A2E] border border-spider-cyan/40 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5 text-spider-cyan/70" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#181126] border border-spider-yellow/40 flex items-center justify-center">
                      <MessageSquare className="w-3.5 h-3.5 text-spider-yellow/70" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#200A15] border border-spider-red/40 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-spider-red/70" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#0D1F1C] border border-emerald-400/40 flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5 text-emerald-400/70" />
                    </div>
                  </div>
                </motion.div>

                {/* Phase 2 (0.45s - 2.35s): Controlled Cinnabar-Amber Heat-Haze Refraction Field (Behind UI) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.42, 0.34, 0] }}
                  transition={{ duration: 3.0, times: [0, 0.28, 0.62, 0.86], ease: 'easeInOut' }}
                  style={{ filter: 'url(#bndPsychicHaze)' }}
                  className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-[125vw] h-[70vh] rounded-full bg-gradient-radial from-[#C2410C]/35 via-[#D97706]/20 to-transparent blur-2xl" />
                </motion.div>

                {/* Translucent Expanding Glass-Refraction Rings (Smooth Focus Toward Jean, No Spinning Portals) */}
                {[0, 0.25].map((delay, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.15, 1.45], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2.0, delay: 0.45 + delay, times: [0, 0.45, 1], ease: 'easeOut' }}
                    className="absolute z-25 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-amber-400/40 shadow-[0_0_40px_rgba(217,119,6,0.22)_inset] pointer-events-none"
                  />
                ))}

                {/* Crisp Center-Lower Jean Grey Emergence (Face & Olive Jacket Sharp, Zero Filter Distortion) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    scale: [0.96, 0.96, 1, 1, 1],
                  }}
                  transition={{ duration: 3.0, times: [0, 0.22, 0.44, 0.85, 1], ease: 'easeOut' }}
                  className="relative z-40 mt-20 sm:mt-24 h-[44vh] max-h-[345px] w-auto max-w-[82vw] flex flex-col items-center justify-end"
                >
                  <div className="absolute inset-x-4 top-6 bottom-2 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
                  <img
                    src={getAssetUrl('images/jean-grey-bnd.png')}
                    alt="Jean Grey emerging in Brand New Day psychic refraction"
                    className="relative z-10 h-full max-h-full w-auto max-w-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>

                {/* Sharp Non-Shaking Chapter 5 Identity Plate */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 1, 0] }}
                  transition={{ duration: 3.0, times: [0, 0.36, 0.54, 0.86, 1], ease: 'easeOut' }}
                  className="absolute top-14 sm:top-16 z-45 w-[88%] max-w-md px-4 py-3 bg-[#090D16]/95 border-2 border-amber-500/65 rounded-xs shadow-comic text-center"
                >
                  <div className="inline-block bg-amber-950/80 text-amber-200 border border-amber-500/45 px-2 py-0.5 font-mono text-[9px] font-bold uppercase mb-1 tracking-wider">
                    SEEING BEYOND IMPRESSIONS &bull; CHAPTER 5
                  </div>
                  <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase tracking-wide leading-tight">
                    INDEPENDENCE DOESN&apos;T MEAN ISOLATION
                  </h3>
                </motion.div>
              </>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 6: CH 5 -> CH 6 (GROUNDED POWERLESS HANDOFF)            */}
        {/* Quiet dusk dissolve when familiar superhero tools stop working     */}
        {/* (No glow, no spinning rings, no blame on Jean Grey)                */}
        {/* ================================================================== */}
        {transitionType === '5_to_6' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080B12]">
            {/* Calm Evening-to-Slate Shift */}
            <motion.div
              initial={{ opacity: 0.35 }}
              animate={{ opacity: [0.35, 0.12, 0] }}
              transition={{ duration: 2.6, times: [0, 0.55, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-black pointer-events-none"
            />

            {/* Issue #6 Grounded Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, 0] }}
              transition={{ duration: 2.6, times: [0, 0.32, 0.82, 1], ease: 'easeOut' }}
              className="absolute top-16 sm:top-20 z-30 w-[86%] max-w-md bg-[#0B101B] border-2 border-slate-600 px-4 py-2.5 rounded-xs shadow-comic text-center"
            >
              <span className="font-mono text-[9px] text-amber-300 uppercase font-bold block tracking-wider">
                WHEN HABITS FALL SHORT &bull; ISSUE #6
              </span>
              <h3 className="font-comic text-2xl sm:text-3xl text-white uppercase mt-0.5">
                WHEN SUPERPOWERS FAIL
              </h3>
            </motion.div>

            {/* Grounded Powerless Classic Spider-Man Standing Still */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, times: [0, 0.3, 0.82, 1], ease: 'easeOut' }}
              className="absolute bottom-10 z-40 h-[40vh] max-h-[300px] w-auto max-w-[82vw] flex flex-col items-center justify-end filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
            >
              <img
                src={getAssetUrl('images/spiderman-powerless-wrist.png')}
                alt="Grounded Spider-Man checking inactive wrist-shooter"
                className="h-full max-h-full w-auto max-w-full object-contain"
              />
              <div className="mt-1 bg-[#0C121E] text-amber-200 border border-amber-500/45 font-mono text-[9px] uppercase px-2.5 py-0.5 shadow-md flex-shrink-0">
                A DIFFERENT APPROACH STARTS HERE
              </div>
            </motion.div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TRANSITION 7: CH 6 -> CH 7 (ALL THREE SPIDER-MEN FINALE)           */}
        {/* Worlds converge around the personal-web finale                     */}
        {/* ================================================================== */}
        {transitionType === '6_to_7' && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#060A14]">
            {/* Radiant Converging Web Pathways */}
            <svg className="absolute inset-0 w-full h-full z-20" xmlns="http://www.w3.org/2000/svg">
              {[
                { x1: '10%', y1: '20%', x2: '50%', y2: '50%', color: '#00F0FF' },
                { x1: '90%', y1: '20%', x2: '50%', y2: '50%', color: '#FF1744' },
                { x1: '20%', y1: '80%', x2: '50%', y2: '50%', color: '#FFE600' },
                { x1: '80%', y1: '80%', x2: '50%', y2: '50%', color: '#00FFA3' },
              ].map((line, idx) => (
                <motion.line
                  key={idx}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.color}
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.4, times: [0, 0.45, 0.85, 1] }}
                />
              ))}
              <motion.circle
                cx="50%"
                cy="50%"
                r="30"
                fill="#FF1744"
                stroke="#00F0FF"
                strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1.4, 1.1, 0] }}
                transition={{ duration: 3.4, times: [0, 0.4, 0.6, 0.85, 1] }}
              />
            </svg>

            {/* Central Multiverse Finale Banner */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.12, 1.0, 1.0, 0.95], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 3.4, times: [0, 0.35, 0.7, 0.9, 1] }}
              className="absolute top-14 sm:top-16 z-30 bg-[#090F1C] border-3 border-spider-cyan px-5 py-2.5 rounded-xs shadow-comic text-center"
            >
              <div className="flex items-center justify-center gap-1.5 text-spider-yellow font-mono text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-spider-cyan" />
                <span>MULTIVERSE CONVERGENCE &bull; FINALE</span>
              </div>
              <h3 className="font-comic text-3xl sm:text-4xl text-white uppercase tracking-wide mt-0.5">
                THE MULTIVERSE RA
              </h3>
            </motion.div>

            {/* ALL THREE HEROES CONVERGING */}
            <div className="absolute bottom-10 z-40 w-full max-w-lg flex items-end justify-around px-4">
              {/* Spider-Man Noir on Left */}
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: [-60, 0, 0, -20], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, times: [0, 0.4, 0.85, 1] }}
                className="w-28 sm:w-36 flex flex-col items-center"
              >
                <img
                  src={getAssetUrl('images/spiderman-noir.png')}
                  alt="Spider-Man Noir Finale"
                  className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                />
                <span className="text-[7.5px] font-mono text-gray-300 bg-black/80 px-1 rounded-2xs mt-1">NOIR</span>
              </motion.div>

              {/* Classic Peter Parker in Center */}
              <motion.div
                initial={{ y: 60, scale: 0.8, opacity: 0 }}
                animate={{ y: [60, 0, 0, 20], scale: [0.8, 1.1, 1.0, 0.95], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, times: [0, 0.45, 0.85, 1] }}
                className="w-32 sm:w-44 flex flex-col items-center -mb-2"
              >
                <img
                  src={getAssetUrl('images/spiderman-hero-character.png')}
                  alt="Classic Spider-Man Finale"
                  className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(255,23,68,0.8)]"
                />
                <span className="text-[7.5px] font-mono text-spider-yellow bg-black/80 px-1 rounded-2xs mt-1 font-bold">PETER</span>
              </motion.div>

              {/* Miles Morales on Right */}
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: [60, 0, 0, 20], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, times: [0, 0.4, 0.85, 1] }}
                className="w-28 sm:w-36 flex flex-col items-center"
              >
                <img
                  src={getAssetUrl('images/spiderman-miles.png')}
                  alt="Miles Morales Finale"
                  className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,230,0,0.7)]"
                />
                <span className="text-[7.5px] font-mono text-spider-cyan bg-black/80 px-1 rounded-2xs mt-1 font-bold">MILES</span>
              </motion.div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* BACKWARD TRANSITION (FAST 550ms REVERSE SLIDE)                     */}
        {/* ================================================================== */}
        {transitionType === 'backward' && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '100%'] }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/90 z-40 flex items-center justify-center border-y-4 border-spider-cyan"
          >
            <span className="font-comic text-2xl text-spider-cyan uppercase">
              RETURNING TO PREVIOUS CHAPTER...
            </span>
          </motion.div>
        )}
      </div>
    </AnimatePresence>,
    document.body
  );
};
