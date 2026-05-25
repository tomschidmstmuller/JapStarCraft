import { Canvas } from "@react-three/fiber";
import ThreeScene from "./ThreeScene";

export default function HeroCanvas({ frameloop }) {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 2, 9], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#000005" }}
        frameloop={frameloop}
      >
        <ThreeScene />
      </Canvas>
    </div>
  );
}
