import { Segment } from '../types';
import {
  line,
  rect,
  circle,
  arc,
  polyline,
} from '../primitives';

export const drawSkills = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // 1. Large Open Book (Base: x=190 to 610, y=475 to 640)
  const spineX = 400;
  const bookBaseY = 640;
  const bookLeftX = 190;
  const bookRightX = 610;
  const spineTopY = 530;

  // Book cover spine at base
  segments.push(...line(bookLeftX, bookBaseY - 6, bookRightX, bookBaseY - 6, false));
  segments.push(...line(bookLeftX, bookBaseY, bookRightX, bookBaseY, false));

  // Left Page Block (Curving open page)
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY],
        [320, 495],
        [220, 510],
        [bookLeftX, 550],
        [bookLeftX, bookBaseY - 6],
        [spineX, bookBaseY - 12],
      ],
      false
    )
  );

  // Left Page interior leaf layers
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY + 8],
        [320, 503],
        [225, 518],
        [bookLeftX + 5, 554],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY + 16],
        [320, 511],
        [230, 526],
        [bookLeftX + 10, 558],
      ],
      false
    )
  );

  // Left Page technical diagram lines
  segments.push(...line(230, 555, 330, 545, false));
  segments.push(...line(230, 570, 340, 560, false));
  segments.push(...line(230, 585, 320, 575, false));
  segments.push(...line(230, 600, 335, 590, false));

  // Right Page Block (Curving open page)
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY],
        [480, 495],
        [580, 510],
        [bookRightX, 550],
        [bookRightX, bookBaseY - 6],
        [spineX, bookBaseY - 12],
      ],
      false
    )
  );

  // Right Page interior leaf layers
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY + 8],
        [480, 503],
        [575, 518],
        [bookRightX - 5, 554],
      ],
      false
    )
  );
  segments.push(
    ...polyline(
      [
        [spineX, spineTopY + 16],
        [480, 511],
        [570, 526],
        [bookRightX - 10, 558],
      ],
      false
    )
  );

  // Right Page text lines
  segments.push(...line(460, 545, 570, 555, false));
  segments.push(...line(455, 560, 570, 570, false));
  segments.push(...line(465, 575, 560, 585, false));
  segments.push(...line(460, 590, 565, 600, false));

  // 2. Set Square (Drafting 30-60-90 Triangle on Left: x=110 to 255, y=320 to 640)
  const sqX = 110;
  const sqY = 320;
  const sqW = 145;
  const sqH = 640 - sqY;

  // Outer triangle
  segments.push(
    ...polyline(
      [
        [sqX, sqY],
        [sqX, sqY + sqH],
        [sqX + sqW, sqY + sqH],
      ],
      false,
      true
    )
  );

  // Inner triangular cutout
  const sqCutX = sqX + 24;
  const sqCutY = sqY + 70;
  const sqCutW = sqW - 48;
  const sqCutH = sqH - 95;
  segments.push(
    ...polyline(
      [
        [sqCutX, sqCutY],
        [sqCutX, sqCutY + sqCutH],
        [sqCutX + sqCutW, sqCutY + sqCutH],
      ],
      false,
      true
    )
  );

  // Measurement tick marks along vertical drafting edge
  for (let t = 0; t <= 12; t++) {
    const ty = sqY + 30 + t * 20;
    const tickLen = t % 2 === 0 ? 12 : 7;
    segments.push(...line(sqX, ty, sqX + tickLen, ty, false));
  }

  // Measurement tick marks along base edge
  for (let t = 1; t <= 6; t++) {
    const tx = sqX + t * 20;
    const tickLen = t % 2 === 0 ? 12 : 7;
    segments.push(...line(tx, sqY + sqH, tx, sqY + sqH - tickLen, false));
  }

  // 3. Technical Hard Hat (Center-Top: x=290 to 510, y=200 to 390)
  const hatCenterX = 400;
  const hatCenterY = 320;
  const hatR = 95;

  // Hard hat main dome (stepDeg = 12 for clean blueprint)
  segments.push(...arc(hatCenterX, hatCenterY, hatR, 180, 360, false, 12));
  segments.push(...arc(hatCenterX, hatCenterY - 4, hatR - 8, 185, 355, false, 14));

  // Hard Hat Brim
  const brimY = hatCenterY + 4;
  const brimW = hatR * 2 + 50;
  segments.push(
    ...polyline(
      [
        [hatCenterX - brimW / 2, brimY],
        [hatCenterX - brimW / 2 + 8, brimY + 14],
        [hatCenterX + brimW / 2 - 8, brimY + 14],
        [hatCenterX + brimW / 2, brimY],
      ],
      false,
      true
    )
  );
  segments.push(
    ...polyline(
      [
        [hatCenterX - brimW / 2 + 8, brimY + 14],
        [hatCenterX - brimW / 2 + 14, brimY + 19],
        [hatCenterX + brimW / 2 - 14, brimY + 19],
        [hatCenterX + brimW / 2 - 8, brimY + 14],
      ],
      false
    )
  );

  // Central reinforcing structural ridge in ACCENT (~18 segments)
  const ridgeTopY = hatCenterY - hatR - 8;
  const ridgeW = 26;
  segments.push(...line(hatCenterX - ridgeW / 2, ridgeTopY + 10, hatCenterX - ridgeW / 2, brimY, true));
  segments.push(...line(hatCenterX + ridgeW / 2, ridgeTopY + 10, hatCenterX + ridgeW / 2, brimY, true));
  segments.push(...arc(hatCenterX, ridgeTopY + 10, ridgeW / 2, 180, 360, true, 20));

  // Hard hat front badge / mount slot in ACCENT
  segments.push(...rect(hatCenterX - 14, brimY - 26, 28, 20, true));
  segments.push(...rect(hatCenterX - 9, brimY - 21, 18, 10, true));

  // 4. Drafting Pencil (Right: Angled drafting pencil from x=550 to 670)
  const p1x = 550;
  const p1y = 320;
  const p2x = 645;
  const p2y = 475;

  const pdx = p2x - p1x;
  const pdy = p2y - p1y;
  const plen = Math.hypot(pdx, pdy);
  const unx = -pdy / plen;
  const uny = pdx / plen;
  const halfPW = 6.5;

  // Pencil hexagonal body
  segments.push(
    ...line(
      p1x + unx * halfPW,
      p1y + uny * halfPW,
      p2x + unx * halfPW,
      p2y + uny * halfPW,
      false
    )
  );
  segments.push(
    ...line(
      p1x - unx * halfPW,
      p1y - uny * halfPW,
      p2x - unx * halfPW,
      p2y - uny * halfPW,
      false
    )
  );
  segments.push(...line(p1x, p1y, p2x, p2y, false));

  // Wood cone & graphite lead tip
  const tipX = p2x + (pdx / plen) * 26;
  const tipY = p2y + (pdy / plen) * 26;
  segments.push(...line(p2x + unx * halfPW, p2y + uny * halfPW, tipX, tipY, false));
  segments.push(...line(p2x - unx * halfPW, p2y - uny * halfPW, tipX, tipY, false));

  const leadStartX = p2x + (pdx / plen) * 16;
  const leadStartY = p2y + (pdy / plen) * 16;
  segments.push(
    ...line(
      leadStartX + unx * 2.5,
      leadStartY + uny * 2.5,
      leadStartX - unx * 2.5,
      leadStartY - uny * 2.5,
      false
    )
  );

  // Eraser ferrule in ACCENT (~8 segments)
  const ferruleLen = 16;
  const ferruleX = p1x - (pdx / plen) * ferruleLen;
  const ferruleY = p1y - (pdy / plen) * ferruleLen;
  segments.push(
    ...polyline(
      [
        [p1x + unx * halfPW, p1y + uny * halfPW],
        [ferruleX + unx * halfPW, ferruleY + uny * halfPW],
        [ferruleX - unx * halfPW, ferruleY - uny * halfPW],
        [p1x - unx * halfPW, p1y - uny * halfPW],
      ],
      true,
      true
    )
  );
  segments.push(
    ...line(
      p1x - (pdx / plen) * 6 + unx * halfPW,
      p1y - (pdy / plen) * 6 + uny * halfPW,
      p1x - (pdx / plen) * 6 - unx * halfPW,
      p1y - (pdy / plen) * 6 - uny * halfPW,
      true
    )
  );

  // Rubber eraser
  const eraserX = ferruleX - (pdx / plen) * 8;
  const eraserY = ferruleY - (pdy / plen) * 8;
  segments.push(
    ...line(
      ferruleX + unx * (halfPW - 1),
      ferruleY + uny * (halfPW - 1),
      eraserX + unx * (halfPW - 1),
      eraserY + uny * (halfPW - 1),
      false
    )
  );
  segments.push(
    ...line(
      ferruleX - unx * (halfPW - 1),
      ferruleY - uny * (halfPW - 1),
      eraserX - unx * (halfPW - 1),
      eraserY - uny * (halfPW - 1),
      false
    )
  );
  // Drafting construction projection lines & compass arc marks
  segments.push(...line(sqX + sqW, sqY + sqH - 30, spineX, spineTopY, false));
  segments.push(...line(sqX + 15, sqY + 15, sqX + 15, sqY + sqH - 15, false));
  segments.push(...line(sqX + 30, sqY + sqH - 15, sqX + sqW - 20, sqY + sqH - 15, false));
  segments.push(...line(hatCenterX - hatR, hatCenterY, hatCenterX + hatR, hatCenterY, false));
  segments.push(...line(hatCenterX, hatCenterY - hatR, hatCenterX, hatCenterY, false));
  segments.push(...circle(hatCenterX, hatCenterY, 3, false, 12));
  segments.push(...line(spineX, spineTopY, spineX, bookBaseY - 12, false));
  segments.push(...line(spineX - 1, spineTopY, spineX - 1, bookBaseY - 12, false));

  return segments;
};
