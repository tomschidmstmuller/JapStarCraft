import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Audio from "../audio/AudioEngine";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMute = () => {
    Audio.setEnabled(muted);
    setMuted(!muted);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ borderBottomColor: scrolled ? "var(--hud-border)" : "transparent" }}
    >
      <div className="nav-logo">テラン<span>.司令</span></div>
      <ul className="nav-links">
        {[
          { id: "hero", jp: "戦略", en: "COMMAND" },
          { id: "quantum", jp: "量子", en: "REACTOR" },
          { id: "fleet", jp: "艦隊", en: "DEPLOY" },
          { id: "briefing", jp: "情報", en: "INTEL" },
        ].map(link => (
          <li key={link.id}>
            <a className="nav-link"
              onClick={() => { scrollTo(link.id); Audio.playClick(700, 0.04); }}
              onMouseEnter={() => Audio.playHover(1100, 0.025)}
            >
              <span className="nav-jp">{link.jp}</span>
              <span className="nav-en">{link.en}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-status">
        <span className="nav-dot" />
        <span style={{ fontFamily: 'var(--font-hud)', fontSize: '11px' }}>オンライン</span>
        <span
          onClick={toggleMute}
          onMouseEnter={() => Audio.playHover(800, 0.025)}
          style={{ cursor: "pointer", marginLeft: 12, fontSize: 11, opacity: 0.5, fontFamily: "var(--font-hud)" }}
        >
          {muted ? "[MUTE]" : "[AUDIO]"}
        </span>
      </div>
    </motion.nav>
  );
}
