'use client';

import React from 'react';
import { ScrollText } from '@/components/motion/ScrollText';

export const GroupIntro: React.FC = () => {
  return (
    <section
      data-surface="paper"
      className="relative w-full bg-[var(--paper)] py-28 sm:py-36 md:py-44 px-6 sm:px-8 lg:px-12 border-t border-[var(--ink)]/10"
      aria-label="About HRS Group"
    >
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-semibold text-[var(--hrs-orange)] block mb-6">
          About the group
        </span>

        <ScrollText
          as="h2"
          className="font-['Bricolage_Grotesque'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1.2]"
          start="top 85%"
          end="bottom 55%"
        >
          Headquartered in Ahmedabad, HRS Group builds foundational businesses that shape everyday living across Gujarat, Bengaluru, and South India. Our operations span engineered facades and residential communities to packaged food, connected retail ecosystems, and regional hospitality.
        </ScrollText>
      </div>
    </section>
  );
};

export default GroupIntro;
