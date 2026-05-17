import { create } from "zustand";
import { Room } from "./Room";

interface RoomStore {
  room: Room;
  setDimensions: (w: number, h: number, d: number) => void;
}

export const useRoom = create<RoomStore>((set) => ({
  room: new Room(),
  setDimensions: (w, h, d) => set({ room: new Room(w, h, d) }),
}));
