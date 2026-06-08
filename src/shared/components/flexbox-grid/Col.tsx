import React from "react";
import { cn } from "@/shared/utils/utils";
import { GRID_CONFIG } from "@/shared/components/flexbox-grid/grid-config";

type ColSize = number | "auto" | boolean;

interface ColProps {
  col?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  xxxl?: ColSize;
  children: React.ReactNode;
  className?: string;
}

const getWidth = (size?: ColSize) => {
  if (typeof size === "number") {
    return `${(size / GRID_CONFIG.columns) * 100}%`;
  }
  return undefined;
};

export function Col({ col, sm, md, lg, xl, xxl, xxxl, children, className = "" }: ColProps) {
  const dynamicStyles: Record<string, string | undefined> = {
    "--col-w": getWidth(col),
    "--sm-w": getWidth(sm),
    "--md-w": getWidth(md),
    "--lg-w": getWidth(lg),
    "--xl-w": getWidth(xl),
    "--xxl-w": getWidth(xxl),
    "--xxxl-w": getWidth(xxxl),
  };

  const style = Object.fromEntries(
    Object.entries(dynamicStyles).filter((entry) => entry[1] !== undefined),
  ) as React.CSSProperties;

  const colLogic = (prefix: string, value?: ColSize) => {
    if (value === undefined || value === false) return null;

    if (value === "auto") {
      switch (prefix) {
        case "sm":
          return "sm:flex-none sm:w-auto sm:max-w-full";
        case "md":
          return "md:flex-none md:w-auto md:max-w-full";
        case "lg":
          return "lg:flex-none lg:w-auto lg:max-w-full";
        case "xl":
          return "xl:flex-none xl:w-auto xl:max-w-full";
        case "xxl":
          return "xxl:flex-none xxl:w-auto xxl:max-w-full";
        case "xxxl":
          return "xxxl:flex-none xxxl:w-auto xxxl:max-w-full";
        default:
          return "flex-none w-auto max-w-full";
      }
    }

    if (typeof value === "number") {
      switch (prefix) {
        case "sm":
          return "sm:flex-none sm:w-[var(--sm-w)] sm:max-w-[var(--sm-w)]";
        case "md":
          return "md:flex-none md:w-[var(--md-w)] md:max-w-[var(--md-w)]";
        case "lg":
          return "lg:flex-none lg:w-[var(--lg-w)] lg:max-w-[var(--lg-w)]";
        case "xl":
          return "xl:flex-none xl:w-[var(--xl-w)] xl:max-w-[var(--xl-w)]";
        case "xxl":
          return "xxl:flex-none xxl:w-[var(--xxl-w)] xxl:max-w-[var(--xxl-w)]";
        case "xxxl":
          return "xxxl:flex-none xxxl:w-[var(--xxxl-w)] xxxl:max-w-[var(--xxxl-w)]";
        default:
          return "flex-none w-[var(--col-w)] max-w-[var(--col-w)]";
      }
    }

    switch (prefix) {
      case "sm":
        return "sm:flex-1 sm:basis-0 sm:max-w-full sm:w-full";
      case "md":
        return "md:flex-1 md:basis-0 md:max-w-full md:w-full";
      case "lg":
        return "lg:flex-1 lg:basis-0 lg:max-w-full lg:w-full";
      case "xl":
        return "xl:flex-1 xl:basis-0 xl:max-w-full xl:w-full";
      case "xxl":
        return "xxl:flex-1 xxl:basis-0 xxl:max-w-full xxl:w-full";
      case "xxxl":
        return "xxxl:flex-1 xxxl:basis-0 xxxl:max-w-full xxxl:w-full";
      default:
        return "flex-1 basis-0 max-w-full w-full";
    }
  };

  return (
    <div
      style={{
        ...style,
        paddingLeft: "var(--gutter-x, 1rem)",
        paddingRight: "var(--gutter-x, 1rem)",
      }}
      className={cn(
        "bootstrap-col",
        className,
        col === "auto" ? "w-auto flex-none" : "w-full",
        col === undefined ? null : colLogic("", col),
        colLogic("sm", sm),
        colLogic("md", md),
        colLogic("lg", lg),
        colLogic("xl", xl),
        colLogic("xxl", xxl),
        colLogic("xxxl", xxxl),
      )}
    >
      {children}
    </div>
  );
}
