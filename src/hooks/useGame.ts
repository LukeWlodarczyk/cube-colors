import { useState } from "react";

import useColors, { COLOR_SCHEME } from "./useColors";
import useMode from "./useMode";

type GameState = "AWAITING_GUESS" | "REVEALED";

const useGame = () => {
  const [state, setState] = useState<GameState>("AWAITING_GUESS");

  const { mode, doubleModeSide } = useMode();

  const { colors } = useColors(COLOR_SCHEME);

  const reveal = () => setState("REVEALED");

  const prepareNextRound = () => {
    if (mode.isDouble) doubleModeSide.setRandom();
    colors.current.setRandom(colors.active.value);
    setState("AWAITING_GUESS");
  };

  const advance = () => {
    if (state === "AWAITING_GUESS") reveal();
    else if (state === "REVEALED") prepareNextRound();
  };

  return {
    mode,
    doubleModeSide,
    colors,
    isRevealed: state === "REVEALED",
    actions: {
      advance,
      nextColor: colors.current.next,
      prevColor: colors.current.prev,
      useDoubleMode: mode.setDouble,
      useTripleMode: mode.setTriple,
      toggleActiveColor: colors.active.toggle,
    },
  };
};

export default useGame;
