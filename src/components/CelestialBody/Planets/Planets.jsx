import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import "./Planets.css";
import Moon from "../Moons/Moon";

function Planets({
  textureUrl,
  radius,
  semiMajorAxis,
  eccentricity,
  inclination ,
  longitudeOfAscendingNode = 0,
  argumentOfPeriapsis = 0,
  orbitalPeriod,
  moons,
  name,
}) {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();

  // Function to apply orbital rotations
  const applyOrbitalRotations = (x, y, z) => {
    // Argument of periapsis rotation
    const xPeri = x * Math.cos(argumentOfPeriapsis) - y * Math.sin(argumentOfPeriapsis);
    const yPeri = x * Math.sin(argumentOfPeriapsis) + y * Math.cos(argumentOfPeriapsis);
    
    // Inclination rotation
    const xIncl = xPeri;
    const yIncl = yPeri * Math.cos(inclination);
    const zIncl = yPeri * Math.sin(inclination);
    
    // Longitude of ascending node rotation
    const xFinal = xIncl * Math.cos(longitudeOfAscendingNode) - yIncl * Math.sin(longitudeOfAscendingNode);
    const yFinal = xIncl * Math.sin(longitudeOfAscendingNode) + yIncl * Math.cos(longitudeOfAscendingNode);
    const zFinal = zIncl;

    return new THREE.Vector3(xFinal, zFinal, yFinal);
  };

  // Calculate the points for the orbit using Keplerian parameters
  const orbitPoints = [];
  for (let i = 0; i <= 100; i++) {
    const trueAnomaly = (i / 100) * 2 * Math.PI;
    const r = (semiMajorAxis * (1 - eccentricity ** 2)) / 
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
      eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
    }
    
    // Calculate true anomaly
    const trueAnomaly = 2 * Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
      Math.tan(eccentricAnomaly / 2)
    );
    
    // Calculate radius vector magnitude
    const r = (semiMajorAxis * (1 - eccentricity ** 2)) / 
              (1 + eccentricity * Math.cos(trueAnomaly));

    let x = r * Math.cos(trueAnomaly);
    let y = r * Math.sin(trueAnomaly);
    
    // Apply orbital rotations
    const position = applyOrbitalRotations(x, y, 0);

    if (planetRef.current) {
      planetRef.current.position.set(position.x, position.y, position.z);
      planetRef.current.rotation.y += 0.004;
    }
  });

  const zoomToPlanet = () => {
    const planetPos = planetRef.current.position;
    const offset = new THREE.Vector3(0, 1, 4); // Adjusted for a closer view
    const targetPos = planetPos.clone().add(offset);
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1, // Smooth transition duration
      onUpdate: () => {
        camera.lookAt(planetPos);
        gl.render();
      },
    });
  };
  // Function to make the camera follow the planet
  const followPlanet = useRef(false);
  useFrame(({ clock }) => {
    if (followPlanet.current) {
      const elapsedTime = clock.getElapsedTime();
      const angle = (elapsedTime / orbitalPeriod) * 2 * Math.PI;
      const distance =
        (semiMajorAxis * (1 - eccentricity ** 2)) /
        (1 + eccentricity * Math.cos(angle));
      const x = distance * Math.cos(angle);
      const z = distance * Math.sin(angle);
      const planetPos = new THREE.Vector3(x, 0, z);
      const offset = new THREE.Vector3(0, 1, 4); // Adjusted for a closer view
      const targetPos = planetPos.clone().add(offset);
      camera.position.lerp(targetPos, 0.1); // Smoothly interpolate the camera position
      camera.lookAt(planetPos); // Keep the camera looking at the planet
    }
  });
  const handlePlanetClick = () => {
    followPlanet.current = true;
    zoomToPlanet();
  };
  // Disable followPlanet when the mouse is moved
  const handleMouseMove = () => {
    followPlanet.current = false;
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Line
        points={orbitPoints}
        color="white"
        lineWidth={1}
      />

      <group ref={planetRef}>
        <mesh
          // onPointerOver={() => setHovered(true)}
          // onPointerOut={() => setHovered(false)}
          onClick={handlePlanetClick}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            map={new THREE.TextureLoader().load(textureUrl)}
          />
          {hovered && (
            <Html position={[0, radius + 0.5, 0]} center>
              <div className="popup">
                {name} <br />
                Radius: {radius.toFixed(2)} <br />
                Semi-major axis: {semiMajorAxis.toFixed(2)} <br />
                Eccentricity: {eccentricity.toFixed(4)} <br />
                Inclination: {(inclination * 180 / Math.PI).toFixed(2)}° <br />
                Orbital Period: {orbitalPeriod.toFixed(1)}
              </div>
            </Html>
          )}
        </mesh>

        {moons?.map((moon, index) => (
          <Moon
            key={index}
            textureUrl={moon.textureUrl}
            radius={moon.radius}
            semiMajorAxis={moon.semiMajorAxis}
            orbitalPeriod={moon.orbitalPeriod}
            parentRef={planetRef}
            name={moon.name}
          />
        ))}
      </group>
    </>
  );
}

export default Planets;