import { Canvas } from '@react-three/fiber';
import './App.css';
import { OrbitControls } from '@react-three/drei';
import Planet from './components/Planet.jsx';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 75 }} exposure={-0.99}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Planet modelPath="/planets/sun.glb" meshName="Cube001" materialName="None" />
      <Planet modelPath="/planets/earth.glb" meshName="Cube001" materialName="Default OBJ" />
      <OrbitControls autoRotate={true} autoRotateSpeed={10} />
    </Canvas>
  );
} 

export default App;
