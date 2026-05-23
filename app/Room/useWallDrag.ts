import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useRoom } from "./RoomStore";

type DraggableWall = "front" | "back" | "left" | "right";

export function useWallDrag() {
  const { camera, gl } = useThree();
  const { room, setDimensions, setIsDragging } = useRoom();
  const dragging = useRef<DraggableWall | null>(null);
  const startPoint = useRef<THREE.Vector3 | null>(null);
  const startDimensions = useRef({ width: room.width, depth: room.depth });
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  function getWorldPoint(e: MouseEvent) {
    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(floorPlane, point);
    return point;
  }

  function startDrag(wall: DraggableWall, e: MouseEvent) {
    dragging.current = wall;
    startPoint.current = getWorldPoint(e);
    startDimensions.current = { width: room.width, depth: room.depth };
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  }

  function onDrag(e: MouseEvent) {
    if (!dragging.current || !startPoint.current) return;
    const wall = dragging.current;
    const point = getWorldPoint(e);
    const delta = point.clone().sub(startPoint.current);

    let newWidth = startDimensions.current.width;
    let newDepth = startDimensions.current.depth;

    if (wall === "front")
      newDepth = Math.max(2, startDimensions.current.depth + delta.z * 2);
    if (wall === "back")
      newDepth = Math.max(2, startDimensions.current.depth - delta.z * 2);
    if (wall === "right")
      newWidth = Math.max(2, startDimensions.current.width + delta.x * 2);
    if (wall === "left")
      newWidth = Math.max(2, startDimensions.current.width - delta.x * 2);

    setDimensions(newWidth, room.height, newDepth);
  }

  function stopDrag() {
    dragging.current = null;
    startPoint.current = null;
    setIsDragging(false);
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  }

  return { startDrag, stopDrag };
}
