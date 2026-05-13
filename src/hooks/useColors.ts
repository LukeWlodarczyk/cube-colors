import { useState } from "react";

import { getNeighbors, getRandom } from "../utils";

export const COLOR_SCHEMA = ["green", "orange", "blue", "red"] as const;

export type SideColor = (typeof COLOR_SCHEMA)[number];

const useColors = (colors: readonly SideColor[]) => {
  const [activeColors, setActiveColors] = useState<SideColor[]>(() => [
    getRandom([...colors]),
  ]);

  const [currentColor, setCurrentColor] = useState<SideColor>(activeColors[0]);

  const [isRevealed, setIsRevealed] = useState(false);

  const neighbors = getNeighbors(currentColor);

  const selectActiveColors = (selectedColor: SideColor) => {
    setActiveColors((colors) => {
      const set = new Set(colors);

      if (set.has(selectedColor) && set.size > 1) set.delete(selectedColor);
      else set.add(selectedColor);

      return [...set];
    });
  };

  const setRandomCurrentColor = () => setCurrentColor(getRandom(activeColors));

  const setNextCurrentColor = () => {
    setCurrentColor((prev) => {
      const index = colors.indexOf(prev);
      return colors[(index + 1) % colors.length];
    });
  };

  const setPrevCurrentColor = () => {
    setCurrentColor((prev) => {
      const index = colors.indexOf(prev);
      return colors[(index - 1 + colors.length) % colors.length];
    });
  };

  return {
    colors: {
      active: {
        value: activeColors,
        set: setActiveColors,
        select: selectActiveColors,
      },
      current: {
        value: currentColor,
        set: setCurrentColor,
        neighbors,
        setRandom: setRandomCurrentColor,
        next: setNextCurrentColor,
        prev: setPrevCurrentColor,
      },
    },
    reveal: {
      value: isRevealed,
      toggle: () => setIsRevealed((r) => !r),
      set: setIsRevealed,
    },
  };
};

export default useColors;
