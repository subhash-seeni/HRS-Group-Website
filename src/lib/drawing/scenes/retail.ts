import { Segment } from '../types';
import {
  line,
  rect,
  circle,
  arc,
  polyline,
} from '../primitives';

export const drawRetail = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // Storefront base plinth
  segments.push(...rect(150, 615, 500, 25, false));

  // 1. Storefront Building Frame & Signboard Fascia (Top: y=160 to 240)
  const storeX = 160;
  const storeW = 480;
  const storeH = 455;
  segments.push(...rect(storeX, 160, storeW, storeH, false));

  // Fascia Signboard Box at Top
  segments.push(...rect(150, 160, 500, 75, false));
  segments.push(...rect(160, 170, 480, 55, false));
  segments.push(...line(180, 197, 620, 197, false));
  // Central emblem circle (stepDeg = 20)
  segments.push(...circle(400, 197, 16, true, 20));

  // 2. Scalloped Striped Awning (y=235 to 330)
  const awnX = 145;
  const awnW = 510;
  const awnTopY = 235;
  const awnDropY = 315;
  const valanceH = 18;

  // Awning top bar
  segments.push(...line(awnX - 10, awnTopY, awnX + awnW + 10, awnTopY, false));

  // Awning sloped front face
  segments.push(
    ...polyline(
      [
        [awnX, awnDropY],
        [awnX + 15, awnTopY],
        [awnX + awnW - 15, awnTopY],
        [awnX + awnW, awnDropY],
      ],
      false
    )
  );

  // Awning Side triangular panels
  segments.push(...line(awnX, awnDropY + valanceH, awnX + 15, awnTopY, false));
  segments.push(...line(awnX + awnW, awnDropY + valanceH, awnX + awnW - 15, awnTopY, false));

  // Valance horizontal baseline
  segments.push(...line(awnX, awnDropY, awnX + awnW, awnDropY, false));

  // 6 Scallops along the bottom valance edge (scW = 85, scR = 42.5)
  const numScallops = 6;
  const scW = awnW / numScallops; // 85
  const scR = scW / 2;

  for (let s = 0; s < numScallops; s++) {
    const scX = awnX + s * scW;
    const isAccentStripe = s % 2 === 1;

    // Scalloped bottom arc
    segments.push(...arc(scX + scR, awnDropY, scR, 0, 180, false, 24));

    // Awning roof stripe divider line
    const topStripeX = awnX + 15 + s * ((awnW - 30) / numScallops);
    segments.push(...line(topStripeX, awnTopY, scX, awnDropY, isAccentStripe));

    if (isAccentStripe) {
      // Accent stripe vertical centerline down valance
      segments.push(...line(scX + scR, awnDropY, scX + scR, awnDropY + scR, true));
    }
  }

  // 3. Entrance Door (Left: x=180 to 285, y=345 to 615)
  const doorX = 180;
  const doorW = 105;
  const doorTopY = 345;
  const doorH = 615 - doorTopY;

  segments.push(...rect(doorX, doorTopY, doorW, doorH, false));
  segments.push(...rect(doorX + 5, doorTopY + 5, doorW - 10, 45, false));

  const leafTopY = doorTopY + 55;
  const leafH = doorH - 55;
  segments.push(...rect(doorX + 5, leafTopY, doorW - 10, leafH, false));
  segments.push(...rect(doorX + 14, leafTopY + 12, doorW - 28, leafH * 0.58, false));

  // Door vertical pull handle (ACCENT!)
  segments.push(...line(doorX + doorW - 22, leafTopY + leafH * 0.35, doorX + doorW - 22, leafTopY + leafH * 0.55, true));
  segments.push(...rect(doorX + doorW - 25, leafTopY + leafH * 0.35 - 3, 6, 6, true));
  segments.push(...rect(doorX + doorW - 25, leafTopY + leafH * 0.55 - 3, 6, 6, true));

  // Kickplate
  segments.push(...rect(doorX + 14, leafTopY + leafH - 35, doorW - 28, 25, false));

  // 4. Large Window Display with Shelves (Right: x=305 to 620, y=345 to 615)
  const winX = 305;
  const winW = 315;
  const winTopY = 345;
  const winH = 615 - winTopY;

  segments.push(...rect(winX, winTopY, winW, winH, false));
  segments.push(...rect(winX + 6, winTopY + 6, winW - 12, winH - 12, false));
  segments.push(...line(winX + winW / 2, winTopY + 6, winX + winW / 2, winTopY + winH - 6, false));

  // Interior Display Shelves (2 display tiers for clarity)
  const shelfY1 = winTopY + 105;
  const shelfY2 = winTopY + 195;

  const drawShelf = (sy: number) => {
    // Shelf board
    segments.push(...line(winX + 12, sy, winX + winW - 12, sy, false));
    segments.push(...line(winX + 12, sy + 6, winX + winW - 12, sy + 6, false));
    segments.push(...line(winX + 12, sy, winX + 12, sy + 6, false));
    segments.push(...line(winX + winW - 12, sy, winX + winW - 12, sy + 6, false));

    // Products on shelf
    segments.push(...rect(winX + 25, sy - 34, 22, 34, false));
    segments.push(...rect(winX + 55, sy - 42, 26, 42, false));
    segments.push(...rect(winX + 88, sy - 30, 20, 30, false));
    segments.push(...circle(winX + 124, sy - 16, 14, false, 20));

    segments.push(...rect(winX + winW / 2 + 20, sy - 40, 28, 40, false));
    segments.push(...circle(winX + winW / 2 + 65, sy - 16, 14, false, 20));
    segments.push(...rect(winX + winW / 2 + 95, sy - 32, 22, 32, false));
    segments.push(...rect(winX + winW / 2 + 125, sy - 44, 20, 44, false));
  };

  drawShelf(shelfY1);
  drawShelf(shelfY2);

  // 5. Shopping Basket in Front (Foreground Right-Center: x=415 to 520, y=565 to 640)
  const bskX = 415;
  const bskTopY = 575;
  const bskTopW = 105;
  const bskBottomW = 80;
  const bskBottomX = bskX + (bskTopW - bskBottomW) / 2;

  // Basket rim
  segments.push(...rect(bskX, bskTopY, bskTopW, 8, false));

  // Basket trapezoidal wire body
  segments.push(
    ...polyline(
      [
        [bskX + 4, bskTopY + 8],
        [bskBottomX, 640],
        [bskBottomX + bskBottomW, 640],
        [bskX + bskTopW - 4, bskTopY + 8],
      ],
      false
    )
  );

  // Wire mesh grid
  segments.push(...line(bskX + 8, bskTopY + 26, bskX + bskTopW - 8, bskTopY + 26, false));
  segments.push(...line(bskX + 11, bskTopY + 44, bskX + bskTopW - 11, bskTopY + 44, false));

  for (let w = 1; w <= 4; w++) {
    const frac = w / 5;
    const topW = bskX + 4 + frac * (bskTopW - 8);
    const botW = bskBottomX + frac * bskBottomW;
    segments.push(...line(topW, bskTopY + 8, botW, 640, false));
  }

  // Double Arched Wire Handles in ACCENT (stepDeg = 20)
  const handleR = 45;
  segments.push(...arc(bskX + bskTopW / 2, bskTopY, handleR, 190, 350, true, 20));
  segments.push(...arc(bskX + bskTopW / 2 + 6, bskTopY - 4, handleR, 195, 345, true, 20));
  segments.push(...rect(bskX + bskTopW / 2 - 14, bskTopY - handleR - 4, 28, 7, true));

  return segments;
};
