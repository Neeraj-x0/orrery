import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";

function Neos({
  textureUrl,
  radius,
  semiMajorAxis,
  eccentricity = 0,
  inclination = 0,
  longitudeOfAscendingNode = 0,
  argumentOfPeriapsis = 0,
  orbitalPeriod,
  parentRef,
  name,
}) {
  const NeosRef = useRef();

  // Function to apply orbital rotations
  const applyOrbitalRotations = (x, y, z) => {
    // Argument of periapsis rotation
    const xPeri =
      x * Math.cos(argumentOfPeriapsis) - y * Math.sin(argumentOfPeriapsis);
    const yPeri =
      x * Math.sin(argumentOfPeriapsis) + y * Math.cos(argumentOfPeriapsis);

    // Inclination rotation
    const xIncl = xPeri;
    const yIncl = yPeri * Math.cos(inclination);
    const zIncl = yPeri * Math.sin(inclination);

    // Longitude of ascending node rotation
    const xFinal =
      xIncl * Math.cos(longitudeOfAscendingNode) -
      yIncl * Math.sin(longitudeOfAscendingNode);
    const yFinal =
      xIncl * Math.sin(longitudeOfAscendingNode) +
      yIncl * Math.cos(longitudeOfAscendingNode);
    const zFinal = zIncl;

    return new THREE.Vector3(xFinal, zFinal, yFinal);
  };

  // Calculate the points for the NEO's orbit using Keplerian parameters
  const orbitPoints = [];
  for (let i = 0; i <= 100; i++) {
    const trueAnomaly = (i / 100) * 2 * Math.PI;
    const r =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    let x = r * Math.cos(trueAnomaly);
    let y = r * Math.sin(trueAnomaly);

    const rotatedPoint = applyOrbitalRotations(x, y, 0);
    orbitPoints.push(rotatedPoint);
  }

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const meanAnomaly = (elapsedTime / orbitalPeriod) * 2 * Math.PI;

    // Solve Kepler's equation iteratively
    let eccentricAnomaly = meanAnomaly;
    for (let i = 0; i < 10; i++) {
      eccentricAnomaly =
        meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
    }

    // Calculate true anomaly
    const trueAnomaly =
      2 *
      Math.atan(
        Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
          Math.tan(eccentricAnomaly / 2)
      );

    // Calculate radius vector magnitude
    const r =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(trueAnomaly));

    let x = r * Math.cos(trueAnomaly);
    let y = r * Math.sin(trueAnomaly);

    // Apply orbital rotations
    const position = applyOrbitalRotations(x, y, 0);

    if (NeosRef.current) {
      NeosRef.current.position.set(position.x, position.y, position.z);
    }
  });

  return (
    <group ref={parentRef}>
      {/* Orbit Wireframe */}
      <Line
        points={orbitPoints} // The calculated points forming the orbit
        color="white" // Orbit color
        lineWidth={0.3} // Line thickness
        dashed={true} // Make the orbit dashed
        dashSize={2} // Size of the dashes
        gapSize={0.8} // Gap between dashes
      />
      <mesh ref={NeosRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(textureUrl)}
        />
      </mesh>
    </group>
  );
}

export default Neos;
