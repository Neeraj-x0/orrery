import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBaseMap } from "./redux/baseMap";
import { setAction } from "./redux/Action";
import SpeechComponent from "./SpeechComponent";
import {
  FaSatelliteDish,
  FaMap,
  FaGlobe,
  FaMapMarkedAlt,
  FaMapMarked,
  FaMapMarkerAlt,
  FaMapMarker,
  FaMapPin,
  FaMapSigns,
  FaSearchLocation,
  FaRoad,
  FaLayerGroup,
} from "react-icons/fa";

function ControlPanel() {
  const [speed, setSpeed] = useState(1);

  const dispatch = useDispatch();

  return (
    <div className="h-full absolute w-[20%] bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">Web Orrery</h1>
      <div className="flex flex-col w-full gap-4">
        {/*Speed Control*/}
        <div className="flex flex-col gap-2 w-full">
          <div>
            <label className="text-gray-200">Orbital Speed</label>
            <p className="text-gray-200 text-xs">
              Current Speed: {speed}x
            </p>
          </div>
          <input
            className="bg-white text-black"
            type="range"
            min="1"
            max="10"
            step="0.1"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        {/* Orbital Labels*/}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Labels</label>
          <label class="switch ">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        {/*Orbital Path */}
        <div className="w-full flex justify-between">
          <label className="text-gray-200">Orbital Path</label>
          <label class="switch ">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        {/*Educational Mode*/}

        <div className="w-full flex justify-between">
          <label className="text-gray-200">Educational Mode</label>
          <label class="switch ">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
