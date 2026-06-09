"use client";

import { useRef } from "react";
import { useThemeStore } from "@/shared/store/theme.store";

const ThemeProvider = ({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useThemeStore.getState().init(darkMode);
    initialized.current = true;
  }

  return children;
};

export default ThemeProvider;
