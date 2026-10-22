/**
 * Motion Tokens & Utilities for HRS Group
 * 
 * Target: Refined editorial look with confident, smooth motion.
 * Easings, durations, and distances adhere strictly to architectural restraint.
 * Only transform, opacity, and clip-path are animated.
 */

export const motionTokens = {
  easings: {
    easeOut: [0.22, 1, 0.36, 1] as const,
    easeInOut: [0.65, 0, 0.35, 1] as const,
    cssEaseOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    cssEaseInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
  durations: {
    fast: 0.2, // 200ms
    base: 0.5, // 500ms
    slow: 0.8, // 800ms
    cinematic: 1.2, // 1200ms
    ms: {
      fast: 200,
      base: 500,
      slow: 800,
      cinematic: 1200,
    },
  },
  distances: {
    rise: 24, // px
    largeRise: 60, // px
  },
} as const;

export const editorialTransition = {
  duration: motionTokens.durations.base,
  ease: motionTokens.easings.easeOut,
};

export const slowTransition = {
  duration: motionTokens.durations.slow,
  ease: motionTokens.easings.easeOut,
};

export const cinematicTransition = {
  duration: motionTokens.durations.cinematic,
  ease: motionTokens.easings.easeOut,
};
