'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const BogoClose: React.FC = () => {
  return (
    <section
      id="bogo-close"
      data-surface="bogo-navy"
      className="relative w-full bg-[var(--bogo-navy)] py-20 sm:py-28 px-6 sm:px-8 lg:px-12 text-white border-t border-white/10"
      aria-label="Connect with BOGO"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="text-xs font-semibold text-[var(--bogo-orange)] block mb-2">
            Participate in the ecosystem
          </span>
          <h2 className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-xl">
            Experience the next chapter of modern Indian retail.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="https://bogo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--bogo-orange)] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--bogo-navy)]"
          >
            <span>Visit bogo.com</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>

          <a
            href="https://bogo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors underline underline-offset-4"
          >
            <span>Become a partner</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BogoClose;
