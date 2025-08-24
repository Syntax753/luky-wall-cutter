import React from 'react';
import { LShapeDimensions, Dimensions } from '../../types';

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

const LShape: React.FC<{ dimensions: Dimensions }> = ({ dimensions }) => {
  const { mainWidth, mainHeight, armWidth, armHeight, depth } = dimensions as LShapeDimensions;

  const mw = Math.max(mainWidth || 1, 1);
  const mh = Math.max(mainHeight || 1, 1);
  const aw = Math.max(armWidth || 1, 1);
  const ah = Math.max(armHeight || 1, 1);
  const d = Math.max(depth || 1, 1);

  const maxDim = Math.max(aw, mh, d);
  const scale = 200 / maxDim;

  const smw = mw * scale;
  const smh = mh * scale;
  const saw = aw * scale;
  const sah = ah * scale;
  const sd = d * scale * 0.7;
  const angle = Math.PI / 6;
  const dx = sd * Math.cos(angle);
  const dy = sd * Math.sin(angle);

  const frontPoints = {
    p0: [0, 0] as [number, number],
    p1: [smw, 0] as [number, number],
    p2: [smw, smh - sah] as [number, number],
    p3: [saw, smh - sah] as [number, number],
    p4: [saw, smh] as [number, number],
    p5: [0, smh] as [number, number],
  };

  const backPoints = Object.fromEntries(
    Object.entries(frontPoints).map(([key, p]) => [key, [p[0] + dx, p[1] - dy]])
  ) as Record<string, [number, number]>;
  
  const allPoints = [...Object.values(frontPoints), ...Object.values(backPoints)];
  const minX = Math.min(...allPoints.map(p => p[0]));
  const maxX = Math.max(...allPoints.map(p => p[0]));
  const minY = Math.min(...allPoints.map(p => p[1]));
  const maxY = Math.max(...allPoints.map(p => p[1]));

  const viewBox = `${minX - 40} ${minY - 40} ${maxX - minX + 80} ${maxY - minY + 80}`;

  return (
    <svg viewBox={viewBox} className="w-full h-full max-w-md max-h-md" style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}>
      <g stroke="#374151" strokeWidth="1">
        {/* Back Face */}
        <polygon points={Object.values(backPoints).map(p => p.join(',')).join(' ')} fill="#6b7280" />

        {/* Side Faces */}
        <polygon points={`${frontPoints.p1.join(',')} ${backPoints.p1.join(',')} ${backPoints.p2.join(',')} ${frontPoints.p2.join(',')}`} fill="#4b5563" />
        <polygon points={`${frontPoints.p2.join(',')} ${backPoints.p2.join(',')} ${backPoints.p3.join(',')} ${frontPoints.p3.join(',')}`} fill="#9ca3af" />
        <polygon points={`${frontPoints.p3.join(',')} ${backPoints.p3.join(',')} ${backPoints.p4.join(',')} ${frontPoints.p4.join(',')}`} fill="#4b5563" />
        <polygon points={`${frontPoints.p4.join(',')} ${backPoints.p4.join(',')} ${backPoints.p5.join(',')} ${frontPoints.p5.join(',')}`} fill="#4b5563" />
        
        {/* Top Face */}
        <polygon points={`${frontPoints.p0.join(',')} ${backPoints.p0.join(',')} ${backPoints.p1.join(',')} ${frontPoints.p1.join(',')}`} fill="#9ca3af" />

        {/* Front Face */}
        <polygon points={Object.values(frontPoints).map(p => p.join(',')).join(' ')} fill="#d1d5db" />
      </g>

      <SvgDimensionLabel p1={frontPoints.p5} p2={frontPoints.p0} label={`${mainHeight} mm`} offset={{ x: -15, y: 0 }} />
      <SvgDimensionLabel p1={frontPoints.p4} p2={frontPoints.p5} label={`${armWidth} mm`} offset={{ x: 0, y: 15 }} />
      <SvgDimensionLabel p1={frontPoints.p0} p2={frontPoints.p1} label={`${mainWidth} mm`} offset={{ x: 0, y: -15 }} />
      <SvgDimensionLabel p1={frontPoints.p3} p2={frontPoints.p4} label={`${armHeight} mm`} offset={{ x: 15, y: 0 }} />
      <SvgDimensionLabel p1={frontPoints.p0} p2={backPoints.p0} label={`${depth} mm`} offset={{ x: -10, y: -10 }} />
    </svg>
  );
};

export default LShape;