import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  List, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { CHAPTERS_DATA } from '../../data/chaptersData';
import { TOPIC_LEARNING_ANGLES } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';
import { FieldGuideCard } from '../takeaway/FieldGuideCard';

interface SpiderTrackerProps {
  session: AttendeeSession;
  onJumpToChapter: (chapterNumber: number) => void;
  onSelectComparisonChapter?: (chapterNumber: number) => void;
  reducedMotion?: boolean;
}

interface NeighborhoodLandmark {
  chapterNumber: number;
  x: number;
  y: number;
  title: string;
  district: 'Residence Hall World' | 'Apartment World' | 'Multiverse Nexus';
  landmarkName: string;
  storyDetail: string;
}

const NEIGHBORHOOD_LANDMARKS: NeighborhoodLandmark[] = [
  {
    chapterNumber: 1,
    x: 300,
    y: 90,
    title: 'One Mission, Two Worlds',
    district: 'Residence Hall World',
    landmarkName: 'Front Quad & Main Entrance',
    storyDetail: 'The high-density residence hall threshold where community building begins.',
  },
  {
    chapterNumber: 2,
    x: 100,
    y: 160,
    title: 'The Invisible Resident',
    district: 'Apartment World',
    landmarkName: 'Apt 502 / Alex’s Window',
    storyDetail: 'Closed deadbolts and quiet windows where residents maintain distance.',
  },
  {
    chapterNumber: 3,
    x: 300,
    y: 240,
    title: 'Same Title, Different Relationships',
    district: 'Residence Hall World',
    landmarkName: '2nd Floor Peer Lounge',
    storyDetail: 'Shared communal floor space where peer accountability and boundaries are tested.',
  },
  {
    chapterNumber: 4,
    x: 90,
    y: 320,
    title: 'Two Communication Languages',
    district: 'Apartment World',
    landmarkName: 'Courtyard Signal Antenna',
    storyDetail: 'The transmission hub between group broadcasts and asynchronous 1-on-1 direct messages.',
  },
  {
    chapterNumber: 5,
    x: 120,
    y: 430,
    title: 'Independence Doesn’t Mean Isolation',
    district: 'Apartment World',
    landmarkName: 'Studio 502 / Behind Deadbolt',
    storyDetail: 'Alex’s desk: balancing coursework, 25h work shifts, and home responsibilities.',
  },
  {
    chapterNumber: 6,
    x: 230,
    y: 380,
    title: 'When Superpowers Fail',
    district: 'Multiverse Nexus',
    landmarkName: 'Shifting Strategy Crossroads',
    storyDetail: 'Where initial assumptions meet resident reality and outreach is adapted.',
  },
  {
    chapterNumber: 7,
    x: 200,
    y: 490,
    title: 'The Multiverse RA',
    district: 'Multiverse Nexus',
    landmarkName: 'Rooftop Summit & Web Center',
    storyDetail: 'The shared summit connecting all individual and room-wide community webs.',
  },
];

export const SpiderTracker: React.FC<SpiderTrackerProps> = ({
  session,
  onJumpToChapter,
  onSelectComparisonChapter,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedChapter, setSelectedChapter] = useState<number>(7);
  const [showFieldGuide, setShowFieldGuide] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeLandmark = NEIGHBORHOOD_LANDMARKS.find((l) => l.chapterNumber === selectedChapter) || NEIGHBORHOOD_LANDMARKS[0];
  const activeChapterData = CHAPTERS_DATA.find((c) => c.number === selectedChapter) || CHAPTERS_DATA[0];

  const getSelectedAnswerText = (chapterNum: number): string => {
    const choiceId = session.answers[chapterNum];
    if (!choiceId) return 'Not yet answered';
    const angle = TOPIC_LEARNING_ANGLES[choiceId];
    return angle ? angle.label : 'Approach selected';
  };

  const getLearningPrinciple = (chapterNum: number): string | null => {
    const choiceId = session.answers[chapterNum];
    if (!choiceId) return null;
    return TOPIC_LEARNING_ANGLES[choiceId]?.whatThisPrioritizes || null;
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.9));
  const handleRecenter = () => setZoomLevel(1);

  return (
    <div className="w-full flex flex-col items-center select-none font-sans">
      
      {/* 1. Header Card with Spider-Man Artwork */}
      <div className="relative w-full overflow-hidden rounded-sm border-3 border-black bg-gradient-to-b from-[#1C0812] via-[#101422] to-[#0A0E1A] p-4 pt-3 pb-4 mb-4 shadow-comic text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-spider-cyan text-black px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border border-black shadow-comic-sm">
            ISSUE #7 &bull; THE MULTIVERSE RA
          </span>
          <span className="text-[11px] font-mono text-spider-yellow font-bold">
            CONFERENCE FINALE
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-comic text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight drop-shadow-[2px_2px_0px_#000]">
              Your Spider-Tracker
            </h2>
            <p className="text-xs sm:text-sm font-sans text-gray-200 mt-1 max-w-xs leading-snug">
              Every decision you explored connects two worlds into one shared web.
            </p>
          </div>

          <div className="w-20 sm:w-24 h-auto flex-shrink-0 -mt-2">
            <img
              src={getAssetUrl('images/spiderman-perched.png')}
              alt="Spider-Man Perched"
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,23,68,0.6)]"
            />
          </div>
        </div>

        {/* View Switcher: Interactive Map vs List View */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('map');
            }}
            className={`flex-1 py-2 px-3 rounded-xs text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-spider-red text-white border-black shadow-comic-sm'
                : 'bg-black/60 text-gray-400 border-gray-700 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Illustrated Neighborhood Map</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('list');
            }}
            className={`flex-1 py-2 px-3 rounded-xs text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-spider-cyan text-black border-black shadow-comic-sm'
                : 'bg-black/60 text-gray-400 border-gray-700 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Chapter List View</span>
          </button>
        </div>

        {/* Prominent Red Action Button: Open My RA Field Guide */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setShowFieldGuide(true);
          }}
          className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-spider-red via-[#E6002A] to-spider-red hover:brightness-110 text-white font-comic text-xl uppercase tracking-wider border-2 border-black rounded-xs shadow-comic flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-spider-yellow fill-spider-yellow" />
          <span>View My RA Takeaway // Field Guide</span>
          <ArrowRight className="w-5 h-5 text-spider-yellow" />
        </button>
      </div>

      {/* 2. Illustrated Neighborhood Map View */}
      {activeTab === 'map' && (
        <div className="w-full relative mb-4">
          <div className="w-full h-[460px] sm:h-[500px] bg-[#060A14] border-3 border-black rounded-sm shadow-comic relative overflow-hidden flex items-center justify-center">
            
            {/* Map Canvas Scaled to Viewport */}
            <div 
              className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 400 540"
                className="w-full h-full max-w-full max-h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Halftone & Brick Patterns */}
                  <pattern id="brick-pat" width="16" height="10" patternUnits="userSpaceOnUse">
                    <rect width="16" height="10" fill="#0C1322" />
                    <line x1="0" y1="5" x2="16" y2="5" stroke="#141E34" strokeWidth="1" />
                    <line x1="8" y1="0" x2="8" y2="5" stroke="#141E34" strokeWidth="1" />
                    <line x1="0" y1="5" x2="0" y2="10" stroke="#141E34" strokeWidth="1" />
                  </pattern>

                  {/* Radial Node Glows */}
                  <radialGradient id="glow-gold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFE600" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFE600" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Neighborhood Ground */}
                <rect width="400" height="540" fill="#060A14" />
                <rect width="400" height="540" fill="url(#brick-pat)" opacity="0.6" />

                {/* District Dividers / Architectural Footprints */}
                {/* Left Sector: Apartment District */}
                <rect x="15" y="15" width="180" height="490" rx="6" fill="#091322" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" />
                <text x="25" y="36" fill="#00F0FF" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                  APARTMENT DISTRICT
                </text>
                <text x="25" y="48" fill="#64748B" fontSize="8" fontFamily="sans-serif">
                  Long breezeways &bull; Deadbolts
                </text>

                {/* Apartment Buildings & Courtyard */}
                <g fill="#0E1C33" stroke="#1E2E4E" strokeWidth="1">
                  <rect x="25" y="130" width="75" height="55" rx="3" />
                  <rect x="25" y="290" width="80" height="60" rx="3" />
                  <rect x="25" y="400" width="90" height="55" rx="3" />
                  {/* Central Courtyard Green */}
                  <rect x="110" y="220" width="70" height="90" rx="4" fill="#0B1A1E" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="118" y="270" fill="#10B981" fontSize="8" fontFamily="monospace">COURTYARD</text>
                </g>

                {/* Right Sector: Traditional Residence Hall District */}
                <rect x="205" y="15" width="180" height="490" rx="6" fill="#170A10" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" />
                <text x="215" y="36" fill="#FF1744" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                  RESIDENCE HALL DISTRICT
                </text>
                <text x="215" y="48" fill="#64748B" fontSize="8" fontFamily="sans-serif">
                  Communal lounges &bull; High density
                </text>

                {/* Residence Hall Buildings */}
                <g fill="#220D14" stroke="#3D1520" strokeWidth="1">
                  <rect x="240" y="60" width="130" height="65" rx="3" />
                  <rect x="240" y="210" width="130" height="65" rx="3" />
                  <rect x="215" y="340" width="160" height="70" rx="3" />
                </g>

                {/* Connecting Web Paths (Chronological Multi-Door Route) */}
                <g fill="none">
                  {/* Path 1 -> 2 */}
                  <line x1="300" y1="90" x2="100" y2="160" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" />
                  {/* Path 2 -> 3 */}
                  <line x1="100" y1="160" x2="300" y2="240" stroke="#FF1744" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" />
                  {/* Path 3 -> 4 */}
                  <line x1="300" y1="240" x2="90" y2="320" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" />
                  {/* Path 4 -> 5 */}
                  <line x1="90" y1="320" x2="120" y2="430" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" />
                  {/* Path 5 -> 6 */}
                  <line x1="120" y1="430" x2="230" y2="380" stroke="#A855F7" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.8" />
                  {/* Path 6 -> 7 */}
                  <line x1="230" y1="380" x2="200" y2="490" stroke="#FF1744" strokeWidth="3" opacity="0.9" />
                </g>

                {/* 7 Interactive Chapter Landmark Nodes */}
                {NEIGHBORHOOD_LANDMARKS.map((loc) => {
                  const isSelected = selectedChapter === loc.chapterNumber;
                  const isAnswered = !!session.answers[loc.chapterNumber] || loc.chapterNumber === 1 || loc.chapterNumber === 5 || loc.chapterNumber === 7;

                  return (
                    <g
                      key={loc.chapterNumber}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedChapter(loc.chapterNumber);
                      }}
                      className="cursor-pointer"
                    >
                      {/* Selection Glow Pulse */}
                      {isSelected && (
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r="22"
                          fill="url(#glow-gold)"
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isSelected ? '16' : '13'}
                        fill={isSelected ? '#FFE600' : isAnswered ? '#0A1828' : '#141A29'}
                        stroke={isSelected ? '#000' : isAnswered ? '#00F0FF' : '#475569'}
                        strokeWidth={isSelected ? '3' : '2'}
                      />

                      {/* Chapter Number Label */}
                      <text
                        x={loc.x}
                        y={loc.y + 4}
                        textAnchor="middle"
                        fill={isSelected ? '#000' : isAnswered ? '#00F0FF' : '#94A3B8'}
                        fontSize="11"
                        fontFamily="comic, sans-serif"
                        fontWeight="bold"
                      >
                        {loc.chapterNumber}
                      </text>

                      {/* Visited Checkmark Dot */}
                      {isAnswered && !isSelected && (
                        <circle
                          cx={loc.x + 10}
                          cy={loc.y - 10}
                          r="3.5"
                          fill="#10B981"
                          stroke="#000"
                          strokeWidth="1"
                        />
                      )}

                      {/* Landmark Name Label */}
                      <g transform={`translate(${loc.x > 200 ? loc.x - 85 : loc.x - 10}, ${loc.y + (loc.chapterNumber === 7 ? -25 : 20)})`}>
                        <rect
                          width="95"
                          height="16"
                          rx="2"
                          fill={isSelected ? '#000' : 'rgba(6,10,20,0.85)'}
                          stroke={isSelected ? '#FFE600' : '#1E293B'}
                          strokeWidth="1"
                        />
                        <text
                          x="47"
                          y="11"
                          textAnchor="middle"
                          fill={isSelected ? '#FFE600' : '#E2E8F0'}
                          fontSize="7.5"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {loc.landmarkName.substring(0, 16)}
                        </text>
                      </g>

                      {/* Perched Spider-Man Indicator on Selected Location */}
                      {isSelected && (
                        <image
                          href={getAssetUrl('images/spiderman-crouching.png')}
                          x={loc.x - 18}
                          y={loc.y - 36}
                          width="36"
                          height="24"
                          className="pointer-events-none filter drop-shadow-[0_4px_8px_rgba(255,23,68,0.7)]"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Tactical Zoom & Recenter Controls in Top Right */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleZoomIn();
                }}
                title="Zoom In"
                className="w-7 h-7 bg-black/80 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleZoomOut();
                }}
                title="Zoom Out"
                className="w-7 h-7 bg-black/80 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleRecenter();
                }}
                title="Reset Zoom"
                className="w-7 h-7 bg-black/80 hover:bg-black border border-spider-cyan text-spider-cyan flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Bottom Info Pill */}
            <div className="absolute bottom-2 left-2 z-20 pointer-events-none bg-black/75 px-2 py-0.5 rounded-xs border border-gray-800 text-[10px] font-mono text-gray-300">
              Tap markers to inspect landmarks &bull; Entire neighborhood framed
            </div>
          </div>

          {/* 3. Bottom Detail Drawer for Selected Landmark */}
          <AnimatePresence>
            {activeChapterData && activeLandmark && (
              <motion.div
                key={activeChapterData.number}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="w-full mt-3 p-4 bg-[#0A1222] border-3 border-black rounded-sm shadow-comic text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-gray-800 pb-2 mb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="bg-spider-yellow text-black px-2 py-0.2 text-[10px] font-mono font-bold uppercase rounded-xs">
                        CHAPTER {activeChapterData.number} OF 7
                      </span>
                      <span className="text-[10px] font-mono text-spider-cyan font-bold">
                        {activeLandmark.district}
                      </span>
                    </div>
                    <h3 className="font-comic text-xl text-white uppercase tracking-wide">
                      {activeChapterData.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onJumpToChapter(activeChapterData.number);
                    }}
                    className="py-1 px-2.5 bg-spider-red hover:bg-spider-crimson text-white text-[11px] font-comic uppercase tracking-wider border border-black rounded-xs shadow-comic-sm flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  >
                    <span>Jump to Ch. {activeChapterData.number}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Landmark Info & Story Context */}
                <div className="text-xs font-mono text-gray-300 mb-2">
                  <span className="text-spider-cyan font-bold">Landmark:</span> {activeLandmark.landmarkName}
                  <p className="text-[11px] font-sans text-gray-400 mt-0.5">{activeLandmark.storyDetail}</p>
                </div>

                {/* Selected Answer & Principle (if decision chapter) */}
                {activeChapterData.hasDecision ? (
                  <div className="p-2.5 bg-black/60 border border-gray-700/80 rounded-xs mb-2.5">
                    <span className="text-[10px] font-mono text-gray-400 block mb-0.5 uppercase">
                      Your Selected Approach:
                    </span>
                    <span className="font-sans text-sm text-spider-yellow font-semibold block">
                      "{getSelectedAnswerText(activeChapterData.number)}"
                    </span>
                    {getLearningPrinciple(activeChapterData.number) && (
                      <p className="text-[11px] font-sans text-emerald-400 mt-1">
                        &bull; Prioritizes: {getLearningPrinciple(activeChapterData.number)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 bg-black/40 border border-gray-800 rounded-xs mb-2.5 text-xs font-sans text-gray-300">
                    {activeChapterData.number === 1
                      ? `Community Orientation: ${session.selectedCommunity || 'Explored freely'}`
                      : activeChapterData.number === 5
                      ? 'Alex’s daily realities: Classes, work shifts, family responsibilities, and limited time.'
                      : 'Completed conference web connecting personal and collective pathways.'}
                  </div>
                )}

                {/* Route to Room Comparison Action */}
                {activeChapterData.hasDecision && onSelectComparisonChapter && (
                  <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400">
                      Curious what others in the room chose?
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        onSelectComparisonChapter(activeChapterData.number);
                      }}
                      className="px-2.5 py-1 bg-[#121E33] hover:bg-[#1A2C4B] text-spider-cyan border border-spider-cyan/50 font-mono text-[10px] uppercase rounded-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Users className="w-3 h-3 text-spider-cyan" />
                      <span>Compare in Room Web &rarr;</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 3. List Alternative View */}
      {activeTab === 'list' && (
        <div className="w-full space-y-2.5 mb-5 text-left">
          {CHAPTERS_DATA.map((ch) => {
            const isAnswered = !!session.answers[ch.number] || ch.number === 1 || ch.number === 5 || ch.number === 7;
            const loc = NEIGHBORHOOD_LANDMARKS.find((l) => l.chapterNumber === ch.number);

            return (
              <div
                key={ch.number}
                className="p-3.5 bg-[#0A1222] border-2 border-black rounded-sm shadow-comic"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-spider-red text-white font-comic text-xs flex items-center justify-center border border-black shadow-comic-sm">
                      {ch.number}
                    </span>
                    <h4 className="font-comic text-lg text-white uppercase tracking-wide">
                      {ch.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-spider-cyan font-bold">
                      {loc?.district}
                    </span>
                    {isAnswered && (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/40">
                        VISITED
                      </span>
                    )}
                  </div>
                </div>

                {ch.hasDecision && (
                  <div className="p-2 bg-black/60 border border-gray-800 rounded-xs text-xs font-sans text-gray-200 mb-2">
                    <span className="text-gray-400 font-mono text-[10px] block uppercase">
                      Chosen Approach:
                    </span>
                    <span className="text-spider-yellow font-semibold">
                      "{getSelectedAnswerText(ch.number)}"
                    </span>
                  </div>
                )}

                <div className="text-xs font-comic text-white leading-tight">
                  <span className="text-spider-yellow">TAKEAWAY: </span>
                  "{ch.takeaway}"
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-800 flex justify-end">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onJumpToChapter(ch.number);
                    }}
                    className="text-xs font-mono text-spider-cyan hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Revisit Chapter {ch.number}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Personalized Field Guide Modal */}
      {showFieldGuide && (
        <FieldGuideCard
          session={session}
          onClose={() => setShowFieldGuide(false)}
          onJumpToChapter={onJumpToChapter}
        />
      )}
    </div>
  );
};
