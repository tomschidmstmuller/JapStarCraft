import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Rings() {
  const ringData = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      radius: 3 + i * 0.4,
      color: i % 2 === 0 ? "#8b5cf6" : "#ff2a6d",
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
    })), []);
  return ringData.map((r, i) => (
    <mesh key={i} rotation={[r.rotX, r.rotY, 0]}>
      <torusGeometry args={[r.radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={r.color} />
    </mesh>
  ));
}

function Particles() {
  const positions = useMemo(() => {
    const count = 2500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#7dd3fc" size={0.03} transparent opacity={0.8} />
    </points>
  );
}

function EnergyBeams() {
  const beams = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        Math.random() * 20,
        (Math.random() - 0.5) * 20
      ),
      rotZ: Math.random() * 0.4,
      scaleY: 0.5 + Math.random() * 0.8,
    })), []);
  return beams.map((b, i) => (
    <mesh key={i} position={b.position} rotation={[0, 0, b.rotZ]}>
      <cylinderGeometry args={[0.01, 0.01, 20, 6]} />
      <meshBasicMaterial color="#f97316" />
    </mesh>
  ));
}

export default function QuantumCoreScene() {
  const coreRef = useRef();
  const innerRef = useRef();
  const groupRef = useRef();
  const particlesRef = useRef();
  const lightRef = useRef();
  const { camera, mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.x += 0.002;
      coreRef.current.rotation.y += 0.003;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.01;
      innerRef.current.rotation.y += 0.01;
    }

    if (groupRef.current) groupRef.current.rotation.y += 0.002;
    if (particlesRef.current) particlesRef.current.rotation.y += 0.0008;
    if (lightRef.current) lightRef.current.intensity = 6 + Math.sin(t * 4) * 2;

    camera.position.x += (mouse.x * 4 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#05010a", 0.045]} />

      <ambientLight color="#9f7bff" intensity={1.2} />
      <pointLight ref={lightRef} color="#c084ff" intensity={8} distance={100} position={[0, 0, 0]} />
      <pointLight color="#ff2a6d" intensity={3} distance={50} position={[4, -2, 4]} />

      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <boxGeometry args={[4, 4, 4]} />
          <meshPhysicalMaterial
            color="#12081f"
            emissive="#b388ff"
            emissiveIntensity={2}
            transmission={1}
            transparent
            roughness={0}
            metalness={0.8}
            clearcoat={1}
          />
        </mesh>

        <mesh ref={innerRef}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color="#ff66ff" />
        </mesh>

        <Rings />
      </group>

      <Particles />
      <EnergyBeams />

      <gridHelper args={[100, 100, "#8b5cf6", "#222"]} position={[0, -5, 0]} />
    </>
  );
}
