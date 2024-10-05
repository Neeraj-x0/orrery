import "./App.css";
import Orrery from "./Orrery";
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
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <h2 style={headerStyle}>Controls</h2>
        <div style={controlContainer}>
          <label style={labelStyle}>Speed: {speed.toFixed(1)}</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.01"
            value={speed}
            onChange={handleSpeedChange}
            style={sliderStyle}
          />
          <button onClick={toggleBorders} style={buttonStyle}>
            {showBorders ? "Hide Borders" : "Show Borders"}
          </button>
        </div>
      </div>
      <Orrery speed={speed} showBorders={showBorders} />
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
