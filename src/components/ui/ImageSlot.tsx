import React from 'react';
import Image from 'next/image';

export interface ImageSlotProps {
  aspectRatio?: '3:2' | '4:5' | '16:9' | '1:1';
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

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

  return (
    <figure className={`m-0 p-0 block ${className}`}>
      <div
        className={`relative w-full ${ratioClass} overflow-hidden bg-[var(--slot)]`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-[13px] text-[var(--muted)] font-sans leading-normal">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
