import React from 'react';
import { getAssetUrl } from '@/lib/basePath';

interface ImageSlotProps {
  src?: string | null;
  alt: string;
  caption?: string;
  aspectRatio?: string; // e.g., 'aspect-[16/9]' | 'aspect-[4/3]'
  className?: string;
  fallbackTitle?: string;
  fallbackSector?: string;
  accentColor?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt,
  caption,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  fallbackTitle,
  fallbackSector,
  accentColor = 'var(--hrs-orange)',
}) => {
  // If the image is a concept store render, default caption to 'Concept' if not provided
  const isConcept = src && (src.includes('concept') || caption === 'Concept');
  const displayCaption = caption || (isConcept ? 'Concept' : undefined);

  if (src) {
    const fullSrc = getAssetUrl(src);
    return (
      <figure className={`group relative w-full overflow-hidden ${className}`}>
        <div
          className={`relative w-full overflow-hidden bg-neutral-100 ${aspectRatio}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullSrc}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {displayCaption && (
          <figcaption className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            {displayCaption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Fallback: Elegant flat colour / typographic field (never stock or generic placeholder)
  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden border border-[var(--ink)]/15 p-8 ${aspectRatio} ${className}`}
      style={{
        backgroundColor: 'var(--paper)',
      }}
    >
      <div className="flex items-center justify-between">
        {fallbackSector && (
          <span className="text-xs font-semibold text-neutral-500">
            {fallbackSector}
          </span>
        )}
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div>
        <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[var(--ink)]">
          {fallbackTitle || alt}
        </h4>
        <p className="mt-1 text-xs text-neutral-500">Archival record · HRS Group</p>
      </div>

      <div className="hairline-t pt-3 text-xs font-medium text-neutral-500">
        Visual asset awaiting release
      </div>
    </div>
  );
};

export default ImageSlot;
