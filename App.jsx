import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// ─── PLANET ──────────────────────────────────────────────────────────────────
function Planet({ impactPositions }) {
  const planetRef = useRef();
  const atmRef = useRef();

  // Procedural continent patches
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
    if (atmRef.current) {
      atmRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group>
      {/* Ocean sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color="#1155aa"
          emissive="#001133"
          specular="#2288ff"
          shininess={60}
        />
        {/* Continent patches as children so they rotate with planet */}
        {continents.map((c, i) => (
          <mesh key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshPhongMaterial color={c.color} />
          </mesh>
        ))}
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial
          color="#4499ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh rotation={[0.2, 0, 0.1]}>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshPhongMaterial
          color="#aaccff"
          transparent
          opacity={0.06}
          wireframe
        />
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
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const axis = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(
      axis,
      dir.clone().normalize()
    );
    return { mid, quaternion: q, length: len };
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

    // Fire lasers
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
      {/* Hull */}
      <mesh>
        <boxGeometry args={[2.2, 0.28, 0.7]} />
        {metal}
      </mesh>

      {/* Bridge tower */}
      <mesh position={[0.3, 0.28, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        {chrome}
      </mesh>

      {/* Nose cone */}
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.14, 0.7, 8]} />
        {chrome}
      </mesh>

      {/* Engine nacelles */}
      {[-0.28, 0.28].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.6, -0.1, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.13, 1.1, 8]} />
            {darkMetal}
          </mesh>
          {/* Engine glow sphere */}
          <mesh position={[-1.18, -0.1, z]}>
            <sphereGeometry args={[0.11, 8, 8]} />
            {engineGlow}
          </mesh>
        </group>
      ))}

      {/* Wings */}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[-0.2, 0, side * 0.6]}>
          <boxGeometry args={[1.0, 0.06, 0.55]} />
          <meshPhongMaterial color="#778899" shininess={70} />
        </mesh>
      ))}

      {/* Gun turrets */}
      {[-0.15, 0.15].map((z, i) => (
        <mesh key={i} position={[1.0, 0.14, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.45, 6]} />
          {darkMetal}
        </mesh>
      ))}

      {/* Point light at engines */}
      <pointLight color="#4488ff" intensity={2} distance={4} position={[-1.2, -0.1, 0]} />
    </group>
  );
}

// ─── DYNAMIC LIGHTS ───────────────────────────────────────────────────────────
function ImpactLight({ position, onDone }) {
  const ref = useRef();
  const life = useRef(1.0);

  useFrame(() => {
    if (!ref.current) return;
    life.current -= 0.08;
    ref.current.intensity = life.current * 6;
    if (life.current <= 0) onDone();
  });

  return (
    <pointLight
      ref={ref}
      color="#ff5500"
      intensity={6}
      distance={8}
      position={position}
    />
  );
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

// ─── MAIN SCENE ───────────────────────────────────────────────────────────────
function Scene({ attacking, setImpactCount }) {
  const [lasers, setLasers] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [lights, setLights] = useState([]);
  const attackingRef = useRef(attacking);
  useEffect(() => { attackingRef.current = attacking; }, [attacking]);

  const getRandomPlanetSurface = () => {
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;
    return new THREE.Vector3(
      2.05 * Math.sin(phi) * Math.cos(theta),
      2.05 * Math.cos(phi),
      2.05 * Math.sin(phi) * Math.sin(theta)
    );
  };

  const handleFire = (fromArr) => {
    if (!attackingRef.current) return;
    const from = new THREE.Vector3(...fromArr);
    const target = getRandomPlanetSurface();
    const id = Date.now() + Math.random();

    setLasers(prev => [...prev, { id, from, to: target }]);
    setFlashes(prev => [...prev, { id: id + 0.1, position: target }]);
    setLights(prev => [...prev, { id: id + 0.2, position: target }]);
    setImpactCount(c => c + 1);
  };

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
        <LaserBeam key={l.id} from={l.from} to={l.to}
          onDone={() => setLasers(prev => prev.filter(x => x.id !== l.id))} />
      ))}
      {flashes.map(f => (
        <ImpactFlash key={f.id} position={f.position}
          onDone={() => setFlashes(prev => prev.filter(x => x.id !== f.id))} />
      ))}
      {lights.map(l => (
        <ImpactLight key={l.id} position={l.position}
          onDone={() => setLights(prev => prev.filter(x => x.id !== l.id))} />
      ))}
    </>
  );
}

// ─── HUD ──────────────────────────────────────────────────────────────────────
function HUD({ attacking, setAttacking, impactCount }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n) => String(n).padStart(4, "0");

  return (
    <>
      {/* Top-left */}
      <motion.div
        className="hud-panel hud-tl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="hud-logo">TERRAN<span className="hud-accent">.CMD</span></div>
        <div className="hud-row">
          <span className="hud-label">STATUS</span>
          <span className={attacking ? "hud-val-green" : "hud-val-muted"}>
            {attacking ? "⬤ ORBITAL BOMBARDMENT" : "◯ STANDBY"}
          </span>
        </div>
        <div className="hud-row">
          <span className="hud-label">FLEET</span>
          <span className="hud-val-blue">3 BATTLECRUISERS</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">IMPACTS</span>
          <span className="hud-val-red">{fmt(impactCount)}</span>
        </div>
      </motion.div>

      {/* Top-right */}
      <motion.div
        className="hud-panel hud-tr"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="hud-row">
          <span className="hud-label">SECTOR</span>
          <span className="hud-val-blue">KOPRULU</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">TIME</span>
          <span className="hud-val-muted">{time.toTimeString().slice(0, 8)}</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">ONLINE</span>
          <span className="hud-val-green">⬤</span>
        </div>
      </motion.div>

      {/* Corner brackets */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Bottom center CTA */}
      <motion.div
        className="hud-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          className={`deploy-btn ${attacking ? "active" : ""}`}
          onClick={() => setAttacking(a => !a)}
        >
          {attacking ? "⏸ CEASE FIRE" : "⚡ DEPLOY FLEET"}
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="hud-title"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="title-main">REDSTAR</div>
        <div className="title-sub">DIVISION</div>
      </motion.div>

      {/* Scanlines overlay */}
      <div className="scanlines" />
      <div className="vignette" />
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [attacking, setAttacking] = useState(true);
  const [impactCount, setImpactCount] = useState(0);

  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 2, 9], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#000005" }}
      >
        <Scene attacking={attacking} setImpactCount={setImpactCount} />
      </Canvas>
      <div className="overlay">
        <HUD attacking={attacking} setAttacking={setAttacking} impactCount={impactCount} />
      </div>
    </div>
  );
}
