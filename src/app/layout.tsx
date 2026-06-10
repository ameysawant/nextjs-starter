import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/shared/styles/globals.css";
import { roboto } from "@/shared/assets/fonts/fonts";
import { cn } from "@/shared/utils/utils";
import ThemeProvider from "@/shared/components/theme/ThemeProvider";
import { TooltipProvider } from "@/shared/components/shadcn-ui/tooltip";
import { Toaster } from "@/shared/components/shadcn-ui/sonner";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "Next.js Starter is a scalable and modular starter kit for Next.js projects",
  keywords: "nextjs starter, all services",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = (await cookies()).get("theme")?.value === "dark";

  return (
    <html lang="en" className={cn(roboto.variable, "font-sans", darkMode && "dark")}>
      <body className="body bg-background text-foreground">
        <ThemeProvider darkMode={darkMode}>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
