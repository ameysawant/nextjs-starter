import React from "react";
import { cn } from "@/shared/utils/utils";
import { GRID_CONFIG } from "@/shared/components/flexbox-grid/grid-config";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
  xxxl?: boolean;
}

export function Container({ children, className = "", fluid, sm, md, lg, xl, xxl, xxxl }: ContainerProps) {
  if (fluid) {
    return <div className={cn("bootstrap-container-fluid w-full px-4", className)}>{children}</div>;
  }

  const isDefault = !sm && !md && !lg && !xl && !xxl && !xxxl;

  const style = {
    "--sm-w": GRID_CONFIG.containerWidths.sm,
    "--md-w": GRID_CONFIG.containerWidths.md,
    "--lg-w": GRID_CONFIG.containerWidths.lg,
    "--xl-w": GRID_CONFIG.containerWidths.xl,
    "--xxl-w": GRID_CONFIG.containerWidths.xxl,
    "--xxxl-w": GRID_CONFIG.containerWidths.xxxl,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "bootstrap-container mx-auto w-full px-4",
        (isDefault || sm) && "sm:max-w-(--sm-w)",
        (isDefault || sm || md) && "md:max-w-(--md-w)",
        (isDefault || sm || md || lg) && "lg:max-w-(--lg-w)",
        (isDefault || sm || md || lg || xl) && "xl:max-w-(--xl-w)",
        (isDefault || sm || md || lg || xl || xxl) && "xxl:max-w-(--xxl-w)",
        (isDefault || sm || md || lg || xl || xxl || xxxl) && "xxxl:max-w-(--xxxl-w)",
        className,
      )}
    >
      {children}
    </div>
  );
}
