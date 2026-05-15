import { useSwipeable } from "react-swipeable";
import { useHotkey } from "@tanstack/react-hotkeys";

import Heading from "./components/Heading";
import ColorTile from "./components/ColorTile";
import Controls from "./components/Controls";

import useGame from "./hooks/useGame";

const App = () => {
  const { isRevealed, colors, mode, doubleModeSide, actions } = useGame();

  useHotkey("Space", actions.advance);
  useHotkey("ArrowLeft", actions.prevColor);
  useHotkey("ArrowRight", actions.nextColor);
  useHotkey("D", actions.useDoubleMode);
  useHotkey("T", actions.useTripleMode);

  const swipeable = useSwipeable({
    onTap: actions.advance,
    onSwipedLeft: actions.nextColor,
    onSwipedRight: actions.prevColor,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="min-h-dvh bg-dark text-white flex flex-col">
      <Heading className="mt-10 mb-16">Cube Color Scheme</Heading>

      <div
        {...swipeable}
        className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-16 mx-4 md:mx-18 mt-auto mb-24"
      >
        <ColorTile
          size="large"
          color={colors.current.neighbors.left}
          isRevealed={isRevealed}
          isActive={mode.isTriple || doubleModeSide.isLeft}
        />

        <ColorTile size="large" color={colors.current.value} isRevealed />

        <ColorTile
          size="large"
          color={colors.current.neighbors.right}
          isRevealed={isRevealed}
          isActive={mode.isTriple || doubleModeSide.isRight}
        />
      </div>

      <Controls
        className="mt-auto mb-26"
        mode={mode.value}
        activeColors={colors.active.value}
        isRevealed={isRevealed}
        onAdvanceClick={actions.advance}
        onPrevColorClick={actions.prevColor}
        onNextColorClick={actions.nextColor}
        onColorToggle={actions.toggleActiveColor}
        onDoubleModeClick={actions.useDoubleMode}
        onTripleModeClick={actions.useTripleMode}
      />
    </div>
  );
};

export default App;
