import { create } from "zustand";

interface AdminState {
  demo: string;
}

export const useAdminStore = create<AdminState>(() => ({
  demo: "",
}));
