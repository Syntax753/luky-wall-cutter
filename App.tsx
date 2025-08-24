import React, { useState, useMemo } from 'react';
import { ShapeType, Dimensions, DimensionKey } from './types';
import { DEFAULT_DIMENSIONS } from './constants';
import ShapeSelector from './components/ShapeSelector';
import DimensionControls from './components/DimensionControls';
import PreviewWindow from './components/PreviewWindow';

const App: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.CUBE);
  const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS[ShapeType.CUBE]);

  const handleShapeChange = (newShape: ShapeType) => {
    setShape(newShape);
    setDimensions(DEFAULT_DIMENSIONS[newShape]);
  };

  const handleDimensionChange = (field: DimensionKey, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value);
    if (!isNaN(numericValue)) {
      setDimensions(prev => ({ ...prev, [field]: numericValue }));
    }
  };

  const currentDimensions = useMemo(() => dimensions, [dimensions]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row font-sans">
      <header className="p-4 border-b border-gray-700 lg:hidden">
        <h1 className="text-2xl font-bold text-center text-cyan-400">Luky Wall Cutter</h1>
      </header>
      
      <aside className="w-full lg:w-96 bg-gray-800/50 backdrop-blur-sm p-6 border-r border-gray-700/50 flex-shrink-0">
        <div className="sticky top-6">
          <h1 className="text-3xl font-bold mb-2 hidden lg:block text-cyan-400">Luky Wall Cutter</h1>
          <p className="text-gray-400 mb-8 hidden lg:block">Select a shape and enter its dimensions in millimeters.</p>
          
          <div className="space-y-8">
            <ShapeSelector selectedShape={shape} onSelectShape={handleShapeChange} />
            <DimensionControls 
              shape={shape} 
              dimensions={currentDimensions} 
              onDimensionChange={handleDimensionChange} 
            />
          </div>
        </div>
      </aside>
      
      <main className="flex-1 flex flex-col p-2 lg:p-6 min-h-[50vh] lg:min-h-0">
        <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-cyan-500/10">
          <PreviewWindow shape={shape} dimensions={currentDimensions} />
        </div>
      </main>
    </div>
  );
};

export default App;