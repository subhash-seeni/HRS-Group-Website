'use client';

import React from 'react';
import { getAssetUrl } from '@/lib/basePath';

interface LogoProps {
  slug: string;
  name?: string;
  className?: string;
  height?: number | string;
  variant?: 'default' | 'inverted';
}

export const Logo: React.FC<LogoProps> = ({
  slug,
  name,
  className = '',
  height = 'h-9',
  variant = 'default',
}) => {
  const isBogo = slug.startsWith('bogo');
  const isAluglazeReal = slug === 'hrs-aluglaze-real';
  const altText = name || `${slug} logo`;

  if (slug === 'hrs-group') {
    return (
      <div className={`inline-flex items-center ${height} ${className}`}>
        <svg
          viewBox="0 0 140 44"
          className="h-full w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={altText}
        >
          <circle cx="12" cy="22" r="7" fill="#F58220" />
          <text
            x="28"
            y="25"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="18"
            fontWeight="800"
            letterSpacing="-0.03em"
            fill="currentColor"
          >
            HRS
          </text>
          <text
            x="28"
            y="36"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="0.1em"
            fill="currentColor"
            opacity="0.75"
          >
            GROUP
          </text>
        </svg>
      </div>
    );
  }

  let logoSrc = '';
  if (isAluglazeReal) {
    logoSrc = getAssetUrl('/brand/hrs-aluglaze-logo.png');
  } else if (isBogo) {
    const bogoFile = slug === 'bogo' ? 'bogo-master' : slug;
    logoSrc = getAssetUrl(`/bogo/logos/${bogoFile}.png`);
  } else {
    logoSrc = getAssetUrl(`/logos/${slug}.svg`);
  }

  return (
    <div
      className={`inline-flex items-center ${height} ${className} ${
        variant === 'inverted' ? 'brightness-0 invert' : ''
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={altText}
        className="h-full w-auto max-w-full object-contain"
        loading="lazy"
        onError={(e) => {
          // Fallback graceful text if image fails
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const span = document.createElement('span');
            span.className = 'logo-fallback font-bold tracking-tight text-current';
            span.textContent = name || slug.toUpperCase();
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );
};

export default Logo;
