import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Html, Text } from "@react-three/drei"; // Import Text
import * as THREE from "three";
import gsap from "gsap";
import "./Planets.css";
import Moon from "../Moons/Moon";
import Neos from "../Neos/Neos";
import { setPosition } from "../../../redux/astro";
import { useDispatch } from "react-redux";

function Planets({
  textureUrl,
  radius,
  semiMajorAxis,
  eccentricity,
  inclination,
  longitudeOfAscendingNode = 0,
  argumentOfPeriapsis = 0,
  orbitalPeriod,
  moons,
  name,
  neos,
}) {
  const planetRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();
  const dispatch = useDispatch();

  // Function to apply orbital rotations
  const applyOrbitalRotations = (x, y, z) => {
    const xPeri =
      x * Math.cos(argumentOfPeriapsis) - y * Math.sin(argumentOfPeriapsis);
    const yPeri =
      x * Math.sin(argumentOfPeriapsis) + y * Math.cos(argumentOfPeriapsis);

    const xIncl = xPeri;
    const yIncl = yPeri * Math.cos(inclination);
    const zIncl = yPeri * Math.sin(inclination);

    const xFinal =
      xIncl * Math.cos(longitudeOfAscendingNode) -
      yIncl * Math.sin(longitudeOfAscendingNode);
    const yFinal =
      xIncl * Math.sin(longitudeOfAscendingNode) +
      yIncl * Math.cos(longitudeOfAscendingNode);
    const zFinal = zIncl;

    return new THREE.Vector3(xFinal, zFinal, yFinal);
  };

  // Calculate the points for the orbit using Keplerian parameters
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const trueAnomaly = (i / 100) * 2 * Math.PI;
      const r =
        (semiMajorAxis * (1 - eccentricity ** 2)) /
        (1 + eccentricity * Math.cos(trueAnomaly));

      let x = r * Math.cos(trueAnomaly);
      let y = r * Math.sin(trueAnomaly);

      const rotatedPoint = applyOrbitalRotations(x, y, 0);
      points.push(rotatedPoint);
    }
    return points;
  }, [semiMajorAxis, eccentricity, applyOrbitalRotations]);

  // Only dispatch the position if it changes and the planet is clicked
  const handleClick = () => {
    if (planetRef.current) {
      const planetPos = planetRef.current.position.toArray();
      dispatch(setPosition(planetPos)); // Dispatch the clicked planet's position
      console.log(planetPos); // For debugging
      zoomToPlanet(planetPos); // Zoom to the clicked planet
    }
  };

  const zoomToPlanet = (planetPos) => {
    gsap.to(camera.position, {
      x: planetPos[0] + 2,
      y: planetPos[1] + 1,
      z: planetPos[2] + 2,
      duration: 1,
      onUpdate: () => {
        camera.lookAt(planetPos);
        gl.render();
      },
    });
  };

  useEffect(() => {
    if (planetRef.current) {
      const planetPos = planetRef.current.position.toArray();
      dispatch(setPosition(planetPos)); // Initially dispatch the planet position
    }
  }, [dispatch]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const meanAnomaly = (elapsedTime / orbitalPeriod) * 2 * Math.PI;

    let eccentricAnomaly = meanAnomaly;
    for (let i = 0; i < 10; i++) {
      eccentricAnomaly =
        meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
      eccentricAnomaly =
        meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
    }

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

    const position = applyOrbitalRotations(x, y, 0);
    if (planetRef.current) {
      planetRef.current.position.set(position.x, position.y, position.z);
      planetRef.current.rotation.y += 0.004;
    }
  });

  const zoomToPlanet = () => {
    const planetPos = planetRef.current.position;
    const offset = new THREE.Vector3(0, 1, 4);
    const targetPos = planetPos.clone().add(offset);
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1,
      onUpdate: () => {
        camera.lookAt(planetPos);
        gl.render();
      },
    });
  };

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
      const offset = new THREE.Vector3(0, 1, 4);
      const targetPos = planetPos.clone().add(offset);
      camera.position.lerp(targetPos, 0.1);
      camera.lookAt(planetPos);
    }
  });

  const handlePlanetClick = () => {
    followPlanet.current = true;
    zoomToPlanet();
  };

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
      <Line points={orbitPoints} color="white" lineWidth={1} />
      <Line points={orbitPoints} color="white" lineWidth={1} />

      <group ref={planetRef}>
        {/*  */}
        <mesh
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
                Inclination: {((inclination * 180) / Math.PI).toFixed(2)}°{" "}
                <br />

                <br />
                Orbital Period: {orbitalPeriod.toFixed(1)}
              </div>
            </Html>
          )}
        </mesh>

        {/* Text component for planet name */}
        <Text
          position={[0, radius + 0.5, 0]} // Adjust the position above the planet
          fontSize={0.5} // Adjust the font size as needed
          color="white" // Adjust the color as needed
          anchorX="center" // Center text horizontally
          anchorY="middle" // Center text vertically
          rotation={[0, Math.PI / 2, 0]} // Rotate text to face the camera
        >
          {name}
        </Text>

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

        {neos?.map((neo, index) => (
          <Neos
            key={index}
            textureUrl={neo.textureUrl}
            radius={neo.radius}
            semiMajorAxis={neo.semiMajorAxis}
            eccentricity={neo.eccentricity}
            inclination={neo.inclination}
            longitudeOfAscendingNode={neo.longitudeOfAscendingNode}
            argumentOfPeriapsis={neo.argumentOfPeriapsis}
            orbitalPeriod={neo.orbitalPeriod}
            parentRef={planetRef}
            name={neo.name}
          />
        ))}
      </group>
    </>
  );
}

export default Planets;
