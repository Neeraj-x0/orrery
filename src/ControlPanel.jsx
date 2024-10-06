import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechComponent from "./SpeechComponent";
import {
  setOrbitSpeed,
  setShowLabel,
  setShowOrbit,
  setShowQuiz,
  setQuiz,
} from "./redux/astro";
import axios from "axios";

function ControlPanel() {
  const orbitSpeed = useSelector((state) => state.astro.orbitSpeed);
  const showQuiz = useSelector((state) => state.astro.showQuiz);
  const dispatch = useDispatch();

  // State for the selected quiz topic
  const [selectedTopic, setSelectedTopic] = useState("solar-system");

  // Function to handle quiz request
  const handleQuizRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/quiz", {
        text: selectedTopic,
      });
      console.log("Quiz Response:", response.data);
      dispatch(setQuiz(response.data.result));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  return (
    <div className="h-full font-semibold absolute w-[20%] bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">Web Orrery</h1>
      <div className="flex flex-col w-full gap-4">
        {/* Speed Control */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <label className="text-gray-200">Orbital Speed</label>
            <p className="text-gray-200 font-semibold">{orbitSpeed}x</p>
          </div>
          <input
            className="bg-white text-black"
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={orbitSpeed}
            onChange={(e) => dispatch(setOrbitSpeed(Number(e.target.value)))}
          />
        </div>

        {/* Orbital Labels */}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Labels</label>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => dispatch(setShowLabel())}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Orbital Path */}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Path</label>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => dispatch(setShowOrbit())}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Educational Mode */}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Educational Mode</label>
          <label className="switch">
            <input type="checkbox" onChange={() => dispatch(setShowQuiz())} />
            <span className="slider round"></span>
          </label>
        </div>

        {showQuiz && (
          <div className="flex flex-col p-2 mb-10 scrolldown-in">
            <label className="text-gray-200"> Select topic for quiz</label>
            <select
              className="bg-gray-800 text-gray-200 w-full p-2 mt-2 rounded-md"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              required
            >
              <option value="solar-system">Solar System</option>
              <option value="galaxies">Galaxies</option>
              <option value="black-holes">Black Holes</option>
              <option value="mercury">Mercury</option>
              <option value="venus">Venus</option>
              <option value="earth">Earth</option>
              <option value="mars">Mars</option>
              <option value="jupiter">Jupiter</option>
              <option value="saturn">Saturn</option>
              <option value="uranus">Uranus</option>
              <option value="neptune">Neptune</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleQuizRequest}
            >
              Quiz Me!
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <SpeechComponent />
      </div>
    </div>
  );
}

export default ControlPanel;
