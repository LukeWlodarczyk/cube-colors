import { useEffect, useEffectEvent } from "react";

export const APP_KEY_CODES = [
  "Space",
  "ArrowLeft",
  "ArrowRight",
  "KeyD",
  "KeyT",
] as const;

export type AppShortcutKey = (typeof APP_KEY_CODES)[number];

type KeyboardActions = Record<AppShortcutKey, () => void>;

// generic version of the isAppShortcut typeguard
const isInArray = <T, A extends T>(
  item: T,
  array: ReadonlyArray<A>,
): item is A => array.includes(item as A);

// const isAppShortcut = (code: string): code is AppShortcutKey => {
//   return (APP_KEY_CODES as readonly string[]).includes(code);
//   return APP_KEY_CODES.some((appCode) => appCode === code);
// };

const useKeyboardListener = (actions: KeyboardActions) => {
  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (isInArray(e.code, APP_KEY_CODES)) actions[e.code]();
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useKeyboardListener;
