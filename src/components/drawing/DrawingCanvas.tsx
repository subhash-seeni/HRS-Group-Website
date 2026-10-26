'use client';

import React from 'react';
import { Segment } from '@/lib/drawing/types';

interface DrawingCanvasProps {
  segments: Segment[];
  accentColor?: string;
  strokeColor?: string;
  showEndpoints?: boolean;
  strokeWidth?: number;
  className?: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  segments,
  accentColor = '#F58220',
  strokeColor = '#0E0E10',
  showEndpoints = false,
  strokeWidth = 2,
  className = 'w-full h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Subtle blueprint grid watermark in canvas background */}
      <defs>
        <pattern
          id="drawing-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.07"
          />
        </pattern>
      </defs>
      <rect
        width="800"
        height="800"
        fill="url(#drawing-grid)"
        className="pointer-events-none text-current"
      />

      {/* Segments group */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {segments.map((seg, idx) => (
          <line
            key={idx}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={seg.accent ? accentColor : strokeColor}
            strokeWidth={strokeWidth}
          />
        ))}
      </g>

      {/* Construction endpoints (revealed on toggle) */}
      {showEndpoints && (
        <g fill="none" strokeWidth="1">
          {segments.map((seg, idx) => (
            <React.Fragment key={`pts-${idx}`}>
              <circle
                cx={seg.x1}
                cy={seg.y1}
                r="3"
                fill={seg.accent ? accentColor : strokeColor}
                opacity={0.7}
              />
              <circle
                cx={seg.x2}
                cy={seg.y2}
                r="3"
                fill={seg.accent ? accentColor : strokeColor}
                opacity={0.7}
              />
            </React.Fragment>
          ))}
        </g>
      )}
    </svg>
  );
};
