'use client';

import React from 'react';
import Link from 'next/link';
import { MagneticButton } from '@/components/motion/MagneticButton';

export const CareersContact: React.FC = () => {
  return (
    <section
      id="careers-contact"
      data-surface="orange"
      className="relative w-full bg-[var(--hrs-orange)] text-[var(--ink)] py-28 sm:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/15 overflow-hidden"
      aria-label="Careers and contact opportunities"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[var(--ink)]/20">
          {/* Half 1: Careers */}
          <div className="flex flex-col justify-between pr-0 lg:pr-12 pt-8 lg:pt-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 block mb-3">
                Working with HRS Group
              </span>
              <p className="text-sm sm:text-base font-semibold text-[var(--ink)] max-w-md leading-relaxed mb-8">
                Engineering careers, manufacturing roles, and modern retail opportunities across western India.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/careers"
                className="group inline-flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="relative">
                  <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--ink)] block relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] sm:after:h-[4px] after:bg-[var(--ink)] after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">
                    See open roles
                  </span>
                </div>

                <MagneticButton strength={0.4}>
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[var(--ink)] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Half 2: Contact */}
          <div className="flex flex-col justify-between pl-0 lg:pl-12 pt-16 lg:pt-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 block mb-3">
                Group correspondence & partnerships
              </span>
              <p className="text-sm sm:text-base font-semibold text-[var(--ink)] max-w-md leading-relaxed mb-8">
                Direct commercial partnerships, property leasing, and corporate executive enquiries.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="group inline-flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <div className="relative">
                  <span className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--ink)] block relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] sm:after:h-[4px] after:bg-[var(--ink)] after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">
                    Send an enquiry
                  </span>
                </div>

                <MagneticButton strength={0.4}>
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[var(--ink)] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersContact;
