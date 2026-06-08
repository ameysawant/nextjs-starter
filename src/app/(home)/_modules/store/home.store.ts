import { create } from "zustand";

interface HomeState {
  demo: string;
}

export const useHomeStore = create<HomeState>(() => ({
  demo: "",
}));
