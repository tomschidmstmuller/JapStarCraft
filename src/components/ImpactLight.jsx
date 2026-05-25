import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ImpactLight({ position, onDone }) {
  const ref = useRef();
  const life = useRef(1.0);
  useFrame(() => {
    if (!ref.current) return;
    life.current -= 0.08;
    ref.current.intensity = life.current * 6;
    if (life.current <= 0) onDone();
  });
  return <pointLight ref={ref} color="#ff5500" intensity={6} distance={8} position={position} />;
}
