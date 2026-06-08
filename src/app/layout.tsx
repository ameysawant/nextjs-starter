import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { roboto } from "@/shared/assets/fonts/fonts";
import { Geist } from "next/font/google";
import { cn } from "@/shared/utils/utils";
import { TooltipProvider } from "@/shared/components/shadcn-ui/tooltip";
import { Toaster } from "@/shared/components/shadcn-ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn(roboto.variable, "font-sans", geist.variable)}>
      <body className="bg-background text-foreground">
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
