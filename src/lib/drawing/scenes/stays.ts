import { Segment } from '../types';
import {
  line,
  rect,
  roundedRect,
  circle,
  arc,
  polyline,
} from '../primitives';

export const drawStays = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // Baseboard trim at bottom of wall
  segments.push(...line(80, 626, 720, 626, false));

  // 1. Bed with Headboard, Mattress and Two Pillows (Center: x=240 to 560)
  const bedX = 240;
  const bedW = 320;
  const baseFrameY = 560;

  // Headboard
  const hbX = bedX - 12;
  const hbW = bedW + 24;
  const hbTopY = 320;
  const hbH = baseFrameY - hbTopY;

  // Headboard outer border
  segments.push(...rect(hbX, hbTopY, hbW, hbH, false));

  // Headboard top architectural molding in ACCENT
  segments.push(...rect(hbX - 6, hbTopY - 12, hbW + 12, 12, true));
  segments.push(...line(hbX - 10, hbTopY - 12, hbX + hbW + 10, hbTopY - 12, true));

  // Headboard vertical architectural fluting (5 channels)
  const panelW = hbW / 5;
  for (let p = 1; p < 5; p++) {
    const px = hbX + p * panelW;
    segments.push(...line(px, hbTopY, px, baseFrameY, false));
  }

  // Bed base frame & legs
  segments.push(...rect(bedX, baseFrameY, bedW, 55, false));
  segments.push(...rect(bedX + 15, baseFrameY + 55, 20, 25, false));
  segments.push(...rect(bedX + bedW - 35, baseFrameY + 55, 20, 25, false));

  // Mattress (tuned stepDeg = 16)
  const matX = bedX + 4;
  const matW = bedW - 8;
  const matTopY = 490;
  const matH = baseFrameY - matTopY;
  segments.push(...roundedRect(matX, matTopY, matW, matH, 8, false, 16));

  // Duvet turnover
  const duvetFoldY = 520;
  segments.push(...line(matX, duvetFoldY, matX + matW, duvetFoldY, false));
  segments.push(
    ...polyline(
      [
        [matX, duvetFoldY],
        [matX + 10, duvetFoldY + 18],
        [matX + matW - 10, duvetFoldY + 18],
        [matX + matW, duvetFoldY],
      ],
      false
    )
  );

  // Duvet center runner / bed throw in ACCENT
  segments.push(...rect(bedX + 60, duvetFoldY + 30, bedW - 120, 38, true));
  segments.push(...line(bedX + 70, duvetFoldY + 49, bedX + bedW - 70, duvetFoldY + 49, true));

  // Two Pillows (stepDeg = 16)
  const pil1X = bedX + 22;
  const pil1Y = 435;
  const pilW = 120;
  const pilH = 58;
  segments.push(...roundedRect(pil1X, pil1Y, pilW, pilH, 12, false, 16));
  segments.push(...arc(pil1X + pilW / 2, pil1Y + 18, 30, 20, 160, false, 18));

  const pil2X = bedX + bedW - 22 - pilW;
  const pil2Y = 435;
  segments.push(...roundedRect(pil2X, pil2Y, pilW, pilH, 12, false, 16));
  segments.push(...arc(pil2X + pilW / 2, pil2Y + 18, 30, 20, 160, false, 18));

  // 2. Bedside Lamp & Nightstand (Left: x=125 to 215)
  const nsX = 125;
  const nsW = 85;
  const nsTopY = 510;
  const nsH = 640 - nsTopY;

  segments.push(...rect(nsX, nsTopY, nsW, nsH, false));
  segments.push(...line(nsX, nsTopY + 45, nsX + nsW, nsTopY + 45, false));
  segments.push(...rect(nsX + nsW / 2 - 12, nsTopY + 20, 24, 6, false));
  segments.push(...rect(nsX + nsW / 2 - 12, nsTopY + 68, 24, 6, false));

  // Bedside Lamp
  const lampBaseX = nsX + nsW / 2;
  const lampBaseY = nsTopY;

  segments.push(...rect(lampBaseX - 22, lampBaseY - 8, 44, 8, false));
  segments.push(...line(lampBaseX, lampBaseY - 8, lampBaseX, lampBaseY - 100, false));

  // Lamp shade in ACCENT
  const shadeBottomY = lampBaseY - 100;
  const shadeTopY = shadeBottomY - 60;
  const shadeBottomW = 68;
  const shadeTopW = 40;

  segments.push(
    ...polyline(
      [
        [lampBaseX - shadeBottomW / 2, shadeBottomY],
        [lampBaseX - shadeTopW / 2, shadeTopY],
        [lampBaseX + shadeTopW / 2, shadeTopY],
        [lampBaseX + shadeBottomW / 2, shadeBottomY],
      ],
      true,
      true
    )
  );

  // Lamp finial
  segments.push(...circle(lampBaseX, shadeTopY - 6, 4, true, 16));

  // Lamp warm ambient light rays in ACCENT
  segments.push(...line(lampBaseX - shadeBottomW / 2 - 8, shadeBottomY + 12, lampBaseX - shadeBottomW / 2 - 24, shadeBottomY + 28, true));
  segments.push(...line(lampBaseX + shadeBottomW / 2 + 8, shadeBottomY + 12, lampBaseX + shadeBottomW / 2 + 24, shadeBottomY + 28, true));
  segments.push(...line(lampBaseX - 18, shadeBottomY + 10, lampBaseX - 28, shadeBottomY + 30, true));
  segments.push(...line(lampBaseX + 18, shadeBottomY + 10, lampBaseX + 28, shadeBottomY + 30, true));

  // 3. Tall Window with Curtains (Right: x=590 to 705)
  const winX = 590;
  const winW = 110;
  const winTopY = 190;
  const winH = 400;

  segments.push(...rect(winX, winTopY, winW, winH, false));
  segments.push(...rect(winX + 6, winTopY + 6, winW - 12, winH - 12, false));
  segments.push(...line(winX + 6, winTopY + winH * 0.35, winX + winW - 6, winTopY + winH * 0.35, false));
  segments.push(...line(winX + winW / 2, winTopY + winH * 0.35, winX + winW / 2, winTopY + winH - 6, false));

  // Curtain rod across top
  const rodY = winTopY - 20;
  segments.push(...line(winX - 18, rodY, winX + winW + 18, rodY, false));
  segments.push(...circle(winX - 22, rodY, 5, false, 16));
  segments.push(...circle(winX + winW + 22, rodY, 5, false, 16));

  // Left draped curtain
  segments.push(
    ...polyline(
      [
        [winX - 14, rodY],
        [winX + 18, rodY],
        [winX + 26, winTopY + winH * 0.5],
        [winX + 20, winTopY + winH + 15],
        [winX - 14, winTopY + winH + 15],
      ],
      false,
      true
    )
  );
  segments.push(...line(winX - 4, rodY, winX, winTopY + winH + 15, false));
  segments.push(...line(winX + 7, rodY, winX + 10, winTopY + winH + 15, false));

  // Right draped curtain
  segments.push(
    ...polyline(
      [
        [winX + winW - 18, rodY],
        [winX + winW + 14, rodY],
        [winX + winW + 14, winTopY + winH + 15],
        [winX + winW - 20, winTopY + winH + 15],
        [winX + winW - 26, winTopY + winH * 0.5],
      ],
      false,
      true
    )
  );
  segments.push(...line(winX + winW - 7, rodY, winX + winW - 10, winTopY + winH + 15, false));
  segments.push(...line(winX + winW + 4, rodY, winX + winW, winTopY + winH + 15, false));

  return segments;
};
