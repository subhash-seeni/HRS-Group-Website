import { Segment } from '../types';
import {
  line,
  rect,
  roundedRect,
  circle,
  arc,
  ellipse,
  polyline,
} from '../primitives';

export const drawMasalas = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // 1. Tall Jar (Haldi / Turmeric, Left: x=140 to 225, top lid at y=260)
  const j1X = 140;
  const j1W = 85;
  const j1BaseY = 640;
  const j1ShoulderY = 320;
  const j1NeckY = 285;
  const j1NeckW = 56;

  // Jar body outline
  segments.push(...line(j1X, j1BaseY, j1X, j1ShoulderY, false));
  segments.push(...line(j1X + j1W, j1BaseY, j1X + j1W, j1ShoulderY, false));
  segments.push(...line(j1X, j1BaseY, j1X + j1W, j1BaseY, false));

  // Shoulders curving into neck
  segments.push(
    ...polyline(
      [
        [j1X, j1ShoulderY],
        [j1X + (j1W - j1NeckW) / 2, j1NeckY],
        [j1X + (j1W - j1NeckW) / 2, j1NeckY - 8],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [j1X + j1W, j1ShoulderY],
        [j1X + j1W - (j1W - j1NeckW) / 2, j1NeckY],
        [j1X + j1W - (j1W - j1NeckW) / 2, j1NeckY - 8],
      ],
      false
    )
  );

  // Jar 1 Lid (ACCENT!)
  const j1LidW = j1NeckW + 12;
  const j1LidX = j1X + (j1W - j1LidW) / 2;
  const j1LidY = j1NeckY - 26;
  segments.push(...rect(j1LidX, j1LidY, j1LidW, 18, true));
  segments.push(...line(j1LidX - 2, j1LidY + 18, j1LidX + j1LidW + 2, j1LidY + 18, true));
  segments.push(...line(j1LidX + 4, j1LidY + 9, j1LidX + j1LidW - 4, j1LidY + 9, true));

  // Jar 1 Label rectangle (Accent outline)
  segments.push(...rect(j1X + 12, 380, j1W - 24, 110, true));
  segments.push(...rect(j1X + 16, 384, j1W - 32, 102, false));
  segments.push(...line(j1X + 24, 415, j1X + j1W - 24, 415, false));
  segments.push(...line(j1X + 28, 430, j1X + j1W - 28, 430, false));
  segments.push(...line(j1X + 32, 445, j1X + j1W - 32, 445, false));

  // Fill level
  segments.push(...line(j1X + 6, 345, j1X + j1W - 6, 345, false));

  // 2. Medium Jar (Center-Left: x=245 to 335, top lid at y=330)
  const j2X = 245;
  const j2W = 90;
  const j2BaseY = 640;
  const j2ShoulderY = 380;
  const j2NeckY = 350;
  const j2NeckW = 60;

  segments.push(...line(j2X, j2BaseY, j2X, j2ShoulderY, false));
  segments.push(...line(j2X + j2W, j2BaseY, j2X + j2W, j2ShoulderY, false));
  segments.push(
    ...polyline(
      [
        [j2X, j2ShoulderY],
        [j2X + (j2W - j2NeckW) / 2, j2NeckY],
        [j2X + (j2W - j2NeckW) / 2, j2NeckY - 6],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [j2X + j2W, j2ShoulderY],
        [j2X + j2W - (j2W - j2NeckW) / 2, j2NeckY],
        [j2X + j2W - (j2W - j2NeckW) / 2, j2NeckY - 6],
      ],
      false
    )
  );

  // Jar 2 Lid (ACCENT!)
  const j2LidW = j2NeckW + 10;
  const j2LidX = j2X + (j2W - j2LidW) / 2;
  const j2LidY = j2NeckY - 24;
  segments.push(...rect(j2LidX, j2LidY, j2LidW, 18, true));
  segments.push(...line(j2LidX - 2, j2LidY + 18, j2LidX + j2LidW + 2, j2LidY + 18, true));
  segments.push(...line(j2LidX + 4, j2LidY + 9, j2LidX + j2LidW - 4, j2LidY + 9, true));

  // Jar 2 Label rectangle (Accent outline)
  segments.push(...rect(j2X + 12, 425, j2W - 24, 95, true));
  segments.push(...rect(j2X + 16, 429, j2W - 32, 87, false));
  segments.push(...line(j2X + 24, 455, j2X + j2W - 24, 455, false));
  segments.push(...line(j2X + 28, 470, j2X + j2W - 28, 470, false));

  // Fill level
  segments.push(...line(j2X + 6, 400, j2X + j2W - 6, 400, false));

  // 3. Short Wide Jar (Center: x=355 to 455, top lid at y=415)
  const j3X = 355;
  const j3W = 100;
  const j3BaseY = 640;
  const j3ShoulderY = 460;
  const j3NeckY = 435;
  const j3NeckW = 74;

  segments.push(...line(j3X, j3BaseY, j3X, j3ShoulderY, false));
  segments.push(...line(j3X + j3W, j3BaseY, j3X + j3W, j3ShoulderY, false));
  segments.push(
    ...polyline(
      [
        [j3X, j3ShoulderY],
        [j3X + (j3W - j3NeckW) / 2, j3NeckY],
        [j3X + (j3W - j3NeckW) / 2, j3NeckY - 6],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [j3X + j3W, j3ShoulderY],
        [j3X + j3W - (j3W - j3NeckW) / 2, j3NeckY],
        [j3X + j3W - (j3W - j3NeckW) / 2, j3NeckY - 6],
      ],
      false
    )
  );

  // Jar 3 Lid (ACCENT!)
  const j3LidW = j3NeckW + 10;
  const j3LidX = j3X + (j3W - j3LidW) / 2;
  const j3LidY = j3NeckY - 22;
  segments.push(...rect(j3LidX, j3LidY, j3LidW, 16, true));
  segments.push(...line(j3LidX - 2, j3LidY + 16, j3LidX + j3LidW + 2, j3LidY + 16, true));
  segments.push(...line(j3LidX + 4, j3LidY + 8, j3LidX + j3LidW - 4, j3LidY + 8, true));

  // Jar 3 Label
  segments.push(...rect(j3X + 14, 490, j3W - 28, 80, true));
  segments.push(...rect(j3X + 18, 494, j3W - 36, 72, false));
  segments.push(...circle(j3X + j3W / 2, 530, 14, false, 18));

  // 4. Mortar & Pestle outline (Right-center: x=475 to 575)
  const mX = 475;
  const mW = 95;
  const mBaseW = 60;
  const mRimY = 530;
  const mBaseY = 640;

  // Mortar foot pedestal
  segments.push(...rect(mX + (mW - mBaseW) / 2, mBaseY - 14, mBaseW, 14, false));

  // Mortar flared bowl body
  segments.push(
    ...polyline(
      [
        [mX + (mW - mBaseW) / 2, mBaseY - 14],
        [mX + 6, 570],
        [mX, mRimY + 8],
        [mX + 4, mRimY],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [mX + mW - (mW - mBaseW) / 2, mBaseY - 14],
        [mX + mW - 6, 570],
        [mX + mW, mRimY + 8],
        [mX + mW - 4, mRimY],
      ],
      false
    )
  );
  // Rim ellipse (stepDeg = 18)
  segments.push(...ellipse(mX + mW / 2, mRimY, mW / 2 - 4, 10, false, 18));
  segments.push(...ellipse(mX + mW / 2, mRimY, mW / 2 - 12, 7, false, 18));

  // Pestle resting diagonally in the mortar
  segments.push(
    ...polyline(
      [
        [485, 555],
        [448, 420],
        [464, 415],
        [501, 550],
      ],
      false
    )
  );
  // Rounded top of pestle
  segments.push(...arc(456, 417, 8, 170, 350, false, 20));

  // 5. Small bowl with a spoon (x=585 to 665)
  const bX = 585;
  const bW = 80;
  const bRimY = 570;
  const bBaseY = 640;

  segments.push(...line(bX + 18, bBaseY, bX + bW - 18, bBaseY, false));
  segments.push(
    ...polyline(
      [
        [bX + 18, bBaseY],
        [bX + 4, 605],
        [bX, bRimY],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [bX + bW - 18, bBaseY],
        [bX + bW - 4, 605],
        [bX + bW, bRimY],
      ],
      false
    )
  );
  segments.push(...ellipse(bX + bW / 2, bRimY, bW / 2, 8, false, 18));

  // Spoon in bowl
  segments.push(
    ...polyline(
      [
        [bX + 30, 580],
        [bX + 68, 510],
        [bX + 74, 513],
        [bX + 36, 582],
      ],
      false
    )
  );
  segments.push(...arc(bX + 71, 511, 4, 190, 370, false, 24));

  // 6. Two Cinnamon Sticks
  const cs1X = 675;
  const cs1TopX = 690;
  const cs1TopY = 475;
  segments.push(...line(cs1X, 640, cs1TopX, cs1TopY, false));
  segments.push(...line(cs1X + 12, 640, cs1TopX + 12, cs1TopY, false));
  segments.push(...ellipse(cs1TopX + 6, cs1TopY, 6, 3, false, 20));

  const cs2X = 692;
  const cs2TopX = 708;
  const cs2TopY = 490;
  segments.push(...line(cs2X, 640, cs2TopX, cs2TopY, false));
  segments.push(...line(cs2X + 11, 640, cs2TopX + 11, cs2TopY, false));
  segments.push(...ellipse(cs2TopX + 5.5, cs2TopY, 5.5, 3, false, 20));

  return segments;
};
