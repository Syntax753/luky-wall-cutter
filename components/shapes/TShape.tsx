import React from 'react';
import { TShapeDimensions, Dimensions } from '../../types';

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


const TShape: React.FC<{ dimensions: Dimensions }> = ({ dimensions }) => {
  const { topWidth, topHeight, stemWidth, stemHeight, depth } = dimensions as TShapeDimensions;

  const tw = Math.max(topWidth || 1, 1);
  const th = Math.max(topHeight || 1, 1);
  const sw = Math.max(stemWidth || 1, 1);
  const sh = Math.max(stemHeight || 1, 1);
  const d = Math.max(depth || 1, 1);
  
  const totalHeight = th + sh;
  const maxDim = Math.max(tw, totalHeight, d);
  const scale = 200 / maxDim;

  const stw = tw * scale;
  const sth = th * scale;
  const ssw = sw * scale;
  const ssh = sh * scale;
  const sd = d * scale * 0.7;
  const angle = Math.PI / 6;
  const dx = sd * Math.cos(angle);
  const dy = sd * Math.sin(angle);
  
  const stemOffset = (stw - ssw) / 2;

  const frontPoints = {
    p0: [0, 0] as [number, number],
    p1: [stw, 0] as [number, number],
    p2: [stw, sth] as [number, number],
    p3: [stemOffset + ssw, sth] as [number, number],
    p4: [stemOffset + ssw, sth + ssh] as [number, number],
    p5: [stemOffset, sth + ssh] as [number, number],
    p6: [stemOffset, sth] as [number, number],
    p7: [0, sth] as [number, number],
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
        <polygon points={Object.values(backPoints).map(p => p.join(',')).join(' ')} fill="#6b7280" />
        <polygon points={`${frontPoints.p1.join(',')} ${backPoints.p1.join(',')} ${backPoints.p2.join(',')} ${frontPoints.p2.join(',')}`} fill="#4b5563" />
        <polygon points={`${frontPoints.p2.join(',')} ${backPoints.p2.join(',')} ${backPoints.p3.join(',')} ${frontPoints.p3.join(',')}`} fill="#d1d5db" />
        <polygon points={`${frontPoints.p3.join(',')} ${backPoints.p3.join(',')} ${backPoints.p4.join(',')} ${frontPoints.p4.join(',')}`} fill="#4b5563" />
        <polygon points={`${frontPoints.p4.join(',')} ${backPoints.p4.join(',')} ${backPoints.p5.join(',')} ${frontPoints.p5.join(',')}`} fill="#d1d5db" />
        <polygon points={`${frontPoints.p5.join(',')} ${backPoints.p5.join(',')} ${backPoints.p6.join(',')} ${frontPoints.p6.join(',')}`} fill="#4b5563" />
        <polygon points={`${frontPoints.p6.join(',')} ${backPoints.p6.join(',')} ${backPoints.p7.join(',')} ${frontPoints.p7.join(',')}`} fill="#d1d5db" />
        <polygon points={`${frontPoints.p0.join(',')} ${backPoints.p0.join(',')} ${backPoints.p1.join(',')} ${frontPoints.p1.join(',')}`} fill="#9ca3af" />
        <polygon points={Object.values(frontPoints).map(p => p.join(',')).join(' ')} fill="#d1d5db" />
      </g>

      <SvgDimensionLabel p1={frontPoints.p0} p2={frontPoints.p1} label={`${topWidth} mm`} offset={{ x: 0, y: -15 }} />
      <SvgDimensionLabel p1={frontPoints.p1} p2={frontPoints.p2} label={`${topHeight} mm`} offset={{ x: 15, y: 0 }} />
      <SvgDimensionLabel p1={frontPoints.p7} p2={frontPoints.p5} label={`${totalHeight} mm`} offset={{ x: -15, y: 0 }} />
      <SvgDimensionLabel p1={frontPoints.p5} p2={frontPoints.p4} label={`${stemWidth} mm`} offset={{ x: 0, y: 15 }} />
      <SvgDimensionLabel p1={frontPoints.p0} p2={backPoints.p0} label={`${depth} mm`} offset={{ x: -10, y: -10 }} />
    </svg>
  );
};

export default TShape;