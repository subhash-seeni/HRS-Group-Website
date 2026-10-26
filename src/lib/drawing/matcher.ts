import { Segment } from './types';
import { segmentLength, normalizeSegments } from './utils';
import {
  TransitionConfig,
  getTransitionConfig,
  computeStagger,
  DEFAULT_TRANSITION_CONFIG,
} from './transitions';

export interface MatchedSegmentPair {
  // Source coordinates
  x1A: number;
  y1A: number;
  x2A: number;
  y2A: number;
  accentA: boolean;

  // Target coordinates
  x1B: number;
  y1B: number;
  x2B: number;
  y2B: number;
  accentB: boolean;

  // Stagger delay in seconds (0 to maxStagger)
  stagger: number;

  // Distance from ground line for draw-in ordering
  distFromGround: number;

  // Is ground line (pinned still)
  isGround: boolean;

  // Transition mode: 'morph' (default), 'erase' (retracting), or 'draw' (expanding)
  mode?: 'morph' | 'erase' | 'draw';
}

export interface HeroDrawingTheme {
  strokeColor: string;
  accentColor: string;
}

export const HERO_DRAWING_THEMES: HeroDrawingTheme[] = [
  // 0: facades (ink #0E0E10)
  {
    strokeColor: '#FAF8F4', // warm white
    accentColor: '#F58220', // HRS orange
  },
  // 1: homes (terracotta #A84325)
  {
    strokeColor: '#FFF1EC', // warm cream
    accentColor: '#F58220', // orange
  },
  // 2: masalas (turmeric #D99400)
  {
    strokeColor: '#0E0E10', // ink (high contrast on yellow)
    accentColor: '#281300', // deep burnt umber
  },
  // 3: brands (green #154D28)
  {
    strokeColor: '#FFFFFF',
    accentColor: '#D2F8DD', // pale fresh mint
  },
  // 4: stays (teal #0D565C)
  {
    strokeColor: '#FFFFFF',
    accentColor: '#F58220', // vibrant orange against teal
  },
  // 5: skills (cadet blue #274B76)
  {
    strokeColor: '#FFFFFF',
    accentColor: '#F58220',
  },
  // 6: retail (BOGO navy #0F2A5C)
  {
    strokeColor: '#FFFFFF',
    accentColor: '#F58A33', // BOGO orange
  },
];

/**
 * Checks if a segment is the shared ground line at y = 640.
 */
export function isGroundLine(s: Segment): boolean {
  return (
    Math.abs(s.y1 - 640) < 2 &&
    Math.abs(s.y2 - 640) < 2 &&
    Math.abs(s.x2 - s.x1) > 300
  );
}

/**
 * Computes the angle of a segment in [0, PI).
 */
function segmentAngle(s: Segment): number {
  const dx = s.x2 - s.x1;
  const dy = s.y2 - s.y1;
  let angle = Math.atan2(dy, dx);
  if (angle < 0) angle += Math.PI;
  return angle % Math.PI;
}

/**
 * Matches two scenes according to the transition configuration.
 * Supports both direct 'morph' matching and 'erase-then-draw' staging.
 * Ground line at y = 640 is always isolated and pinned stationary at index 0.
 */
export function matchScenes(
  sceneA: Segment[],
  sceneB: Segment[],
  maxSegmentCap?: number,
  config: TransitionConfig = DEFAULT_TRANSITION_CONFIG
): MatchedSegmentPair[] {
  // 1. Separate ground line from non-ground segments before normalization
  const groundA =
    sceneA.find(isGroundLine) || {
      x1: 80,
      y1: 640,
      x2: 720,
      y2: 640,
      accent: false,
    };
  const groundB =
    sceneB.find(isGroundLine) || {
      x1: 80,
      y1: 640,
      x2: 720,
      y2: 640,
      accent: false,
    };

  const nonGroundA = sceneA.filter((s) => !isGroundLine(s));
  const nonGroundB = sceneB.filter((s) => !isGroundLine(s));

  // Ground pair (index 0) - remains stationary in every transition
  const groundPair: MatchedSegmentPair = {
    x1A: groundA.x1,
    y1A: groundA.y1,
    x2A: groundA.x2,
    y2A: groundA.y2,
    accentA: false,
    x1B: groundB.x1,
    y1B: groundB.y1,
    x2B: groundB.x2,
    y2B: groundB.y2,
    accentB: false,
    stagger: 0,
    distFromGround: 0,
    isGround: true,
    mode: 'morph',
  };

  // -------------------------------------------------------------
  // ERASE-THEN-DRAW MODE (Clean retraction then drawing with 300ms overlap)
  // -------------------------------------------------------------
  if (config.mode === 'erase-then-draw') {
    const listA = maxSegmentCap && nonGroundA.length > maxSegmentCap - 1
      ? nonGroundA.slice(0, maxSegmentCap - 1)
      : nonGroundA;
    const listB = maxSegmentCap && nonGroundB.length > maxSegmentCap - 1
      ? nonGroundB.slice(0, maxSegmentCap - 1)
      : nonGroundB;

    const pairs: MatchedSegmentPair[] = [groundPair];

    // Erase segments: retract toward start points (staggered top-down or according to config)
    for (let i = 0; i < listA.length; i++) {
      const a = listA[i];
      const stagger = computeStagger(a, config.staggerMode, config.maxStagger);
      const midY = (a.y1 + a.y2) / 2;
      pairs.push({
        x1A: a.x1,
        y1A: a.y1,
        x2A: a.x2,
        y2A: a.y2,
        accentA: a.accent,
        x1B: a.x1,
        y1B: a.y1,
        x2B: a.x1,
        y2B: a.y1,
        accentB: a.accent,
        stagger,
        distFromGround: Math.max(0, 640 - midY),
        isGround: false,
        mode: 'erase',
      });
    }

    // Draw segments: expand outward from start points (staggered bottom-up from ground)
    for (let j = 0; j < listB.length; j++) {
      const b = listB[j];
      const stagger = computeStagger(b, 'bottom', config.maxStagger);
      const midY = (b.y1 + b.y2) / 2;
      pairs.push({
        x1A: b.x1,
        y1A: b.y1,
        x2A: b.x1,
        y2A: b.y1,
        accentA: b.accent,
        x1B: b.x1,
        y1B: b.y1,
        x2B: b.x2,
        y2B: b.y2,
        accentB: b.accent,
        stagger,
        distFromGround: Math.max(0, 640 - midY),
        isGround: false,
        mode: 'draw',
      });
    }

    return pairs;
  }

  // -------------------------------------------------------------
  // MORPH MODE (Direct nearest-neighbour interpolation)
  // -------------------------------------------------------------
  let targetCount = Math.max(nonGroundA.length, nonGroundB.length);
  if (maxSegmentCap && targetCount > maxSegmentCap - 1) {
    targetCount = maxSegmentCap - 1;
  }

  // Normalise non-ground segments to target count
  const normA = normalizeSegments(nonGroundA, targetCount);
  const normB = normalizeSegments(nonGroundB, targetCount);

  const poolSize = normA.length + 1;
  const pairs: MatchedSegmentPair[] = new Array(poolSize);
  pairs[0] = groundPair;

  // Pre-calculate features of normB
  const bMidX = new Float32Array(normB.length);
  const bMidY = new Float32Array(normB.length);
  const bLen = new Float32Array(normB.length);
  const bAngle = new Float32Array(normB.length);

  for (let j = 0; j < normB.length; j++) {
    const b = normB[j];
    bMidX[j] = (b.x1 + b.x2) / 2;
    bMidY[j] = (b.y1 + b.y2) / 2;
    bLen[j] = segmentLength(b);
    bAngle[j] = segmentAngle(b);
  }

  const usedB = new Uint8Array(normB.length);
  const weights = config.weights;

  for (let i = 0; i < normA.length; i++) {
    const a = normA[i];
    const aMidX = (a.x1 + a.x2) / 2;
    const aMidY = (a.y1 + a.y2) / 2;
    const aL = segmentLength(a);
    const aAng = segmentAngle(a);

    let bestJ = -1;
    let minCost = Infinity;

    for (let j = 0; j < normB.length; j++) {
      if (usedB[j]) continue;

      const dMid = Math.hypot(aMidX - bMidX[j], aMidY - bMidY[j]);
      const dLen = Math.abs(aL - bLen[j]);

      let dAng = Math.abs(aAng - bAngle[j]);
      if (dAng > Math.PI / 2) dAng = Math.PI - dAng;

      // Weighted cost function
      let cost = weights.dMid * dMid + weights.dLen * dLen + weights.dAng * dAng;
      if (a.accent === normB[j].accent) {
        cost -= weights.accentBonus;
      }

      if (cost < minCost) {
        minCost = cost;
        bestJ = j;
      }
    }

    if (bestJ === -1) {
      for (let j = 0; j < normB.length; j++) {
        if (!usedB[j]) {
          bestJ = j;
          break;
        }
      }
      if (bestJ === -1) bestJ = 0;
    }

    usedB[bestJ] = 1;
    const b = normB[bestJ];

    // Align endpoints to prevent twisting
    const dStraight =
      Math.hypot(a.x1 - b.x1, a.y1 - b.y1) +
      Math.hypot(a.x2 - b.x2, a.y2 - b.y2);
    const dFlipped =
      Math.hypot(a.x1 - b.x2, a.y1 - b.y2) +
      Math.hypot(a.x2 - b.x1, a.y2 - b.y1);

    const x1B = dFlipped < dStraight ? b.x2 : b.x1;
    const y1B = dFlipped < dStraight ? b.y2 : b.y1;
    const x2B = dFlipped < dStraight ? b.x1 : b.x2;
    const y2B = dFlipped < dStraight ? b.y1 : b.y2;

    // Configured stagger calculation
    const stagger = computeStagger(a, config.staggerMode, config.maxStagger);
    const distFromGround = Math.max(0, 640 - aMidY);

    pairs[i + 1] = {
      x1A: a.x1,
      y1A: a.y1,
      x2A: a.x2,
      y2A: a.y2,
      accentA: a.accent,
      x1B,
      y1B,
      x2B,
      y2B,
      accentB: b.accent,
      stagger,
      distFromGround,
      isGround: false,
      mode: 'morph',
    };
  }

  return pairs;
}
