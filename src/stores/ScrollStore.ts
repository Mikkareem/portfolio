import { create } from "zustand";

interface ScrollState {
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  totalPages: 4,
  setTotalPages: (pages: number) => set({ totalPages: pages }),
}));
