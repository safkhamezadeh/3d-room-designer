"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Room from "./Room/RoomUI";

type Key = "w" | "a" | "s" | "d";

function Controls() {
  const { camera, gl } = useThree();

  // ✅ fully typed key map
  const keys = useRef<Record<Key, boolean>>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const position = useRef(new THREE.Vector3(0, 1.7, 5));

  const SPEED = 0.08;
  const EYE_HEIGHT = 1.7;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as Key;
      if (key in keys.current) {
        keys.current[key] = true;
      }
    };

    const up = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as Key;
      if (key in keys.current) {
        keys.current[key] = false;
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleClick = () => {
      canvas.requestPointerLock();
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [gl]);

  useFrame(() => {
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const move = new THREE.Vector3();

    camera.getWorldDirection(forward);

    forward.y = 0;
    forward.normalize();

    right.crossVectors(forward, camera.up).normalize();

    if (keys.current.w) move.add(forward);
    if (keys.current.s) move.sub(forward);
    if (keys.current.a) move.sub(right);
    if (keys.current.d) move.add(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(SPEED);
      position.current.add(move);
    }

    position.current.y = EYE_HEIGHT;

    camera.position.copy(position.current);
  });

  return null;
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.7, 5], fov: 75 }}>
      <PointerLockControls />
      <Controls />

      <Room />
      <ambientLight intensity={0.3} />
    </Canvas>
  );
}
