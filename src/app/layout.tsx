import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { roboto } from "@/shared/assets/fonts/fonts";
import { cn } from "@/shared/utils/utils";
import { TooltipProvider } from "@/shared/components/shadcn-ui/tooltip";
import { Toaster } from "@/shared/components/shadcn-ui/sonner";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "Next.js Starter is a scalable and modular starter kit for Next.js projects",
  keywords: "nextjs starter, all services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(roboto.variable, "font-sans")}>
      <body className="body bg-background text-foreground">
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
