import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import Sun from "./components/CelestialBody/Planets/Sun/Sun";
import Planets from "./components/CelestialBody/Planets/Planets";
import planets from "./assets/planets";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz } from "./redux/astro";
import { speak } from "./functions";

const Orrery = ({ speed }) => {
  const showQuiz = useSelector((state) => state.astro.showQuiz);
  const quiz = useSelector((state) => state.astro.Quiz);
  const dispatch = useDispatch();

  // State to handle selected answer and feedback
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Use useEffect to trigger TTS when feedback or quiz question changes
  useEffect(() => {
    if (feedback) {
      speak(feedback);
    }
  }, [feedback]);

  useEffect(() => {
    if (quiz) speak(quiz.question);
  }, [quiz]);

  // Function to handle answer selection
  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);

    if (option === quiz.answer) {
      setFeedback(
        "Good one! Keep it up! Want to do one more? Choose the field in which you want to do the quiz from the panel on the left side."
      );
    } else {
      setFeedback("Oops, that's not correct! Try again.");
    }

    // Reset feedback after some time (e.g., 5 seconds)
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setQuiz(null);
    }, 5000);
  };

  // Function to close quiz panel
  const handleCloseQuiz = () => {
    dispatch(setQuiz(null)); // Hide the quiz when the close button is clicked
  };

  return (
    <Canvas
      style={{ width: "90vw", height: "100vh" }}
      camera={{ fov: 50, position: [0, 0, 30] }}
    >
      <OrbitControls />

      {/* Starry background */}
      {showQuiz && (
        <Html>
          <div
            className="fade-in fade-in-up"
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: 100,
              position: "absolute",
              top: -250,
              right: -350,
            }}
          >
            <img
              src="/astro.png"
              alt="astronaut"
              style={{
                width: "100px",
                marginRight: "10px",
                marginBottom: "70px",
              }}
            />
            <div
              style={{
                width: "500px",
                height: "auto",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                backdropFilter: "blur(10px)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                color: "white",
                position: "relative",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseQuiz}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              {quiz ? (
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-200 mb-4">
                    {quiz.question}
                  </h1>
                  <div className="flex flex-col">
                    {quiz.options.map((option, index) => (
                      <button
                        key={index}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-md mt-2 transition-transform transform hover:scale-105 ${
                          selectedAnswer === option
                            ? option === quiz.answer
                              ? "bg-green-500"
                              : "bg-red-500"
                            : ""
                        }`}
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                    {/* Feedback */}
                    {feedback && (
                      <div className="mt-4">
                        <p className="text-lg text-gray-300">{feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-200 mb-4">
                    Web Orrery
                  </h1>
                  <p className="text-gray-200 text-base leading-relaxed">
                    Welcome to the Web Orrery, an educational tool that
                    simulates the solar system. Use the control panel to adjust
                    the orbital speed, display orbital paths, and toggle labels.
                    For a quiz on the solar system, click the button below.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Html>
      )}
      <Stars
        radius={100} // Radius of the starfield sphere
        depth={50} // Starfield depth to give a 3D effect
        count={5000} // Number of stars
        factor={4} // Size factor for stars
        saturation={0} // Color saturation of the stars
        fade={true} // Fades the stars on the edges
      />
      <Suspense fallback={null}>
        {/* Sun */}
        <Sun textureUrl="/textures/2k_sun.jpg" radius={1} />

        {/* Render Planets */}
        {planets.map((planet, index) => (
          <Planets
            key={index}
            textureUrl={planet.textureUrl}
            radius={planet.radius}
            semiMajorAxis={planet.semiMajorAxis}
            inclination={planet.inclination}
            eccentricity={planet.eccentricity}
            orbitalPeriod={planet.orbitalPeriod * speed}
            name={planet.name}
            moons={planet.moons}
            nearEarthAsteroids={planet.nearEarthAsteroids}
            nearEarthComets={planet.nearEarthComets}
            potentiallyHazardousAsteroids={planet.potentiallyHazardousAsteroids}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default Orrery;
