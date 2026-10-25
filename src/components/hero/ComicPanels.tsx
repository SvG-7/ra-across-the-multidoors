import React from 'react';
import { motion } from 'framer-motion';
import { DoorClosed, Users, ShieldAlert, KeyRound, UtensilsCrossed, Zap } from 'lucide-react';
import { soundEngine } from '../../audio/soundEffects';

interface ComicPanelsProps {
  reducedMotion?: boolean;
}

export const ComicPanels: React.FC<ComicPanelsProps> = ({ reducedMotion = false }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 relative z-10">
      {/* Panel 1: Traditional Residence Hall (Earth-TRAD) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: -40, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: -1 }}
        whileHover={reducedMotion ? {} : { rotate: 0, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        onMouseEnter={() => soundEngine.playClick()}
        className="relative group bg-[#0E1528] border-4 border-black rounded-sm shadow-comic-red overflow-hidden"
      >
        {/* Comic Panel Header Tape */}
        <div className="bg-spider-red px-4 py-2 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-comic text-xl tracking-wider text-white">
              UNIVERSE 101: THE TRADITIONAL HALL
            </span>
          </div>
          <span className="bg-black text-spider-yellow px-2 py-0.5 text-xs font-mono font-bold tracking-wider">
            HIGH DENSITY
          </span>
        </div>

        {/* Panel Content & Graphic Art */}
        <div className="p-5 relative">
          {/* Halftone texture */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

          {/* Bespoke SVG Comic Vector Illustration: Traditional Hall Corridor */}
          <div className="relative h-48 w-full bg-gradient-to-b from-[#141C38] to-[#0A0E1D] border-2 border-black rounded-xs overflow-hidden mb-4 shadow-inner">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corridor Perspective Lines */}
              <polygon points="0,0 160,80 160,120 0,200" fill="#1A2447" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="400,0 240,80 240,120 400,200" fill="#1A2447" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="0,200 160,120 240,120 400,200" fill="#0C1021" />
              <polygon points="0,0 160,80 240,80 400,0" fill="#0E1328" />

              {/* End of Hall Window with Spider-Verse Moon */}
              <rect x="160" y="80" width="80" height="40" fill="#FF1744" opacity="0.8" />
              <circle cx="200" cy="100" r="14" fill="#FFE600" opacity="0.9" />

              {/* Traditional Dorm Doors (Lining both sides) */}
              {/* Left Doors */}
              <polygon points="20,25 70,50 70,175 20,190" fill="#FF2A55" stroke="#000" strokeWidth="2" />
              <rect x="35" y="60" width="20" height="25" fill="#FFE600" rx="1" /> {/* Door dec */}
              <circle cx="62" cy="115" r="3" fill="#FFE600" /> {/* Door knob */}

              <polygon points="90,60 130,75 130,150 90,165" fill="#2563EB" stroke="#000" strokeWidth="2" />
              <rect x="100" y="85" width="16" height="18" fill="#00FFA3" rx="1" />
              <circle cx="123" cy="115" r="2.5" fill="#FFE600" />

              {/* Right Doors */}
              <polygon points="380,25 330,50 330,175 380,190" fill="#2563EB" stroke="#000" strokeWidth="2" />
              <rect x="345" y="60" width="20" height="25" fill="#00FFA3" rx="1" />
              <circle cx="338" cy="115" r="3" fill="#FFE600" />

              <polygon points="310,60 270,75 270,150 310,165" fill="#FF2A55" stroke="#000" strokeWidth="2" />
              <rect x="284" y="85" width="16" height="18" fill="#FFE600" rx="1" />
              <circle cx="277" cy="115" r="2.5" fill="#FFE600" />

              {/* Hallway Floor Warning Tape */}
              <line x1="160" y1="120" x2="0" y2="200" stroke="#FFE600" strokeWidth="3" strokeDasharray="6 6" />
              <line x1="240" y1="120" x2="400" y2="200" stroke="#FFE600" strokeWidth="3" strokeDasharray="6 6" />

              {/* Spider-Web in Corner */}
              <path d="M0 0 L50 20 M0 0 L20 50 M15 10 Q 25 25, 10 35 M25 18 Q 40 40, 18 55" stroke="#00F0FF" strokeWidth="1.5" />
            </svg>

            {/* Comic sound stamp overlay */}
            <div className="absolute bottom-2 right-2 bg-black/90 border border-spider-cyan px-2 py-0.5 text-[11px] font-mono text-spider-cyan flex items-center gap-1">
              <Zap className="w-3 h-3 text-spider-yellow animate-pulse" />
              <span>ACTIVE SOCIAL COLLISIONS</span>
            </div>
          </div>

          {/* Attributes List */}
          <div className="space-y-2.5 relative z-10 text-sm">
            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-spider-red/20 border border-spider-red/40 rounded-xs text-spider-red mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans">Open-Door Culture & Proximity</strong>
                <p className="text-gray-300 text-xs">
                  Residents cross paths daily in communal hallways and bathrooms. High visibility means immediate crisis response.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-spider-cyan/20 border border-spider-cyan/40 rounded-xs text-spider-cyan mt-0.5">
                <DoorClosed className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans">Roommate Micro-Clashes</strong>
                <p className="text-gray-300 text-xs">
                  Shared single-room dimensions amplify boundary disputes, sleep schedules, and quick mediation needs.
                </p>
              </div>
            </div>
          </div>

          {/* Comic corner stamp */}
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
            <span>TERRITORY: 40-60 RESIDENTS</span>
            <span className="text-spider-red font-bold">RADAR: HIGH FREQUENCY</span>
          </div>
        </div>
      </motion.div>

      {/* Panel 2: Apartment-Style Complex (Earth-APPT) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: 40, rotate: 2 }}
        animate={{ opacity: 1, x: 0, rotate: 1 }}
        whileHover={reducedMotion ? {} : { rotate: 0, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        onMouseEnter={() => soundEngine.playClick()}
        className="relative group bg-[#0D1826] border-4 border-black rounded-sm shadow-comic-cyan overflow-hidden"
      >
        {/* Comic Panel Header Tape */}
        <div className="bg-spider-cyan px-4 py-2 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-comic text-xl tracking-wider text-black">
              UNIVERSE 204: THE APARTMENT COMPLEX
            </span>
          </div>
          <span className="bg-black text-spider-cyan px-2 py-0.5 text-xs font-mono font-bold tracking-wider">
            HIGH AUTONOMY
          </span>
        </div>

        {/* Panel Content & Graphic Art */}
        <div className="p-5 relative">
          {/* Halftone texture */}
          <div className="absolute inset-0 bg-halftone-cyan opacity-25 pointer-events-none" />

          {/* Bespoke SVG Comic Vector Illustration: Apartment Breezeway & Suite */}
          <div className="relative h-48 w-full bg-gradient-to-b from-[#0E2034] to-[#08121E] border-2 border-black rounded-xs overflow-hidden mb-4 shadow-inner">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Exterior Breezeway & Balcony Railing */}
              <rect x="0" y="0" width="400" height="200" fill="#0A1524" />
              
              {/* Skyline visible through breezeway */}
              <polygon points="40,20 80,40 80,120 40,120" fill="#040912" />
              <polygon points="120,10 160,30 160,120 120,120" fill="#071120" />
              <circle cx="280" cy="50" r="28" fill="#00F0FF" opacity="0.3" />

              {/* Apartment Front Door (Heavy Exterior Door with Deadbolt) */}
              <rect x="180" y="30" width="110" height="150" fill="#1E293B" stroke="#000" strokeWidth="3" />
              <rect x="195" y="45" width="80" height="35" fill="#0F172A" stroke="#000" strokeWidth="2" />
              
              {/* Apt Number Plate */}
              <rect x="220" y="55" width="30" height="15" fill="#FFE600" stroke="#000" strokeWidth="1.5" />
              <text x="235" y="66" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold" fontFamily="monospace">
                402-B
              </text>

              {/* Heavy deadbolt and handle */}
              <circle cx="275" cy="110" r="5" fill="#00F0FF" stroke="#000" strokeWidth="1.5" />
              <rect x="270" y="120" width="10" height="4" fill="#FFE600" stroke="#000" />

              {/* Warm kitchen light leak beneath door */}
              <line x1="180" y1="180" x2="290" y2="180" stroke="#FFE600" strokeWidth="4" opacity="0.8" />

              {/* Balcony / Breezeway Metal Railings */}
              <line x1="0" y1="150" x2="160" y2="150" stroke="#00F0FF" strokeWidth="3" />
              <line x1="0" y1="185" x2="160" y2="185" stroke="#00F0FF" strokeWidth="3" />
              {[15, 40, 65, 90, 115, 140].map((rx, idx) => (
                <line key={idx} x1={rx} y1="150" x2={rx} y2="200" stroke="#334155" strokeWidth="2" />
              ))}

              {/* Multiverse Distortion Spidersilk Strand */}
              <path d="M400 0 L310 70 M400 30 L320 90" stroke="#FF1744" strokeWidth="1.5" />
            </svg>

            {/* Comic sound stamp overlay */}
            <div className="absolute bottom-2 right-2 bg-black/90 border border-spider-red px-2 py-0.5 text-[11px] font-mono text-spider-red flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-spider-red animate-pulse" />
              <span>STEALTH BOUNDARY RADAR</span>
            </div>
          </div>

          {/* Attributes List */}
          <div className="space-y-2.5 relative z-10 text-sm">
            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-spider-cyan/20 border border-spider-cyan/40 rounded-xs text-spider-cyan mt-0.5">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans">Closed Doors & Stealth Dynamics</strong>
                <p className="text-gray-300 text-xs">
                  Residents live behind private thresholds. Parties and issues happen silently without hallway telltale signs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-spider-yellow/20 border border-spider-yellow/40 rounded-xs text-spider-yellow mt-0.5">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-sans">Kitchens, Cleaning & Cohabitation</strong>
                <p className="text-gray-300 text-xs">
                  Full amenities trigger adult chore battles, dish pile-ups, and long-term lease mentality over dorm camaraderie.
                </p>
              </div>
            </div>
          </div>

          {/* Comic corner stamp */}
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
            <span>TERRITORY: 80-120 RESIDENTS</span>
            <span className="text-spider-cyan font-bold">RADAR: INTENTIONAL OUTREACH</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
