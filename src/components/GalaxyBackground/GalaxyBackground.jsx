import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

const GalaxyBackground = ({ textureUrl, radius }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const sunRef = useRef();

  return (
    <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          side={BackSide}
        />
      </mesh>
      {/* Point Light */}
      {/* <pointLight 
        position={[0, 0, 0]} // Position it in the center, but it won't affect internal objects due to sphere setup
        intensity={50} // Adjust brightness
        distance={50} // Limit the distance of the light
        decay={0.6} // Adjust decay for better fading effect
      /> */}
      
    </>
  );
};

export default GalaxyBackground;
