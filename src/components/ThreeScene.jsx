import { useState, useCallback } from "react";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";
import Battlecruiser from "./Battlecruiser";
import LaserBeam from "./LaserBeam";
import ImpactFlash from "./ImpactFlash";
import ImpactLight from "./ImpactLight";
import CameraRig from "./CameraRig";

export default function ThreeScene() {
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
      <pointLight color="#8b5cf6" intensity={3} distance={25} position={[-4, 2, 3]} />
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
