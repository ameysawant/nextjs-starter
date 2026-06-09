"use client";

import { Container, Row, Col } from "@/shared/components/flexbox-grid/Index";
import { Button } from "@/shared/components/shadcn-ui/button";
import { useThemeStore } from "@/shared/store/theme.store";
import { FaMoon, FaSun } from "react-icons/fa";

const HomeHeader = ({ darkMode: serverDarkMode }: { darkMode: boolean }) => {
  const storeDarkMode = useThemeStore((state) => state.darkMode);
  const hydrated = useThemeStore((state) => state.hydrated);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const darkMode = hydrated ? storeDarkMode : serverDarkMode;

  return (
    <Container>
      <Row>
        <Col>Home Header</Col>
        <Col>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleTheme(!darkMode)}
            className="cursor-pointer text-foreground"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaMoon className="size-4" /> : <FaSun className="size-4" />}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeHeader;
