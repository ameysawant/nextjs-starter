import { create } from "zustand";

interface AccountState {
  demo: string;
}

export const useAccountStore = create<AccountState>(() => ({
  demo: "",
}));
