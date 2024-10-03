import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

const Sun = ({ textureUrl, radius }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const sunRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <pointLight position={sunRef.current ? sunRef.current.position.toArray() : [0, 0, 0]} intensity={50} decay={2} />
    </>
  );
};

export default Sun;
