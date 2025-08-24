
import React from 'react';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';

interface DimensionLabelProps {
  start: [number, number, number];
  end: [number, number, number];
  label: string;
  offset?: number;
}

const DimensionLabel: React.FC<DimensionLabelProps> = ({ start, end, label, offset = 10 }) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const midPoint = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);

  const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();
  // Get a perpendicular direction for the offset lines
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3(1, 0, 0);
  let perpDir = new THREE.Vector3().crossVectors(direction, up);
  if (perpDir.lengthSq() < 0.01) { // If direction is aligned with up vector
    perpDir = new THREE.Vector3().crossVectors(direction, right);
  }
  perpDir.normalize();

  const offsetVec = perpDir.clone().multiplyScalar(offset);
  const textPos = midPoint.clone().add(offsetVec);
  
  const lineStart = startVec.clone().add(offsetVec);
  const lineEnd = endVec.clone().add(offsetVec);

  const tickSize = 5;

  return (
    <group>
      {/* Main dimension line */}
      <Line points={[lineStart, lineEnd]} color="yellow" lineWidth={1} />
      {/* Start tick */}
      <Line points={[startVec, lineStart.clone().add(perpDir.clone().multiplyScalar(tickSize))]} color="yellow" lineWidth={1} />
      {/* End tick */}
      <Line points={[endVec, lineEnd.clone().add(perpDir.clone().multiplyScalar(tickSize))]} color="yellow" lineWidth={1} />

      <Text
        position={textPos.toArray()}
        color="white"
        fontSize={8}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        outlineColor="black"
        outlineWidth={0.2}
      >
        {label}
      </Text>
    </group>
  );
};

export default DimensionLabel;
