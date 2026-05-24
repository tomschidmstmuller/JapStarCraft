import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import "./App.css";

// ─── PLANET ──────────────────────────────────────────────────────────────────
function Planet() {
  const planetRef = useRef();
  const atmRef = useRef();
  const continents = useMemo(() => {
    const data = [
      { lat: 20, lon: 30, size: 0.55, color: "#2d8a4e" },
      { lat: -15, lon: 80, size: 0.45, color: "#3a9e5a" },
      { lat: 45, lon: -40, size: 0.5, color: "#2d7a42" },
      { lat: 10, lon: -70, size: 0.4, color: "#3a9e5a" },
      { lat: -35, lon: 140, size: 0.38, color: "#c8a85a" },
      { lat: 60, lon: 90, size: 0.42, color: "#4a7a3a" },
    ];
    return data.flatMap((d) => {
      const patches = [];
      const phi = ((90 - d.lat) * Math.PI) / 180;
      const theta = ((d.lon + 180) * Math.PI) / 180;
      for (let i = 0; i < 70; i++) {
        const rPhi = phi + (Math.random() - 0.5) * d.size;
        const rTheta = theta + (Math.random() - 0.5) * d.size;
        patches.push({
          x: 2.01 * Math.sin(rPhi) * Math.cos(rTheta),
          y: 2.01 * Math.cos(rPhi),
          z: 2.01 * Math.sin(rPhi) * Math.sin(rTheta),
          color: d.color,
          scale: 0.03 + Math.random() * 0.03,
        });
      }
      return patches;
    });
  }, []);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.08;
    if (atmRef.current) atmRef.current.rotation.y -= delta * 0.02;
  });

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial color="#1155aa" emissive="#001133" specular="#2288ff" shininess={60} />
        {continents.map((c, i) => (
          <mesh key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshPhongMaterial color={c.color} />
          </mesh>
        ))}
      </mesh>
      <mesh ref={atmRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial color="#4499ff" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[0.2, 0, 0.1]}>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshPhongMaterial color="#aaccff" transparent opacity={0.06} wireframe />
      </mesh>
    </group>
  );
}

// ─── IMPACT FLASH ─────────────────────────────────────────────────────────────
function ImpactFlash({ position, onDone }) {
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

// ─── LASER BEAM ───────────────────────────────────────────────────────────────
function LaserBeam({ from, to, onDone }) {
  const ref = useRef();
  const life = useRef(1.0);
  const { mid, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const m = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const axis = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(axis, dir.clone().normalize());
    return { mid: m, quaternion: q, length: len };
  }, [from, to]);
  useFrame(() => {
    if (!ref.current) return;
    life.current -= 0.08;
    ref.current.material.opacity = Math.max(0, life.current);
    if (life.current <= 0) onDone();
  });
  const color = Math.random() > 0.4 ? "#ff6600" : "#ff2200";
  return (
    <mesh ref={ref} position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.025, 0.025, length * 0.6, 4]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
}

// ─── BATTLECRUISER ────────────────────────────────────────────────────────────
function Battlecruiser({ position, scale = 1, rotY = Math.PI, phaseOffset = 0, onFire }) {
  const groupRef = useRef();
  const fireTimer = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const t = Date.now() * 0.001 + phaseOffset;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.25;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.04;
    fireTimer.current -= delta;
    if (fireTimer.current <= 0) {
      fireTimer.current = 0.3 + Math.random() * 0.5;
      if (onFire) {
        const world = new THREE.Vector3();
        groupRef.current.getWorldPosition(world);
        onFire(world.toArray());
      }
    }
  });
  const metal = <meshPhongMaterial color="#888899" specular="#aaaacc" shininess={80} />;
  const darkMetal = <meshPhongMaterial color="#556677" shininess={60} />;
  const chrome = <meshPhongMaterial color="#99aacc" shininess={100} />;
  const engineGlow = <meshBasicMaterial color="#4488ff" />;
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, rotY, -0.18]}>
      <mesh><boxGeometry args={[2.2, 0.28, 0.7]} />{metal}</mesh>
      <mesh position={[0.3, 0.28, 0]}><boxGeometry args={[0.35, 0.35, 0.35]} />{chrome}</mesh>
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.14, 0.7, 8]} />{chrome}</mesh>
      {[-0.28, 0.28].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.6, -0.1, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.1, 0.13, 1.1, 8]} />{darkMetal}</mesh>
          <mesh position={[-1.18, -0.1, z]}><sphereGeometry args={[0.11, 8, 8]} />{engineGlow}</mesh>
        </group>
      ))}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[-0.2, 0, side * 0.6]}><boxGeometry args={[1.0, 0.06, 0.55]} /><meshPhongMaterial color="#778899" shininess={70} /></mesh>
      ))}
      {[-0.15, 0.15].map((z, i) => (
        <mesh key={i} position={[1.0, 0.14, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 0.45, 6]} />{darkMetal}</mesh>
      ))}
      <pointLight color="#4488ff" intensity={2} distance={4} position={[-1.2, -0.1, 0]} />
    </group>
  );
}

// ─── IMPACT LIGHT ─────────────────────────────────────────────────────────────
function ImpactLight({ position, onDone }) {
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

// ─── CAMERA RIG ───────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const angle = useRef(0);
  useFrame((_, delta) => {
    angle.current += delta * 0.12;
    camera.position.x = Math.sin(angle.current) * 9;
    camera.position.z = Math.cos(angle.current) * 9;
    camera.position.y = 2.5 + Math.sin(angle.current * 0.4) * 1;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── THREE SCENE ──────────────────────────────────────────────────────────────
function ThreeScene() {
  const [lasers, setLasers] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [lights, setLights] = useState([]);
  const [impactCount, setImpactCount] = useState(0);

  const getRandomPlanetSurface = useCallback(() => {
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;
    return new THREE.Vector3(
      2.05 * Math.sin(phi) * Math.cos(theta),
      2.05 * Math.cos(phi),
      2.05 * Math.sin(phi) * Math.sin(theta)
    );
  }, []);

  const handleFire = useCallback((fromArr) => {
    const from = new THREE.Vector3(...fromArr);
    const target = getRandomPlanetSurface();
    const id = Date.now() + Math.random();
    setLasers(prev => [...prev, { id, from, to: target }]);
    setFlashes(prev => [...prev, { id: id + 0.1, position: target }]);
    setLights(prev => [...prev, { id: id + 0.2, position: target }]);
    setImpactCount(c => c + 1);
  }, [getRandomPlanetSurface]);

  return (
    <>
      <CameraRig />
      <Stars radius={200} depth={60} count={7000} factor={4} saturation={0.5} fade speed={0.5} />
      <ambientLight color="#112244" intensity={1.5} />
      <directionalLight color="#ffffff" intensity={2} position={[5, 3, 5]} />
      <pointLight color="#1a9fff" intensity={3} distance={25} position={[-4, 2, 3]} />
      <Planet />
      <Battlecruiser position={[3.5, 2.2, 2]} scale={1} rotY={Math.PI} phaseOffset={0} onFire={handleFire} />
      <Battlecruiser position={[4.2, 0.8, -1.5]} scale={0.55} rotY={Math.PI + 0.3} phaseOffset={2} onFire={handleFire} />
      <Battlecruiser position={[5, -0.5, 0.5]} scale={0.35} rotY={Math.PI + 0.5} phaseOffset={4} onFire={null} />
      {lasers.map(l => (
        <LaserBeam key={l.id} from={l.from} to={l.to} onDone={() => setLasers(prev => prev.filter(x => x.id !== l.id))} />
      ))}
      {flashes.map(f => (
        <ImpactFlash key={f.id} position={f.position} onDone={() => setFlashes(prev => prev.filter(x => x.id !== f.id))} />
      ))}
      {lights.map(l => (
        <ImpactLight key={l.id} position={l.position} onDone={() => setLights(prev => prev.filter(x => x.id !== l.id))} />
      ))}
    </>
  );
}

// ─── LETTER ANIMATION WRAPPER ─────────────────────────────────────────────────
const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: "easeOut" },
  }),
};

function AnimatedText({ text, className }) {
  return (
    <div className={className}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="letter"
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
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
      transition={{ duration: 0.5 }}
      style={{ borderBottomColor: scrolled ? "var(--hud-border)" : "transparent" }}
    >
      <div className="nav-logo">テラン<span>.司令</span></div>
      <ul className="nav-links">
        <li><a className="nav-link" onClick={() => scrollTo("hero")}><span className="nav-jp">テラン</span><span className="nav-en">TERRAN</span></a></li>
        <li><a className="nav-link" onClick={() => scrollTo("fleet")}><span className="nav-jp">艦隊</span><span className="nav-en">FLEET</span></a></li>
        <li><a className="nav-link"><span className="nav-jp">ユニット</span><span className="nav-en">UNITS</span></a></li>
        <li><a className="nav-link"><span className="nav-jp">情報</span><span className="nav-en">INTEL</span></a></li>
      </ul>
      <div className="nav-status">
        <span className="nav-dot" />
        <span style={{ fontFamily: 'var(--font-hud)', fontSize: '11px' }}>オンライン</span>
      </div>
    </motion.nav>
  );
}

// ─── HERO STATS (count-up) ───────────────────────────────────────────────────
function CountUp({ end, duration = 1500, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTime = null;
    let anim;
    const step = (now) => {
      if (!startTime) startTime = now;
      const pct = Math.min((now - startTime) / duration, 1);
      setVal(Math.floor(pct * end));
      if (pct < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [end, duration]);
  return <>{val}{suffix}</>;
}

// ─── FLEET GRID ───────────────────────────────────────────────────────────────
const fleetTiles = [
  { id: "dropship", img: "dropship.jpg", labelJP: "降下艦級", labelEN: "DROPSHIP CLASS", cls: "tile-hero" },
  { id: "locked", img: "cruiserlocked.gif", labelJP: "兵器ロック済", labelEN: "WEAPONS LOCKED", cls: "tile-gif" },
  { id: "wing", img: "cruiserwing.jpg", labelJP: "巡洋艦翼", labelEN: "BATTLECRUISER WING", cls: "tile-sm" },
  { id: "cmd", img: "fleetcommando.jpg", labelJP: "艦隊司令部", labelEN: "FLEET COMMAND", cls: "tile-md" },
  { id: "ghost", img: "ghost.jpg", labelJP: "ゴースト師団", labelEN: "GHOST DIVISION", cls: "tile-md" },
  { id: "commando", img: "ghostcommando.gif", labelJP: "特殊部隊", labelEN: "COMMANDO UNIT", cls: "tile-md" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function FleetGrid() {
  return (
    <section className="fleet" id="fleet">
      <div className="fleet-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>艦隊</span> FLEET
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          コプルル宙域 · 戦闘配備中
        </motion.p>
      </div>
      <div className="fleet-grid">
        {fleetTiles.map((tile, i) => (
          <motion.div
            key={tile.id}
            className={`fleet-tile ${tile.cls}`}
            custom={i}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <img src={`/media/${tile.img}`} alt={tile.labelEN} />
            <div className="fleet-tile-label">
              <span className="tile-label-jp">{tile.labelJP}</span>
              <span className="tile-label-en">{tile.labelEN}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── MISSION BRIEFING ────────────────────────────────────────────────────────────
const briefingParams = [
  { jp: "▶ 宙域：コプルル", en: "SECTOR: KOPRULU", color: "" },
  { jp: "▶ 脅威レベル：最高", en: "THREAT: CRITICAL", color: "#ff6060" },
  { jp: "▶ 損失数：機密", en: "CASUALTIES: CLASSIFIED", color: "" },
  { jp: "▶ 目標：制宙権確保", en: "OBJ: ORBITAL SUPREMACY", color: "" },
  { jp: "▶ 指揮官：レイナー提督", en: "CMD: ADM. RAYNOR", color: "" },
  { jp: "▶ 状態：稼働中", en: "STATUS: ACTIVE ⬤", color: "#00e5c8" },
];

const briefingSystems = [
  { jp: "パワーコア · POWER CORE", pct: 98 },
  { jp: "スキャナー · SCANNER", pct: 100 },
  { jp: "通信 · COMMS", pct: 85 },
];

function MissionBriefing() {
  return (
    <section className="briefing" id="briefing">
      <motion.div
        className="briefing-panel"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="briefing-header">
          <h2 className="briefing-title">// 任務概要 · MISSION BRIEFING</h2>
          <span className="briefing-classified">機密 · CLASSIFIED</span>
        </div>
        <div className="briefing-body">
          <div className="briefing-grid">
            {/* LEFT: Japanese lore */}
            <div>
              <div className="briefing-badge">// 作戦指令書 · OPERATION ORDER</div>
              <div className="briefing-jp-text">
                テラン自治領艦隊司令部より、<br />
                赤星師団全隊員に告ぐ。<br /><br />
                コプルル宙域における<br />
                異種族勢力の急速な拡大に伴い、<br />
                本師団は即時展開命令を受理した。<br /><br />
                バトルクルーザー艦隊は<br />
                軌道上制圧作戦を開始せよ。<br />
                ゴースト特殊部隊は<br />
                敵指揮系統の無力化を実施せよ。<br /><br />
                任務の成否は、<br />
                諸君の判断と行動にかかっている。<br />
                テラン自治領の未来を守れ。
              </div>
              <div className="briefing-en-quote">
                &ldquo;All units of the Redstar Division: immediate deployment orders received. Orbital bombardment commences now. Ghost operatives — neutralize enemy command. The future of the Dominion rests with you.&rdquo;
              </div>
            </div>

            {/* RIGHT: Parameters & systems */}
            <div>
              <div className="briefing-badge briefing-badge-red">// 作戦パラメータ · PARAMETERS</div>
              <div className="briefing-params">
                {briefingParams.map((p, i) => (
                  <div key={i} className="briefing-param-row">
                    <span className="briefing-param-jp">▶ {p.jp}</span>
                    <span className="briefing-param-en" style={p.color ? { color: p.color } : {}}>{p.en}</span>
                  </div>
                ))}
              </div>

              <div className="briefing-systems">
                {briefingSystems.map((s, i) => (
                  <div key={i} className="briefing-system-row">
                    <div className="briefing-system-label">{s.jp}</div>
                    <div className="briefing-system-bar"><div className="briefing-system-fill" style={{ width: s.pct + "%" }} /></div>
                  </div>
                ))}
              </div>

              <motion.button
                className="briefing-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                情報にアクセス · ACCESS FULL INTEL
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ position: "relative", background: "var(--dark)" }}>
      <Navbar />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-canvas">
          <Canvas
            camera={{ position: [0, 2, 9], fov: 50 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "#000005" }}
          >
            <ThreeScene />
          </Canvas>
        </div>

        <div className="hero-image-overlay" />

        <div className="hero-content">
          <div className="title-jp-sub">赤星師団</div>
          <AnimatedText text="REDSTAR" className="hero-title-line" />
          <AnimatedText text="DIVISION" className="hero-sub-line" />
          <div className="title-tagline">コプルル宙域 · テラン自治領</div>

          <motion.button
            className="hero-deploy-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ⚡ 艦隊を展開 · DEPLOY
          </motion.button>
        </div>

        {/* HUD stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="stat-row">
            <div className="stat-item"><span className="stat-label">ユニット数</span><span className="stat-val blue"><CountUp end={147} /></span></div>
            <div className="stat-item"><span className="stat-label">鉱物</span><span className="stat-val gold"><CountUp end={12} suffix="K" /></span></div>
            <div className="stat-item"><span className="stat-label">ベスピン</span><span className="stat-val teal"><CountUp end={3} suffix="K" /></span></div>
          </div>
        </motion.div>

        {/* Sector status */}
        <motion.div
          className="hero-sector"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          コプルル宙域<br />ステータス：稼働中
        </motion.div>
      </section>

      {/* FLEET */}
      <FleetGrid />

      {/* MISSION BRIEFING */}
      <MissionBriefing />

      {/* Global overlays */}
      <div className="global-scanlines" />
      <div className="global-vignette" />
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  );
}
