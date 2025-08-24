import React from 'react';
import { CubeDimensions, Dimensions } from '../../types';

interface SvgDimensionLabelProps {
  p1: [number, number];
  p2: [number, number];
  label: string;
  offset: { x: number; y: number };
}

const SvgDimensionLabel: React.FC<SvgDimensionLabelProps> = ({ p1, p2, label, offset }) => {
  const textOffset = 10;
  const lineP1 = { x: p1[0] + offset.x, y: p1[1] + offset.y };
  const lineP2 = { x: p2[0] + offset.x, y: p2[1] + offset.y };

  const angle = Math.atan2(lineP2.y - lineP1.y, lineP2.x - lineP1.x);
  const textX = (lineP1.x + lineP2.x) / 2 - textOffset * Math.sin(angle);
  const textY = (lineP1.y + lineP2.y) / 2 + textOffset * Math.cos(angle);

  return (
    <g className="text-sm font-sans" fill="white" stroke="white">
      <line x1={lineP1.x} y1={lineP1.y} x2={lineP2.x} y2={lineP2.y} strokeWidth="1" />
      <line x1={p1[0]} y1={p1[1]} x2={lineP1.x} y2={lineP1.y} strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1={p2[0]} y1={p2[1]} x2={lineP2.x} y2={lineP2.y} strokeWidth="0.5" strokeDasharray="2 2" />
      <text x={textX} y={textY} dominantBaseline="middle" textAnchor="middle" fontSize="10" stroke="none">{label}</text>
    </g>
  );
};

const CubeShape: React.FC<{ dimensions: Dimensions }> = ({ dimensions }) => {
  const { width, height, depth } = dimensions as CubeDimensions;
  
  const w = Math.max(width || 1, 1);
  const h = Math.max(height || 1, 1);
  const d = Math.max(depth || 1, 1);

  const maxDim = Math.max(w, h, d);
  const scale = 200 / maxDim;

  const sw = w * scale;
  const sh = h * scale;
  const sd = d * scale * 0.7; // Depth foreshortening
  const angle = Math.PI / 6; // Skew angle
  const dx = sd * Math.cos(angle);
  const dy = sd * Math.sin(angle);

  const points = {
    p0: [0, sh] as [number, number],
    p1: [sw, sh] as [number, number],
    p2: [sw, 0] as [number, number],
    p3: [0, 0] as [number, number],
    p4: [dx, sh - dy] as [number, number],
    p5: [sw + dx, sh - dy] as [number, number],
    p6: [sw + dx, -dy] as [number, number],
    p7: [dx, -dy] as [number, number],
  };

  const allPoints = Object.values(points);
  const minX = Math.min(...allPoints.map(p => p[0]));
  const maxX = Math.max(...allPoints.map(p => p[0]));
  const minY = Math.min(...allPoints.map(p => p[1]));
  const maxY = Math.max(...allPoints.map(p => p[1]));
  
  const viewBox = `${minX - 40} ${minY - 40} ${maxX - minX + 80} ${maxY - minY + 80}`;

  return (
    <svg 
      viewBox={viewBox} 
      className="w-full h-full max-w-md max-h-md"
      style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}
    >
      <g stroke="#374151" strokeWidth="1">
        <polygon points={`${points.p4.join(',')} ${points.p5.join(',')} ${points.p6.join(',')} ${points.p7.join(',')}`} fill="#6b7280" />
        <polygon points={`${points.p0.join(',')} ${points.p1.join(',')} ${points.p5.join(',')} ${points.p4.join(',')}`} fill="#4b5563" />
        <polygon points={`${points.p1.join(',')} ${points.p2.join(',')} ${points.p6.join(',')} ${points.p5.join(',')}`} fill="#4b5563" />
        <polygon points={`${points.p2.join(',')} ${points.p3.join(',')} ${points.p7.join(',')} ${points.p6.join(',')}`} fill="#9ca3af" />
        <polygon points={`${points.p0.join(',')} ${points.p3.join(',')} ${points.p2.join(',')} ${points.p1.join(',')}`} fill="#d1d5db" />
      </g>
      
      <SvgDimensionLabel p1={points.p1} p2={points.p2} label={`${height} mm`} offset={{ x: 15, y: 0 }} />
      <SvgDimensionLabel p1={points.p0} p2={points.p1} label={`${width} mm`} offset={{ x: 0, y: 15 }} />
      <SvgDimensionLabel p1={points.p2} p2={points.p6} label={`${depth} mm`} offset={{ x: 10, y: -10 }} />
    </svg>
  );
};

export default CubeShape;