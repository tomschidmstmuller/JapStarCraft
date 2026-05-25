import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LaserBeam({ from, to, onDone }) {
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
