import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import planets from "./assets/planets";

const Orrery = () => {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 30] }}>
      <OrbitControls />
      {/* Starry background */}
      <Html>
        <div style={{display:"flex",alignItems:"center",zIndex:100,position:"absolute",top:-350,right:-400}}>
          <img src="/astro.png" alt="astronaut" />
          <div style={{width:"700px",height:"200px",backgroundColor:"rgba(128, 128, 128, 0.1)", backdropFilter: "blur(6px)",padding:"20px",borderRadius:"5px",color:"white"}}>
            <form>
              <p>Which planet is known as the Red Planet?</p>
              <label>
                <input type="radio" name="quiz" value="Earth" />
                Earth
              </label>
              <br />
              <label>
                <input type="radio" name="quiz" value="Mars" />
                Mars
              </label>
              <br />
              <label>
                <input type="radio" name="quiz" value="Jupiter" />
                Jupiter
              </label>
            </form>
          </div>
        </div>
      </Html>
      <Stars
        radius={100} // Radius of the starfield sphere
        depth={50} // Starfield depth to give a 3D effect
        count={5000} // Number of stars
        factor={4} // Size factor for stars
        saturation={0} // Color saturation of the stars
        fade={true} // Fades the stars on the edges
      />
      <Suspense fallback={null}>
        <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />
        {planets.map((planet, index) => (
          <Planets
            key={index}
            textureUrl={planet.textureUrl}
            radius={planet.radius}
            semiMajorAxis={planet.semiMajorAxis}
            inclination={planet.inclination}
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
