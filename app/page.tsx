"use client";

import { Canvas } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { FirstPersonControls } from "./Controls/FirstPerson";
import Room from "./Room/RoomUI";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CameraMode } from "./types/camera";
import * as THREE from "three";

export default function App() {
  const [cameraMode, setCameraMode] = useState<CameraMode>("topDown");

  return (
    <>
      {/* UI toggle */}
      <button
        onClick={() =>
          setCameraMode((m) =>
            m === "firstPerson" ? "topDown" : "firstPerson",
          )
        }
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
        }}
      >
        Switch to {cameraMode === "firstPerson" ? "Top Down" : "First Person"}
      </button>

      <Canvas camera={{ position: [15, 20, 15], fov: 60 }}>
        <CameraReset mode={cameraMode} />

        {cameraMode === "firstPerson" && (
          <>
            <PointerLockControls />
            <FirstPersonControls />
          </>
        )}

        {cameraMode === "topDown" && (
          <OrbitControls
            target={[0, 0, 0]}
            enableRotate={true}
            enablePan={true}
          />
        )}

        <Room cameraMode={cameraMode} />
        <ambientLight intensity={0.3} />
      </Canvas>
    </>
  );
}

function CameraReset({ mode }: { mode: CameraMode }) {
  const { camera } = useThree();

  useEffect(() => {
    if (mode === "topDown") {
      camera.position.set(15, 20, 15);
      camera.lookAt(0, 0, 0);
    }

    if (mode === "firstPerson") {
      camera.position.set(0, 1.7, 3);
      camera.rotation.set(0, 0, 0);
    }
  }, [mode, camera]);

  return null;
}
