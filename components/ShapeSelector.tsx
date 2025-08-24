
import React from 'react';
import { ShapeType } from '../types';
import { CubeIcon, LShapeIcon, TShapeIcon } from './icons';

interface ShapeSelectorProps {
  selectedShape: ShapeType;
  onSelectShape: (shape: ShapeType) => void;
}

const SHAPES = [
  { type: ShapeType.CUBE, label: 'Cube', icon: <CubeIcon /> },
  { type: ShapeType.L_SHAPE, label: 'L-Shape', icon: <LShapeIcon /> },
  { type: ShapeType.T_SHAPE, label: 'T-Shape', icon: <TShapeIcon /> },
];

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ selectedShape, onSelectShape }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-gray-300">1. Select Shape</h2>
      <div className="grid grid-cols-3 gap-4">
        {SHAPES.map(({ type, label, icon }) => {
          const isSelected = selectedShape === type;
          return (
            <button
              key={type}
              onClick={() => onSelectShape(type)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500
                ${isSelected 
                  ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/10' 
                  : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                }`}
            >
              <div className="w-10 h-10 mb-2">{icon}</div>
              <span className={`font-medium text-sm ${isSelected ? 'text-cyan-300' : 'text-gray-300'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShapeSelector;
