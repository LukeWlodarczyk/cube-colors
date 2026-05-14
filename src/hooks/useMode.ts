import { useState } from "react";

export type Mode = "double" | "triple";

export type DoubleModeSide = "left" | "right";

const useMode = () => {
  const [mode, setMode] = useState<Mode>("triple");
  const [doubleModeSide, setDoubleModeSide] = useState<DoubleModeSide>("left");

  const randomizeDoubleModeSide = () =>
    setDoubleModeSide(Math.random() > 0.5 ? "left" : "right");

  return {
    mode: {
      value: mode,
      setDouble: () => setMode("double"),
      setTriple: () => setMode("triple"),
      isDouble: mode === "double",
      isTriple: mode === "triple",
    },
    doubleModeSide: {
      isLeft: doubleModeSide === "left",
      isRight: doubleModeSide === "right",
      setRandom: randomizeDoubleModeSide,
    },
  };
};

export default useMode;
