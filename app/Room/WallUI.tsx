// room/WallUI.tsx
import { useState } from "react";
import { useRoom } from "./RoomStore";
import { useWallDrag } from "./useWallDrag";
import { Wall } from "./Wall";
import * as THREE from "three";

type WallName = "front" | "back" | "left" | "right" | "floor" | "ceiling";

interface Props {
  wall: Wall;
  name: WallName;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function WallUI({ wall, name, position, rotation }: Props) {
  const [hovered, setHovered] = useState(false);
  const { cameraMode, setIsDragging } = useRoom();
  const { startDrag, stopDrag } = useWallDrag();

  const draggable =
    cameraMode === "topDown" && name !== "floor" && name !== "ceiling";

  return (
    <mesh
      position={position}
      rotation={rotation ? new THREE.Euler(...rotation) : undefined}
      onPointerOver={() => draggable && setHovered(true)}
      onPointerOut={() => draggable && setHovered(false)}
      onPointerDown={
        draggable
          ? (e) => {
              e.stopPropagation();
              setIsDragging(true);
              startDrag(name, e.nativeEvent);
            }
          : undefined
      }
    >
      <boxGeometry args={[wall.width, wall.height, wall.depth]} />
      <meshStandardMaterial
        color={hovered ? "#ffffff" : wall.color}
        opacity={hovered ? 0.8 : 1}
        transparent
      />
    </mesh>
  );
}
