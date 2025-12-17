"use client";

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  const sunTexture = useLoader(THREE.TextureLoader, '/textures/sun_2k.jpg');

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={sunRef} args={[6, 74, 74]} material={sunMaterial} />
      
      {/* Sun lighting */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#FFD700" distance={25} />
    </group>
  );
};

export default Sun;
