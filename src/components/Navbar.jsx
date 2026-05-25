import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <li><a className="nav-link" onClick={() => scrollTo("hero")}><span className="nav-jp">戦略</span><span className="nav-en">COMMAND</span></a></li>
        <li><a className="nav-link" onClick={() => scrollTo("quantum")}><span className="nav-jp">量子</span><span className="nav-en">REACTOR</span></a></li>
        <li><a className="nav-link" onClick={() => scrollTo("fleet")}><span className="nav-jp">艦隊</span><span className="nav-en">DEPLOY</span></a></li>
        <li><a className="nav-link" onClick={() => scrollTo("briefing")}><span className="nav-jp">情報</span><span className="nav-en">INTEL</span></a></li>
      </ul>
      <div className="nav-status">
        <span className="nav-dot" />
        <span style={{ fontFamily: 'var(--font-hud)', fontSize: '11px' }}>オンライン</span>
      </div>
    </motion.nav>
  );
}
