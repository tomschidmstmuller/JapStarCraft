import { useEffect, useRef } from "react";
import * as Audio from "../audio/AudioEngine";

let globalStarted = false;

export default function AmbientAudio({ sectionInView = [] }) {
  const startedRef = useRef(globalStarted);

  useEffect(() => {
    const handleInteraction = () => {
      if (!startedRef.current) {
        Audio.init();
        Audio.setEnabled(true);
        Audio.startReactorHum();
        Audio.startSignalChirps();
        Audio.startRadioChatter();
        startedRef.current = true;
        globalStarted = true;
      }
    };

    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return null;
}
