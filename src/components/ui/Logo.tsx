import React from 'react';
import Image from 'next/image';
import { WideLogoSlot } from './WideLogoSlot';

export interface LogoProps {
  entity: string;
  className?: string;
  height?: number;
  width?: number;
  variant?: 'auto' | 'svg' | 'tile' | 'placeholder';
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  entity,
  className = '',
  height = 32,
  width,
  variant = 'auto',
  alt,
}) => {
  const normalizedSlug = entity.toLowerCase().trim().replace(/_/g, '-');
  const accessibleAlt = alt || `${normalizedSlug.replace(/-/g, ' ')} logo`;

  if (variant === 'placeholder') {
    return <WideLogoSlot title={accessibleAlt} className={className} />;
  }

  // HRS Aluglaze special requirement:
  // "HRS Aluglaze uses the supplied PNG, placed on an ink-coloured tile because it is white on black."
  if (normalizedSlug === 'hrs-aluglaze' && variant !== 'svg') {
    return (
      <span
        className={`inline-flex items-center justify-center bg-[var(--ink)] px-2.5 py-1.5 ${className}`}
        style={{ minHeight: height ? `${height}px` : '36px' }}
      >
        <Image
          src="/brand/hrs-aluglaze-logo.png"
          alt={accessibleAlt}
          width={width || 120}
          height={height || 32}
          className="h-7 w-auto object-contain"
          priority
        />
      </span>
    );
  }

  // All other entities use /public/logos/<slug>.svg
  // SVG already includes the orange micro-marker and Newsreader wordmark
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${normalizedSlug}.svg`}
        alt={accessibleAlt}
        height={height}
        width={width}
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    </span>
  );
};
