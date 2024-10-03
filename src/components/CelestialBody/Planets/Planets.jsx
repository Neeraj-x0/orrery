import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function Planets({ textureUrl, radius, semiMajorAxis, eccentricity, orbitalPeriod }) {
  const planetRef = useRef();

  // Calculate the points for the orbit
  const orbitPoints = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    const distance = semiMajorAxis * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(angle));
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitPoints.push(new THREE.Vector3(x, 0, z));
  }

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = (elapsedTime / orbitalPeriod) * 2 * Math.PI;
    const distance = semiMajorAxis * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(angle));
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);

    if (planetRef.current) {
      planetRef.current.position.set(x, 0, z); // Update planet position along orbit
    }
  });

  return (
    <>
      {/* Orbit Wireframe */}
      <Line
        points={orbitPoints} // The calculated points forming the orbit
        color="white"         // Orbit color
        lineWidth={1}         // Line thickness
      />
      
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load(textureUrl)} />
      </mesh>
    </>
  );
}

export default Planets;
