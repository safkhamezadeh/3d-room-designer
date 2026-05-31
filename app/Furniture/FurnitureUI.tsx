import { useGLTF } from "@react-three/drei";
import { Furniture } from "./Furniture";

export function FurnitureUI({ item }: { item: Furniture }) {
  if (item.modelUrl) {
    return <GLTFModel item={item} />;
  }
  return (
    <mesh position={item.position}>
      <boxGeometry args={[item.width, item.height, item.depth]} />
      <meshStandardMaterial color={item.color} />
    </mesh>
  );
}

// separate component because useGLTF can't be called conditionally
function GLTFModel({ item }: { item: Furniture }) {
  const { scene } = useGLTF(item.modelUrl!);
  return <primitive object={scene} position={item.position} />;
}
