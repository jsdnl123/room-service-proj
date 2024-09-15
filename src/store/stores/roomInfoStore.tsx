import { create } from "zustand";
import { RoomInfo } from "../../App";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  roomInfos: RoomInfo[];
  setRoomInfos: (roomInfos: RoomInfo[]) => void;
};

export const useRoomInfoStore = create<Store>()(
  persist(
    immer((set) => ({
      roomInfos: [],
      setRoomInfos: (roomInfo: RoomInfo[]) =>
        set((state) => {
          state.roomInfos = roomInfo;
        }),
    })),
    {
      name: "roomInfo-storage", // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
