'use client';

import React from 'react';
import Image from 'next/image';
import { Leader } from '@/content/types';
import { ImageReveal } from '@/components/motion/ImageReveal';

interface LeadershipGridProps {
  leaders: Leader[];
}

const leaderImages: Record<string, string> = {
  'Hrishikesh R. Sharma': '/images/leadership/hrishikesh-sharma.jpg',
  'Pravin V. Patel': '/images/leadership/pravin-patel.jpg',
  'Ananya H. Sharma': '/images/leadership/ananya-sharma.jpg',
  'Siddharth Rao': '/images/leadership/siddharth-rao.jpg',
  'Mihir Dave': '/images/leadership/mihir-dave.jpg',
  'Rajesh K. Varma': '/images/leadership/rajesh-varma.jpg',
  'Meera Nambiar': '/images/leadership/meera-nambiar.jpg',
};

export const LeadershipGrid: React.FC<LeadershipGridProps> = ({ leaders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {leaders.map((leader, idx) => {
        const imgSrc = leaderImages[leader.name] || '/images/group/corporate-lobby.webp';

        return (
          <div key={leader.name} className="space-y-4 group">
            {/* Leadership portrait with ImageReveal and a quiet hover zoom */}
            <ImageReveal delay={idx * 60}>
              <div className="relative w-full aspect-[4/5] bg-[var(--slot)] overflow-hidden rounded-[2px] border border-[var(--rule)]">
                <Image
                  src={imgSrc}
                  alt={`Portrait of ${leader.name}, ${leader.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </ImageReveal>

            <div className="space-y-1.5 pt-1">
              <h3 className="font-serif text-[20px] md:text-[22px] text-[var(--ink)] font-normal m-0">
                {leader.name}
              </h3>
              <p className="text-[13.5px] font-medium text-[var(--ink)] font-sans m-0">
                {leader.title}
              </p>
              <p className="text-[13px] text-[var(--muted)] font-sans m-0">
                {leader.focusArea}
              </p>
              <p className="text-[14.5px] leading-relaxed text-[var(--muted)] font-sans pt-2 m-0 border-t border-[var(--rule)]">
                {leader.biography}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
