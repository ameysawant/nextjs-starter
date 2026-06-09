import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import { cn } from "@/shared/utils/utils";

interface SelectMenuProps {
  items: { label: string; value: string }[];
  placeholder: string;
  className?: string;
  label?: string;
}

const SelectMenu = ({ items, placeholder, className, label }: SelectMenuProps) => {
  return (
    <Select>
      <SelectTrigger className={cn("w-full max-w-48", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
