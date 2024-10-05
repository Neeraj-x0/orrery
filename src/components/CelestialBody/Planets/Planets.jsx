import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap"; // For smooth camera transition
import "./Planets.css";
import Moon from "../Moons/Moon";

function Planets({
  textureUrl,
  radius,
  semiMajorAxis,
  eccentricity,
  orbitalPeriod,
  moons,
  name,
}) {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);

  const { camera, gl } = useThree(); // Access the camera and renderer

  // Calculate the points for the orbit
  const orbitPoints = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    const distance =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(angle));
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitPoints.push(new THREE.Vector3(x, 0, z));
  }

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = (elapsedTime / orbitalPeriod) * 2 * Math.PI;
    const distance =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(angle));
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    if (planetRef.current) {
      planetRef.current.position.set(x, 0, z); // Update planet position along orbit
    }
    planetRef.current.rotation.y += 0.004;
  });

  // Function to zoom in and focus on a planet
  const zoomToPlanet = () => {
    const planetPos = planetRef.current.position;
    gsap.to(camera.position, {
      x: planetPos.x + 2, // Adjust this value based on how close you want the camera
      y: planetPos.y + 1, // Adjust for a good view angle
      z: planetPos.z + 2, // Adjust based on distance
      duration: 1, // Smooth transition duration
      onUpdate: () => {
        camera.lookAt(planetPos); // Keep the camera looking at the planet
        gl.render(); // Ensure the scene re-renders during animation
      },
    });
  };

  return (
    <>
      {/* Orbit Wireframe */}
      <Line
        points={orbitPoints} // The calculated points forming the orbit
        color="white" // Orbit color
        lineWidth={1} // Line thickness
      />

      {/* Planet with Moons */}
      <group ref={planetRef}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={zoomToPlanet} // Zoom in on click
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            map={new THREE.TextureLoader().load(textureUrl)}
          />
          {hovered && (
            <Html position={[0, radius + 0.5, 0]} center>
              <div className="popup">
                {name} <br />
                Radius: {radius} <br />
                Distance from Sun: {semiMajorAxis} <br />
                Orbital Period: {orbitalPeriod}
              </div>
            </Html>
          )}
        </mesh>

        {/* Moons */}
        {moons?.map((moon, index) => (
          <Moon
            key={index}
            textureUrl={moon.textureUrl}
            radius={moon.radius}
            semiMajorAxis={moon.semiMajorAxis}
            orbitalPeriod={moon.orbitalPeriod}
            parentRef={planetRef} // Pass planet reference to the moon
            name={moon.name}
          />
        ))}
      </group>
    </>
  );
}

export default Planets;
