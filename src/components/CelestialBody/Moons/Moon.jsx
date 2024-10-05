import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";

function Moon({
  textureUrl,
  radius,
  semiMajorAxis,
  orbitalPeriod,
  parentRef,
  name,
}) {  
  const moonRef = useRef();

  // Calculate the points for the moon's orbit
  const orbitPoints = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    const x = semiMajorAxis * Math.cos(angle);
    const z = semiMajorAxis * Math.sin(angle);
    orbitPoints.push(new THREE.Vector3(x, 0, z));
  }

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = (elapsedTime / orbitalPeriod) * 2 * Math.PI;
    const x = semiMajorAxis * Math.cos(angle);
    const z = semiMajorAxis * Math.sin(angle);

    if (moonRef.current) {
      // Set moon position relative to the planet's local space
      moonRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group ref={parentRef}>
      {/* Orbit Wireframe */}
      <Line
        points={orbitPoints} // The calculated points forming the orbit
        color="white" // Orbit color
        lineWidth={2} // Line thickness
        dashed={true} // Make the orbit dashed
        dashSize={1} // Size of the dashes
        gapSize={0.5} // Gap between dashes
      />
      <mesh ref={moonRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(textureUrl)}
        />
      </mesh>
    </group>
  );
}

export default Moon;
