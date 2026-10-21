import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WideLogoSlot } from './WideLogoSlot';

export interface RowProps {
  name: string;
  description: string;
  href?: string;
  index?: string | number;
  logoEntity?: string;
  subtier?: string;
  meta?: string;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  audience?: string;
}

export const Row: React.FC<RowProps> = ({
  name,
  description,
  href,
  index,
  logoEntity,
  subtier,
  meta,
  showArrow = true,
  className = '',
  onClick,
  audience,
}) => {
  const content = (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-6 items-start py-5 md:py-6 text-left group">
      {/* Desktop: Cols 1-2 (Logo Slot / Index) and Cols 3-5 (Name)
          Mobile: Grouped neatly with flex for responsive hierarchy */}
      <div className="flex items-center gap-3.5 md:contents">
        {/* Column 1: Wide Logo Slot or Index (Cols 1-2 on desktop) */}
        <div className="md:col-span-2 flex items-center md:items-start pt-0.5 flex-shrink-0">
          {logoEntity ? (
            <WideLogoSlot title={name} />
          ) : index ? (
            <span className="font-serif text-[15px] text-[var(--muted)] tabular-nums pt-0.5">
              {typeof index === 'number' ? String(index).padStart(2, '0') : index}
            </span>
          ) : (
            <span className="w-1.5 h-1.5 bg-[var(--orange)] inline-block flex-shrink-0 mt-2" />
          )}
        </div>

        {/* Column 2: Name & optional Subtier (Cols 3-5 on desktop) */}
        <div className="md:col-span-3 min-w-0">
          <h3 className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] tracking-tight leading-snug transition-colors duration-150 group-hover:text-[var(--ink)] m-0">
            {name}
          </h3>
          {subtier ? (
            <span className="text-[12.5px] text-[var(--muted)] font-sans block mt-1 leading-normal">
              {subtier}
            </span>
          ) : null}
        </div>
      </div>

      {/* Column 3: Description & Audience (Cols 6-9 on desktop) */}
      <div className="md:col-span-4 space-y-1.5 min-w-0">
        <p className="text-[15px] md:text-[15.5px] leading-relaxed text-[var(--muted)] font-sans m-0">
          {description}
        </p>
        {audience ? (
          <p className="text-[13px] leading-normal text-[var(--muted)]/75 font-sans m-0">
            {audience}
          </p>
        ) : null}
      </div>

      {/* Column 4: Metadata & Arrow (Cols 10-12 on desktop) */}
      <div className="md:col-span-3 flex items-start md:items-center justify-between md:justify-end gap-3 text-right pt-0.5">
        {meta ? (
          <span className="text-[13.5px] text-[var(--muted)] font-sans leading-normal">
            {meta}
          </span>
        ) : null}
        {showArrow ? (
          <span className="text-[var(--ink)] transition-transform duration-150 ease-out group-hover:translate-x-1 flex-shrink-0">
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </span>
        ) : null}
      </div>
    </div>
  );

  const wrapperClass = `block w-full border-b border-[var(--rule)] transition-colors duration-150 hover:bg-[var(--paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] ${className}`;

  if (href) {
    return (
      <Link href={href} className={wrapperClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`${wrapperClass} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {content}
    </div>
  );
};
