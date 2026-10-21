import React from 'react';

export interface WideLogoSlotProps {
  title?: string;
  className?: string;
}

/**
 * WideLogoSlot
 *
 * An architectural, minimal wide logo placeholder icon denoting a corporate
 * brandmark/wordmark lockup slot.
 *
 * Adheres strictly to HRS Group tokens:
 * - Dimensions: 88px x 28px (classic ~3:1 wide corporate logo aspect ratio)
 * - Surface: var(--slot) [#ECEAE5]
 * - Hairline: var(--rule) [#E6E4DF]
 * - Signature micro-accent: 6px var(--orange) marker
 * - Universal image/logo glyph & subtle wordmark wireframe guide
 */
export const WideLogoSlot: React.FC<WideLogoSlotProps> = ({
  title,
  className = '',
}) => {
  return (
    <div
      className={`w-[88px] h-[28px] rounded-[2px] bg-[var(--slot)] border border-[var(--rule)] flex items-center justify-between px-2.5 transition-colors duration-150 group-hover:border-[var(--muted)]/40 group-hover:bg-[#E8E6E0] flex-shrink-0 select-none ${className}`}
      title={title ? `${title} logo` : 'Brand logo slot'}
      aria-label={title ? `${title} logo` : 'Brand logo slot'}
      role="img"
    >
      {/* Orange micro-accent marker */}
      <span className="w-1.5 h-1.5 bg-[var(--orange)] rounded-[0.5px] flex-shrink-0" />

      {/* Media / brandmark placeholder icon */}
      <svg
        className="w-3.5 h-3.5 text-[var(--muted)]/70 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.75" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>

      {/* Subtle wireframe bar indicating logo wordmark */}
      <span className="w-6 h-1 bg-[var(--muted)]/35 rounded-[0.5px] flex-shrink-0" />
    </div>
  );
};
