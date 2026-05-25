import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ImpactFlash({ position, onDone }) {
  const ref = useRef();
  const life = useRef(1.0);
  useFrame(() => {
    if (!ref.current) return;
    life.current -= 0.06;
    ref.current.material.opacity = Math.max(0, life.current);
    ref.current.scale.setScalar(1 + (1 - life.current) * 2.5);
    if (life.current <= 0) onDone();
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.18, 8, 8]} />
      <meshBasicMaterial color="#ff6600" transparent opacity={1} />
    </mesh>
  );
}
