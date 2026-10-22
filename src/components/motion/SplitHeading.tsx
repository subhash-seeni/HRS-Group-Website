'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motionTokens } from '@/lib/motion';

export interface SplitHeadingProps {
  /** Text to display. Can include newlines (\n) to designate line breaks */
  children?: React.ReactNode;
  text?: string;
  /** Explicit lines array if predetermined by layout */
  lines?: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  className?: string;
  delay?: number; // base delay in seconds
  staggerMs?: number; // default 80ms
  triggerOnce?: boolean;
}

function renderLineWithEmphasis(line: string): React.ReactNode {
  if (!line || !line.includes('<em>')) {
    return line;
  }
  const parts = line.split(/(<em>.*?<\/em>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('<em>') && part.endsWith('</em>')) {
      const inner = part.slice(4, -5);
      return (
        <em key={i} className="heading-em">
          {inner}
        </em>
      );
    }
    return part;
  });
}

export function SplitHeading({
  children,
  text,
  lines: explicitLines,
  as: Component = 'h2',
  className = '',
  delay = 0,
  staggerMs = 80,
  triggerOnce = true,
}: SplitHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const effectiveContent = text !== undefined ? text : children;

  // Extract full raw text for accessible aria-label (stripping HTML tags like <em>)
  const rawTextWithTags = typeof effectiveContent === 'string'
    ? effectiveContent
    : explicitLines
    ? explicitLines.join(' ')
    : React.Children.toArray(effectiveContent).map(c => (typeof c === 'string' ? c : '')).join(' ');
  const rawText = rawTextWithTags.replace(/<[^>]+>/g, '');

  // Determine lines to display
  let linesToRender: string[] = [];
  if (explicitLines && explicitLines.length > 0) {
    linesToRender = explicitLines;
  } else if (typeof effectiveContent === 'string') {
    linesToRender = effectiveContent.split('\n').filter(Boolean);
  } else {
    linesToRender = [rawTextWithTags];
  }

  useEffect(() => {
    setIsHydrated(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const el = containerRef.current;
    if (!el) return;

    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  const baseDelaySec = delay > 10 ? delay / 1000 : delay;

  return (
    <Component
      ref={containerRef}
      className={className}
      aria-label={rawText}
      role={Component === 'p' || Component === 'span' ? undefined : 'heading'}
    >
      {/* If not hydrated yet (SSR), render clean server structure to prevent CLS */}
      {!isHydrated ? (
        <span className="block text-inherit" aria-hidden="true">
          {linesToRender.map((line, idx) => (
            <span key={idx} className="block overflow-hidden text-inherit">
              <span className="block text-inherit">{renderLineWithEmphasis(line)}</span>
            </span>
          ))}
        </span>
      ) : (
        <span className="block text-inherit" aria-hidden="true">
          {linesToRender.map((line, idx) => {
            const lineDelaySec = baseDelaySec + (idx * staggerMs) / 1000;
            const lineStyle: React.CSSProperties = prefersReducedMotion
              ? {}
              : {
                  transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 105%, 0)',
                  transitionProperty: 'transform',
                  transitionDuration: `${motionTokens.durations.slow}s`,
                  transitionTimingFunction: motionTokens.easings.cssEaseOut,
                  transitionDelay: `${lineDelaySec}s`,
                  willChange: isInView ? 'auto' : 'transform',
                };

            return (
              <span key={idx} className="block overflow-hidden text-inherit">
                <span className="block text-inherit" style={lineStyle}>
                  {renderLineWithEmphasis(line)}
                </span>
              </span>
            );
          })}
        </span>
      )}
    </Component>
  );
}
