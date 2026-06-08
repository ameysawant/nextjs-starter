import { create } from "zustand";

interface LibraryState {
  demo: string;
}

export const useLibraryStore = create<LibraryState>(() => ({
  demo: "",
}));
