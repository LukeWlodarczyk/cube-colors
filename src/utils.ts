import { COLOR_SCHEMA, type SideColor } from "./hooks/useColors";

export const getNeighbors = (color: SideColor) => {
  const index = COLOR_SCHEMA.indexOf(color);

  return {
    left: COLOR_SCHEMA[(index - 1 + COLOR_SCHEMA.length) % COLOR_SCHEMA.length],
    right: COLOR_SCHEMA[(index + 1) % COLOR_SCHEMA.length],
  };
};

export const getRandom = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
