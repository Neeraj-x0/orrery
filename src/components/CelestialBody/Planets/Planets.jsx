import React from "react";
import './Planets.css';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Planets({ textureUrl, radius, position }) {
  // Load the texture using the useLoader hook
  const texture = useLoader(TextureLoader, textureUrl);
  // const ringsTexture = useLoader(TextureLoader, '/textures/2k_saturn_ring_alpha.png');

  // Set anisotropy to improve texture rendering at oblique angles
  texture.anisotropy = 16; // Set this to the maximum your GPU supports (typically 8 or 16)
  // ringsTexture.anisotropy = 16; // Set this to the maximum your GPU supports (typically 8 or 16)

  return (
    <>
    
      <mesh position={position}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.01, 64]} />{" "}
        <meshStandardMaterial
          map={ringsTexture}
          transparent={true}
          opacity={0.7}
        />
      </mesh> */}
    </>
  );
}
