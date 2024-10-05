import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import GalaxyBackground from './components/GalaxyBackground/GalaxyBackground';

const Orrery = () => {
  return (
    <>
      <Canvas camera={{ fov: 50, position: [0, 0, 30] }}>
        <OrbitControls />
        <Suspense fallback={null}>
          {/* <ambientLight intensity={0.3} /> */}
          <GalaxyBackground textureUrl="/textures/8k_stars_milky_way.jpg" radius={200} />
          {/* Sun */}
          <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />

          {/* Mercury */}
          <Planets
            textureUrl="/textures/2k_mercury.jpg"
            radius={0.3}
            semiMajorAxis={3}
            eccentricity={0.2056}
            orbitalPeriod={88}
            name={"Mercury"}
          />

          {/* Venus */}
          <Planets
            textureUrl="/textures/2k_venus_surface.jpg"
            radius={0.6}
            semiMajorAxis={4.5}
            eccentricity={0.0067}
            orbitalPeriod={224.7}
            name={"Venus"}
          />

          {/* Earth */}
          <Planets
            textureUrl="/textures/2k_earth_daymap.jpg"
            radius={0.6}
            semiMajorAxis={6}
            eccentricity={0.0167}
            orbitalPeriod={365.25}
            name={"Earth"}
          />
          {/* Mars */}
          <Planets
            textureUrl="/textures/2k_mars.jpg"
            radius={0.4}
            semiMajorAxis={8}
            eccentricity={0.0934}
            orbitalPeriod={687}
            name={"Mars"}
          />
          {/* Jupiter */}
          <Planets
            textureUrl="/textures/2k_jupiter.jpg"
            radius={0.9}
            semiMajorAxis={15}
            eccentricity={0.0489}
            orbitalPeriod={4331}
            name={"Jupiter"}
          />
          {/* Saturn */}
          <Planets
            textureUrl="/textures/2k_saturn.jpg"
            radius={0.8}
            semiMajorAxis={20}
            eccentricity={0.0565}
            orbitalPeriod={10747}
            name={"Saturn"}
          />
          {/* Uranus */}
          <Planets
            textureUrl="/textures/2k_uranus.jpg"
            radius={0.7}
            semiMajorAxis={25}
            eccentricity={0.0457}
            orbitalPeriod={30589}
            name={"Uranus"}
          />
          {/* Neptune */}
          <Planets
            textureUrl="/textures/2k_neptune.jpg"
            radius={0.7}
            semiMajorAxis={30}
            eccentricity={0.0086}
            orbitalPeriod={59800}
            name={"Neptune"}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Orrery;
