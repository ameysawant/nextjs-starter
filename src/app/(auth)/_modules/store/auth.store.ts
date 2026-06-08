import { create } from "zustand";

interface AuthState {
  demo: string;
}

export const useAuthStore = create<AuthState>(() => ({
  demo: "",
}));
