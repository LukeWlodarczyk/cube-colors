import Heading from "./components/Heading";
import ColorTile from "./components/ColorTile";
import Options from "./components/Options";

import useMode from "./hooks/useMode";
import useColors, { COLOR_SCHEMA } from "./hooks/useColors";
import useKeyboardListener from "./hooks/useKeyboardListener";

const App = () => {
  const { mode, doubleModeSide } = useMode();

  const { colors, reveal } = useColors(COLOR_SCHEMA);

  useKeyboardListener({
    Space: () => {
      if (!reveal.value) return reveal.toggle();

      if (mode.isDouble) doubleModeSide.setRandom();

      colors.current.setRandom();
      reveal.toggle();
    },
    ArrowLeft: () => {
      colors.current.prev();
      reveal.set(true);
    },
    ArrowRight: () => {
      colors.current.next();
      reveal.set(true);
    },
    KeyD: () => mode.set("double"),
    KeyT: () => mode.set("triple"),
  });

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <Heading className="mt-10 mb-24">Cube Color Schema</Heading>

      <div className="flex justify-center items-center gap-8 md:gap-16 mx-4 md:mx-18">
        <ColorTile
          size="large"
          color={colors.current.neighbors.left}
          isRevealed={reveal.value}
          isActive={mode.isTriple || doubleModeSide.isLeft}
        />

        <ColorTile size="large" color={colors.current.value} isRevealed />

        <ColorTile
          size="large"
          color={colors.current.neighbors.right}
          isRevealed={reveal.value}
          isActive={mode.isTriple || doubleModeSide.isRight}
        />
      </div>

      <Options
        className="mt-20"
        mode={mode.value}
        activeColors={colors.active.value}
        onColorSelect={colors.active.select}
      />
    </div>
  );
};

export default App;
