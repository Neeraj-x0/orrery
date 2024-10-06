import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // Import OBJLoader
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import planets from "./assets/planets";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";

const Orrery = ({ speed }) => {
  const showQuiz = useSelector((state) => state.astro.showQuiz);

  return (
    <Canvas
      style={{ width: "90vw", height: "100vh" }}
      camera={{ fov: 50, position: [0, 0, 30] }}
    >
      <OrbitControls />

      {/* Starry background */}
      {showQuiz && (
        <Html>
          <div
            className="fade-in fade-in-up"
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: 100,
              position: "absolute",
              top: -350,
              right: -400,
            }}
          >
            <img src="/astro.png" alt="astronaut" />
            <div
              style={{
                width: "700px",
                height: "200px",
                backgroundColor: "rgba(128, 128, 128, 0.1)",
                backdropFilter: "blur(6px)",
                padding: "20px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <h1 className="text-3xl font-bold text-gray-200 mb-8">
                Web Orrery
              </h1>
              <p className="text-gray-200">
                Welcome to the Web Orrery, an educational tool that simulates
                the solar system. Use the control panel to adjust the orbital
                speed, display orbital paths, and toggle labels. For a quiz on
                the solar system, click the button below.
              </p>
            </div>
          </div>
        </Html>
      )}
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
