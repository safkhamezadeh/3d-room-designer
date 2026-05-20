"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { FirstPersonControls } from "./Controls/FirstPerson";
import Room from "./Room/RoomUI";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.7, 3], fov: 75 }}>
      <group>
        <PointerLockControls />
        <FirstPersonControls />
      </group>
      <Room />
      <ambientLight intensity={0.3} />
    </Canvas>
  );
}
