import { useRoom } from "./RoomStore";
import WallUI from "./WallUI";

export default function RoomUI() {
  const { room } = useRoom();
  const { width, height, depth } = room;

  return (
    <group>
      {/* floor */}
      <WallUI
        wall={room.floor}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* ceiling */}
      <WallUI
        wall={room.ceiling}
        position={[0, height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* back wall */}
      <WallUI wall={room.back} position={[0, height / 2, -depth / 2]} />

      {/* front wall */}
      <WallUI
        wall={room.front}
        position={[0, height / 2, depth / 2]}
        rotation={[0, Math.PI, 0]}
      />

      {/* left wall */}
      <WallUI
        wall={room.left}
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* right wall */}
      <WallUI
        wall={room.right}
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}
