export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent: boolean;
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export type SceneFunction = () => Segment[];

export interface SceneDefinition {
  id: string;
  word: string;
  title: string;
  description: string;
  color: string;
  draw: SceneFunction;
}
