import { useEffect, useEffectEvent, useState } from "react";

import ColorTile from "./ColorTile";

export type Mode = "double" | "triple";

type RandomSide = "left" | "right";

export type SideColor = "green" | "red" | "blue" | "orange";

const ring: SideColor[] = ["green", "orange", "blue", "red"] as const;

const getNeighbors = (color: SideColor) => {
  const index = ring.indexOf(color);

  return {
    left: ring[(index - 1 + ring.length) % ring.length],
    right: ring[(index + 1) % ring.length],
  };
};

function getRandomColor(colors: SideColor[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}

const App = () => {
  const [mode, setMode] = useState<Mode>("double");

  const [activeColors, setActiveColors] = useState<SideColor[]>(() => [
    getRandomColor(ring),
  ]);

  const [randomSide, setRandomSide] = useState<RandomSide>("left");

  const isRandomLeft = randomSide === "left";
  const isRandomRight = randomSide === "right";

  const [currentColor, setCurrentColor] = useState<SideColor>(() =>
    getRandomColor(activeColors),
  );

  const [isRevealed, setIsRevealed] = useState(false);

  const isDouble = mode === "double";
  const isTriple = mode === "triple";

  const updateRandomSide = () =>
    setRandomSide(Math.random() > 0.5 ? "left" : "right");

  const handleColorClick = (selectedColor: SideColor) => {
    setActiveColors((colors) => {
      if (!colors.includes(selectedColor)) return [...colors, selectedColor];

      if (colors.length === 1) return colors;

      return colors.filter((color) => color !== selectedColor);
    });
  };

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    switch (e.code) {
      case "Space": {
        if (!isRevealed) {
          setIsRevealed(true);
        } else {
          if (isDouble) updateRandomSide();

          setCurrentColor(getRandomColor(activeColors));
          setIsRevealed(false);
        }
        break;
      }
      case "ArrowLeft": {
        setCurrentColor((prev) => {
          const index = ring.indexOf(prev);
          return ring[(index - 1 + ring.length) % ring.length];
        });
        setIsRevealed(true);
        break;
      }
      case "ArrowRight": {
        setCurrentColor((prev) => {
          const index = ring.indexOf(prev);
          return ring[(index + 1) % ring.length];
        });
        setIsRevealed(true);
        break;
      }
      case "KeyD": {
        setMode("double");
        break;
      }
      case "KeyT": {
        setMode("triple");
        break;
      }
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const neighbors = getNeighbors(currentColor);

  return (
    <div className="min-h-screen bg-dark text-white flex-col">
      <h1 className="text-center pt-10 mb-24 font-extrabold text-3xl text-yellow-300 underline underline-offset-24">
        Cube Colors
      </h1>
      <div className="flex justify-center items-center gap-16">
        <>
          <ColorTile
            size="large"
            color={neighbors.left}
            isRevealed={isRevealed}
            isActive={isTriple || isRandomLeft}
          />

          <ColorTile size="large" color={currentColor} isRevealed />

          <ColorTile
            size="large"
            color={neighbors.right}
            isRevealed={isRevealed}
            isActive={isTriple || isRandomRight}
          />
        </>
      </div>

      <p className="text-white mt-28 mb-4 text-center text-lg">
        Front Face Colors
      </p>
      <div className="flex gap-8 justify-center">
        {ring.map((color) => (
          <button
            className="cursor-pointer"
            key={color}
            onClick={(e) => {
              e.currentTarget.blur();
              handleColorClick(color);
            }}
          >
            <ColorTile
              className={`${!activeColors.includes(color) && "opacity-30"}`}
              size="small"
              color={color}
              isRevealed
            />
          </button>
        ))}
      </div>
      <p className="text-center mt-4 text-lg">
        <span className="mr-1">Mode:</span>
        <span className={`mr-2 ${mode === "triple" ? `text-gray-600` : ""}`}>
          Double (D)
        </span>
        /
        <span className={`ml-2 ${mode === "double" ? `text-gray-600` : ""}`}>
          Triple (T)
        </span>
      </p>
    </div>
  );
};

export default App;
