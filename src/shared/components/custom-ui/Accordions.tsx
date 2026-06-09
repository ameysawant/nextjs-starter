"use client";

import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/shadcn-ui/accordion";
import { cn } from "@/shared/utils/utils";

export type AccordionIconType = "plus-minus" | "chevron" | "number";

export interface AccordionNode {
  label: string;
  content?: string;
  children?: AccordionNode[];
}

interface AccordionsProps {
  items: AccordionNode[];
  icon?: AccordionIconType;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  path?: string;
  nested?: boolean;
}

const triggerIconClass = "[&_[data-slot=accordion-trigger-icon]]:hidden";

const AccordionTriggerIcon = ({ icon, index }: { icon: AccordionIconType; index: number }) => {
  if (icon === "number") {
    return <span className="ml-auto shrink-0 text-sm text-muted-foreground">{index + 1}</span>;
  }

  if (icon === "plus-minus") {
    return (
      <>
        <Plus className="ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
        <Minus className="ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline" />
      </>
    );
  }

  return (
    <>
      <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
      <ChevronUp className="ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline" />
    </>
  );
};

const AccordionTree = ({
  items,
  icon,
  path,
}: {
  items: AccordionNode[];
  icon: AccordionIconType;
  path: string;
}) => {
  return (
    <>
      {items.map((item, index) => {
        const value = `${path}${item.label}-${index}`;
        const hasChildren = Boolean(item.children?.length);

        return (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className={cn("cursor-pointer", triggerIconClass)}>
              <span className="flex-1 text-left">{item.label}</span>
              <AccordionTriggerIcon icon={icon} index={index} />
            </AccordionTrigger>
            <AccordionContent>
              {item.content && <p className="text-muted-foreground">{item.content}</p>}
              {hasChildren && (
                <Accordions
                  items={item.children!}
                  icon={icon}
                  path={`${value}-`}
                  nested
                  className="mt-2 border-l border-border pl-4"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </>
  );
};

const Accordions = ({
  items,
  icon = "chevron",
  type = "single",
  collapsible = true,
  className,
  path = "",
  nested = false,
}: AccordionsProps) => {
  return (
    <Accordion
      type={type}
      collapsible={type === "single" ? collapsible : undefined}
      className={cn("w-full", nested && "mt-1", className)}
    >
      <AccordionTree items={items} icon={icon} path={path} />
    </Accordion>
  );
};

export default Accordions;
