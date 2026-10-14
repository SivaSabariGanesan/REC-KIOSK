import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [showWhiteTransition, setShowWhiteTransition] = useState(false);
  const [purpleFalling, setPurpleFalling] = useState(false);
  const [kioskGrowing, setKioskGrowing] = useState(false);
  const letters = ["K", "I", "O", "S", "K"];

  useEffect(() => {
    // Start purple falling effect - reduced delay
    setTimeout(() => setPurpleFalling(true), 200);

    // Start showing letters - faster timing
    const letterTimer = setInterval(() => {
      setCurrentLetter((prev) => {
        if (prev < letters.length - 1) {
          return prev + 1;
        } else {
          // Start growing effect
          setTimeout(() => {
            setKioskGrowing(true);
            // Start white transition
            setTimeout(() => {
              setShowWhiteTransition(true);
              setTimeout(onComplete, 400);
            }, 600);
          }, 400);
          return prev;
        }
      });
    }, 250);

    return () => clearInterval(letterTimer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Purple falling background */}
      <div
        className={`absolute inset-0 bg-[#6a1b9a] transition-transform duration-[1000ms] ease-out ${
          purpleFalling ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      />

      {/* White transition overlay */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 ${
          showWhiteTransition ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Kiosk Letters */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-2 sm:space-x-4 md:space-x-5">
          {letters.map((letter, index) => (
            <div
              key={index}
              className={`font-bold transition-all duration-800 font-sans ${
                index <= currentLetter ? "opacity-100" : "opacity-0"
              } ${
                kioskGrowing
                  ? "text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] scale-110"
                  : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl scale-100"
              } ${showWhiteTransition ? "text-[#6a1b9a]" : "text-white"}`}
              style={{
                animationDelay: `${index * 250}ms`,
                transition: "all 0.8s ease-out",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;