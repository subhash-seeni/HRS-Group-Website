import { Segment } from '../types';
import {
  line,
  rect,
  circle,
  arc,
  ellipse,
  polyline,
} from '../primitives';

export const drawBrands = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // 1. Stack of three packs in oblique projection (Left: x=140 to 305)
  const bX = 140;
  const bW = 130;
  const bH = 46;
  const obX = 26;
  const obY = -18;

  // Box 3 (Bottom): y=594 to 640
  segments.push(...rect(bX, 594, bW, bH, false));
  segments.push(...line(bX + bW, 640, bX + bW + obX, 640 + obY, false));
  segments.push(...line(bX + bW, 594, bX + bW + obX, 594 + obY, false));
  segments.push(...line(bX + bW + obX, 640 + obY, bX + bW + obX, 594 + obY, false));
  segments.push(...line(bX + 10, 617, bX + bW - 10, 617, false));

  // Box 2 (Middle): y=548 to 594
  segments.push(...rect(bX, 548, bW, bH, false));
  segments.push(...line(bX + bW, 548, bX + bW + obX, 548 + obY, false));
  segments.push(...line(bX + bW + obX, 594 + obY, bX + bW + obX, 548 + obY, false));
  segments.push(...line(bX + 10, 571, bX + bW - 10, 571, false));

  // Box 1 (Top): y=502 to 548
  segments.push(...rect(bX, 502, bW, bH, false));
  segments.push(...line(bX + bW, 502, bX + bW + obX, 502 + obY, false));
  segments.push(...line(bX + bW + obX, 548 + obY, bX + bW + obX, 502 + obY, false));
  segments.push(
    ...polyline(
      [
        [bX, 502],
        [bX + obX, 502 + obY],
        [bX + bW + obX, 502 + obY],
        [bX + bW, 502],
      ],
      false
    )
  );

  // 2. Premium Bottle (Center: x=315 to 405, top at y=285)
  const botX = 320;
  const botW = 80;
  const botBaseY = 640;
  const botShoulderY = 410;
  const neckW = 34;
  const neckY = 340;

  segments.push(...line(botX + 6, botBaseY, botX + botW - 6, botBaseY, false));
  segments.push(...line(botX, botBaseY - 6, botX, botShoulderY, false));
  segments.push(...line(botX + botW, botBaseY - 6, botX + botW, botShoulderY, false));
  segments.push(...arc(botX + 6, botBaseY - 6, 6, 90, 180, false, 20));
  segments.push(...arc(botX + botW - 6, botBaseY - 6, 6, 0, 90, false, 20));

  // Shoulders curving into neck (stepDeg = 18)
  segments.push(
    ...arc(botX + (botW - neckW) / 2, botShoulderY, (botW - neckW) / 2, 90, 180, false, 18)
  );
  segments.push(
    ...arc(botX + botW - (botW - neckW) / 2, botShoulderY, (botW - neckW) / 2, 0, 90, false, 18)
  );

  // Neck
  const neckLeftX = botX + (botW - neckW) / 2;
  segments.push(...line(neckLeftX, botShoulderY - (botW - neckW) / 2, neckLeftX, neckY, false));
  segments.push(
    ...line(neckLeftX + neckW, botShoulderY - (botW - neckW) / 2, neckLeftX + neckW, neckY, false)
  );
  segments.push(...rect(neckLeftX - 3, neckY, neckW + 6, 6, false));

  // Bottle Cap
  const capW = neckW + 2;
  const capH = 32;
  const capY = neckY - capH;
  segments.push(...rect(neckLeftX - 1, capY, capW, capH, false));
  segments.push(...line(neckLeftX + 6, capY + 4, neckLeftX + 6, capY + capH - 4, false));
  segments.push(...line(neckLeftX + 13, capY + 4, neckLeftX + 13, capY + capH - 4, false));
  segments.push(...line(neckLeftX + 20, capY + 4, neckLeftX + 20, capY + capH - 4, false));
  segments.push(...line(neckLeftX + 27, capY + 4, neckLeftX + 27, capY + capH - 4, false));

  // Bottle Label in clean rect
  const lblY = 445;
  const lblH = 110;
  segments.push(...rect(botX + 8, lblY, botW - 16, lblH, false));
  segments.push(...rect(botX + 12, lblY + 4, botW - 24, lblH - 8, false));
  segments.push(...line(botX + 20, lblY + 30, botX + botW - 20, lblY + 30, false));
  segments.push(...line(botX + 24, lblY + 45, botX + botW - 24, lblY + 45, false));

  // 3. Snack Pouch with Zigzag Top Seal (Right-center: x=430 to 565)
  const pX = 435;
  const pW = 125;
  const pBaseY = 640;
  const pTopY = 325;

  segments.push(...line(pX + 15, pBaseY, pX + pW - 15, pBaseY, false));
  segments.push(...arc(pX + pW / 2, pBaseY - 12, 45, 20, 160, false, 18));

  segments.push(
    ...polyline(
      [
        [pX + 15, pBaseY],
        [pX + 4, 520],
        [pX, 390],
        [pX + 8, pTopY + 28],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [pX + pW - 15, pBaseY],
        [pX + pW - 4, 520],
        [pX + pW, 390],
        [pX + pW - 8, pTopY + 28],
      ],
      false
    )
  );

  // Top seal strip
  const sealLeftX = pX + 8;
  const sealW = pW - 16;
  segments.push(...line(sealLeftX, pTopY + 28, sealLeftX + sealW, pTopY + 28, false));

  // Zigzag serrated cut line at top of pouch (ACCENT!)
  // 9 teeth = 18 segments
  const teethCount = 9;
  const toothW = sealW / teethCount;
  const toothH = 10;
  const zigzagPoints: [number, number][] = [];
  zigzagPoints.push([sealLeftX, pTopY + toothH]);
  for (let i = 0; i < teethCount; i++) {
    const toothX = sealLeftX + i * toothW;
    zigzagPoints.push([toothX + toothW / 2, pTopY]);
    zigzagPoints.push([toothX + toothW, pTopY + toothH]);
  }
  segments.push(...polyline(zigzagPoints, true, false));

  // Tear notches
  segments.push(
    ...polyline(
      [
        [sealLeftX - 1, pTopY + 20],
        [sealLeftX + 5, pTopY + 22],
        [sealLeftX - 1, pTopY + 24],
      ],
      false
    )
  );

  // Center window on pouch
  segments.push(...ellipse(pX + pW / 2, 475, 36, 44, false, 18));

  // 4. Price Tag with String Loop (Right: x=595 to 705, y=370 to 530)
  const tagOriginX = 605;
  const tagOriginY = 410;
  const tagW = 75;
  const tagH = 120;
  const chamfer = 18;

  // Luggage tag contour
  segments.push(
    ...polyline(
      [
        [tagOriginX + chamfer, tagOriginY],
        [tagOriginX + tagW - chamfer, tagOriginY],
        [tagOriginX + tagW, tagOriginY + chamfer],
        [tagOriginX + tagW, tagOriginY + tagH],
        [tagOriginX, tagOriginY + tagH],
        [tagOriginX, tagOriginY + chamfer],
      ],
      false,
      true
    )
  );

  // Eyelet hole
  const eyeletX = tagOriginX + tagW / 2;
  const eyeletY = tagOriginY + 20;
  segments.push(...circle(eyeletX, eyeletY, 6, false, 18));

  // String loop coming out of eyelet
  segments.push(
    ...polyline(
      [
        [eyeletX, eyeletY - 6],
        [eyeletX - 8, 360],
        [eyeletX - 35, 315],
        [eyeletX - 60, 310],
        [eyeletX - 80, 330],
        [eyeletX - 70, 360],
        [eyeletX - 30, 375],
        [eyeletX, eyeletY - 6],
      ],
      false
    )
  );

  // Price tag decorative barcode / lines in ACCENT (~12 segments)
  segments.push(...line(tagOriginX + 14, tagOriginY + 50, tagOriginX + tagW - 14, tagOriginY + 50, true));
  segments.push(...line(tagOriginX + 14, tagOriginY + 68, tagOriginX + tagW - 14, tagOriginY + 68, true));
  segments.push(...line(tagOriginX + 18, tagOriginY + 84, tagOriginX + tagW - 18, tagOriginY + 84, true));
  for (let s = 0; s < 6; s++) {
    const sx = tagOriginX + 18 + s * 7;
    segments.push(...line(sx, tagOriginY + 95, sx, tagOriginY + 110, true));
  }

  return segments;
};
