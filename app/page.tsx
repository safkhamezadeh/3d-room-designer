"use client";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { FirstPersonControls } from "./Controls/FirstPerson";
import Room from "./Room/RoomUI";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useRoom } from "./Room/RoomStore";
import * as THREE from "three";

export default function App() {
  const { cameraMode, setCameraMode, isDragging } = useRoom();

  return (
    <>
      <button
        onClick={() =>
          setCameraMode(
            cameraMode === "firstPerson" ? "topDown" : "firstPerson",
          )
        }
        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
      >
        Switch to {cameraMode === "firstPerson" ? "Top Down" : "First Person"}
      </button>

      <Canvas camera={{ position: [15, 20, 15], fov: 60 }}>
        <CameraReset />
        {cameraMode === "firstPerson" && (
          <>
            <PointerLockControls />
            <FirstPersonControls />
          </>
        )}
        {cameraMode === "topDown" && (
          <OrbitControls
            target={[0, 0, 0]}
            enableRotate={!isDragging}
            enablePan={!isDragging}
            enableZoom={!isDragging}
          />
        )}
        <Room />
        <ambientLight intensity={0.3} />
      </Canvas>
    </>
  );
}

function CameraReset() {
  const { camera } = useThree();
  const { cameraMode } = useRoom();

  useEffect(() => {
    if (cameraMode === "topDown") {
      camera.position.set(15, 20, 15);
      camera.lookAt(0, 0, 0);
    }
    if (cameraMode === "firstPerson") {
      camera.position.set(0, 1.7, 3);
      camera.rotation.set(0, 0, 0);
    }
  }, [cameraMode, camera]);

  return null;
}
