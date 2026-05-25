import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CountUp from "./CountUp";
import SectionMeta from "./SectionMeta";
import useInViewport from "./useInViewport";
import * as Audio from "../audio/AudioEngine";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export default function HeroSection() {
  const [sectionRef, inView] = useInViewport(0.2);

  const handleDeploy = () => {
    Audio.playDeploy();
  };

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <Suspense fallback={<div className="hero-canvas" style={{ background: "#000005" }} />}>
        <HeroCanvas frameloop={inView ? "always" : "demand"} />
      </Suspense>

      <div className="hero-image-overlay" />

      <div className="hero-content">
        <SectionMeta clearance="// CLEARANCE: COMMAND" coords="SECTOR: KOPRULU // GRID: ALPHA-7" />
        <div className="title-jp-sub">赤星師団</div>
        <AnimatedText text="REDSTAR" className="hero-title-line" />
        <AnimatedText text="DIVISION" className="hero-sub-line" />
        <div className="title-tagline">コプルル宙域 · テラン自治領</div>

        <motion.button
          className="hero-deploy-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDeploy}
          onMouseEnter={() => Audio.playHover(600, 0.04)}
        >
          ⚡ 艦隊を展開 · DEPLOY
        </motion.button>
      </div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <div className="stat-row">
          <div className="stat-item"><span className="stat-label">ユニット数</span><span className="stat-val blue"><CountUp end={147} /></span></div>
          <div className="stat-item"><span className="stat-label">鉱物</span><span className="stat-val gold"><CountUp end={12} suffix="K" /></span></div>
          <div className="stat-item"><span className="stat-label">ベスピン</span><span className="stat-val teal"><CountUp end={3} suffix="K" /></span></div>
        </div>
      </motion.div>

      <motion.div
        className="hero-sector"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      >
        コプルル宙域<br />ステータス：稼働中
      </motion.div>
    </section>
  );
}
