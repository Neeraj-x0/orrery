import { Canvas } from "@react-three/fiber";
import "./App.css";
import TexturedSphere from "./components/TexturedSphere";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        {/* Add ambient light for some soft lighting */}
        <ambientLight intensity={0.5} />
        {/* Add directional light to illuminate the sphere */}
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <TexturedSphere
            textureUrl="/textures/2k_jupiter.jpg"
            radius={1}
            position={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
