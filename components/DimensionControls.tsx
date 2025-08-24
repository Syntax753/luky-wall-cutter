import React from 'react';
import { ShapeType, Dimensions, CubeDimensions, LShapeDimensions, TShapeDimensions, DimensionKey } from '../types';

interface DimensionControlsProps {
  shape: ShapeType;
  dimensions: Dimensions;
  onDimensionChange: (field: DimensionKey, value: string) => void;
}

interface DimensionInputProps {
  label: string;
  value: number;
  field: DimensionKey;
  onChange: (field: DimensionKey, value: string) => void;
}

const DimensionInput: React.FC<DimensionInputProps> = ({ label, value, field, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full bg-gray-700/80 border border-gray-600 rounded-md py-2 pl-3 pr-12 text-white focus:ring-cyan-500 focus:border-cyan-500"
        min="1"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-400 text-sm font-semibold">mm</span>
    </div>
  </div>
);


const DimensionControls: React.FC<DimensionControlsProps> = ({ shape, dimensions, onDimensionChange }) => {
  const renderInputs = () => {
    switch (shape) {
      case ShapeType.CUBE:
        const cubeDims = dimensions as CubeDimensions;
        return (
          <>
            <DimensionInput label="Width (X)" value={cubeDims.width} field="width" onChange={onDimensionChange} />
            <DimensionInput label="Height (Y)" value={cubeDims.height} field="height" onChange={onDimensionChange} />
            <DimensionInput label="Depth (Z)" value={cubeDims.depth} field="depth" onChange={onDimensionChange} />
          </>
        );
      case ShapeType.L_SHAPE:
        const lDims = dimensions as LShapeDimensions;
        return (
          <>
            <DimensionInput label="Total Height" value={lDims.mainHeight} field="mainHeight" onChange={onDimensionChange} />
            <DimensionInput label="Total Width" value={lDims.armWidth} field="armWidth" onChange={onDimensionChange} />
            <DimensionInput label="Vertical Arm Width" value={lDims.mainWidth} field="mainWidth" onChange={onDimensionChange} />
            <DimensionInput label="Horizontal Arm Height" value={lDims.armHeight} field="armHeight" onChange={onDimensionChange} />
            <DimensionInput label="Depth" value={lDims.depth} field="depth" onChange={onDimensionChange} />
          </>
        );
      case ShapeType.T_SHAPE:
        const tDims = dimensions as TShapeDimensions;
        return (
          <>
            <DimensionInput label="Top Bar Width" value={tDims.topWidth} field="topWidth" onChange={onDimensionChange} />
            <DimensionInput label="Top Bar Height" value={tDims.topHeight} field="topHeight" onChange={onDimensionChange} />
            <DimensionInput label="Stem Width" value={tDims.stemWidth} field="stemWidth" onChange={onDimensionChange} />
            <DimensionInput label="Stem Height" value={tDims.stemHeight} field="stemHeight" onChange={onDimensionChange} />
            <DimensionInput label="Depth" value={tDims.depth} field="depth" onChange={onDimensionChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-gray-300">2. Enter Dimensions</h2>
      <div className="space-y-4">
        {renderInputs()}
      </div>
    </div>
  );
};

export default DimensionControls;