import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = ({ textureUrl, radius, bloomLayer }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const sunRef = useRef();

  useEffect(() => {
    if (sunRef.current) {
      sunRef.current.layers.enable(bloomLayer); // Enable bloom layer for the Sun
    }
  }, [bloomLayer]);

  return (
<>
  <ambientLight intensity={0.3} /> {/* Add Ambient Light */}
  {/* Add Point Light near the sun */}
  <pointLight 
    intensity={70} // Adjust the intensity of the light
    position={[0, 0, 0]} // Position it at the sun's center
    distance={1000} // Distance the light reaches
    decay={1} // Adjust how the light fades with distance
  />
  
  <mesh ref={sunRef} layers={bloomLayer}>
    <sphereGeometry args={[radius, 64, 64]} />
    <meshStandardMaterial
      map={texture}
      emissiveMap={texture}
      emissive={"white"}
      emissiveIntensity={1.0}
    />
  </mesh>
</>

  );
};

export default Sun;
