
import { ShapeType, CubeDimensions, LShapeDimensions, TShapeDimensions } from './types';

export const DEFAULT_DIMENSIONS: {
  [key in ShapeType]: CubeDimensions | LShapeDimensions | TShapeDimensions;
} = {
  [ShapeType.CUBE]: {
    width: 50,
    height: 50,
    depth: 50,
  },
  [ShapeType.L_SHAPE]: {
    mainWidth: 40,
    mainHeight: 100,
    armWidth: 100,
    armHeight: 40,
    depth: 40,
  },
  [ShapeType.T_SHAPE]: {
    topWidth: 120,
    topHeight: 40,
    stemWidth: 40,
    stemHeight: 80,
    depth: 40,
  },
};
