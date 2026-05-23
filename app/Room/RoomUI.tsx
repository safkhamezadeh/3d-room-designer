import { useRoom } from "./RoomStore";
import WallUI from "./WallUI";

export default function RoomUI() {
  const { room, cameraMode } = useRoom();
  const { width, height, depth } = room;

  return (
    <group>
      <WallUI
        name="floor"
        wall={room.floor}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {cameraMode === "firstPerson" && (
        <WallUI
          name="ceiling"
          wall={room.ceiling}
          position={[0, height, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      <WallUI
        name="back"
        wall={room.back}
        position={[0, height / 2, -depth / 2]}
      />
      <WallUI
        name="front"
        wall={room.front}
        position={[0, height / 2, depth / 2]}
        rotation={[0, Math.PI, 0]}
      />
      <WallUI
        name="left"
        wall={room.left}
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <WallUI
        name="right"
        wall={room.right}
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}
