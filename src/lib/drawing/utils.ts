import { Segment, BoundingBox } from './types';

/**
 * Computes the axis-aligned bounding box and center of a segment array.
 */
export function getBoundingBox(segments: Segment[]): BoundingBox {
  if (segments.length === 0) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
    };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const s of segments) {
    if (s.x1 < minX) minX = s.x1;
    if (s.x2 < minX) minX = s.x2;
    if (s.x1 > maxX) maxX = s.x1;
    if (s.x2 > maxX) maxX = s.x2;

    if (s.y1 < minY) minY = s.y1;
    if (s.y2 < minY) minY = s.y2;
    if (s.y1 > maxY) maxY = s.y1;
    if (s.y2 > maxY) maxY = s.y2;
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

/**
 * Calculates Euclidean length of a segment.
 */
export function segmentLength(s: Segment): number {
  return Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
}

/**
 * Normalises a scene's segment count by repeatedly splitting the longest segments,
 * so later morphs have an equal count to work with.
 */
export function normalizeSegments(
  segments: Segment[],
  targetCount: number
): Segment[] {
  if (segments.length >= targetCount) {
    return segments.slice(0, targetCount);
  }

  // Work on a mutable clone
  const pool: Segment[] = segments.map((s) => ({ ...s }));

  while (pool.length < targetCount) {
    // Find index of longest segment
    let maxIdx = 0;
    let maxLen = segmentLength(pool[0]);

    for (let i = 1; i < pool.length; i++) {
      const len = segmentLength(pool[i]);
      if (len > maxLen) {
        maxLen = len;
        maxIdx = i;
      }
    }

    const longest = pool[maxIdx];
    const midX = (longest.x1 + longest.x2) / 2;
    const midY = (longest.y1 + longest.y2) / 2;

    const firstHalf: Segment = {
      x1: longest.x1,
      y1: longest.y1,
      x2: midX,
      y2: midY,
      accent: longest.accent,
    };

    const secondHalf: Segment = {
      x1: midX,
      y1: midY,
      x2: longest.x2,
      y2: longest.y2,
      accent: longest.accent,
    };

    // Replace longest with first half, and push second half
    pool[maxIdx] = firstHalf;
    pool.push(secondHalf);
  }

  return pool;
}

/**
 * Canonicalizes segment direction (left-to-right, or top-to-bottom if vertical)
 * and sorts segments by spatial position (vertical bands, then horizontal)
 * to ensure morphing trajectories are smooth and natural.
 */
export function canonicalizeAndSortSegments(segments: Segment[]): Segment[] {
  const canonical = segments.map((s) => {
    // Ensure consistent direction
    if (s.x1 > s.x2 || (s.x1 === s.x2 && s.y1 > s.y2)) {
      return {
        x1: s.x2,
        y1: s.y2,
        x2: s.x1,
        y2: s.y1,
        accent: s.accent,
      };
    }
    return { ...s };
  });

  // Sort primarily by Y center (top to bottom), then by X center (left to right)
  canonical.sort((a, b) => {
    const aCenterY = (a.y1 + a.y2) / 2;
    const bCenterY = (b.y1 + b.y2) / 2;
    if (Math.abs(aCenterY - bCenterY) > 8) {
      return aCenterY - bCenterY;
    }
    const aCenterX = (a.x1 + a.x2) / 2;
    const bCenterX = (b.x1 + b.x2) / 2;
    return aCenterX - bCenterX;
  });

  return canonical;
}

/**
 * Linearly interpolates between two scenes with parameter t in [0, 1].
 */
export function interpolateSegments(
  sceneA: Segment[],
  sceneB: Segment[],
  t: number
): Segment[] {
  const clampedT = Math.max(0, Math.min(1, t));

  // Determine target count
  const count = Math.max(sceneA.length, sceneB.length, 240);

  const normA = canonicalizeAndSortSegments(normalizeSegments(sceneA, count));
  const normB = canonicalizeAndSortSegments(normalizeSegments(sceneB, count));

  const result: Segment[] = new Array(count);

  for (let i = 0; i < count; i++) {
    const a = normA[i];
    const b = normB[i];

    result[i] = {
      x1: a.x1 + (b.x1 - a.x1) * clampedT,
      y1: a.y1 + (b.y1 - a.y1) * clampedT,
      x2: a.x2 + (b.x2 - a.x2) * clampedT,
      y2: a.y2 + (b.y2 - a.y2) * clampedT,
      accent: clampedT > 0.5 ? b.accent : a.accent,
    };
  }

  return result;
}
