import * as THREE from "three";
import { Wall } from "./Wall";

interface Props {
  wall: Wall;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function WallUI({ wall, position, rotation }: Props) {
  return (
    <mesh
      position={position}
      rotation={rotation ? new THREE.Euler(...rotation) : undefined}
    >
      <boxGeometry args={[wall.width, wall.height, wall.depth]} />
      <meshStandardMaterial color={wall.color} />
    </mesh>
  );
}
