"use client";

import { useRef } from "react";
import { useThemeStore } from "@/shared/store/theme.store";

interface ThemeProviderProps {
  children: React.ReactNode;
  darkMode: boolean;
}

const ThemeProvider = ({ children, darkMode }: ThemeProviderProps) => {
  const initialized = useRef<boolean | null>(null);

  if (initialized.current === null) {
    initialized.current = true;
    useThemeStore.getState().init(darkMode);
  }

  return children;
};

export default ThemeProvider;
