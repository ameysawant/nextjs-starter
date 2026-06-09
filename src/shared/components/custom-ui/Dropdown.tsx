"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn-ui/dropdown-menu";
import { cn } from "@/shared/utils/utils";

export interface DropdownItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
  children?: DropdownItem[];
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
  openOnHover?: boolean;
}

interface DropdownItemsProps {
  items: DropdownItem[];
  align: NonNullable<DropdownProps["align"]>;
}

const getMenuLayout = (align: DropdownItemsProps["align"]) => {
  if (align === "end") {
    return { dir: "rtl" as const, contentAlign: "start" as const };
  }
  return { dir: "ltr" as const, contentAlign: align };
};

const ItemLabel = ({ children }: { children: React.ReactNode }) => (
  <span dir="ltr" className="block text-left">
    {children}
  </span>
);

const DropdownSub = ({ item, align }: { item: DropdownItem; align: DropdownItemsProps["align"] }) => {
  const opensLeft = align === "end";

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        dir={opensLeft ? "ltr" : undefined}
        className={cn("cursor-pointer", opensLeft && "w-full [&>svg:last-child]:!hidden")}
      >
        {opensLeft ? (
          <span className="flex w-full flex-1 items-center justify-between gap-1.5">
            <ChevronLeft className="size-4 shrink-0" />
            <span className="text-right">{item.label}</span>
          </span>
        ) : (
          <ItemLabel>{item.label}</ItemLabel>
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownItems items={item.children ?? []} align={align} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const DropdownItems = ({ items, align }: DropdownItemsProps) => {
  return (
    <>
      {items.map((item, index) => {
        if (item.children?.length) {
          return <DropdownSub key={`${item.label}-${index}`} item={item} align={align} />;
        }

        return (
          <DropdownMenuItem
            key={`${item.label}-${index}`}
            className="cursor-pointer"
            variant={item.variant}
            disabled={item.disabled}
            onSelect={item.onSelect}
          >
            <ItemLabel>{item.label}</ItemLabel>
          </DropdownMenuItem>
        );
      })}
    </>
  );
};

const Dropdown = ({ trigger, items, align = "start", openOnHover = false }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const { dir, contentAlign } = getMenuLayout(align);
  const hoverHandlers = openOnHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : undefined;

  return (
    <DropdownMenu
      dir={dir}
      open={openOnHover ? open : undefined}
      onOpenChange={openOnHover ? setOpen : undefined}
      modal={openOnHover ? false : undefined}
    >
      <DropdownMenuTrigger asChild {...hoverHandlers}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={contentAlign} {...hoverHandlers}>
        <DropdownItems items={items} align={align} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
