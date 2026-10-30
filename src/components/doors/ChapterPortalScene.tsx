import React from 'react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../../utils/assets';
import { Sparkles, MessageSquare, Mail, Users, Phone, DoorClosed, Lock, Home, Clock, Briefcase, GraduationCap } from 'lucide-react';

interface ChapterPortalSceneProps {
  chapterNumber: number;
  chapterTitle: string;
  doorTheme: string;
  reducedMotion?: boolean;
}

export const ChapterPortalScene: React.FC<ChapterPortalSceneProps> = ({
  chapterNumber,
  chapterTitle,
  doorTheme,
  reducedMotion = false,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#070B16] flex flex-col justify-between p-2.5 sm:p-3 select-none">
      {/* Background Halftone & Ambient Glow */}
      <div className="absolute inset-0 bg-halftone opacity-35 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-36 h-36 bg-spider-red/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-spider-cyan/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header: Supporting Caption & Chapter Title */}
      <div className="relative z-20 flex items-start justify-between gap-2 border-b border-white/15 pb-1.5 bg-black/40 px-2 py-1 rounded-xs backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-spider-cyan animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-spider-yellow font-bold">
              PORTAL UNLOCKED &bull; CH. {chapterNumber}
            </span>
          </div>
          <h3 className="font-comic text-base sm:text-lg text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {chapterTitle}
          </h3>
        </div>
        <span className="text-[9px] font-mono text-gray-300 bg-white/10 px-1.5 py-0.5 rounded-xs border border-white/10 flex-shrink-0">
          {chapterNumber === 7 ? 'FINALE' : `ISSUE #${chapterNumber}`}
        </span>
      </div>

      {/* Central Illustrated Scene per Chapter */}
      <div className="relative z-10 flex-1 w-full my-1 flex items-center justify-center overflow-hidden">
        {/* CHAPTER 1: ONE MISSION, TWO WORLDS */}
        {/* Spider-Man between two entrances: a residence hall and an apartment community */}
        {chapterNumber === 1 && (
          <div className="relative w-full h-full flex items-center justify-between px-2">
            {/* Left: Apartment Entrance (Exterior breezeway, deadbolt, porch lamp) */}
            <div className="w-[34%] h-[90%] bg-[#0A1220] border border-spider-cyan/50 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-[8px] font-mono text-spider-cyan">
                <span className="font-bold">APT 502</span>
                <Lock className="w-2.5 h-2.5" />
              </div>
              <div className="my-auto text-center">
                <div className="w-8 h-12 mx-auto bg-[#070D18] border border-gray-600 rounded-xs flex items-center justify-center relative">
                  <div className="w-1 h-1 rounded-full bg-spider-yellow absolute right-1" />
                </div>
                <span className="text-[7.5px] font-sans text-gray-300 block mt-1">Outdoor Breezeway</span>
              </div>
              <div className="text-[7px] font-mono text-gray-400 text-center border-t border-gray-800 pt-0.5">
                APARTMENTS
              </div>
            </div>

            {/* Center: Spider-Man Anchoring Both Worlds */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-col items-center justify-center w-[30%]"
            >
              {/* Web lines extending to both entrances */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 100">
                <line x1="50" y1="50" x2="-20" y2="25" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="50" y1="50" x2="120" y2="25" stroke="#FF1744" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
              <img
                src={getAssetUrl('images/spiderman-hero-character.png')}
                alt="Spider-Man between Worlds"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,23,68,0.7)]"
              />
            </motion.div>

            {/* Right: Residence Hall Entrance (Communal double doors, interior hallway glow) */}
            <div className="w-[34%] h-[90%] bg-[#1E0911] border border-spider-red/50 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between text-[8px] font-mono text-spider-yellow">
                <span className="font-bold">HALL 101</span>
                <DoorClosed className="w-2.5 h-2.5" />
              </div>
              <div className="my-auto text-center">
                <div className="w-10 h-12 mx-auto bg-gradient-to-t from-spider-red/30 to-spider-yellow/20 border border-spider-yellow/40 rounded-xs flex items-center justify-center">
                  <div className="w-0.5 h-10 bg-black/60" />
                </div>
                <span className="text-[7.5px] font-sans text-gray-200 block mt-1">Shared Corridor</span>
              </div>
              <div className="text-[7px] font-mono text-gray-300 text-center border-t border-gray-800 pt-0.5">
                RESIDENCE HALL
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 2: THE INVISIBLE RESIDENT */}
        {/* Spider-Man hanging beside an apartment window or quiet doorway */}
        {chapterNumber === 2 && (
          <div className="relative w-full h-full flex items-center justify-around px-3">
            {/* Background: Quiet Apartment Hallway & Door 204 */}
            <div className="w-[52%] h-[92%] bg-[#080D18] border-2 border-gray-800 rounded-xs p-2 flex flex-col justify-between relative shadow-comic-sm">
              <div className="flex items-center justify-between border-b border-gray-800 pb-1">
                <span className="font-mono text-[9px] text-spider-cyan font-bold">DOOR 204 &bull; ALEX</span>
                <div className="w-2 h-2 rounded-full bg-spider-red" />
              </div>
              {/* Window with illuminated blinds */}
              <div className="w-full h-14 bg-[#141A29] border border-spider-cyan/40 rounded-xs p-1 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-spider-yellow/30 via-transparent to-spider-yellow/10 flex flex-col justify-between">
                  <div className="w-full h-0.5 bg-gray-700/60" />
                  <div className="w-full h-0.5 bg-gray-700/60" />
                  <div className="w-full h-0.5 bg-gray-700/60" />
                  <div className="w-full h-0.5 bg-gray-700/60" />
                </div>
                <span className="absolute bottom-1 right-1 text-[7px] font-mono text-gray-400">QUIET STUDIO</span>
              </div>
              <div className="text-[8px] font-mono text-gray-400 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-spider-yellow" />
                <span>Deadbolt Engaged</span>
              </div>
            </div>

            {/* Spider-Man Hanging Upside Down from Web Line */}
            <motion.div
              initial={reducedMotion ? false : { y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-[40%] flex flex-col items-center justify-start h-full pt-1"
            >
              {/* Hanging Web Strand */}
              <div className="w-0.5 h-6 bg-gradient-to-b from-white via-spider-cyan to-white shadow-[0_0_8px_#00F0FF]" />
              <img
                src={getAssetUrl('images/spiderman-colgado.png')}
                alt="Spider-Man Hanging beside Apartment Window"
                className="w-20 sm:w-24 h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(0,240,255,0.6)]"
              />
            </motion.div>
          </div>
        )}

        {/* CHAPTER 3: SAME TITLE, DIFFERENT RELATIONSHIPS */}
        {/* Spider-Man in a residence hall corridor, framed by doors and a community noticeboard */}
        {chapterNumber === 3 && (
          <div className="relative w-full h-full flex items-center justify-between px-2">
            {/* Left Corridor Door */}
            <div className="w-[28%] h-[88%] bg-[#120B1E] border border-gray-700 rounded-xs p-1.5 flex flex-col justify-between">
              <span className="font-mono text-[8px] text-gray-300 font-bold">ROOM 301</span>
              <div className="w-full h-10 bg-black/40 border border-gray-800 rounded-xs flex items-center justify-center">
                <span className="text-[7px] font-mono text-gray-400">STUDENT</span>
              </div>
              <span className="text-[7px] font-mono text-gray-400 text-center">PEER DOOR</span>
            </div>

            {/* Center: Community Noticeboard with Spider-Man Perched on Frame */}
            <div className="relative w-[40%] h-[94%] bg-[#1A1308] border-2 border-spider-yellow rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="text-[8px] font-mono font-bold text-spider-yellow uppercase border-b border-spider-yellow/40 pb-0.5 text-center">
                HALL BULLETIN
              </div>
              <div className="space-y-1 text-left px-1">
                <div className="bg-spider-yellow/20 border-l border-spider-yellow p-0.5 text-[7px] font-sans text-white">
                  &bull; Quiet Hours: 10 PM
                </div>
                <div className="bg-spider-cyan/20 border-l border-spider-cyan p-0.5 text-[7px] font-sans text-white">
                  &bull; Floor Perspectives
                </div>
              </div>
              <div className="text-[7.5px] font-mono text-gray-300 text-center">
                COMMUNAL AREA
              </div>

              {/* Spider-Man Perched Right on the Noticeboard Frame */}
              <motion.div
                initial={reducedMotion ? false : { y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-3 right-0 w-16 sm:w-20 pointer-events-none"
              >
                <img
                  src={getAssetUrl('images/spiderman-perched.png')}
                  alt="Spider-Man Perched in Hall Corridor"
                  className="w-full h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(255,230,0,0.6)]"
                />
              </motion.div>
            </div>

            {/* Right Corridor Door */}
            <div className="w-[28%] h-[88%] bg-[#120B1E] border border-gray-700 rounded-xs p-1.5 flex flex-col justify-between">
              <span className="font-mono text-[8px] text-gray-300 font-bold">ROOM 302</span>
              <div className="w-full h-10 bg-black/40 border border-gray-800 rounded-xs flex items-center justify-center">
                <span className="text-[7px] font-mono text-gray-400">STUDENT</span>
              </div>
              <span className="text-[7px] font-mono text-gray-400 text-center">PEER DOOR</span>
            </div>
          </div>
        )}

        {/* CHAPTER 4: TWO COMMUNICATION LANGUAGES */}
        {/* Spider-Man shooting webs that connect different communication symbols */}
        {chapterNumber === 4 && (
          <div className="relative w-full h-full flex items-center justify-center px-1">
            {/* Communication Symbols Matrix */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
              {/* Left Symbols */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C1A2E] border-2 border-spider-cyan flex items-center justify-center shadow-comic-sm">
                  <Phone className="w-4 h-4 text-spider-cyan" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#181126] border-2 border-spider-yellow flex items-center justify-center shadow-comic-sm">
                  <MessageSquare className="w-4 h-4 text-spider-yellow" />
                </div>
              </div>

              {/* Right Symbols */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#200A15] border-2 border-spider-red flex items-center justify-center shadow-comic-sm">
                  <Users className="w-4 h-4 text-spider-red" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0D1F1C] border-2 border-emerald-400 flex items-center justify-center shadow-comic-sm">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Radiating Web Strands connecting all 4 symbols */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 300 120">
              <line x1="150" y1="60" x2="35" y2="30" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="35" y2="90" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="265" y2="30" stroke="#FF1744" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="150" y1="60" x2="265" y2="90" stroke="#00FFA3" strokeWidth="2.5" strokeDasharray="3 2" />
            </svg>

            {/* Center: Dynamic Spider-Man Dual Firing Pose */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-col items-center"
            >
              <img
                src={getAssetUrl('images/spiderman-hero-portrait.png')}
                alt="Spider-Man Connecting Communication Symbols"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(0,240,255,0.7)]"
              />
            </motion.div>
          </div>
        )}

        {/* CHAPTER 5: INDEPENDENCE DOESN'T MEAN ISOLATION */}
        {/* Spider-Man overlooking a courtyard, with small visual hints of residents' daily responsibilities */}
        {chapterNumber === 5 && (
          <div className="relative w-full h-full flex items-center justify-between px-2">
            {/* Illustrated Apartment Courtyard with Responsibility Markers */}
            <div className="w-[62%] h-[92%] bg-[#080E1B] border-2 border-gray-800 rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between border-b border-gray-800 pb-1">
                <span className="font-mono text-[8.5px] text-emerald-400 font-bold uppercase">
                  APARTMENT COURTYARD
                </span>
                <span className="text-[7.5px] font-mono text-gray-400">EVENING</span>
              </div>

              {/* Resident Realities Grid */}
              <div className="grid grid-cols-2 gap-1 py-1">
                <div className="p-1 bg-[#10192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-spider-cyan flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Classes</span>
                </div>
                <div className="p-1 bg-[#10192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-spider-yellow flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Work Shift</span>
                </div>
                <div className="p-1 bg-[#10192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Home className="w-3 h-3 text-spider-red flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Home Care</span>
                </div>
                <div className="p-1 bg-[#10192A] border border-gray-700 rounded-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-[7px] font-mono text-gray-200">Tight Time</span>
                </div>
              </div>

              <div className="text-[7.5px] font-mono text-gray-400 text-center border-t border-gray-800 pt-0.5">
                Courtyard Walkways &bull; Standalone Homes
              </div>
            </div>

            {/* Spider-Man Overlooking from Ledge */}
            <motion.div
              initial={reducedMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[36%] flex flex-col items-center justify-center"
            >
              <img
                src={getAssetUrl('images/spiderman-crouching.png')}
                alt="Spider-Man Overlooking Courtyard"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(0,255,163,0.6)]"
              />
            </motion.div>
          </div>
        )}

        {/* CHAPTER 6: WHEN SUPERPOWERS FAIL */}
        {/* Spider-Man releasing one web anchor and reaching for another */}
        {chapterNumber === 6 && (
          <div className="relative w-full h-full flex items-center justify-center px-2">
            {/* Dissolving Old Anchor (Left) vs Fast Adaptive Anchor (Right) */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
              <div className="p-1.5 bg-[#1C0A15]/80 border border-gray-700 rounded-xs text-left">
                <span className="text-[7.5px] font-mono text-gray-400 uppercase block font-bold">RELEASE ANCHOR</span>
                <span className="text-[7px] font-sans text-gray-300">Previous Broadcast</span>
              </div>
              <div className="p-1.5 bg-[#0B1D22]/80 border border-emerald-400/80 rounded-xs text-right">
                <span className="text-[7.5px] font-mono text-emerald-400 uppercase block font-bold">NEW ADAPTATION</span>
                <span className="text-[7px] font-sans text-gray-200">Low-Friction Route</span>
              </div>
            </div>

            {/* Web Strands: Left one snapping/dissolving; Right one firm & glowing */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 300 120">
              <line x1="140" y1="65" x2="45" y2="35" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="160" y1="55" x2="255" y2="35" stroke="#00FFA3" strokeWidth="3" />
              <circle cx="255" cy="35" r="4" fill="#00FFA3" />
            </svg>

            {/* Dynamic Reaching Pose */}
            <motion.div
              initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-col items-center"
            >
              <img
                src={getAssetUrl('images/spiderman-swinging.png')}
                alt="Spider-Man Shifting Anchors"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_18px_rgba(255,0,127,0.7)]"
              />
            </motion.div>
          </div>
        )}

        {/* CHAPTER 7: THE MULTIVERSE RA */}
        {/* Spider-Man beside the completed spider formed from the attendee’s web strands */}
        {chapterNumber === 7 && (
          <div className="relative w-full h-full flex items-center justify-between px-2">
            {/* Left: Glowing Spider Silhouette Constellation */}
            <div className="w-[52%] h-[92%] bg-[#080D1A] border-2 border-spider-cyan rounded-xs p-1.5 flex flex-col justify-between shadow-comic-sm">
              <div className="flex items-center justify-between border-b border-gray-800 pb-0.5">
                <span className="font-mono text-[8px] text-spider-yellow uppercase font-bold">
                  YOUR PERSONAL WEB
                </span>
                <Sparkles className="w-3 h-3 text-spider-cyan" />
              </div>

              {/* Mini Spider Web Insignia */}
              <div className="my-auto flex items-center justify-center">
                <svg viewBox="0 0 100 80" className="w-24 h-16" fill="none">
                  {/* Central Body */}
                  <ellipse cx="50" cy="35" rx="7" ry="6" fill="#FF1744" stroke="#00F0FF" strokeWidth="1.5" />
                  <ellipse cx="50" cy="50" rx="10" ry="14" fill="#FF1744" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* 8 Legs */}
                  <path d="M 45 32 Q 30 18 18 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 55 32 Q 70 18 82 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 44 36 Q 25 30 12 38" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 56 36 Q 75 30 88 38" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 43 45 Q 22 55 14 68" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 57 45 Q 78 55 86 68" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 46 54 Q 30 72 24 78" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 54 54 Q 70 72 76 78" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="text-[7px] font-mono text-gray-300 text-center border-t border-gray-800 pt-0.5">
                4 DECISIONS &bull; 8 LEGS COMPLETE
              </div>
            </div>

            {/* Right: Proud Perched Spider-Man */}
            <motion.div
              initial={reducedMotion ? false : { x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[44%] flex flex-col items-center justify-center"
            >
              <img
                src={getAssetUrl('images/spiderman-perched.png')}
                alt="Spider-Man beside Personal Spider Web"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_8px_18px_rgba(255,23,68,0.7)]"
              />
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Footer Caption */}
      <div className="relative z-20 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded-xs border border-white/10">
        <span className="text-spider-cyan truncate">{doorTheme}</span>
        <span className="uppercase text-spider-yellow font-bold flex-shrink-0">STAGE ACTIVE</span>
      </div>
    </div>
  );
};
