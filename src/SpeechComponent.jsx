import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "./redux/Action";
import {
  setOrbitSpeed,
  setShowOrbit,
  setShowLabel,
  setShowQuiz,
} from "./redux/astro";

import { FaMicrophone } from "react-icons/fa6";
import axios from "axios";
import { speak } from "./functions";
function SpeechtoText() {
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentSpeed = useSelector((state) => state.astro.orbitSpeed);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Please try Chrome."
      );
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      cancelAnimationFrame(animationFrameRef.current);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      if (transcript === "") return;

      console.log("Transcript:", transcript);
      axios
        .post("https://voicegisapi.neerajx0.xyz/query", {
          text: transcript,
        })
        .then(({ data: response }) => {
          console.log("Response from speechComponent:", response);

          // Check if the response result is a string (voice output)
          if (typeof response.result === "string") {
            console.log("Speaking:", response.result);
            speak(response.result);
          } else {
            // Handle non-string responses (actions)
            const { action, target, change, value } = response.result;

            console.log("Dispatching action:", action);

            switch (action) {
              case "show":
                if (target === "orbits") {
                  console.log("Dispatching show orbits");
                  dispatch(setShowOrbit());
                } else if (target === "labels") {
                  console.log("Dispatching show labels");
                  dispatch(setShowLabel());
                }
                break;
              case "hide":
                if (target === "orbits") {
                  console.log("Dispatching hide orbits");
                  dispatch(setShowOrbit());
                } else if (target === "labels") {
                  console.log("Dispatching hide labels");
                  dispatch(setShowLabel());
                }
              case "speed":
                if (change === "increase") {
                  if (currentSpeed === 30) {
                    console.log("Speed already at maximum");
                    speak("Speed already at maximum");
                    return;
                  }
                  if (value) {
                    console.log("Dispatching set speed");
                    dispatch(setOrbitSpeed(currentSpeed + value));
                  } else {
                    console.log("Dispatching increase speed");
                    dispatch(setOrbitSpeed(currentSpeed + 1));
                  }
                } else if (change === "decrease") {
                  if (currentSpeed === 1) {
                    console.log("Speed already at minimum");
                    speak("Speed already at minimum");
                    return;
                  }
                  if (value) {
                    console.log("Dispatching set speed");
                    dispatch(setOrbitSpeed(currentSpeed - value));
                  } else {
                    console.log("Dispatching decrease speed");
                    dispatch(setOrbitSpeed(currentSpeed - 1));
                  }
                }

                break;

              default:
                console.log("Unknown action:", action);
                break;
            }
          }
        });
    }
  }, [transcript, dispatch]);

  const startAudioLevelDetection = () => {
    if (!analyserRef.current) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyserRef.current);
          updateAudioLevel();
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    } else {
      updateAudioLevel();
    }
  };

  const updateAudioLevel = () => {
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const average =
      dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
    setAudioLevel(average / 128);
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      cancelAnimationFrame(animationFrameRef.current);
    } else {
      recognitionRef.current.start();
      startAudioLevelDetection();
    }
    setIsListening(!isListening);
  };
  const scaleFactor = 1 + audioLevel * 0.5;

  return (
    <div className="relative text-center items-center inline-block">
      <button
        onClick={toggleListening}
        style={{
          transform: `scale(${scaleFactor})`,
          transition: "transform 0.1s ease-in-out",
        }}
        className="p-2 bg-blue-500 hover:bg-blue-400 rounded-full shadow-lg text-white transition duration-300 ease-in-out z-10 hover:shadow-2xl"
      >
        <FaMicrophone />
      </button>
      {isListening ? (
        <>
          <div
            className="absolute  inset-0 rounded-full animate-ping pointer-events-none"
            style={{
              backgroundColor: `rgba(59, 130, 246, ${audioLevel * 0.7})`,
              transform: `scale(${1 + audioLevel * 0.5})`,
              transition: "all 0.1s ease-in-out",
            }}
          />
          <div className=" text-black bg-slate-100 shadow-xl ease-in duration-150 rounded-md p-1 mt-2 text-xs z-10">
            Listening...
          </div>
        </>
      ) : (
        <div className="transform  text-black bg-slate-100 duration-100  shadow-xl ease-in rounded-md p-1 mt-2 text-xs z-10">
          Click on the microphone to start listening
        </div>
      )}
    </div>
  );
}

export default SpeechtoText;
