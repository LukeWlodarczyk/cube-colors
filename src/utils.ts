import { COLOR_SCHEME, type SideColor } from "./hooks/useColors";

export const getNeighbors = (color: SideColor) => {
  const index = COLOR_SCHEME.indexOf(color);

  return {
    left: COLOR_SCHEME[(index - 1 + COLOR_SCHEME.length) % COLOR_SCHEME.length],
    right: COLOR_SCHEME[(index + 1) % COLOR_SCHEME.length],
  };
};

export const getRandom = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
