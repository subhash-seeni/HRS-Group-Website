import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[var(--ink)] text-[var(--white)] px-4 py-2 text-[14px] font-sans border-2 border-[var(--orange)] rounded-[2px] outline-none"
    >
      Skip to main content
    </a>
  );
};
