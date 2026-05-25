import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet() {
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
