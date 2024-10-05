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
  
    <ambientLight intensity={1.5} />
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
