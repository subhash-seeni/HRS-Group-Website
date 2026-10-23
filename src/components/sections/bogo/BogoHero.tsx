'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SplitLines } from '@/components/motion/SplitLines';

export const BogoHero: React.FC = () => {
  return (
    <section
      id="bogo"
      data-surface="bogo-navy"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[var(--bogo-navy)] px-6 pt-32 pb-12 sm:px-8 sm:pt-36 lg:px-12 text-white"
      aria-label="BOGO — Building India's next retail ecosystem"
    >
      {/* Top Bar inside BOGO Hero */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/15 pb-6">
        <div className="flex items-center gap-4">
          {/* Real BOGO Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bogo/logos/bogo-master.png"
            alt="BOGO Logo"
            className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
          />
          <span className="hidden sm:inline-block h-5 w-[1px] bg-white/20" />
          <span className="hidden sm:inline-block text-xs font-semibold text-white/70">
            A featured brand of HRS Group
          </span>
        </div>

        <a
          href="https://bogo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-white hover:text-[var(--bogo-navy)]"
        >
          <span>Visit bogo.com</span>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </a>
      </div>

      {/* Main Headline Body */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center my-auto py-12">
        <span className="text-xs font-semibold text-[var(--bogo-orange)] block mb-4">
          Connected retail platform
        </span>

        <h2 className="font-['Bricolage_Grotesque'] text-[clamp(2.75rem,7vw,7.5rem)] font-extrabold tracking-tight leading-[0.96] text-white">
          <span>Building India’s </span>
          <span className="text-[var(--bogo-orange)] italic">next retail </span>
          <span className="text-[var(--bogo-green)]">ecosystem</span>
        </h2>

        <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-medium text-white/80 max-w-2xl">
          One vision. Endless possibilities.
        </p>

        <p className="mt-4 text-xs font-semibold text-white/50 sm:hidden">
          A featured brand of HRS Group
        </p>
      </div>

      {/* Bottom Sub-bar */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/15 pt-4 text-xs text-white/60">
        <span>Bonds Over Generations, Often</span>
        <span>Ahmedabad • Gujarat</span>
      </div>
    </section>
  );
};

export default BogoHero;
