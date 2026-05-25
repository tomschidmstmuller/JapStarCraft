import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SectionDivider from "./components/SectionDivider";
import QuantumCoreScene from "./components/QuantumCore";
import FleetGrid from "./components/FleetGrid";
import CinematicGrid from "./components/CinematicGrid";
import MissionBriefing from "./components/MissionBriefing";
import SectionMeta from "./components/SectionMeta";
import MatrixTerminal from "./components/MatrixTerminal";
import { Canvas } from "@react-three/fiber";
import "./App.css";

export default function App() {
  return (
    <div style={{ position: "relative", background: "var(--dark)" }}>
      <Navbar />

      <HeroSection />

      <SectionDivider />

      <section className="quantum-core-section" id="quantum">
        <Canvas
          camera={{ position: [0, 0, 14], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <QuantumCoreScene />
        </Canvas>

        <div className="quantum-overlay">
          <SectionMeta clearance="// CLEARANCE: REACTOR" coords="NODE: QUANTUM-7 // SIGNAL: STABLE" />
          <div className="quantum-status">
            <span className="quantum-dot" />
            QUANTUM RELAY ACTIVE
          </div>
          <h1 className="quantum-title">
            ORBITAL<br />
            SYNAPSE
          </h1>
          <p className="quantum-desc">
            Neural warfare infrastructure synchronized across tactical sectors.
          </p>
        </div>
      </section>

      <SectionDivider />

      <FleetGrid />

      <SectionDivider />

      <CinematicGrid />

      <SectionDivider />

      <MissionBriefing />

      <SectionDivider />

      <MatrixTerminal />
      <div className="atmo-grid" />
      <div className="atmo-data-stream" />
      <div className="atmo-fog" />
      <div className="atmo-energy-pulse" />
      <div className="global-scanlines" />
      <div className="global-vignette" />
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  );
}
