// room/Room.tsx
import { useRoom } from "./RoomStore";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Room() {
  const { room } = useRoom();
  const { width, height, depth } = room;

  return (
    <>
      {/* floor */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshStandardMaterial color={0x8b6914} side={THREE.DoubleSide} />
        </mesh>

        {/* ceiling */}
        <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshStandardMaterial color={0xffffff} side={THREE.DoubleSide} />
        </mesh>

        {/* back wall */}
        <mesh position={[0, height / 2, -depth / 2]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={0xcccccc} side={THREE.DoubleSide} />
        </mesh>

        {/* front wall */}
        <mesh position={[0, height / 2, depth / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={0xcccccc} side={THREE.DoubleSide} />
        </mesh>

        {/* left wall */}
        <mesh
          position={[-width / 2, height / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color={0xcccccc} side={THREE.DoubleSide} />
        </mesh>

        {/* right wall */}
        <mesh
          position={[width / 2, height / 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color={0xcccccc} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}
