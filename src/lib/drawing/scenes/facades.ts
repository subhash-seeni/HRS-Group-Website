import { Segment } from '../types';
import {
  line,
  rect,
  grid,
  polyline,
  dimensionLine,
} from '../primitives';

export const drawFacades = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // Foundation plinth beam & footing plates
  segments.push(...rect(170, 618, 460, 22, false));
  segments.push(...line(150, 640, 650, 640, false));

  // Base brackets anchoring mullions to foundation
  // 6 mullions: 195, 275, 355, 435, 515, 595
  const mullions = [195, 275, 355, 435, 515, 595];
  mullions.forEach((x) => {
    // Triangular gusset plate
    segments.push(
      ...polyline(
        [
          [x - 14, 640],
          [x - 6, 618],
          [x + 6, 618],
          [x + 14, 640],
        ],
        false
      )
    );
    // Center web
    segments.push(...line(x, 618, x, 640, false));
    // Anchor bolt ticks
    segments.push(...line(x - 10, 634, x - 5, 634, false));
    segments.push(...line(x + 5, 634, x + 10, 634, false));
  });

  // Main curtain wall facade: 5 columns x 6 floors
  const facadeX = 195;
  const facadeY = 160;
  const facadeW = 400;
  const facadeH = 458;

  // Outer primary structural unitised frame
  segments.push(...rect(facadeX, facadeY, facadeW, facadeH, false));
  segments.push(...rect(facadeX + 4, facadeY + 4, facadeW - 8, facadeH - 8, false));

  // Mullions (vertical structural extrusions with dual lines)
  const colW = facadeW / 5; // 80
  for (let c = 1; c < 5; c++) {
    const mx = facadeX + c * colW;
    segments.push(...line(mx - 3, facadeY, mx - 3, facadeY + facadeH, false));
    segments.push(...line(mx + 3, facadeY, mx + 3, facadeY + facadeH, false));
  }

  // Transoms (horizontal structural extrusions with dual lines)
  const floorH = facadeH / 6; // ~76.3
  for (let r = 1; r < 6; r++) {
    const ty = facadeY + r * floorH;
    segments.push(...line(facadeX, ty - 2, facadeX + facadeW, ty - 2, false));
    segments.push(...line(facadeX, ty + 2, facadeX + facadeW, ty + 2, false));
  }

  // Parapet coping & crown cornice
  segments.push(...rect(180, 140, 430, 20, false));
  segments.push(...line(170, 140, 630, 140, false)); // Drip edge
  segments.push(...line(185, 148, 615, 148, false));

  // Roof maintenance davit / crane arm
  segments.push(
    ...polyline(
      [
        [240, 140],
        [240, 95],
        [320, 95],
      ],
      false
    )
  );
  segments.push(...line(240, 115, 260, 95, false));
  segments.push(...line(315, 95, 315, 110, false));

  // Diagonal glare lines on selected vision glass panes
  // Pane (col 0, row 0)
  segments.push(...line(205, 220, 245, 175, false));
  segments.push(...line(220, 225, 260, 180, false));

  // Pane (col 3, row 1)
  segments.push(...line(445, 300, 485, 255, false));
  segments.push(...line(460, 305, 500, 260, false));

  // Pane (col 1, row 3)
  segments.push(...line(285, 450, 325, 405, false));
  segments.push(...line(300, 455, 340, 410, false));

  // Pane (col 4, row 4)
  segments.push(...line(525, 530, 565, 485, false));
  segments.push(...line(540, 535, 580, 490, false));

  // Pane (col 0, row 5)
  segments.push(...line(205, 605, 245, 560, false));
  segments.push(...line(220, 610, 260, 565, false));

  // Open casement window on 3rd floor, 3rd column (x: 355 to 435, y: 312 to 388)
  // Window projects outward in perspective, highlighted in accent color (~30 segments)
  const winBaseX = 358;
  const winBaseY = 315;
  const winW = 74;
  const winH = 71;

  // Inner opening frame
  segments.push(...rect(winBaseX, winBaseY, winW, winH, false));

  // Projecting casement sash (swung outward to the right)
  const projDx = 26;
  const projDy = -12;
  const sashX = winBaseX + projDx;
  const sashY = winBaseY + projDy;
  const sashW = winW * 0.85;

  // Outer projecting frame in ACCENT
  segments.push(...line(winBaseX, winBaseY, sashX, sashY, true));
  segments.push(...line(sashX, sashY, sashX + sashW, sashY, true));
  segments.push(...line(sashX + sashW, sashY, winBaseX + winW, winBaseY, true));
  segments.push(...line(winBaseX + winW, winBaseY, winBaseX, winBaseY, true));

  segments.push(...line(winBaseX, winBaseY + winH, sashX, sashY + winH, true));
  segments.push(...line(sashX, sashY + winH, sashX + sashW, sashY + winH, true));
  segments.push(...line(sashX + sashW, sashY + winH, winBaseX + winW, winBaseY + winH, true));
  segments.push(...line(winBaseX + winW, winBaseY + winH, winBaseX, winBaseY + winH, true));

  // Casement vertical frame edges in ACCENT
  segments.push(...line(sashX, sashY, sashX, sashY + winH, true));
  segments.push(...line(sashX + sashW, sashY, sashX + sashW, sashY + winH, true));

  // Inner sash glass rim in ACCENT
  segments.push(...rect(sashX + 5, sashY + 5, sashW - 10, winH - 10, true));

  // Friction stay scissor hinges & window arm in ACCENT
  segments.push(...line(winBaseX, winBaseY, sashX, sashY, true));
  segments.push(...line(winBaseX + winW * 0.4, winBaseY, sashX + winW * 0.35, sashY, true));
  segments.push(...line(winBaseX, winBaseY + winH, sashX, sashY + winH, true));
  segments.push(...line(winBaseX + winW * 0.4, winBaseY + winH, sashX + winW * 0.35, sashY + winH, true));
  // Central locking handle in ACCENT
  segments.push(...line(sashX + 6, sashY + winH * 0.5, sashX + 16, sashY + winH * 0.5, true));
  segments.push(...line(sashX + 16, sashY + winH * 0.5, sashX + 16, sashY + winH * 0.5 + 8, true));

  // Architectural dimension line on the left
  segments.push(...dimensionLine(140, 140, 140, 640, 14, false));
  segments.push(...line(140, 140, 170, 140, false));
  segments.push(...line(140, 640, 170, 640, false));
  // Dimension tick intermediate marks
  segments.push(...line(135, 160, 145, 160, false));
  segments.push(...line(135, 618, 145, 618, false));

  // Additional spandrel panel shadow lines (bringing into 135 total, 15% accent)
  segments.push(...line(facadeX + 8, facadeY + floorH - 8, facadeX + facadeW - 8, facadeY + floorH - 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 2 - 8, facadeX + facadeW - 8, facadeY + floorH * 2 - 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 4 - 8, facadeX + facadeW - 8, facadeY + floorH * 4 - 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 5 - 8, facadeX + facadeW - 8, facadeY + floorH * 5 - 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH + 8, facadeX + facadeW - 8, facadeY + floorH + 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 2 + 8, facadeX + facadeW - 8, facadeY + floorH * 2 + 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 4 + 8, facadeX + facadeW - 8, facadeY + floorH * 4 + 8, false));
  segments.push(...line(facadeX + 8, facadeY + floorH * 5 + 8, facadeX + facadeW - 8, facadeY + floorH * 5 + 8, false));
  segments.push(...line(200, 618, 590, 618, false));
  segments.push(...line(200, 624, 590, 624, false));

  return segments;
};
