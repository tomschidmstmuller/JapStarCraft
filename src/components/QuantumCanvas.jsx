import { Canvas } from "@react-three/fiber";
import QuantumCoreScene from "./QuantumCore";

export default function QuantumCanvas({ frameloop }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      frameloop={frameloop}
    >
      <QuantumCoreScene />
    </Canvas>
  );
}
