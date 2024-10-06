import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import SpeechComponent from "./SpeechComponent";
import { setOrbitSpeed, setShowLabel, setShowOrbit, setShowQuiz } from "./redux/astro";

function ControlPanel() {
const orbitSpeed = useSelector((state)=>state.astro.orbitSpeed);
  const dispatch = useDispatch();

  return (
    <div className="h-full font-semibold absolute w-[20%] bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">Web Orrery</h1>
      <div className="flex flex-col w-full gap-4">
        {/*Speed Control*/}
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
            value={orbitSpeed} // Set the slider's position to the speed state
            onChange={(e) => dispatch(setOrbitSpeed(Number(e.target.value)))} // Ensure value is a number
          />
        </div>
        {/* Orbital Labels*/}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Labels</label>
          <label className="switch">
            <input type="checkbox" defaultChecked onChange={()=>dispatch(setShowLabel())} />
            <span className="slider round"></span>
          </label>
        </div>
        {/*Orbital Path */}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Path</label>
          <label className="switch">
            <input type="checkbox" defaultChecked onChange={()=>dispatch(setShowOrbit())} />
            <span className="slider round"></span>
          </label>
        </div>
        {/*Educational Mode*/}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Educational Mode</label>
          <label className="switch">
            <input type="checkbox" onChange={()=>dispatch(setShowQuiz())} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
      <SpeechComponent />
      </div>
    </div>
  );
}

export default ControlPanel;
