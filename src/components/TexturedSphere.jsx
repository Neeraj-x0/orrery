import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Suspense } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export default function TexturedSphere({ textureUrl, radius, position }) {
  // Load the texture using the useLoader hook
  const texture = useLoader(TextureLoader, textureUrl);

  // Set anisotropy to improve texture rendering at oblique angles
  texture.anisotropy = 16; // Set this to the maximum your GPU supports (typically 8 or 16)

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}
