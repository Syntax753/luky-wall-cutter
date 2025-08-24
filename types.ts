export enum ShapeType {
  CUBE = 'cube',
  L_SHAPE = 'l-shape',
  T_SHAPE = 't-shape',
}

export interface CubeDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface LShapeDimensions {
  mainWidth: number;
  mainHeight: number;
  armWidth: number;
  armHeight: number;
  depth: number;
}

export interface TShapeDimensions {
  topWidth: number;
  topHeight: number;
  stemWidth: number;
  stemHeight: number;
  depth: number;
}

export type Dimensions = CubeDimensions | LShapeDimensions | TShapeDimensions;

export type DimensionKey = keyof CubeDimensions | keyof LShapeDimensions | keyof TShapeDimensions;
