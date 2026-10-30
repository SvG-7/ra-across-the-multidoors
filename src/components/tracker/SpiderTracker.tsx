import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowRight, 
  Users, 
  Compass, 
  List
} from 'lucide-react';
import { AttendeeSession } from '../../types';
import { CHAPTERS_DATA } from '../../data/chaptersData';
import { TOPIC_LEARNING_ANGLES } from '../../utils/takeawayGenerator';
import { soundEngine } from '../../audio/soundEffects';
import { getAssetUrl } from '../../utils/assets';

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
  district: string;
  landmarkName: string;
  storyDetail: string;
}

const NEIGHBORHOOD_LANDMARKS: NeighborhoodLandmark[] = [
  {
    chapterNumber: 1,
    x: 295,
    y: 410,
    title: 'One Mission, Two Worlds',
    district: 'Residence Hall',
    landmarkName: 'Main Entrance',
    storyDetail: 'Shared high-density entry threshold where all residents pass through.',
  },
  {
    chapterNumber: 2,
    x: 75,
    y: 195,
    title: 'The Invisible Resident',
    district: 'Apartment',
    landmarkName: 'Apt 502 (Alex)',
    storyDetail: 'Individual deadbolt door and quiet window behind exterior breezeway.',
  },
  {
    chapterNumber: 3,
    x: 295,
    y: 250,
    title: 'Same Title, Different Relationships',
    district: 'Residence Hall',
    landmarkName: 'Peer Lounge',
    storyDetail: 'Shared floor lounge where hallway encounters and peer boundaries overlap.',
  },
  {
    chapterNumber: 4,
    x: 145,
    y: 275,
    title: 'Two Communication Languages',
    district: 'Apartment',
    landmarkName: 'Courtyard',
    storyDetail: 'Open shared gathering space between physical distance and digital reach.',
  },
  {
    chapterNumber: 5,
    x: 75,
    y: 395,
    title: 'Independence Doesn’t Mean Isolation',
    district: 'Apartment',
    landmarkName: 'Studio 502',
    storyDetail: 'Inside the unit: balancing classes, work shifts, and home responsibilities.',
  },
  {
    chapterNumber: 6,
    x: 200,
    y: 335,
    title: 'When Superpowers Fail',
    district: 'Nexus Crossroads',
    landmarkName: 'Crossroads',
    storyDetail: 'Where initial outreach assumptions meet reality and strategies adapt.',
  },
  {
    chapterNumber: 7,
    x: 200,
    y: 65,
    title: 'The Multiverse RA',
    district: 'Nexus Summit',
    landmarkName: 'Nexus Summit',
    storyDetail: 'The shared rooftop connecting both worlds into one community web.',
  },
];

export const SpiderTracker: React.FC<SpiderTrackerProps> = ({
  session,
  onJumpToChapter,
  onSelectComparisonChapter,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedChapter, setSelectedChapter] = useState<number>(2);
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
      {/* Tab Switcher: Illustrated Map vs List View */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('map');
            }}
            className={`py-1.5 px-3 rounded-xs text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-spider-red text-white border-black shadow-comic-sm'
                : 'bg-black/60 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Split Neighborhood Map</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('list');
            }}
            className={`py-1.5 px-3 rounded-xs text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-spider-cyan text-black border-black shadow-comic-sm'
                : 'bg-black/60 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Chapter List</span>
          </button>
        </div>

        <span className="font-mono text-[10px] text-gray-400 hidden sm:inline">
          Both Worlds Side-by-Side
        </span>
      </div>

      {/* 1. ILLUSTRATED SPLIT NEIGHBORHOOD MAP */}
      {activeTab === 'map' && (
        <div className="w-full relative mb-4">
          <div className="w-full h-[470px] sm:h-[510px] bg-[#050812] border-3 border-black rounded-sm shadow-comic relative overflow-hidden flex items-center justify-center">
            
            {/* Map Canvas Scaled to Viewport */}
            <div 
              className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 400 520"
                className="w-full h-full max-w-full max-h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Halftone & Brick Patterns */}
                  <pattern id="brick-pat" width="16" height="10" patternUnits="userSpaceOnUse">
                    <rect width="16" height="10" fill="#070B16" />
                    <line x1="0" y1="5" x2="16" y2="5" stroke="#121A2C" strokeWidth="0.8" />
                    <line x1="8" y1="0" x2="8" y2="5" stroke="#121A2C" strokeWidth="0.8" />
                    <line x1="0" y1="5" x2="0" y2="10" stroke="#121A2C" strokeWidth="0.8" />
                  </pattern>

                  {/* Halftone Dot Pattern */}
                  <pattern id="halftone-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.2" fill="#141E34" />
                  </pattern>

                  {/* Radial Node Glows */}
                  <radialGradient id="glow-gold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFE600" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFE600" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-red" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF1744" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FF1744" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Ground */}
                <rect width="400" height="520" fill="#050812" />
                <rect width="400" height="520" fill="url(#brick-pat)" opacity="0.45" />

                {/* ========================================================= */}
                {/* 1. LEFT WORLD: APARTMENT COMMUNITY (x: 10 to 195)         */}
                {/* Distinct buildings, individual deadbolt doors, breezeways */}
                {/* ========================================================= */}
                <g id="apartment-world">
                  {/* District Boundary Card */}
                  <rect x="10" y="10" width="185" height="495" rx="5" fill="#07111E" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
                  
                  {/* District Header */}
                  <rect x="18" y="16" width="168" height="26" rx="2" fill="#0C1B30" stroke="#00F0FF" strokeWidth="1" />
                  <text x="26" y="32" fill="#00F0FF" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
                    APARTMENTS
                  </text>
                  <text x="105" y="32" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">
                    Separate units &bull; Breezeways
                  </text>

                  {/* Building 1 (North Units 501-502) */}
                  <g id="apt-bldg-1">
                    <rect x="20" y="52" width="80" height="85" rx="3" fill="#0B182B" stroke="#1E2F4A" strokeWidth="1.2" />
                    <line x1="20" y1="58" x2="100" y2="58" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" />
                    {/* Upper Window with Curtain */}
                    <rect x="30" y="65" width="22" height="18" fill="#13243D" stroke="#00F0FF" strokeWidth="0.8" />
                    <line x1="41" y1="65" x2="41" y2="83" stroke="#00F0FF" strokeWidth="0.6" opacity="0.7" />
                    {/* Unit 501 Exterior Door */}
                    <rect x="62" y="70" width="26" height="42" rx="1.5" fill="#111F36" stroke="#00F0FF" strokeWidth="1" />
                    <circle cx="82" cy="92" r="1.5" fill="#FFE600" /> {/* Deadbolt lock */}
                    <text x="75" y="80" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" fontWeight="bold">501</text>
                    <rect x="60" y="112" width="30" height="4" fill="#070D18" /> {/* Door mat */}
                  </g>

                  {/* Exterior Metal Walkway / Breezeway Connecting Buildings */}
                  <g id="breezeway-walkways">
                    {/* Elevated Walkway */}
                    <rect x="95" y="85" width="45" height="14" fill="#0E1C30" stroke="#00F0FF" strokeWidth="0.8" />
                    {/* Metal Railing Slats */}
                    {[100, 108, 116, 124, 132].map((rx) => (
                      <line key={rx} x1={rx} y1="78" x2={rx} y2="85" stroke="#00F0FF" strokeWidth="0.8" opacity="0.8" />
                    ))}
                    <line x1="95" y1="78" x2="140" y2="78" stroke="#00F0FF" strokeWidth="1" />
                    <text x="98" y="95" fill="#64748B" fontSize="6" fontFamily="monospace">WALKWAY</text>
                  </g>

                  {/* Building 2 (Alex's Building, Mid Units 502) */}
                  <g id="apt-bldg-2">
                    <rect x="20" y="152" width="85" height="95" rx="3" fill="#0D1E35" stroke="#00F0FF" strokeWidth="1.2" />
                    <line x1="20" y1="158" x2="105" y2="158" stroke="#00F0FF" strokeWidth="1.5" />
                    {/* Alex's Studio Window with warm night glow */}
                    <rect x="28" y="165" width="28" height="22" rx="1" fill="#242812" stroke="#FFE600" strokeWidth="1" />
                    <line x1="42" y1="165" x2="42" y2="187" stroke="#FFE600" strokeWidth="0.8" opacity="0.6" />
                    <circle cx="36" cy="174" r="3" fill="#FFE600" opacity="0.8" /> {/* Interior Lamp */}
                    {/* Alex's Deadbolt Door 502 */}
                    <rect x="64" y="175" width="28" height="46" rx="1.5" fill="#102540" stroke="#00F0FF" strokeWidth="1.2" />
                    <circle cx="85" cy="198" r="1.8" fill="#FFE600" /> {/* Heavy Deadbolt */}
                    <text x="78" y="187" fill="#FFE600" fontSize="7" fontFamily="monospace" fontWeight="bold">502</text>
                    <rect x="62" y="221" width="32" height="4" fill="#060C16" />
                  </g>

                  {/* Central Courtyard Green with Gathering Area & Lamp Post */}
                  <g id="courtyard-gathering">
                    <rect x="110" y="215" width="76" height="115" rx="4" fill="#08181A" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="122" y="230" fill="#10B981" fontSize="7.5" fontFamily="monospace" fontWeight="bold">COURTYARD</text>
                    
                    {/* Picnic Table / Gathering Bench */}
                    <rect x="125" y="240" width="34" height="14" rx="1.5" fill="#102422" stroke="#10B981" strokeWidth="0.8" />
                    <line x1="122" y1="247" x2="162" y2="247" stroke="#10B981" strokeWidth="0.6" />
                    
                    {/* Courtyard Lamp Post with Warm Glow */}
                    <line x1="148" y1="270" x2="148" y2="295" stroke="#94A3B8" strokeWidth="1.2" />
                    <circle cx="148" cy="268" r="4" fill="#FFE600" opacity="0.9" />
                    <circle cx="148" cy="268" r="10" fill="#FFE600" opacity="0.15" />
                    
                    {/* Outdoor Stepping Stones */}
                    <circle cx="125" cy="305" r="2.5" fill="#1E3236" />
                    <circle cx="134" cy="312" r="2.5" fill="#1E3236" />
                    <circle cx="145" cy="315" r="2.5" fill="#1E3236" />
                  </g>

                  {/* Building 3 (South Units 503-504) */}
                  <g id="apt-bldg-3">
                    <rect x="20" y="360" width="85" height="90" rx="3" fill="#0A1626" stroke="#1E2F4A" strokeWidth="1.2" />
                    <line x1="20" y1="366" x2="105" y2="366" stroke="#00F0FF" strokeWidth="1" opacity="0.7" />
                    {/* Unit 503 Door */}
                    <rect x="30" y="380" width="24" height="40" rx="1.5" fill="#102035" stroke="#1E2F4A" strokeWidth="1" />
                    <circle cx="48" cy="400" r="1.5" fill="#94A3B8" />
                    <text x="36" y="392" fill="#94A3B8" fontSize="6.5" fontFamily="monospace">503</text>
                    {/* Unit 504 Door */}
                    <rect x="66" y="380" width="24" height="40" rx="1.5" fill="#102035" stroke="#1E2F4A" strokeWidth="1" />
                    <circle cx="84" cy="400" r="1.5" fill="#94A3B8" />
                    <text x="72" y="392" fill="#94A3B8" fontSize="6.5" fontFamily="monospace">504</text>
                  </g>

                  {/* Distant Breezeway Alleyway */}
                  <text x="25" y="475" fill="#475569" fontSize="6.5" fontFamily="monospace">
                    EXTERIOR ACCESS ONLY &bull; GAPS BETWEEN UNITS
                  </text>
                </g>

                {/* ========================================================= */}
                {/* 2. RIGHT WORLD: RESIDENCE HALL (x: 205 to 390)            */}
                {/* Connected building cutaway, central hallway, shared lounge*/}
                {/* ========================================================= */}
                <g id="residence-hall-world">
                  {/* District Boundary Card */}
                  <rect x="205" y="10" width="185" height="495" rx="5" fill="#15080E" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
                  
                  {/* District Header */}
                  <rect x="213" y="16" width="168" height="26" rx="2" fill="#280D18" stroke="#FF1744" strokeWidth="1" />
                  <text x="221" y="32" fill="#FF1744" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
                    RESIDENCE HALL
                  </text>
                  <text x="312" y="32" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">
                    Shared hall &bull; Lounge
                  </text>

                  {/* Contiguous Shared Building Cutaway Shell */}
                  <rect x="213" y="52" width="168" height="425" rx="3" fill="#1C0A12" stroke="#421321" strokeWidth="1.2" />

                  {/* Central Hallway Corridor running through the building */}
                  <g id="hallway-corridor">
                    <rect x="268" y="56" width="58" height="300" fill="#260F18" stroke="#541728" strokeWidth="1" />
                    {/* Corridor Carpet Runner */}
                    <rect x="280" y="56" width="34" height="300" fill="#321320" stroke="#FF1744" strokeWidth="0.6" opacity="0.7" />
                    {/* Ceiling Fixture Lighting Down Corridor */}
                    {[80, 120, 160, 200].map((ly) => (
                      <circle key={ly} cx="297" cy={ly} r="2.5" fill="#FFE600" opacity="0.8" />
                    ))}
                    <text x="272" y="70" fill="#FF1744" fontSize="6.5" fontFamily="monospace" transform="rotate(90 272 70)">
                      SHARED HALLWAY
                    </text>
                  </g>

                  {/* Closely Spaced Student Room Doors on Left & Right of Hallway */}
                  <g id="hall-student-rooms">
                    {/* Room 201 */}
                    <rect x="218" y="65" width="45" height="52" rx="1.5" fill="#180A10" stroke="#FF1744" strokeWidth="0.8" />
                    <rect x="245" y="72" width="18" height="38" rx="1" fill="#2A0E1A" stroke="#FF1744" strokeWidth="1" />
                    <circle cx="249" cy="92" r="1.2" fill="#FFE600" />
                    {/* Whiteboard Message Tag */}
                    <rect x="223" y="74" width="16" height="12" fill="#E2E8F0" stroke="#000" strokeWidth="0.5" />
                    <text x="226" y="82" fill="#000" fontSize="5" fontFamily="sans-serif">201</text>

                    {/* Room 202 */}
                    <rect x="218" y="125" width="45" height="52" rx="1.5" fill="#180A10" stroke="#FF1744" strokeWidth="0.8" />
                    <rect x="245" y="132" width="18" height="38" rx="1" fill="#2A0E1A" stroke="#FF1744" strokeWidth="1" />
                    <circle cx="249" cy="152" r="1.2" fill="#FFE600" />
                    <rect x="223" y="134" width="16" height="12" fill="#E2E8F0" stroke="#000" strokeWidth="0.5" />
                    <text x="226" y="142" fill="#000" fontSize="5" fontFamily="sans-serif">202</text>

                    {/* Room 203 (Right side) */}
                    <rect x="330" y="65" width="45" height="52" rx="1.5" fill="#180A10" stroke="#FF1744" strokeWidth="0.8" />
                    <rect x="332" y="72" width="18" height="38" rx="1" fill="#2A0E1A" stroke="#FF1744" strokeWidth="1" />
                    <circle cx="346" cy="92" r="1.2" fill="#FFE600" />
                    <rect x="355" y="74" width="16" height="12" fill="#E2E8F0" stroke="#000" strokeWidth="0.5" />
                    <text x="358" y="82" fill="#000" fontSize="5" fontFamily="sans-serif">203</text>

                    {/* Room 204 (Right side) */}
                    <rect x="330" y="125" width="45" height="52" rx="1.5" fill="#180A10" stroke="#FF1744" strokeWidth="0.8" />
                    <rect x="332" y="132" width="18" height="38" rx="1" fill="#2A0E1A" stroke="#FF1744" strokeWidth="1" />
                    <circle cx="346" cy="152" r="1.2" fill="#FFE600" />
                    <rect x="355" y="134" width="16" height="12" fill="#E2E8F0" stroke="#000" strokeWidth="0.5" />
                    <text x="358" y="142" fill="#000" fontSize="5" fontFamily="sans-serif">204</text>
                  </g>

                  {/* Shared 2nd Floor Peer Lounge Area */}
                  <g id="peer-lounge">
                    <rect x="220" y="195" width="154" height="98" rx="3" fill="#2B0E18" stroke="#FF1744" strokeWidth="1.2" />
                    <text x="226" y="210" fill="#FF1744" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                      2ND FL. COMMUNAL LOUNGE
                    </text>
                    
                    {/* Big Sectional Couch / Sofas */}
                    <path d="M 228 225 L 265 225 L 265 255 L 250 255 L 250 240 L 228 240 Z" fill="#4A1322" stroke="#FF1744" strokeWidth="0.8" />
                    <rect x="232" y="228" width="14" height="10" fill="#5F172B" />
                    {/* Coffee Table */}
                    <rect x="252" y="235" width="18" height="14" rx="1" fill="#200B12" stroke="#94A3B8" strokeWidth="0.6" />
                    
                    {/* Bulletin Board / Poster Wall */}
                    <rect x="332" y="218" width="36" height="24" fill="#3D1520" stroke="#FFE600" strokeWidth="0.8" />
                    <text x="336" y="230" fill="#FFE600" fontSize="5.5" fontFamily="sans-serif">POSTERS</text>
                    <line x1="336" y1="234" x2="362" y2="234" stroke="#94A3B8" strokeWidth="0.6" />
                    <line x1="336" y1="237" x2="356" y2="237" stroke="#94A3B8" strokeWidth="0.6" />
                  </g>

                  {/* Main Shared Building Entrance & Lobby */}
                  <g id="main-entrance-lobby">
                    <rect x="220" y="325" width="154" height="135" rx="3" fill="#230B14" stroke="#FF1744" strokeWidth="1.2" />
                    <text x="226" y="340" fill="#FF1744" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                      MAIN LOBBY &bull; SINGLE ENTRANCE
                    </text>

                    {/* RA Duty Desk */}
                    <rect x="230" y="355" width="38" height="22" rx="1.5" fill="#3C1220" stroke="#FFE600" strokeWidth="0.8" />
                    <text x="234" y="368" fill="#FFE600" fontSize="5.5" fontFamily="monospace">DUTY DESK</text>

                    {/* Grand Entrance Double Glass Doors */}
                    <rect x="278" y="388" width="48" height="52" rx="2" fill="#12060A" stroke="#FF1744" strokeWidth="1.5" />
                    <line x1="302" y1="388" x2="302" y2="440" stroke="#FF1744" strokeWidth="1" />
                    <rect x="282" y="392" width="16" height="26" fill="#250912" stroke="#FF1744" strokeWidth="0.6" />
                    <rect x="306" y="392" width="16" height="26" fill="#250912" stroke="#FF1744" strokeWidth="0.6" />
                    {/* Door Handles */}
                    <line x1="299" y1="406" x2="299" y2="416" stroke="#FFE600" strokeWidth="1.5" />
                    <line x1="305" y1="406" x2="305" y2="416" stroke="#FFE600" strokeWidth="1.5" />
                    {/* Entrance Steps / Threshold */}
                    <rect x="274" y="440" width="56" height="6" fill="#3D1421" />
                    <rect x="270" y="446" width="64" height="6" fill="#260C15" />
                  </g>
                </g>

                {/* ========================================================= */}
                {/* 3. RESTRAINED CONNECTING WEB STRANDS (MULTIVERSE PATHS)   */}
                {/* Subtle base grid; Glowing vibrant selected route          */}
                {/* ========================================================= */}
                <g id="web-paths">
                  {/* Subtle Background Multi-Door Connections */}
                  <line x1="295" y1="410" x2="75" y2="195" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
                  <line x1="75" y1="195" x2="295" y2="250" stroke="#FF1744" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
                  <line x1="295" y1="250" x2="145" y2="275" stroke="#00F0FF" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
                  <line x1="145" y1="275" x2="75" y2="395" stroke="#FFE600" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
                  <line x1="75" y1="395" x2="200" y2="335" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
                  <line x1="200" y1="335" x2="200" y2="65" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />

                  {/* Highlight Selected Journey Route Strand */}
                  {selectedChapter === 2 && (
                    <line x1="295" y1="410" x2="75" y2="195" stroke="#00F0FF" strokeWidth="3" opacity="0.9" />
                  )}
                  {selectedChapter === 3 && (
                    <line x1="75" y1="195" x2="295" y2="250" stroke="#FF1744" strokeWidth="3" opacity="0.9" />
                  )}
                  {selectedChapter === 4 && (
                    <line x1="295" y1="250" x2="145" y2="275" stroke="#00F0FF" strokeWidth="3" opacity="0.9" />
                  )}
                  {selectedChapter === 5 && (
                    <line x1="145" y1="275" x2="75" y2="395" stroke="#FFE600" strokeWidth="3" opacity="0.9" />
                  )}
                  {selectedChapter === 6 && (
                    <line x1="75" y1="395" x2="200" y2="335" stroke="#A855F7" strokeWidth="3" opacity="0.9" />
                  )}
                  {selectedChapter === 7 && (
                    <line x1="200" y1="335" x2="200" y2="65" stroke="#FF1744" strokeWidth="3.5" opacity="0.95" />
                  )}
                </g>

                {/* ========================================================= */}
                {/* 4. SEVEN MEANINGFUL CHAPTER LANDMARK MARKERS              */}
                {/* ========================================================= */}
                {NEIGHBORHOOD_LANDMARKS.map((loc) => {
                  const isSelected = selectedChapter === loc.chapterNumber;
                  const isAnswered = !!session.answers[loc.chapterNumber] || loc.chapterNumber === 1 || loc.chapterNumber === 5 || loc.chapterNumber === 7;

                  // Label positioning offset to avoid clipping boundaries
                  const labelX = loc.x > 200 ? loc.x - 70 : loc.x - 10;
                  const labelY = loc.chapterNumber === 7 ? loc.y + 18 : loc.chapterNumber === 1 ? loc.y - 28 : loc.y + 16;

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
                          r="20"
                          fill="url(#glow-gold)"
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isSelected ? '15' : '12'}
                        fill={isSelected ? '#FFE600' : isAnswered ? '#081424' : '#141A28'}
                        stroke={isSelected ? '#000' : isAnswered ? '#00F0FF' : '#64748B'}
                        strokeWidth={isSelected ? '2.5' : '1.8'}
                      />

                      {/* Chapter Number Badge */}
                      <text
                        x={loc.x}
                        y={loc.y + 4}
                        textAnchor="middle"
                        fill={isSelected ? '#000' : isAnswered ? '#00F0FF' : '#94A3B8'}
                        fontSize="10.5"
                        fontFamily="comic, sans-serif"
                        fontWeight="bold"
                      >
                        {loc.chapterNumber}
                      </text>

                      {/* Visited Check Dot */}
                      {isAnswered && !isSelected && (
                        <circle
                          cx={loc.x + 9}
                          cy={loc.y - 9}
                          r="3"
                          fill="#10B981"
                          stroke="#000"
                          strokeWidth="1"
                        />
                      )}

                      {/* Clean Non-Overlapping Landmark Label Pill */}
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        <rect
                          width="82"
                          height="14"
                          rx="2"
                          fill={isSelected ? '#000' : 'rgba(5,9,18,0.92)'}
                          stroke={isSelected ? '#FFE600' : '#334155'}
                          strokeWidth="1"
                        />
                        <text
                          x="41"
                          y="10"
                          textAnchor="middle"
                          fill={isSelected ? '#FFE600' : '#E2E8F0'}
                          fontSize="7"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {loc.landmarkName}
                        </text>
                      </g>

                      {/* Perched Spider-Man on Selected Location */}
                      {isSelected && (
                        <image
                          href={getAssetUrl('images/spiderman-crouching.png')}
                          x={loc.x - 17}
                          y={loc.y - 32}
                          width="34"
                          height="22"
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
                className="w-7 h-7 bg-black/85 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
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
                className="w-7 h-7 bg-black/85 hover:bg-black border border-gray-700 text-white flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
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
                className="w-7 h-7 bg-black/85 hover:bg-black border border-spider-cyan text-spider-cyan flex items-center justify-center rounded-xs shadow-comic-sm cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Bottom Info Pill */}
            <div className="absolute bottom-2 left-2 z-20 pointer-events-none bg-black/80 px-2 py-0.5 rounded-xs border border-gray-800 text-[10px] font-mono text-gray-300">
              Tap markers to inspect landmarks &bull; Both worlds framed
            </div>
          </div>

          {/* 2. Bottom Detail Drawer for Selected Landmark */}
          <AnimatePresence>
            {activeChapterData && activeLandmark && (
              <motion.div
                key={activeChapterData.number}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="w-full mt-3 p-3.5 sm:p-4 bg-[#0A1222] border-3 border-black rounded-sm shadow-comic text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-gray-800 pb-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="bg-spider-yellow text-black px-1.5 py-0.2 text-[9.5px] font-mono font-bold uppercase rounded-xs">
                        CH. {activeChapterData.number}
                      </span>
                      <span className="text-[10px] font-mono text-spider-cyan font-bold">
                        {activeLandmark.district}
                      </span>
                    </div>
                    <h3 className="font-comic text-lg sm:text-xl text-white uppercase tracking-wide">
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
                  <div className="p-2.5 bg-black/60 border border-gray-800 rounded-xs mb-2">
                    <span className="text-[10px] font-mono text-gray-400 block mb-0.5 uppercase">
                      Your Selected Approach:
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-spider-yellow font-semibold block">
                      "{getSelectedAnswerText(activeChapterData.number)}"
                    </span>
                    {getLearningPrinciple(activeChapterData.number) && (
                      <p className="text-[11px] font-sans text-emerald-400 mt-0.5">
                        &bull; Prioritizes: {getLearningPrinciple(activeChapterData.number)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 bg-black/40 border border-gray-800 rounded-xs mb-2 text-xs font-sans text-gray-300">
                    {activeChapterData.number === 1
                      ? `Community Orientation: ${session.selectedCommunity === 'Apartment community' ? 'Apartment Community' : 'Residence Hall'}`
                      : activeChapterData.number === 5
                      ? 'Alex’s daily realities: Classes, work shifts, family responsibilities, and limited free time.'
                      : 'Completed conference web connecting personal and collective pathways.'}
                  </div>
                )}

                {/* Route to Room Comparison Action */}
                {activeChapterData.hasDecision && onSelectComparisonChapter && (
                  <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400">
                      Explore room distribution:
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

      {/* 3. ALTERNATIVE CHAPTER LIST VIEW */}
      {activeTab === 'list' && (
        <div className="w-full space-y-2 mb-4 text-left">
          {CHAPTERS_DATA.map((ch) => {
            const isAnswered = !!session.answers[ch.number] || ch.number === 1 || ch.number === 5 || ch.number === 7;
            const loc = NEIGHBORHOOD_LANDMARKS.find((l) => l.chapterNumber === ch.number);

            return (
              <div
                key={ch.number}
                className="p-3 bg-[#0A1222] border-2 border-black rounded-sm shadow-comic"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-spider-red text-white font-comic text-xs flex items-center justify-center border border-black shadow-comic-sm">
                      {ch.number}
                    </span>
                    <h4 className="font-comic text-base text-white uppercase tracking-wide">
                      {ch.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] font-mono text-spider-cyan font-bold">
                      {loc?.district}
                    </span>
                    {isAnswered && (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-500/40">
                        VISITED
                      </span>
                    )}
                  </div>
                </div>

                {ch.hasDecision && (
                  <div className="p-2 bg-black/60 border border-gray-800 rounded-xs text-xs font-sans text-gray-200 mb-1.5">
                    <span className="text-gray-400 font-mono text-[9.5px] block uppercase">
                      Chosen Approach:
                    </span>
                    <span className="text-spider-yellow font-semibold">
                      "{getSelectedAnswerText(ch.number)}"
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-gray-800/80">
                  <span className="text-[10px] font-mono text-gray-400">
                    {loc?.landmarkName}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onJumpToChapter(ch.number);
                    }}
                    className="text-[11px] font-mono text-spider-cyan hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Revisit Chapter {ch.number} &rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
