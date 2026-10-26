'use client';

import React, { useState, useRef, useEffect } from 'react';

interface HeroBlueprintStageProps {
  activeIndex: number;
  accentColor: string;
  className?: string;
}

export const HeroBlueprintStage: React.FC<HeroBlueprintStageProps> = ({
  activeIndex,
  accentColor,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Handle subtle 3D cursor tilt (max 4 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 5,
      ry: x * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative aspect-square w-full max-w-[560px] select-none ${className}`}
      aria-label="Engineering CAD blueprint schematic"
    >
      {/* Outer Technical Bounding Box & Corner Crosshairs */}
      <div className="absolute inset-0 border border-white/20 pointer-events-none">
        {/* Corner Crosshairs */}
        <span className="absolute -top-2 -left-2 text-xs font-semibold text-white/50 select-none">+</span>
        <span className="absolute -top-2 -right-2 text-xs font-semibold text-white/50 select-none">+</span>
        <span className="absolute -bottom-2 -left-2 text-xs font-semibold text-white/50 select-none">+</span>
        <span className="absolute -bottom-2 -right-2 text-xs font-semibold text-white/50 select-none">+</span>

        {/* Top Technical Metadata Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-white/70 border-b border-white/10 pb-2">
          <span>HRS Group • CAD Engine v2.4</span>
          <span className="text-[var(--hrs-orange)] tabular-nums font-semibold">Fig. 0{activeIndex + 1} // Active</span>
          <span className="hidden sm:inline tabular-nums">23°01'N 72°31'E</span>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-white/60 border-t border-white/10 pt-2">
          <span className="tabular-nums">Tol: ±0.5mm</span>
          <span className="tabular-nums">Scale 1:20</span>
          <span>Gujarat / South India</span>
        </div>
      </div>

      {/* SVG Blueprint Content */}
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full p-8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shared CAD Background Fine Grid */}
        <defs>
          <pattern id="cad-fine-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="30" y="45" width="540" height="500" fill="url(#cad-fine-grid)" stroke="none" />

        {/* =========================================================================
            0. FACADES (HRS ALUGLAZE) — Unitised Curtain Wall Mullion Profile
           ========================================================================= */}
        {activeIndex === 0 && (
          <g className="transition-opacity duration-500 ease-out">
            {/* Header Tag */}
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              SYSTEM: UNITISED CURTAIN WALL CW-80
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              HRS ALUGLAZE LTD • SANAND CAMPUS
            </text>

            {/* Extruded Aluminium Box Mullion Profile (Center) */}
            <rect x="230" y="160" width="140" height="280" stroke="white" strokeWidth="2" />
            <rect x="245" y="175" width="110" height="250" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

            {/* Thermal Break Polyamide Strip Cavity */}
            <rect x="280" y="140" width="40" height="20" stroke={accentColor} strokeWidth="1.8" fill="rgba(245,130,32,0.15)" />
            <line x1="280" y1="140" x2="320" y2="160" stroke={accentColor} strokeWidth="1" />
            <line x1="320" y1="140" x2="280" y2="160" stroke={accentColor} strokeWidth="1" />

            {/* Glass Rebate Wings Left & Right */}
            <path d="M 170 230 L 230 230 L 230 370 L 170 370" stroke="white" strokeWidth="1.8" />
            <path d="M 430 230 L 370 230 L 370 370 L 430 370" stroke="white" strokeWidth="1.8" />

            {/* Double Glazing Glass Panes (DGU: 6mm glass - 16mm gap - 6mm glass) */}
            {/* Left Glass */}
            <rect x="130" y="130" width="12" height="340" stroke="white" strokeWidth="1.5" />
            <rect x="154" y="130" width="12" height="340" stroke="white" strokeWidth="1.5" />
            <line x1="142" y1="130" x2="154" y2="130" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <line x1="142" y1="470" x2="154" y2="470" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

            {/* Right Glass */}
            <rect x="434" y="130" width="12" height="340" stroke="white" strokeWidth="1.5" />
            <rect x="458" y="130" width="12" height="340" stroke="white" strokeWidth="1.5" />
            <line x1="446" y1="130" x2="458" y2="130" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <line x1="446" y1="470" x2="458" y2="470" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

            {/* Gasket Seals */}
            <circle cx="166" cy="230" r="5" fill={accentColor} stroke="none" />
            <circle cx="166" cy="370" r="5" fill={accentColor} stroke="none" />
            <circle cx="434" cy="230" r="5" fill={accentColor} stroke="none" />
            <circle cx="434" cy="370" r="5" fill={accentColor} stroke="none" />

            {/* Dimension Line (Width) */}
            <line x1="130" y1="500" x2="470" y2="500" stroke={accentColor} strokeWidth="1.2" />
            <line x1="130" y1="492" x2="130" y2="508" stroke={accentColor} strokeWidth="1.2" />
            <line x1="470" y1="492" x2="470" y2="508" stroke={accentColor} strokeWidth="1.2" />
            <text x="300" y="520" fill={accentColor} fontSize="11" fontFamily="monospace" textAnchor="middle">
              MODULE WIDTH: 1500MM
            </text>

            {/* Dimension Callout (Height) */}
            <line x1="500" y1="130" x2="500" y2="470" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <text x="515" y="305" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">
              STOREY HT: 3750MM
            </text>
          </g>
        )}

        {/* =========================================================================
            1. HOMES (HRISHIKESH VENTURES) — Orthographic Floorplate Blueprint
           ========================================================================= */}
        {activeIndex === 1 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              PROJECT: HRISHIKESH DEVELOPMENTS
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              RESIDENTIAL VILLA • SHELA AHMEDABAD
            </text>

            {/* Outer Structural Plinth */}
            <rect x="110" y="140" width="380" height="320" stroke="white" strokeWidth="2.5" />
            <rect x="120" y="150" width="360" height="300" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

            {/* Central Courtyard */}
            <rect x="230" y="240" width="140" height="120" stroke={accentColor} strokeWidth="1.8" strokeDasharray="4 3" fill="rgba(245,130,32,0.08)" />
            <text x="300" y="305" fill={accentColor} fontSize="11" fontFamily="monospace" textAnchor="middle">
              COURT +0.00
            </text>

            {/* Room Partitions */}
            <line x1="110" y1="260" x2="230" y2="260" stroke="white" strokeWidth="1.8" />
            <line x1="370" y1="260" x2="490" y2="260" stroke="white" strokeWidth="1.8" />
            <line x1="270" y1="360" x2="270" y2="460" stroke="white" strokeWidth="1.8" />

            {/* Room Labels */}
            <text x="170" y="210" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="monospace" textAnchor="middle">LIVING 24'x16'</text>
            <text x="430" y="210" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="monospace" textAnchor="middle">SUITE 18'x14'</text>
            <text x="170" y="360" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="monospace" textAnchor="middle">DINING 16'x14'</text>
            <text x="430" y="360" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="monospace" textAnchor="middle">VERANDAH</text>

            {/* Structural Column Nodes C1 to C8 */}
            {[
              [110, 140], [300, 140], [490, 140],
              [110, 300],             [490, 300],
              [110, 460], [300, 460], [490, 460],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <rect x={cx - 6} y={cy - 6} width="12" height="12" fill={accentColor} stroke="white" strokeWidth="1" />
                <text x={cx + 9} y={cy - 8} fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">C{i + 1}</text>
              </g>
            ))}

            {/* North Indicator */}
            <circle cx="80" cy="200" r="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M 80 188 L 86 210 L 80 204 L 74 210 Z" fill={accentColor} />
            <text x="80" y="228" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" textAnchor="middle">N</text>

            {/* Dimensions */}
            <line x1="110" y1="480" x2="490" y2="480" stroke={accentColor} strokeWidth="1.2" />
            <text x="300" y="502" fill={accentColor} fontSize="11" fontFamily="monospace" textAnchor="middle">PLINTH BREADTH: 18.4M</text>
          </g>
        )}

        {/* =========================================================================
            2. MASALAS (HRISHIKESH FOOD PRODUCTS) — Botanical Milling Calibration
           ========================================================================= */}
        {activeIndex === 2 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              PROCESS: CLEAN SPICE MILLING
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              HRISHIKESH FOOD PRODUCTS • BAVLA CAMPUS
            </text>

            {/* Concentric Centrifugal Sieve Calibration Rings */}
            <circle cx="300" cy="300" r="180" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="300" cy="300" r="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <circle cx="300" cy="300" r="80" stroke={accentColor} strokeWidth="2" />
            <circle cx="300" cy="300" r="28" fill="rgba(245,130,32,0.15)" stroke="white" strokeWidth="1.5" />

            {/* Quadrant Crosshairs */}
            <line x1="80" y1="300" x2="520" y2="300" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="300" y1="80" x2="300" y2="520" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />

            {/* Angular Calibration Ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 300 + Math.cos(rad) * 175;
              const y1 = 300 + Math.sin(rad) * 175;
              const x2 = 300 + Math.cos(rad) * 185;
              const y2 = 300 + Math.sin(rad) * 185;
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.2" />;
            })}

            {/* Sieve Callouts */}
            <text x="490" y="270" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">600μm COARSE</text>
            <text x="440" y="325" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">300μm MEDIUM</text>
            <text x="390" y="375" fill={accentColor} fontSize="10" fontFamily="monospace">150μm FINE MICRON</text>

            {/* Parameter Box */}
            <rect x="70" y="450" width="220" height="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="80" y="468" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">BLENDING SPEED: 2800 RPM</text>
            <text x="80" y="484" fill={accentColor} fontSize="9" fontFamily="monospace">PURITY ASSURANCE: ISO 22000</text>
          </g>
        )}

        {/* =========================================================================
            3. BRANDS (HRISHIKESH CONSUMER PRODUCTS) — Modular Swiss Packaging Dieline
           ========================================================================= */}
        {activeIndex === 3 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              PORTFOLIO: 13 CONSUMER BRANDS
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              HRISHIKESH CONSUMER PRODUCTS • PACKAGING DIELINE
            </text>

            {/* Packaging Fold & Cut Box Dieline */}
            <rect x="140" y="160" width="320" height="280" stroke="white" strokeWidth="2" />
            {/* Flaps */}
            <path d="M 140 160 L 220 120 L 380 120 L 460 160" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 140 440 L 220 480 L 380 480 L 460 440" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Face Divisions */}
            <line x1="240" y1="160" x2="240" y2="440" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="360" y1="160" x2="360" y2="440" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Swiss Brand Grid Elements */}
            <text x="190" y="220" fill="white" fontSize="18" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">MANPRAS</text>
            <text x="190" y="240" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" textAnchor="middle">STAPLES 1KG</text>

            <text x="300" y="220" fill={accentColor} fontSize="18" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">SNACKSHOT</text>
            <text x="300" y="240" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" textAnchor="middle">SAVOURY 150G</text>

            <text x="410" y="220" fill="white" fontSize="18" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">DAILY PUMP</text>
            <text x="410" y="240" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" textAnchor="middle">HYDRATION 1L</text>

            {/* Barcode CAD Module */}
            <g transform="translate(260, 360)">
              {[2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 5, 2].map((w, i) => (
                <rect key={i} x={i * 6} y="0" width={w} height="30" fill="white" />
              ))}
              <text x="40" y="42" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace" textAnchor="middle">890123456789</text>
            </g>

            {/* Pantone Registration Color Targets */}
            <circle cx="100" cy="300" r="10" stroke="white" strokeWidth="1" />
            <line x1="86" y1="300" x2="114" y2="300" stroke="white" strokeWidth="1" />
            <line x1="100" y1="286" x2="100" y2="314" stroke="white" strokeWidth="1" />
          </g>
        )}

        {/* =========================================================================
            4. STAYS (FIRSTGEN HOTELS) — Serviced Suite Floorplate Schematic
           ========================================================================= */}
        {activeIndex === 4 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              DIVISION: FIRSTGEN HOTELS & STAYS
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              FLIGHT STAYS • BENGALURU AIRPORT CORRIDOR
            </text>

            {/* Suite Boundary */}
            <rect x="130" y="140" width="340" height="320" stroke="white" strokeWidth="2" />
            {/* Balcony Projection */}
            <path d="M 470 200 L 530 200 L 530 400 L 470 400" stroke={accentColor} strokeWidth="1.8" />
            <text x="500" y="305" fill={accentColor} fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 500 305)">BALCONY +14.20M</text>

            {/* Interior Walls */}
            <line x1="130" y1="250" x2="330" y2="250" stroke="white" strokeWidth="1.8" />
            <line x1="330" y1="140" x2="330" y2="360" stroke="white" strokeWidth="1.8" />

            {/* Room Spatial Notation */}
            <text x="230" y="200" fill="white" fontSize="12" fontFamily="monospace">FOYER & WORK</text>
            <text x="230" y="360" fill="white" fontSize="12" fontFamily="monospace">LIVING SUITE</text>
            <text x="400" y="280" fill={accentColor} fontSize="12" fontFamily="monospace">BEDROOM 01</text>

            {/* Bathroom Module */}
            <rect x="140" y="150" width="70" height="90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <text x="175" y="200" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace" textAnchor="middle">BATH</text>

            {/* Dimension Lines */}
            <line x1="130" y1="480" x2="470" y2="480" stroke={accentColor} strokeWidth="1.2" />
            <text x="300" y="502" fill={accentColor} fontSize="11" fontFamily="monospace" textAnchor="middle">SUITE LENGTH: 12.8M</text>
          </g>
        )}

        {/* =========================================================================
            5. SKILLS (SCHOOL OF FACADE TECH) — Dynamic Structural Test Chamber
           ========================================================================= */}
        {activeIndex === 5 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              INSTITUTE: TECHNICAL FACADE EDUCATION
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              LAB BENCHMARK • ASTM E330 & AS/NZS 4284
            </text>

            {/* Windload Pressure Testing Chamber */}
            <rect x="120" y="140" width="360" height="320" stroke="white" strokeWidth="2" strokeDasharray="8 4" />
            <text x="300" y="170" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" textAnchor="middle">
              CYCLIC AIR PRESSURE TEST CHAMBER
            </text>

            {/* Specimen Facade Panel */}
            <rect x="220" y="190" width="160" height="220" stroke={accentColor} strokeWidth="2.5" fill="rgba(245,130,32,0.08)" />

            {/* Deflection Micrometer Gauge Axes */}
            <line x1="300" y1="190" x2="300" y2="410" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="300" cy="300" r="24" stroke="white" strokeWidth="1.5" />
            <line x1="300" y1="300" x2="314" y2="290" stroke="white" strokeWidth="1.5" />
            <text x="300" y="340" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle">DEFLECTION GAUGE</text>

            {/* Wind Load Force Vectors */}
            {[230, 270, 310, 350, 390].map((y) => (
              <g key={y}>
                <line x1="140" y1={y} x2="200" y2={y} stroke={accentColor} strokeWidth="1.5" />
                <polygon points={`200,${y} 190,${y - 4} 190,${y + 4}`} fill={accentColor} />
              </g>
            ))}
            <text x="170" y="215" fill={accentColor} fontSize="9" fontFamily="monospace">PRESSURE +3.5KPA</text>

            {/* Test Criterion Box */}
            <rect x="120" y="475" width="360" height="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="300" y="497" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace" textAnchor="middle">
              MAX ALLOWABLE DEFLECTION: δ ≤ L/175 (PASS)
            </text>
          </g>
        )}

        {/* =========================================================================
            6. RETAIL (BOGO) — Multi-Format Spatial Footprint Grid
           ========================================================================= */}
        {activeIndex === 6 && (
          <g className="transition-opacity duration-500 ease-out">
            <text x="50" y="80" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace">
              ECOSYSTEM: MULTI-FORMAT RETAIL
            </text>
            <text x="50" y="96" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              BOGO RETAIL ECOSYSTEM • SPATIAL MATRIX
            </text>

            {/* Format 1: BOGO Square (Large Outer Envelope) */}
            <rect x="90" y="130" width="420" height="350" stroke="white" strokeWidth="2" strokeDasharray="6 3" />
            <text x="110" y="155" fill="white" fontSize="12" fontFamily="monospace" fontWeight="bold">
              FORMAT A: BOGO SQUARE (40,000+ SQ. FT.)
            </text>
            <text x="110" y="172" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">
              FLAGSHIP DESTINATION • 11 CATEGORY BRANDS & DINING
            </text>

            {/* Format 2: BOGO Bazaar (Intermediate Community Box) */}
            <rect x="120" y="200" width="220" height="180" stroke={accentColor} strokeWidth="2" fill="rgba(245,130,32,0.08)" />
            <text x="135" y="225" fill={accentColor} fontSize="11" fontFamily="monospace" fontWeight="bold">
              FORMAT B: BOGO BAZAAR
            </text>
            <text x="135" y="240" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">
              4,000–6,000 SQ. FT. COMMUNITY
            </text>

            {/* Format 3: BOGO Mini (Neighbourhood Convenience Box) */}
            <rect x="360" y="200" width="130" height="120" stroke="white" strokeWidth="1.5" />
            <text x="370" y="225" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">
              FORMAT C: MINI
            </text>
            <text x="370" y="240" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">
              ~2,000 SQ. FT.
            </text>

            {/* BOGO Go Supply Distribution Vector */}
            <line x1="90" y1="440" x2="510" y2="440" stroke={accentColor} strokeWidth="1.8" />
            <polygon points="510,440 498,435 498,445" fill={accentColor} />
            <text x="300" y="465" fill={accentColor} fontSize="10" fontFamily="monospace" textAnchor="middle">
              BOGO GO DISTRIBUTION & REPLENISHMENT AXIS →
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default HeroBlueprintStage;
