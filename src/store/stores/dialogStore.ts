import { create } from "zustand";

// dialogs 상태에 대한 타입 정의
interface DialogState {
  dialogInsertRoomInfos: boolean;
  dialogEditRoomInfos: boolean;
}

// store 전체 상태와 함수에 대한 타입 정의
interface DialogStore {
  dialogs: DialogState;
  openDialog: (key: keyof DialogState) => void;
  closeDialog: (key: keyof DialogState) => void;
  toggleDialog: (key: keyof DialogState) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  dialogs: {
    dialogInsertRoomInfos: false,
    dialogEditRoomInfos: false,
  },
  openDialog: (key) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: true,
      },
    })),
  closeDialog: (key) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: false,
      },
    })),
  toggleDialog: (key) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: !state.dialogs[key],
      },
    })),
}));

export default useDialogStore;
