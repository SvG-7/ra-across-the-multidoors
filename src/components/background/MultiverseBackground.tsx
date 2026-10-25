import React from 'react';
import { SpiderwebCanvas } from './SpiderwebCanvas';

interface MultiverseBackgroundProps {
  reducedMotion?: boolean;
  calmMode?: boolean;
}

export const MultiverseBackground: React.FC<MultiverseBackgroundProps> = ({
  reducedMotion = false,
  calmMode = false,
}) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Dark Midnight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080E] via-[#0A1020] to-[#050608]" />

      {/* Dimensional Warp Radial Glows */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-spider-red/10 blur-[130px] transition-opacity duration-700 pointer-events-none ${
          calmMode ? 'opacity-20' : 'opacity-70'
        }`}
      />
      <div
        className={`absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-spider-cyan/10 blur-[120px] transition-opacity duration-700 pointer-events-none ${
          calmMode ? 'opacity-20' : 'opacity-70'
        }`}
      />

      {/* Comic Halftone Overlays */}
      <div
        className={`absolute inset-0 bg-halftone mix-blend-screen transition-opacity duration-700 ${
          calmMode ? 'opacity-15' : 'opacity-35'
        }`}
      />
      <div
        className={`absolute inset-0 bg-halftone-cyan mix-blend-color-dodge transition-opacity duration-700 ${
          calmMode ? 'opacity-10' : 'opacity-25'
        }`}
      />

      {/* Spiderweb Canvas */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          calmMode ? 'opacity-30' : 'opacity-80'
        }`}
      >
        <SpiderwebCanvas reducedMotion={reducedMotion} />
      </div>

      {/* Stylized Comic City & Campus Silhouette Skyline */}
      <div
        className={`absolute bottom-0 inset-x-0 h-48 md:h-72 select-none z-[2] transition-opacity duration-700 ${
          calmMode ? 'opacity-25' : 'opacity-55'
        }`}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#05060A" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Background Layer Towers */}
          <path
            d="M0 320V190L40 190V160L80 160V190L140 190V140L180 140V120L200 120V140L240 140V210L320 210V100L350 80L380 100V210L440 210V150L510 150V220L580 220V110L610 110V90L630 110V220L720 220V130L780 130V80L810 50L840 80V130L900 130V210L980 210V140L1040 140V190L1120 190V110L1160 110V70L1180 110V190L1260 190V150L1340 150V180L1440 180V320H0Z"
            fill="url(#skylineGrad)"
            opacity="0.6"
          />

          {/* Foreground Bold Comic Skyline with sharp roofs */}
          <path
            d="M0 320V240L50 240V210L100 210V240L160 240V180L210 180V250L290 250V160L330 160V140L350 160V250L430 250V190L500 190V260L590 260V150L640 150V240L730 240V170L770 170V130L790 110L810 130V170L860 170V250L940 250V180L1020 180V240L1110 240V160L1150 160V250L1230 250V200L1310 200V230L1400 230V190L1440 190V320H0Z"
            fill="#05070B"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Neon dorm room windows */}
          <g fill="#00F0FF" opacity="0.65">
            <rect x="175" y="200" width="6" height="8" />
            <rect x="305" y="180" width="6" height="8" />
            <rect x="445" y="215" width="6" height="8" />
            <rect x="745" y="195" width="6" height="8" />
            <rect x="1125" y="185" width="6" height="8" />
          </g>

          <g fill="#FF1744" opacity="0.65">
            <rect x="190" y="200" width="6" height="8" />
            <rect x="320" y="195" width="6" height="8" />
            <rect x="755" y="180" width="6" height="8" />
            <rect x="1135" y="205" width="6" height="8" />
          </g>
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-spider-dark via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
