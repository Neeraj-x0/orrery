import { Canvas } from "@react-three/fiber";
import "./App.css";
import Planets from "./components/CelestialBody/Planets/Planets";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/CelestialBody/Planets/Sun/Sun";

function App() {
  return (
    <>
      <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
        <OrbitControls autoRotate={true}/>
        <Suspense fallback={null}>
          <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />
          <Planets
            textureUrl="/textures/2k_earth_daymap.jpg"
            radius={1}
            position={[3, 3, 0]}
          />
          <Planets
            textureUrl="/textures/2k_mercury.jpg"
            radius={1}
            position={[-3, -3, 0]}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
