"use client";

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  texturePath: string;
  rotationSpeed?: number;
}

const Planet = ({ texturePath, rotationSpeed = 0.1 }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);

  const planetTexture = useLoader(THREE.TextureLoader, texturePath);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={planetRef} args={[4, 74, 74]} material={planetMaterial} />
    </group>
  );
};

export default Planet;

