'use client';

import React from 'react';

export interface InteractiveBackgroundProps {
  variant?: 'home' | 'inner';
  className?: string;
}

/**
 * InteractiveBackground:
 * Maintained as a clean zero-overhead stub to preserve API stability across routes
 * while eliminating continuous canvas rAF loops, frame drops on 4x CPU throttling,
 * and unnecessary decorative noise in adherence to the strict editorial aesthetic.
 */
export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = () => {
  return null;
};
