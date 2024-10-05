import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import GalaxyBackground from "./components/GalaxyBackground/GalaxyBackground";
import planets from "./assets/planets";

const Orrery = () => {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 30] }}>
      <OrbitControls />
      <Suspense fallback={null}>
        <GalaxyBackground textureUrl="/textures/8k_stars_milky_way.jpg" radius={200} />

        <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />

        {planets.map((planet, index) => (
          <Planets
            key={index}
            textureUrl={planet.textureUrl}
            radius={planet.radius}
            semiMajorAxis={planet.semiMajorAxis}
            eccentricity={planet.eccentricity}
            orbitalPeriod={planet.orbitalPeriod}
            name={planet.name}
            moons={planet.moons}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default Orrery;
