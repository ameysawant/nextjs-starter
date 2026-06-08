import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "./roboto/Roboto-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./roboto/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
