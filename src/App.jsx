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

const sidebarStyle = {
  width: "10vw",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
};

const headerStyle = {
  fontSize: "24px",
  margin: "0",
  textAlign: "center",
};

const controlContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
};

const labelStyle = {
  fontSize: "16px",
};

const sliderStyle = {
  width: "100%",
  cursor: "pointer",
  appearance: "none",
  height: "8px",
  borderRadius: "5px",
  background: "#61dafb",
  outline: "none",
};

const buttonStyle = {
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#61dafb",
  color: "black",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default App;
