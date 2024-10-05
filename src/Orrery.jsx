import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // Import OBJLoader
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import planets from "./assets/planets";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";

const Orrery = ({ speed }) => {
  const texture = useLoader(TextureLoader, "/astro.png");
  const astroPosition = useSelector((state) => state.astro.position);

  return (
    <Canvas
      style={{ width: "90vw", height: "100vh" }}
      camera={{ fov: 50, position: [0, 0, 30] }}
    >
      <OrbitControls />
      <mesh position={astroPosition}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Starry background */}
      <Stars
        radius={100} // Radius of the starfield sphere
        depth={50} // Starfield depth to give a 3D effect
        count={5000} // Number of stars
        factor={4} // Size factor for stars
        saturation={0} // Color saturation of the stars
        fade={true} // Fades the stars on the edges
      />
      <Suspense fallback={null}>
        {/* Sun */}
        <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />

        {/* Render Planets */}
        {planets.map((planet, index) => (
          <Planets
            key={index}
            textureUrl={planet.textureUrl}
            radius={planet.radius}
            semiMajorAxis={planet.semiMajorAxis}
            inclination={planet.inclination}
            eccentricity={planet.eccentricity}
            orbitalPeriod={planet.orbitalPeriod * speed}
            name={planet.name}
            moons={planet.moons}
            nearEarthAsteroids={planet.nearEarthAsteroids}
            nearEarthComets={planet.nearEarthComets}
            potentiallyHazardousAsteroids={planet.potentiallyHazardousAsteroids}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default Orrery;
