import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface RowProps {
  name: string;
  subtier?: string;
  description: string;
  audience?: string;
  meta?: string;
  logoEntity?: string;
  href: string;
  status?: string;
  accentColor?: string;
  className?: string;
}

export const Row: React.FC<RowProps> = ({
  name,
  subtier,
  description,
  audience,
  meta,
  logoEntity,
  href,
  status,
  accentColor = '#F58220',
  className = '',
}) => {
  return (
    <article
      className={`group relative border-b border-[var(--ink)]/15 py-8 md:py-10 transition-colors duration-200 hover:bg-black/[0.015] ${className}`}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Entity Identity & Logo */}
        <div className="col-span-12 md:col-span-4 space-y-3">
          <div className="flex items-center gap-3">
            {logoEntity && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white p-1.5 border border-neutral-200 shadow-2xs">
                <Logo slug={logoEntity} name={name} height="h-7" />
              </div>
            )}
            <div>
              {subtier && (
                <span className="text-[11px] font-medium text-neutral-500 block leading-tight">
                  {subtier}
                </span>
              )}
              <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--hrs-orange)]">
                <Link href={href} className="focus:outline-none">
                  {name}
                </Link>
              </h3>
            </div>
          </div>

          {meta && (
            <p className="text-xs text-neutral-500 font-medium tabular-nums">
              {meta}
            </p>
          )}

          {status && (
            <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
              {status}
            </span>
          )}
        </div>

        {/* Center Column: Description & Audience */}
        <div className="col-span-12 md:col-span-5 space-y-3">
          <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-700 m-0">
            {description}
          </p>

          {audience && (
            <p className="text-xs text-neutral-500 m-0 pt-1">
              <span className="font-medium text-neutral-700">Audience: </span>
              {audience}
            </p>
          )}
        </div>

        {/* Right Column: Action Link with Sliding Arrow */}
        <div className="col-span-12 md:col-span-3 flex md:justify-end items-center pt-2 md:pt-0">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-bold text-[var(--ink)] transition-all duration-300 group-hover:border-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white"
          >
            <span>Explore overview</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20 group-hover:text-white">
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Row;
