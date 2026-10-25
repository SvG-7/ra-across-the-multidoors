import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  List, 
  Map, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { CHAPTERS_DATA } from '../../data/chaptersData';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

interface SpiderTrackerProps {
  session: AttendeeSession;
  onJumpToChapter: (chapterNumber: number) => void;
  reducedMotion?: boolean;
}

interface MapLocation {
  chapterNumber: number;
  x: number;
  y: number;
  title: string;
  district: 'Residence Hall World' | 'Apartment World' | 'Multiverse Nexus';
  landmark: string;
}

const MAP_LOCATIONS: MapLocation[] = [
  {
    chapterNumber: 1,
    x: 680,
    y: 380,
    title: 'One Mission, Two Worlds',
    district: 'Residence Hall World',
    landmark: 'First-Year Dorm Quad',
  },
  {
    chapterNumber: 2,
    x: 230,
    y: 280,
    title: 'The Invisible Resident',
    district: 'Apartment World',
    landmark: 'Apt 502 / Alex’s Window',
  },
  {
    chapterNumber: 3,
    x: 640,
    y: 190,
    title: 'Same Title, Different Relationships',
    district: 'Residence Hall World',
    landmark: 'Resident Peer Lounge',
  },
  {
    chapterNumber: 4,
    x: 200,
    y: 410,
    title: 'Two Communication Languages',
    district: 'Apartment World',
    landmark: 'Transmission Signal Route',
  },
  {
    chapterNumber: 5,
    x: 130,
    y: 180,
    title: 'Independence Doesn’t Mean Isolation',
    district: 'Apartment World',
    landmark: 'Life Behind the Deadbolt',
  },
  {
    chapterNumber: 6,
    x: 440,
    y: 360,
    title: 'When Superpowers Fail',
    district: 'Multiverse Nexus',
    landmark: 'Shifting Strategy Crossroads',
  },
  {
    chapterNumber: 7,
    x: 450,
    y: 140,
    title: 'The Multiverse RA',
    district: 'Multiverse Nexus',
    landmark: 'Shared Community Summit',
  },
];

export const SpiderTracker: React.FC<SpiderTrackerProps> = ({
  session,
  onJumpToChapter,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedMarker, setSelectedMarker] = useState<number | null>(7);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Get active chapter details
  const activeChapterData = selectedMarker
    ? CHAPTERS_DATA.find((c) => c.number === selectedMarker)
    : null;
  const activeLocation = selectedMarker
    ? MAP_LOCATIONS.find((l) => l.chapterNumber === selectedMarker)
    : null;

  // Retrieve user answer label for the selected chapter
  const getSelectedAnswerText = (chapterNum: number) => {
    const chData = CHAPTERS_DATA.find((c) => c.number === chapterNum);
    if (!chData?.hasDecision) return null;
    const answerId = session.answers[chapterNum];
    if (!answerId) return 'No choice recorded / Skipped';
    const opt = chData.options?.find((o) => o.id === answerId);
    return opt ? opt.label : 'Choice recorded';
  };

  // Map Navigation Handlers
  const handleZoomIn = () => setScale((s) => Math.min(2.2, s + 0.25));
  const handleZoomOut = () => setScale((s) => Math.max(0.85, s - 0.25));
  const handleRecenter = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div className="w-full flex flex-col items-center select-none font-sans">
      {/* 1. Header with Perched Spider-Man Artwork */}
      <div className="relative w-full overflow-hidden rounded-sm border-3 border-black bg-gradient-to-b from-[#1C0810] via-[#0E1528] to-[#070B14] p-4 pt-3 pb-5 mb-4 shadow-comic">
        <div className="absolute inset-0 bg-halftone-cyan opacity-25 pointer-events-none" />

        <div className="flex items-start justify-between relative z-10 mb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-spider-cyan text-black font-mono text-[10px] font-bold uppercase tracking-wider border border-black shadow-comic-sm mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>ISSUE #7 &bull; THE MULTIVERSE RA</span>
            </div>
            <h2 className="font-comic text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight drop-shadow-md">
              Your Spider-Tracker
            </h2>
            <p className="text-xs sm:text-sm font-sans text-gray-300 leading-snug max-w-xs mt-0.5">
              Every decision you explored connects two worlds into one web.
            </p>
          </div>

          {/* Perched Spider-Man Visual */}
          <div className="w-28 sm:w-36 h-auto -mr-2 -mt-2 flex-shrink-0">
            <img
              src={getAssetUrl('images/spiderman-perched.png')}
              alt="Spider-Man Perched"
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(255,23,68,0.5)]"
            />
          </div>
        </div>

        {/* View Mode Toggle: Interactive Map vs List View */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-800 relative z-10">
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
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
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
      </div>

      {/* 2. Interactive Map View */}
      {activeTab === 'map' && (
        <div className="w-full relative mb-4">
          {/* Map Viewport Container */}
          <div
            className="w-full h-[360px] sm:h-[420px] bg-[#070A12] border-3 border-black rounded-sm shadow-comic relative overflow-hidden touch-none cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Map Canvas Layer */}
            <div
              className="w-full h-full origin-center transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            >
              <svg
                viewBox="0 0 900 600"
                className="w-full h-full min-w-[900px] min-h-[600px] select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="tracker-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#121828" strokeWidth="1" />
                  </pattern>
                  {/* Glowing Marker Gradients */}
                  <radialGradient id="marker-glow-red" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF1744" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF1744" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="marker-glow-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="900" height="600" fill="#070A12" />
                <rect width="900" height="600" fill="url(#tracker-grid)" />

                {/* Left Sector: Apartment Community World (Cyan Hue) */}
                <rect x="20" y="20" width="410" height="560" rx="8" fill="#0A1224" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
                <text x="40" y="55" fill="#00F0FF" fontSize="16" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
                  SECTOR A // APARTMENT WORLD
                </text>
                <text x="40" y="75" fill="#64748B" fontSize="11" fontFamily="sans-serif">
                  High Autonomy &bull; Physical Distance &bull; Deadbolt Corridors
                </text>

                {/* Apartment Building Footprints */}
                <g fill="#0E1B33" stroke="#1E293B" strokeWidth="1.5">
                  <rect x="50" y="110" width="130" height="90" rx="4" />
                  <rect x="220" y="110" width="160" height="80" rx="4" />
                  <rect x="60" y="240" width="140" height="100" rx="4" />
                  <rect x="230" y="230" width="150" height="90" rx="4" />
                  <rect x="70" y="380" width="150" height="85" rx="4" />
                  <rect x="250" y="360" width="140" height="90" rx="4" />
                </g>

                {/* Right Sector: Residence Hall World (Red Hue) */}
                <rect x="470" y="20" width="410" height="560" rx="8" fill="#1C0A10" stroke="#FF1744" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
                <text x="490" y="55" fill="#FF1744" fontSize="16" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
                  SECTOR B // RESIDENCE HALL WORLD
                </text>
                <text x="490" y="75" fill="#64748B" fontSize="11" fontFamily="sans-serif">
                  High Density &bull; High Frequency &bull; Communal Hallways
                </text>

                {/* Residence Hall Building Footprints */}
                <g fill="#240D14" stroke="#331A22" strokeWidth="1.5">
                  <rect x="510" y="120" width="150" height="100" rx="4" />
                  <rect x="700" y="110" width="140" height="110" rx="4" />
                  <ellipse cx="680" cy="290" rx="90" ry="45" />
                  <rect x="510" y="330" width="130" height="110" rx="4" />
                  <rect x="680" y="360" width="160" height="95" rx="4" />
                </g>

                {/* Central Multiverse Nexus Bridge */}
                <path d="M 430 300 L 470 300" stroke="#FFE600" strokeWidth="4" strokeDasharray="6 3" />
                <text x="450" y="290" textAnchor="middle" fill="#FFE600" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  DIMENSIONAL TRANSIT
                </text>

                {/* Connecting Web Route across all 7 chapters */}
                <path
                  d="M 680 380 L 230 280 L 640 190 L 200 410 L 130 180 L 440 360 L 450 140"
                  fill="none"
                  stroke="#FF1744"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />
                <path
                  d="M 680 380 L 230 280 L 640 190 L 200 410 L 130 180 L 440 360 L 450 140"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* 7 Chapter Markers */}
                {MAP_LOCATIONS.map((loc) => {
                  const isSelected = selectedMarker === loc.chapterNumber;
                  const isAnswered = !!session.answers[loc.chapterNumber] || loc.chapterNumber === 1 || loc.chapterNumber === 5 || loc.chapterNumber === 7;
                  const markerColor = loc.chapterNumber % 2 === 1 ? '#FF1744' : '#00F0FF';

                  return (
                    <g
                      key={loc.chapterNumber}
                      transform={`translate(${loc.x}, ${loc.y})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.playClick();
                        setSelectedMarker(loc.chapterNumber);
                      }}
                      className="cursor-pointer"
                    >
                      {/* Outer Pulse Halo */}
                      {isSelected && (
                        <circle
                          r="32"
                          fill={markerColor === '#FF1744' ? 'url(#marker-glow-red)' : 'url(#marker-glow-cyan)'}
                          className={reducedMotion ? '' : 'animate-pulse'}
                        />
                      )}

                      {/* Pin Outer Ring */}
                      <circle
                        r={isSelected ? 22 : 18}
                        fill="#060912"
                        stroke={isSelected ? '#FFE600' : markerColor}
                        strokeWidth={isSelected ? 4 : 2.5}
                      />

                      {/* Chapter Number Label */}
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize={isSelected ? '15' : '13'}
                        fontFamily="Bangers, sans-serif"
                        letterSpacing="1"
                      >
                        {loc.chapterNumber}
                      </text>

                      {/* Small Status Indicator Dot */}
                      <circle
                        cx="12"
                        cy="-12"
                        r="4.5"
                        fill={isAnswered ? '#10B981' : '#64748B'}
                        stroke="#000"
                        strokeWidth="1"
                      />

                      {/* Location Badge (Visible on Map) */}
                      <rect
                        x="-70"
                        y={isSelected ? "28" : "24"}
                        width="140"
                        height="18"
                        rx="3"
                        fill="#000000"
                        stroke={isSelected ? '#FFE600' : '#334155'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y={isSelected ? "40" : "36"}
                        textAnchor="middle"
                        fill={isSelected ? '#FFE600' : '#E2E8F0'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {loc.landmark}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Tactical Map Overlay Toolbar */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleZoomIn();
                }}
                title="Zoom In"
                className="w-8 h-8 bg-black/80 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleZoomOut();
                }}
                title="Zoom Out"
                className="w-8 h-8 bg-black/80 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playClick();
                  handleRecenter();
                }}
                title="Show Full Journey"
                className="w-8 h-8 bg-black/80 hover:bg-black border border-spider-cyan text-spider-cyan flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom-left hint */}
            <div className="absolute bottom-2 left-2 z-20 pointer-events-none bg-black/70 px-2 py-1 rounded-xs border border-gray-800 text-[10px] font-mono text-gray-400">
              Drag to pan &bull; Tap any marker to view details
            </div>
          </div>

          {/* 3. Bottom Detail Drawer / Panel for Selected Marker */}
          <AnimatePresence>
            {activeChapterData && activeLocation && (
              <motion.div
                key={activeChapterData.number}
                initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full mt-3 p-4 bg-[#0A1222] border-3 border-black rounded-sm shadow-comic text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-gray-800 pb-2 mb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="bg-spider-yellow text-black px-2 py-0.2 text-[10px] font-mono font-bold uppercase rounded-xs">
                        CHAPTER {activeChapterData.number} OF 7
                      </span>
                      <span className="text-[10px] font-mono text-spider-cyan font-bold">
                        {activeLocation.district}
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

                {/* Landmark info */}
                <div className="text-xs font-mono text-gray-400 mb-2">
                  <span className="text-spider-cyan">Location:</span> {activeLocation.landmark}
                </div>

                {/* Selected Answer if Decision Chapter */}
                {activeChapterData.hasDecision ? (
                  <div className="p-2.5 bg-black/60 border border-gray-700/80 rounded-xs mb-2.5">
                    <span className="text-[10px] font-mono text-gray-400 block mb-0.5 uppercase">
                      Your Selected Approach:
                    </span>
                    <span className="font-sans text-sm text-spider-yellow font-semibold">
                      {getSelectedAnswerText(activeChapterData.number)}
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-black/40 border border-gray-800 rounded-xs mb-2.5 text-xs font-sans text-gray-300">
                    {activeChapterData.number === 1
                      ? `Community Orientation: ${session.selectedCommunity || 'Explored freely'}`
                      : activeChapterData.number === 5
                      ? "Alex’s daily schedule: classes, work shifts, home responsibilities, and limited time."
                      : "Completed leadership web connecting all decision pathways."}
                  </div>
                )}

                {/* Chapter Key Takeaway */}
                <div className="p-2.5 bg-gradient-to-r from-spider-red/20 to-spider-cyan/20 border border-spider-cyan/50 rounded-xs">
                  <span className="text-[10px] font-mono font-bold text-spider-yellow block uppercase mb-0.5">
                    KEY TAKEAWAY:
                  </span>
                  <p className="font-comic text-base text-white leading-tight">
                    "{activeChapterData.takeaway}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 3. List Alternative View (Readable scrollable list of all 7 chapters) */}
      {activeTab === 'list' && (
        <div className="w-full space-y-2.5 mb-5 text-left">
          {CHAPTERS_DATA.map((ch) => {
            const isAnswered = !!session.answers[ch.number] || ch.number === 1 || ch.number === 5 || ch.number === 7;
            const loc = MAP_LOCATIONS.find((l) => l.chapterNumber === ch.number);

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
                      {getSelectedAnswerText(ch.number)}
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

      {/* 4. Overall Final Takeaway Banner */}
      <div className="w-full p-5 bg-gradient-to-r from-spider-red via-[#B71C1C] to-spider-red border-3 border-black text-white text-center shadow-comic rounded-sm mb-4">
        <p className="font-comic text-2xl sm:text-3xl tracking-wide uppercase leading-snug">
          "Take one approach from the other world into your own community."
        </p>
      </div>
    </div>
  );
};
