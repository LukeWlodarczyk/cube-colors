import { twMerge } from "tailwind-merge";

import { COLOR_SCHEME, type SideColor } from "../hooks/useColors";
import type { Mode } from "../hooks/useMode";

import ColorTile from "./ColorTile";

type Props = {
  mode: Mode;
  activeColors: SideColor[];
  isRevealed: boolean;
  onAdvanceClick: () => void;
  onPrevColorClick: () => void;
  onNextColorClick: () => void;
  onColorToggle: (color: SideColor) => void;
  onDoubleModeClick: () => void;
  onTripleModeClick: () => void;
  className?: string;
};

const Controls = ({
  mode,
  activeColors,
  isRevealed,
  onAdvanceClick,
  onPrevColorClick,
  onNextColorClick,
  onColorToggle,
  onDoubleModeClick,
  onTripleModeClick,
  className,
}: Props) => {
  const handleClick =
    (color: SideColor) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      onColorToggle(color);
    };

  return (
    <section
      className={twMerge("flex flex-row flex-wrap md:flex-nowrap", className)}
    >
      <button
        onClick={onPrevColorClick}
        className="w-1/3 md:w-full text-6xl order-2 md:order-1 hover:text-white active:text-white text-gray-400 cursor-pointer"
      >
        &larr;
      </button>
      <div className="w-full md:w-fit m-auto order-1 md:order-2 mb-12 md:mb-0">
        <div className="flex gap-8 justify-center">
          {COLOR_SCHEME.map((color) => (
            <button
              className="cursor-pointer"
              key={color}
              onClick={handleClick(color)}
            >
              <ColorTile
                className={twMerge(
                  !activeColors.includes(color) && "opacity-30",
                )}
                size="small"
                color={color}
                isRevealed
              />
            </button>
          ))}
        </div>
        <div className="text-center mt-6 text-lg flex gap-4 justify-center md:justify-between">
          <button
            onClick={onDoubleModeClick}
            className={twMerge(
              "w-full max-w-36 border rounded-md px-2 py-1 cursor-pointer hover:text-white",
              mode === "triple" && `text-gray-400`,
            )}
          >
            Double (<kbd>D</kbd>)
          </button>

          <button
            onClick={onTripleModeClick}
            className={twMerge(
              "w-full max-w-36 border rounded-md px-2 py-1 cursor-pointer hover:text-white",
              mode === "double" && `text-gray-400`,
            )}
          >
            Triple (<kbd>T</kbd>)
          </button>
        </div>
      </div>
      <button
        onClick={onAdvanceClick}
        className="w-1/3 text-2xl order-2 md:hidden tracking-wider hover:text-white active:text-white text-gray-400 cursor-pointer"
      >
        {isRevealed ? "Shuffle" : "Reveal"}
      </button>
      <button
        onClick={onNextColorClick}
        className="w-1/3 md:w-full text-6xl order-3 hover:text-white active:text-white text-gray-400 cursor-pointer"
      >
        &rarr;
      </button>
    </section>
  );
};

export default Controls;
