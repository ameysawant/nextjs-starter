import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  openOnHover: boolean;
  align: NonNullable<DropdownProps["align"]>;
}

/** Radix ignores side/align on SubContent — use dir rtl so nested menus open left. */
const getMenuLayout = (align: DropdownItemsProps["align"]) => {
  if (align === "end") {
    return { dir: "rtl" as const, contentAlign: "start" as const };
  }
  return { dir: "ltr" as const, contentAlign: align };
};

const MenuText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div dir="ltr" className={cn("text-left", className)}>
    {children}
  </div>
);

const DropdownSub = ({
  item,
  openOnHover,
  align,
}: {
  item: DropdownItem;
  openOnHover: boolean;
  align: DropdownItemsProps["align"];
}) => {
  const [open, setOpen] = useState(false);
  const children = item.children ?? [];
  const subContent = (
    <DropdownMenuSubContent>
      <MenuText>
        <DropdownItems items={children} openOnHover={openOnHover} align={align} />
      </MenuText>
    </DropdownMenuSubContent>
  );

  const subTriggerClass =
    align === "end"
      ? "flex-row-reverse [&>svg:last-child]:ml-0 [&>svg:last-child]:mr-0 [&>svg:last-child]:rotate-180"
      : undefined;

  if (openOnHover) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={subTriggerClass}>
          <span dir="ltr" className="flex-1 text-left">
            {item.label}
          </span>
        </DropdownMenuSubTrigger>
        {subContent}
      </DropdownMenuSub>
    );
  }

  return (
    <DropdownMenuSub open={open} onOpenChange={setOpen}>
      <DropdownMenuSubTrigger
        className={subTriggerClass}
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        <span dir="ltr" className="flex-1 text-left">
          {item.label}
        </span>
      </DropdownMenuSubTrigger>
      {subContent}
    </DropdownMenuSub>
  );
};

const DropdownItems = ({ items, openOnHover, align }: DropdownItemsProps) => {
  return (
    <>
      {items.map((item, index) => {
        if (item.children?.length) {
          return (
            <DropdownSub key={`${item.label}-${index}`} item={item} openOnHover={openOnHover} align={align} />
          );
        }

        return (
          <DropdownMenuItem
            key={`${item.label}-${index}`}
            variant={item.variant}
            disabled={item.disabled}
            onSelect={item.onSelect}
          >
            {item.label}
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
        <MenuText>
          <DropdownItems items={items} openOnHover={openOnHover} align={align} />
        </MenuText>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
