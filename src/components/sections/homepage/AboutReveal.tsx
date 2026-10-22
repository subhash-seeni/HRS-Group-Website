'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Container } from '@/components/ui';
import { Section } from '@/components/layout/Section';
import { LineLink } from '@/components/motion/LineLink';

const ABOUT_TEXT =
  'Founded in Ahmedabad, HRS Group develops and operates long-cycle businesses anchored in Gujarat and Karnataka. The group coordinates independent operational companies in architectural facades, residential developments, spice milling, consumer retail, and regional hospitality. Every business maintains autonomous technical leadership alongside central standards for capital prudence, process control, and customer service.';

interface WordSpanProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isMounted: boolean;
  prefersReducedMotion: boolean;
}

const WordSpan: React.FC<WordSpanProps> = ({
  word,
  index,
  total,
  progress,
  isMounted,
  prefersReducedMotion,
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  if (!isMounted || prefersReducedMotion) {
    return (
      <span className="inline-block mr-[0.28em] text-[var(--ink)]">
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.28em] text-[var(--ink)]"
    >
      {word}
    </motion.span>
  );
};

export const AboutReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const words = ABOUT_TEXT.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <Section surface="stone" className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div
            ref={containerRef}
            className="col-span-12 md:col-span-7 md:col-start-4 lg:col-span-6 lg:col-start-4 space-y-6"
          >
            {/* Word-by-word scroll-scrubbed text (25% to 100% ink opacity) */}
            <p className="text-[18px] md:text-[19px] leading-[1.65] font-sans m-0 text-[var(--ink)]">
              {words.map((word, idx) => (
                <WordSpan
                  key={idx}
                  word={word}
                  index={idx}
                  total={words.length}
                  progress={scrollYProgress}
                  isMounted={isMounted}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </p>

            <div>
              <LineLink href="/about" className="link-editorial text-[17px]">
                Read the story
              </LineLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
