'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Hotel, Store, MapPin, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '@/lib/basePath';
import { Button } from '@/components/ui';

export const FirstGenSpotlight: React.FC = () => {
  return (
    <section
      id="firstgen"
      data-surface="slate"
      className="relative w-full bg-[#131B2A] text-white py-16 sm:py-24 lg:py-28 overflow-hidden border-t border-neutral-800"
      aria-label="FirstGen Hospitality and Leasing"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-[var(--hrs-orange)] tracking-wider">
              Sector 04 • Hospitality & Leasing
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs text-neutral-400 font-medium">FirstGen Pvt. Ltd.</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.08]">
              Spaces for commerce, <span className="text-[var(--hrs-orange)] font-normal italic">stay</span>, and the building trade.
            </h2>
            <p className="text-sm sm:text-base font-normal text-neutral-300 max-w-md leading-relaxed">
              Operating as an umbrella parent, FirstGen holds prime commercial assets across Ahmedabad, manages corporate living and authentic regional dining in Bengaluru, and curates collaboration spaces for construction professionals.
            </p>
          </div>
        </div>

        {/* 3-Pillar Scannable Architecture (0 clicks needed, everything visible) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* =========================================================================
              PILLAR 1: FIRSTGEN ASSETS (COMMERCIAL & INDUSTRIAL LEASING)
          ========================================================================= */}
          <div className="border border-white/15 bg-white/[0.03] p-6 sm:p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-[var(--hrs-orange)]">
                    01
                  </span>
                  <div>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white">
                      FirstGen Assets
                    </h3>
                    <span className="text-[11px] text-neutral-400">Commercial & Industrial Leasing</span>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-neutral-400" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Holding prime specification-grade commercial floorplates, high-street retail footprints, and logistics warehousing across Gujarat’s primary transit corridors.
              </p>

              {/* 4 Asset Classes List */}
              <div className="space-y-3.5 border-t border-white/10 pt-5">
                <div className="text-xs">
                  <div className="font-semibold text-white">Commercial & Office Suites</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Bodakdev & SG Highway, Ahmedabad • 4,500 – 18,000 sq ft</div>
                </div>

                <div className="text-xs">
                  <div className="font-semibold text-white">High-Street Retail Footprints</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Prime arterial frontages with dedicated grade-level customer access</div>
                </div>

                <div className="text-xs">
                  <div className="font-semibold text-white">Logistics & Industrial Warehousing</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Sanand & Bavla freight corridors • 11.5m clear heights</div>
                </div>

                <div className="text-xs">
                  <div className="font-semibold text-white">Civil Construction Equipment Fleet</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Hydraulic excavators, mixers, and cranes for site mobilization</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Occupancy: <strong className="text-emerald-400">100% Leased</strong></span>
              <span>Ahmedabad & Regional Hubs</span>
            </div>
          </div>

          {/* =========================================================================
              PILLAR 2: FIRSTGEN HOTELS (FLIGHT STAYS & AMUKTAMALYADA)
          ========================================================================= */}
          <div className="border border-white/15 bg-white/[0.03] p-6 sm:p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-amber-400">
                    02
                  </span>
                  <div>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white">
                      FirstGen Hotels
                    </h3>
                    <span className="text-[11px] text-neutral-400">Corporate Stays & Authentic Dining</span>
                  </div>
                </div>
                <Hotel className="w-5 h-5 text-neutral-400" />
              </div>

              <div className="space-y-6">
                {/* Flight Stays */}
                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Flight Stays</span>
                    <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">
                      Kadubeesanahalli, Bengaluru
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                    Serviced apartments engineered for executive relocations and visiting tech leadership adjacent to Outer Ring Road tech parks.
                  </p>
                  <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-white/10">
                    <Image
                      src={getAssetUrl('/images/firstgen/service-apartment.webp')}
                      alt="Flight Stays serviced apartments in Kadubeesanahalli, Bengaluru"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                  </div>
                </div>

                {/* Amuktamalyada */}
                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Amuktamalyada</span>
                    <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">
                      Outer Ring Road, Bengaluru
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                    Authentic Andhra and Rayalaseema vegetarian cuisine, piping hot ghee karam tiffins, and traditional banana leaf lunch service.
                  </p>
                  <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-white/10">
                    <Image
                      src={getAssetUrl('/images/firstgen/south-indian-breakfast.webp')}
                      alt="Amuktamalyada regional Andhra vegetarian dining in Bengaluru"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Hospitality Division</span>
              <span>Kadubeesanahalli & ORR</span>
            </div>
          </div>

          {/* =========================================================================
              PILLAR 3: FIRSTGEN ENTERPRISES (THE BLUPRINT & SHUBHVISTA)
          ========================================================================= */}
          <div className="border border-white/15 bg-white/[0.03] p-6 sm:p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-cyan-400">
                    03
                  </span>
                  <div>
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-white">
                      FirstGen Enterprises
                    </h3>
                    <span className="text-[11px] text-neutral-400">Building Trade Collaborative Venues</span>
                  </div>
                </div>
                <Store className="w-5 h-5 text-neutral-400" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Platforms bringing together architects, interior designers, civil contractors, and premium material manufacturers in physical, tactile environments.
              </p>

              {/* The Bluprint & ShubhVista */}
              <div className="space-y-4 border-t border-white/10 pt-5">
                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">The Bluprint by Builders Cafe</span>
                    <span className="text-[10px] text-cyan-300 font-medium">Ahmedabad</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-2">
                    Hybrid space combining an artisanal espresso bar, co-working desks, blueprint review tables, and an architectural tactile material sample library.
                  </p>
                  <div className="text-[11px] text-cyan-400/90 font-medium">
                    Materials Library • Blueprint Tables • Specialty Coffee
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">ShubhVista</span>
                    <span className="text-[10px] text-teal-300 font-medium">Ahmedabad</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-2">
                    Curated specification showroom for architectural ironmongery, precision window hardware, and designer sanitary fittings.
                  </p>
                  <div className="text-[11px] text-teal-400/90 font-medium">
                    Architectural Hardware • Sanitary Collections • BOQ Advisory
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Trade Collaboration</span>
              <span>Architectural Showrooms</span>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="text-xs sm:text-sm text-neutral-400">
            <span className="text-white font-medium">FirstGen Pvt. Ltd.</span> acts as corporate parent; public operations trade under their respective division names.
          </div>
          <Button
            href="/businesses#firstgen"
            variant="orange"
            className="w-full sm:w-auto justify-center"
          >
            Explore FirstGen in directory
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FirstGenSpotlight;
