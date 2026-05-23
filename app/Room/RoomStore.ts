import { create } from "zustand";
import { Room } from "./Room";
import { CameraMode } from "../types/camera";

interface RoomStore {
  room: Room;
  cameraMode: CameraMode;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  setDimensions: (w: number, h: number, d: number) => void;
  setCameraMode: (mode: CameraMode) => void;
}

export const useRoom = create<RoomStore>((set) => ({
  room: new Room(5, 3, 6),
  cameraMode: "topDown",
  isDragging: false,
  setIsDragging: (v) => set({ isDragging: v }),
  setDimensions: (w, h, d) => set({ room: new Room(w, h, d) }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
}));
