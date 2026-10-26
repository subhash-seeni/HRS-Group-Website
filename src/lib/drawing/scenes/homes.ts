import { Segment } from '../types';
import {
  line,
  rect,
  circle,
  arc,
  polyline,
} from '../primitives';

export const drawHomes = (): Segment[] => {
  const segments: Segment[] = [];

  // Shared ground line at y = 640
  segments.push(...line(80, 640, 720, 640, false));

  // Villa plinth foundation (sitting on ground line)
  segments.push(...rect(160, 618, 350, 22, false));

  // Villa main walls
  const wallX = 175;
  const wallY = 340;
  const wallW = 320;
  const wallH = 278;
  segments.push(...rect(wallX, wallY, wallW, wallH, false));

  // Horizontal floor dividing band / stringcourse
  segments.push(...line(wallX, 470, wallX + wallW, 470, false));
  segments.push(...line(wallX, 476, wallX + wallW, 476, false));

  // Pitched gabled roof
  const roofApexX = 335;
  const roofApexY = 175;
  const eaveLeftX = 145;
  const eaveRightX = 525;
  const eaveY = 340;

  // Outer roof triangle
  segments.push(
    ...polyline(
      [
        [eaveLeftX, eaveY],
        [roofApexX, roofApexY],
        [eaveRightX, eaveY],
      ],
      false
    )
  );

  // Eaves fascia thickness lines
  segments.push(
    ...polyline(
      [
        [eaveLeftX - 10, eaveY + 12],
        [roofApexX, roofApexY - 10],
        [eaveRightX + 10, eaveY + 12],
      ],
      false
    )
  );
  segments.push(...line(eaveLeftX - 10, eaveY + 12, eaveLeftX, eaveY, false));
  segments.push(...line(eaveRightX + 10, eaveY + 12, eaveRightX, eaveY, false));

  // Attic round ocular window (stepDeg = 16 for clean blueprint curve)
  segments.push(...circle(roofApexX, 265, 24, false, 16));
  segments.push(...circle(roofApexX, 265, 18, false, 16));
  segments.push(...line(roofApexX - 18, 265, roofApexX + 18, 265, false));
  segments.push(...line(roofApexX, 247, roofApexX, 283, false));

  // Chimney on left slope
  const chimX = 215;
  const chimW = 40;
  const chimTopY = 140;
  const chimIntersectY = 278;
  segments.push(...line(chimX, chimTopY, chimX, chimIntersectY, false));
  segments.push(...line(chimX + chimW, chimTopY, chimX + chimW, chimIntersectY - 32, false));
  // Chimney cap
  segments.push(...rect(chimX - 6, chimTopY - 14, chimW + 12, 14, false));
  segments.push(...rect(chimX - 2, chimTopY - 22, chimW + 4, 8, false));

  // Chimney smoke wisps (curved arcs, stepDeg = 18)
  segments.push(...arc(chimX + 16, chimTopY - 36, 12, 180, 360, false, 18));
  segments.push(...arc(chimX + 28, chimTopY - 50, 16, 0, 220, false, 18));

  // Four windows with sills and mullions
  const drawWindow = (wx: number, wy: number, ww: number, wh: number) => {
    segments.push(...rect(wx, wy, ww, wh, false));
    segments.push(...rect(wx + 4, wy + 4, ww - 8, wh - 8, false));
    segments.push(...line(wx + ww / 2, wy + 4, wx + ww / 2, wy + wh - 4, false));
    segments.push(...line(wx + 4, wy + wh * 0.45, wx + ww - 4, wy + wh * 0.45, false));
    segments.push(...rect(wx - 5, wy + wh, ww + 10, 8, false));
  };

  drawWindow(205, 375, 68, 75); // Upper left
  drawWindow(395, 375, 68, 75); // Upper right
  drawWindow(205, 495, 68, 85); // Lower left
  drawWindow(395, 495, 68, 85); // Lower right

  // Front door with arched transom and steps (Accent!)
  const doorX = 302;
  const doorY = 485;
  const doorW = 66;
  const doorH = 133;

  // Door outer frame in ACCENT
  segments.push(...rect(doorX, doorY, doorW, doorH, true));
  // Door inner panels in ACCENT
  segments.push(...rect(doorX + 7, doorY + 12, doorW / 2 - 10, doorH * 0.4, true));
  segments.push(...rect(doorX + doorW / 2 + 3, doorY + 12, doorW / 2 - 10, doorH * 0.4, true));
  segments.push(...rect(doorX + 7, doorY + doorH * 0.52, doorW / 2 - 10, doorH * 0.38, true));
  segments.push(...rect(doorX + doorW / 2 + 3, doorY + doorH * 0.52, doorW / 2 - 10, doorH * 0.38, true));
  // Door knob
  segments.push(...line(doorX + doorW - 14, doorY + doorH * 0.52, doorX + doorW - 10, doorY + doorH * 0.52, true));

  // Door canopy overhang in ACCENT
  segments.push(...rect(doorX - 12, doorY - 10, doorW + 24, 10, true));
  segments.push(...line(doorX - 10, doorY, doorX - 2, doorY - 10, true));
  segments.push(...line(doorX + doorW + 10, doorY, doorX + doorW + 2, doorY - 10, true));

  // Steps leading up to the door (3 tiers) in ACCENT
  segments.push(...rect(doorX - 10, 618, doorW + 20, 7, true));
  segments.push(...rect(doorX - 18, 625, doorW + 36, 7, true));
  segments.push(...rect(doorX - 26, 632, doorW + 52, 8, true));

  // Garden tree to the right of the villa
  const treeTrunkX = 625;
  segments.push(...line(treeTrunkX - 7, 640, treeTrunkX - 5, 440, false));
  segments.push(...line(treeTrunkX + 7, 640, treeTrunkX + 5, 440, false));
  segments.push(...line(treeTrunkX - 7, 640, treeTrunkX - 18, 640, false));
  segments.push(...line(treeTrunkX + 7, 640, treeTrunkX + 18, 640, false));
  segments.push(...line(treeTrunkX - 5, 480, treeTrunkX - 35, 420, false));
  segments.push(...line(treeTrunkX + 5, 470, treeTrunkX + 38, 415, false));
  segments.push(...line(treeTrunkX, 440, treeTrunkX, 390, false));

  // Canopy (tuned stepDeg = 14-16 for crisp blueprint silhouette)
  segments.push(...circle(treeTrunkX, 335, 78, false, 14)); // ~26 segments
  segments.push(...arc(treeTrunkX - 45, 360, 48, 120, 310, false, 16));
  segments.push(...arc(treeTrunkX + 45, 360, 48, 230, 60, false, 16));
  segments.push(...arc(treeTrunkX, 275, 44, 180, 360, false, 16));

  return segments;
};
