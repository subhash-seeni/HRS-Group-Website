import { Segment } from './types';

const round = (val: number, decimals = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(val * factor) / factor;
};

/**
 * Creates a single line segment as a 1-element Segment array.
 */
export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  accent = false
): Segment[] {
  return [
    {
      x1: round(x1),
      y1: round(y1),
      x2: round(x2),
      y2: round(y2),
      accent,
    },
  ];
}

/**
 * Creates a polyline connecting adjacent points.
 */
export function polyline(
  points: [number, number][],
  accent = false,
  closed = false
): Segment[] {
  const segments: Segment[] = [];
  if (points.length < 2) return segments;

  for (let i = 0; i < points.length - 1; i++) {
    segments.push({
      x1: round(points[i][0]),
      y1: round(points[i][1]),
      x2: round(points[i + 1][0]),
      y2: round(points[i + 1][1]),
      accent,
    });
  }

  if (closed && points.length > 2) {
    segments.push({
      x1: round(points[points.length - 1][0]),
      y1: round(points[points.length - 1][1]),
      x2: round(points[0][0]),
      y2: round(points[0][1]),
      accent,
    });
  }

  return segments;
}

/**
 * Creates a rectangular frame (4 segments).
 */
export function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  accent = false
): Segment[] {
  return [
    { x1: round(x), y1: round(y), x2: round(x + w), y2: round(y), accent },
    { x1: round(x + w), y1: round(y), x2: round(x + w), y2: round(y + h), accent },
    { x1: round(x + w), y1: round(y + h), x2: round(x), y2: round(y + h), accent },
    { x1: round(x), y1: round(y + h), x2: round(x), y2: round(y), accent },
  ];
}

/**
 * Creates an arc with given center, radius, and angular range.
 * Angle in degrees (0 = +X axis, 90 = +Y axis downwards).
 */
export function arc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number,
  accent = false,
  stepDeg = 6
): Segment[] {
  const segments: Segment[] = [];
  const start = startAngleDeg;
  let end = endAngleDeg;
  if (end < start) end += 360;

  const totalAngle = end - start;
  const count = Math.max(3, Math.ceil(totalAngle / Math.max(1, stepDeg)));
  const actualStep = totalAngle / count;

  let prevX = cx + r * Math.cos((start * Math.PI) / 180);
  let prevY = cy + r * Math.sin((start * Math.PI) / 180);

  for (let i = 1; i <= count; i++) {
    const angle = (start + i * actualStep) * (Math.PI / 180);
    const curX = cx + r * Math.cos(angle);
    const curY = cy + r * Math.sin(angle);
    segments.push({
      x1: round(prevX),
      y1: round(prevY),
      x2: round(curX),
      y2: round(curY),
      accent,
    });
    prevX = curX;
    prevY = curY;
  }

  return segments;
}

/**
 * Creates a complete circle as a polyline of short segments (approx 5-7 deg per segment).
 */
export function circle(
  cx: number,
  cy: number,
  r: number,
  accent = false,
  stepDeg = 6
): Segment[] {
  return arc(cx, cy, r, 0, 360, accent, stepDeg);
}

/**
 * Creates an ellipse as a polyline of short segments.
 */
export function ellipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  accent = false,
  stepDeg = 6
): Segment[] {
  const segments: Segment[] = [];
  const count = Math.max(12, Math.ceil(360 / Math.max(1, stepDeg)));
  const actualStep = 360 / count;

  let prevX = cx + rx;
  let prevY = cy;

  for (let i = 1; i <= count; i++) {
    const angle = (i * actualStep * Math.PI) / 180;
    const curX = cx + rx * Math.cos(angle);
    const curY = cy + ry * Math.sin(angle);
    segments.push({
      x1: round(prevX),
      y1: round(prevY),
      x2: round(curX),
      y2: round(curY),
      accent,
    });
    prevX = curX;
    prevY = curY;
  }

  return segments;
}

/**
 * Creates a rounded rectangle with corner radii.
 */
export function roundedRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  accent = false,
  stepDeg = 6
): Segment[] {
  const safeR = Math.min(r, w / 2, h / 2);
  if (safeR <= 0) return rect(x, y, w, h, accent);

  const segments: Segment[] = [];

  // Top edge
  segments.push(...line(x + safeR, y, x + w - safeR, y, accent));
  // Top-right corner (270 to 360)
  segments.push(...arc(x + w - safeR, y + safeR, safeR, 270, 360, accent, stepDeg));
  // Right edge
  segments.push(...line(x + w, y + safeR, x + w, y + h - safeR, accent));
  // Bottom-right corner (0 to 90)
  segments.push(...arc(x + w - safeR, y + h - safeR, safeR, 0, 90, accent, stepDeg));
  // Bottom edge
  segments.push(...line(x + w - safeR, y + h, x + safeR, y + h, accent));
  // Bottom-left corner (90 to 180)
  segments.push(...arc(x + safeR, y + h - safeR, safeR, 90, 180, accent, stepDeg));
  // Left edge
  segments.push(...line(x, y + h - safeR, x, y + safeR, accent));
  // Top-left corner (180 to 270)
  segments.push(...arc(x + safeR, y + safeR, safeR, 180, 270, accent, stepDeg));

  return segments;
}

/**
 * Creates a grid with inner dividers and outer perimeter.
 */
export function grid(
  cols: number,
  rows: number,
  x: number,
  y: number,
  w: number,
  h: number,
  accent = false
): Segment[] {
  const segments: Segment[] = [];

  // Outer border
  segments.push(...rect(x, y, w, h, accent));

  // Vertical interior lines
  const colW = w / cols;
  for (let c = 1; c < cols; c++) {
    const curX = x + c * colW;
    segments.push(...line(curX, y, curX, y + h, accent));
  }

  // Horizontal interior lines
  const rowH = h / rows;
  for (let r = 1; r < rows; r++) {
    const curY = y + r * rowH;
    segments.push(...line(x, curY, x + w, curY, accent));
  }

  return segments;
}

/**
 * Liang-Barsky line clipping algorithm helper.
 */
function clipLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number
): { x1: number; y1: number; x2: number; y2: number } | null {
  const dx = x1 - x0;
  const dy = y1 - y0;
  let t0 = 0.0;
  let t1 = 1.0;

  const p = [-dx, dx, -dy, dy];
  const q = [x0 - boxX, boxX + boxW - x0, y0 - boxY, boxY + boxH - y0];

  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return null;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) return null;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return null;
        if (t < t1) t1 = t;
      }
    }
  }

  return {
    x1: x0 + t0 * dx,
    y1: y0 + t0 * dy,
    x2: x0 + t1 * dx,
    y2: y0 + t1 * dy,
  };
}

/**
 * Creates hatch lines across a bounding rectangle at a specific angle and spacing.
 */
export function hatch(
  x: number,
  y: number,
  w: number,
  h: number,
  spacing: number,
  angleDeg = 45,
  accent = false
): Segment[] {
  const segments: Segment[] = [];
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // Normal vector: (-sin, cos)
  const nx = -sin;
  const ny = cos;

  // Box corners
  const corners = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];

  const dots = corners.map(([cx, cy]) => cx * nx + cy * ny);
  const minDot = Math.min(...dots);
  const maxDot = Math.max(...dots);

  const length = Math.hypot(w, h) * 1.5;

  for (let d = minDot + spacing; d < maxDot; d += spacing) {
    const originX = d * nx;
    const originY = d * ny;

    const p0x = originX - length * cos;
    const p0y = originY - length * sin;
    const p1x = originX + length * cos;
    const p1y = originY + length * sin;

    const clipped = clipLine(p0x, p0y, p1x, p1y, x, y, w, h);
    if (clipped) {
      segments.push({
        x1: round(clipped.x1),
        y1: round(clipped.y1),
        x2: round(clipped.x2),
        y2: round(clipped.y2),
        accent,
      });
    }
  }

  return segments;
}

/**
 * Creates an architectural dimension line with end ticks.
 */
export function dimensionLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tickSize = 8,
  accent = false
): Segment[] {
  const segments: Segment[] = [];

  // Main line
  segments.push({
    x1: round(x1),
    y1: round(y1),
    x2: round(x2),
    y2: round(y2),
    accent,
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.001) return segments;

  // Perpendicular unit vector
  const px = -dy / len;
  const py = dx / len;
  const halfTick = tickSize / 2;

  // Tick at start
  segments.push({
    x1: round(x1 - px * halfTick),
    y1: round(y1 - py * halfTick),
    x2: round(x1 + px * halfTick),
    y2: round(y1 + py * halfTick),
    accent,
  });

  // Tick at end
  segments.push({
    x1: round(x2 - px * halfTick),
    y1: round(y2 - py * halfTick),
    x2: round(x2 + px * halfTick),
    y2: round(y2 + py * halfTick),
    accent,
  });

  return segments;
}

/**
 * Mirrors segments horizontally across a vertical axis X.
 */
export function mirrorX(segments: Segment[], axisX: number): Segment[] {
  return segments.map((s) => ({
    x1: round(2 * axisX - s.x1),
    y1: s.y1,
    x2: round(2 * axisX - s.x2),
    y2: s.y2,
    accent: s.accent,
  }));
}

/**
 * Translates segments by (dx, dy).
 */
export function translate(
  segments: Segment[],
  dx: number,
  dy: number
): Segment[] {
  return segments.map((s) => ({
    x1: round(s.x1 + dx),
    y1: round(s.y1 + dy),
    x2: round(s.x2 + dx),
    y2: round(s.y2 + dy),
    accent: s.accent,
  }));
}

/**
 * Scales segments relative to an origin (originX, originY).
 */
export function scale(
  segments: Segment[],
  sx: number,
  sy: number,
  originX = 400,
  originY = 400
): Segment[] {
  return segments.map((s) => ({
    x1: round(originX + (s.x1 - originX) * sx),
    y1: round(originY + (s.y1 - originY) * sy),
    x2: round(originX + (s.x2 - originX) * sx),
    y2: round(originY + (s.y2 - originY) * sy),
    accent: s.accent,
  }));
}
