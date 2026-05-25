import { useCallback } from "react";
import * as Audio from "../audio/AudioEngine";

export function useClickSound(freq) {
  return useCallback(() => Audio.playClick(freq), [freq]);
}

export function useHoverSound(freq) {
  return useCallback(() => Audio.playHover(freq), [freq]);
}
