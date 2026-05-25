import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function CameraRig() {
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
