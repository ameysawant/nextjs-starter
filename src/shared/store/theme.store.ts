import { create } from "zustand";

const THEME_COOKIE = "theme";

interface ThemeState {
  darkMode: boolean;
  hydrated: boolean;
  init: (darkMode: boolean) => void;
  toggleTheme: (checked: boolean) => void;
}

const applyDarkMode = (darkMode: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", darkMode);
};

const saveTheme = (darkMode: boolean) => {
  if (typeof document === "undefined") return;
  const value = darkMode ? "dark" : "light";
  document.cookie = `${THEME_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  hydrated: false,

  init: (darkMode) => {
    set({ darkMode, hydrated: true });
    applyDarkMode(darkMode);
  },

  toggleTheme: (checked) => {
    applyDarkMode(checked);
    saveTheme(checked);
    set({ darkMode: checked });
  },
}));
