// useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  mode: "light",
  isOpenSidebar: true,
  setMode: (value) => set(() => ({ mode: value })),
  setIsOpenSidebar: (value) => set(() => ({ isOpenSidebar: value })),
}));

export default useStore;
