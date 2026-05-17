"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Room from "./Room/RoomUI";
import { useRef } from "react";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 1.7, 0], fov: 75 }}>
        <OrbitControls makeDefault target={[0, 1.7, 0]} />
        <Room />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 1, 0]} intensity={1} castShadow />
      </Canvas>
    </div>
  );
}
