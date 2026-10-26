import { Segment } from './types';

export type StaggerMode = 'center' | 'bottom' | 'top-to-bottom' | 'left-to-right' | 'right-to-left';

export type TransitionMode = 'morph' | 'erase-then-draw';

export interface TransitionWeights {
  dMid: number; // weight for midpoint distance (default: 1.0)
  dLen: number; // weight for length difference (default: 0.45)
  dAng: number; // weight for angle difference (default: 75)
  accentBonus: number; // bonus for matching accent flags (default: 25)
}

export interface TransitionConfig {
  mode: TransitionMode;
  staggerMode: StaggerMode;
  maxStagger: number; // in seconds (e.g. 0.20 - 0.28)
  weights: TransitionWeights;
  overlap: number; // for erase-then-draw: fraction of overlap (default: 0.30)
}

export const DEFAULT_TRANSITION_CONFIG: TransitionConfig = {
  mode: 'morph',
  staggerMode: 'bottom',
  maxStagger: 0.22,
  weights: {
    dMid: 1.0,
    dLen: 0.40,
    dAng: 120,
    accentBonus: 30,
  },
  overlap: 0.30,
};

/**
 * Per-transition override table.
 * Key is formatted as "${fromIdx}-${toIdx}".
 *
 * Available scene indices:
 * 0: facades
 * 1: homes
 * 2: masalas
 * 3: brands
 * 4: stays
 * 5: skills
 * 6: retail
 */
export const TRANSITION_OVERRIDES: Record<string, Partial<TransitionConfig>> = {
  // 1 -> 2: facades -> homes (architectural skyscraper to residential villa)
  // Strong angular preservation locks vertical mullions to vertical house walls and tree trunk
  '0-1': {
    mode: 'morph',
    staggerMode: 'bottom',
    maxStagger: 0.24,
    weights: {
      dMid: 1.1,
      dLen: 0.35,
      dAng: 150,
      accentBonus: 35,
    },
  },

  // 2 -> 3: homes -> masalas (residential villa to spice jars & packaging)
  // Left-to-right wave transforms house into jars progressively, keeping vertical jar walls crisp
  '1-2': {
    mode: 'morph',
    staggerMode: 'left-to-right',
    maxStagger: 0.22,
    weights: {
      dMid: 1.15,
      dLen: 0.30,
      dAng: 160, // strong penalty prevents spinning lines into diagonals
      accentBonus: 40,
    },
  },

  // 3 -> 4: masalas -> brands (spice jars to consumer brand bottles & boxes)
  // Left-to-right cascade flows naturally across shelf packaging
  '2-3': {
    mode: 'morph',
    staggerMode: 'left-to-right',
    maxStagger: 0.20,
    weights: {
      dMid: 1.0,
      dLen: 0.40,
      dAng: 100,
      accentBonus: 35,
    },
  },

  // 4 -> 5: brands -> stays (consumer packaging to boutique hotel suite)
  // Bottom-up ripple keeps baseline stable while bed and drapery emerge
  '3-4': {
    mode: 'morph',
    staggerMode: 'bottom',
    maxStagger: 0.22,
    weights: {
      dMid: 1.1,
      dLen: 0.35,
      dAng: 140,
      accentBonus: 35,
    },
  },

  // 5 -> 6: stays -> skills (hotel suite to drafting tools & engineering helmet)
  // High angular penalty maps bed frame to drafting book and curtain to vertical set square
  '4-5': {
    mode: 'morph',
    staggerMode: 'bottom',
    maxStagger: 0.22,
    weights: {
      dMid: 1.1,
      dLen: 0.35,
      dAng: 150,
      accentBonus: 35,
    },
  },

  // 6 -> 7: skills -> retail (drafting tools to retail facade)
  // Bottom-up emergence aligns technical grid cleanly into storefront awning and shelves
  '5-6': {
    mode: 'morph',
    staggerMode: 'bottom',
    maxStagger: 0.22,
    weights: {
      dMid: 1.1,
      dLen: 0.35,
      dAng: 150,
      accentBonus: 35,
    },
  },

  // 7 -> 1: retail -> facades (retail storefront to skyscraper tower)
  // Vertical mullion bias allows the storefront to stretch upward into high-rise curtain wall
  '6-0': {
    mode: 'morph',
    staggerMode: 'bottom',
    maxStagger: 0.24,
    weights: {
      dMid: 1.0,
      dLen: 0.35,
      dAng: 160,
      accentBonus: 35,
    },
  },
};

export function getTransitionConfig(fromIdx: number, toIdx: number): TransitionConfig {
  const key = `${fromIdx}-${toIdx}`;
  const override = TRANSITION_OVERRIDES[key] || {};
  return {
    ...DEFAULT_TRANSITION_CONFIG,
    ...override,
    weights: {
      ...DEFAULT_TRANSITION_CONFIG.weights,
      ...(override.weights || {}),
    },
  };
}

/**
 * Computes stagger for a segment based on the chosen StaggerMode.
 */
export function computeStagger(
  s: Segment,
  mode: StaggerMode,
  maxStagger: number = 0.25
): number {
  const midX = (s.x1 + s.x2) / 2;
  const midY = (s.y1 + s.y2) / 2;

  switch (mode) {
    case 'bottom': {
      // Ground line at 640 -> top at 120
      const distFromGround = Math.max(0, 640 - midY);
      return Math.min(maxStagger, (distFromGround / 520) * maxStagger);
    }
    case 'top-to-bottom': {
      const distFromTop = Math.max(0, midY - 120);
      return Math.min(maxStagger, (distFromTop / 520) * maxStagger);
    }
    case 'left-to-right': {
      const distFromLeft = Math.max(0, midX - 80);
      return Math.min(maxStagger, (distFromLeft / 640) * maxStagger);
    }
    case 'right-to-left': {
      const distFromRight = Math.max(0, 720 - midX);
      return Math.min(maxStagger, (distFromRight / 640) * maxStagger);
    }
    case 'center':
    default: {
      const distFromCenter = Math.hypot(midX - 400, midY - 370);
      return Math.min(maxStagger, (distFromCenter / 420) * maxStagger);
    }
  }
}
