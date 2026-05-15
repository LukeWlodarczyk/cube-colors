import { useState } from "react";

import { getNeighbors, getRandom } from "../utils";

export const COLOR_SCHEME = ["green", "orange", "blue", "red"] as const;

export type SideColor = (typeof COLOR_SCHEME)[number];

const useColors = (colors: readonly SideColor[]) => {
  const [activeColors, setActiveColors] = useState<SideColor[]>(() => [
    getRandom([...colors]),
  ]);

  const [currentColor, setCurrentColor] = useState<SideColor>(activeColors[0]);

  const neighbors = getNeighbors(currentColor);

  const toggleActiveColors = (selectedColor: SideColor) => {
    setActiveColors((colors) => {
      const set = new Set(colors);

      if (set.has(selectedColor) && set.size > 1) {
        set.delete(selectedColor);
        if (selectedColor === currentColor) setRandomCurrentColor([...set]);
      } else {
        set.add(selectedColor);
        setCurrentColor(selectedColor);
      }

      return [...set];
    });
  };

  const setRandomCurrentColor = (colors: SideColor[]) =>
    setCurrentColor(getRandom(colors));

  const navigateColor = (direction: number) => {
    setCurrentColor((prev) => {
      const index = colors.indexOf(prev);
      const nextIndex = (index + direction + colors.length) % colors.length;
      return colors[nextIndex];
    });
  };

  return {
    colors: {
      active: {
        value: activeColors,
        set: setActiveColors,
        toggle: toggleActiveColors,
      },
      current: {
        value: currentColor,
        set: setCurrentColor,
        neighbors,
        setRandom: setRandomCurrentColor,
        next: () => navigateColor(1),
        prev: () => navigateColor(-1),
      },
    },
  };
};

export default useColors;
