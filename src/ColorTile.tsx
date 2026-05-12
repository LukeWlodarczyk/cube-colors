import { twMerge } from "tailwind-merge";

import { type SideColor } from "./App";

type Size = "small" | "large";

type TileProps = {
  color: SideColor;
  isRevealed?: boolean;
  isActive?: boolean;
  size: Size;
  className?: string;
};

const colorMapClasses = {
  green: "bg-cube-green",
  red: "bg-cube-red",
  blue: "bg-cube-blue",
  orange: "bg-cube-orange",
} as const;

const ColorTile = ({
  color,
  isRevealed = false,
  isActive = true,
  size,
  className,
}: TileProps) => {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <div
      className={twMerge(
        "bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_3px,transparent_3px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_3px,transparent_3px)] bg-size-[33.333%_33.333%] bg-position-[0_-2px]",
        "mask-[radial-gradient(ellipse_at_center,black_25%,transparent_125%)]",
        "aspect-square transition-all duration-300",
        "flex items-center justify-center",
        "font-semibold uppercase tracking-widest text-lg",
        "bg-gray-500",

        isLarge && "w-84 rounded-3xl",
        isSmall && "w-12 rounded-md",
        isRevealed && `scale-100 opacity-100 ${colorMapClasses[color]}`,
        !isActive && "scale-80 opacity-0",
        className,
      )}
    >
      {isLarge && isRevealed && color}
      {!isRevealed && "?"}
    </div>
  );
};

export default ColorTile;
