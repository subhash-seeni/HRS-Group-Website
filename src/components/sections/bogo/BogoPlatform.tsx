'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const BogoPlatform: React.FC = () => {
  return (
    <section
      data-surface="bogo-navy"
      className="relative w-full bg-[var(--bogo-navy)] text-white py-28 sm:py-36 lg:py-40 px-6 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
      aria-label="BOGO: Distribution backbone and intelligent technology vision"
    >
      <div className="mx-auto max-w-7xl">
        {/* Generous Two-Column Architectural Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: BOGO Go Distribution & 11 Categories */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[var(--bogo-orange)] block mb-3">
                Supply chain & category worlds
              </span>
              <h3 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Connected distribution and 11 specialized worlds.
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                BOGO Go operates as the logistics backbone of the retail ecosystem, moving goods efficiently from verified producers to neighbourhood shelves. Alongside direct supply, the ecosystem unites 11 dedicated lifestyle and pantry brands spanning Essentials, Daily, Farms, Superfoods, and Health.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <span className="text-xs text-white/50 block">
                Integrated distribution • Quality traceability • Cold-chain logistics
              </span>
            </div>
          </div>

          {/* Right Column: Technology Vision & Direct Portal Link */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:pl-8 lg:border-l lg:border-white/10">
            <div>
              <span className="text-xs font-semibold text-[var(--bogo-green)] block mb-3">
                Platform infrastructure
              </span>
              <h3 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Intelligent retail infrastructure.
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                A structured technology roadmap designed to remove checkout friction and streamline household replenishment—including smart basket tallying, concierge collection, smart trolley navigation, and scheduled zero-emission home delivery.
              </p>
            </div>

            {/* Pill CTA to dedicated /bogo page */}
            <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-start">
              <Link
                href="/bogo"
                className="group inline-flex items-center gap-3 rounded-full bg-white text-[var(--bogo-navy)] hover:bg-neutral-100 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300"
              >
                <span>Explore the dedicated BOGO portal</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BogoPlatform;
