import "./App.css";
import Orrery from "./Orrery";
import ControlPanel from "./ControlPanel";
import { useState } from "react";

function App() {
  const [speed, setSpeed] = useState(1);
  const [showBorders, setShowBorders] = useState(true);

  const increaseSpeed = () => {
    setSpeed((prevSpeed) => prevSpeed + 1);
  };

  const toggleBorders = () => {
    setShowBorders((prev) => !prev);
  };

  const handleSpeedChange = (event) => {
    setSpeed(parseFloat(event.target.value));
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-[20%]">
        <ControlPanel />
      </div>

      <div className="w-[80%]">
        <Orrery speed={speed} showBorders={showBorders} />
      </div>
    </div>
  );
}


export default App;
