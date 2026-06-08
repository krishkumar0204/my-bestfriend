import { useContext } from "react";
import { MusicContext } from "./musicContextValue";

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used inside a MusicProvider.");
  }

  return context;
}
