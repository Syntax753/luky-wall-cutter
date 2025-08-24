import React from 'react';
import { ShapeType, Dimensions } from '../types';
import CubeShape from './shapes/CubeShape';
import LShape from './shapes/LShape';
import TShape from './shapes/TShape';

interface PreviewWindowProps {
  shape: ShapeType;
  dimensions: Dimensions;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ shape, dimensions }) => {
  const renderShape = () => {
    switch (shape) {
      case ShapeType.CUBE:
        return <CubeShape dimensions={dimensions} />;
      case ShapeType.L_SHAPE:
        return <LShape dimensions={dimensions} />;
      case ShapeType.T_SHAPE:
        return <TShape dimensions={dimensions} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {renderShape()}
    </div>
  );
};

export default PreviewWindow;