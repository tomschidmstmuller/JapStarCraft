import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Battlecruiser({ position, scale = 1, rotY = Math.PI, phaseOffset = 0, onFire }) {
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
