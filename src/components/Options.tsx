import { twMerge } from "tailwind-merge";

import { COLOR_SCHEME, type SideColor } from "../hooks/useColors";
import type { Mode } from "../hooks/useMode";

import ColorTile from "./ColorTile";

type Props = {
  mode: Mode;
  activeColors: SideColor[];
  onColorSelect: (color: SideColor) => void;
  className?: string;
};

const Options = ({ mode, activeColors, onColorSelect, className }: Props) => {
  const handleClick =
    (color: SideColor) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      onColorSelect(color);
    };

  return (
    <section className={twMerge(className)}>
      <h2 className="text-white text-center text-lg mb-4">Front Face Colors</h2>
      <div className="flex gap-8 justify-center">
        {COLOR_SCHEME.map((color) => (
          <button
            className="cursor-pointer"
            key={color}
            onClick={handleClick(color)}
          >
            <ColorTile
              className={twMerge(!activeColors.includes(color) && "opacity-30")}
              size="small"
              color={color}
              isRevealed
            />
          </button>
        ))}
      </div>
      <p className="text-center mt-4 text-lg">
        <span className="mr-1">Mode:</span>
        <span className={twMerge("mr-2", mode === "triple" && `text-gray-600`)}>
          Double (D)
        </span>
        /
        <span className={twMerge("ml-2", mode === "double" && `text-gray-600`)}>
          Triple (T)
        </span>
      </p>
    </section>
  );
};

export default Options;
