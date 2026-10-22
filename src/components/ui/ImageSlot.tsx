import React from 'react';
import Image from 'next/image';
import { resolveImage } from '@/content/images';
import { getAssetPath } from '@/lib/assets';

export interface ImageSlotProps {
  aspectRatio?: '3:2' | '4:5' | '16:9' | '1:1';
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

// 4x3 warm stone placeholder for instant zero-CLS blur
const WARM_STONE_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAPklEQVR42mN88eLF/4sXL/5nZGD4z8DA8B+Inz179v/06dP/Hz169P/Zs2f/mZmZ/zMwMPxnYGD4D8QAG+Yn251786sAAAAASUVORK5CYII=';

export const ImageSlot: React.FC<ImageSlotProps> = ({
  aspectRatio = '3:2',
  src,
  alt = '',
  caption,
  className = '',
  priority = false,
}) => {
  // Mapping true aspect ratios
  const aspectClasses: Record<'3:2' | '4:5' | '16:9' | '1:1', string> = {
    '3:2': 'aspect-[3/2]',
    '4:5': 'aspect-[4/5]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
  };

  const ratioClass = aspectClasses[aspectRatio] || 'aspect-[3/2]';

  // Resolve image from explicit src, caption context, or curated ratio defaults
  let resolved = resolveImage(src, caption, alt);

  // Default homepage Selected Work slots if uncaptioned
  if (!resolved && !src) {
    if (aspectRatio === '3:2') {
      resolved = {
        src: '/images/hrishikesh-ventures/h2-residential.webp',
        alt: alt || 'H2 Residential Development Shela Ahmedabad architectural exterior',
      };
    } else if (aspectRatio === '4:5') {
      // In selected work or single portrait slots
      resolved = {
        src: '/images/hrs-aluglaze/sanand-campus.webp',
        alt: alt || 'Sanand Industrial Engineering Campus glazed facade',
      };
    }
  }

  const finalSrc = getAssetPath(resolved?.src || src);
  const finalAlt = alt || resolved?.alt || caption || 'HRS Group photographic view';

  return (
    <figure className={`m-0 p-0 block ${className}`}>
      <div
        className={`relative w-full ${ratioClass} overflow-hidden bg-[var(--stone)] border border-[var(--stone-deep)]`}
      >
        {finalSrc ? (
          <div className="relative w-full h-full group/img overflow-hidden">
            <Image
              src={finalSrc}
              alt={finalAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              placeholder="blur"
              blurDataURL={WARM_STONE_BLUR}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.025]"
              style={{
                filter: 'sepia(0.04) contrast(1.02) brightness(0.99)', // Subtle warm tint
              }}
            />
          </div>
        ) : (
          /* Architectural stone fallback block */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[var(--stone)] text-[var(--muted)]">
            <div className="w-8 h-8 border border-[var(--stone-deep)] flex items-center justify-center mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--orange)]" />
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--muted)]">
              ARCHITECTURAL REFERENCE
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-[13px] text-[var(--muted)] font-sans leading-normal">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
