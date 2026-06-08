import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { roboto } from "@/shared/assets/fonts/fonts";

export const metadata: Metadata = {
  title: "Company name | All Services",
  description: "Company name is a leading provider of all services",
  keywords: "Company name, All Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
