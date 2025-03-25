// useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  mode: localStorage.getItem("mode") || "light",
  isOpenSidebar: true,

  toggleMode: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return { mode: newMode };
    }),
  setMode: (value) => set(() => ({ mode: value })),
  setIsOpenSidebar: (value) => set(() => ({ isOpenSidebar: value })),
}));

export default useStore;
