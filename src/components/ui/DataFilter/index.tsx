import React from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";

export type CheckboxOptions = {
  id: string;
  label: string;
  checked: boolean;
};

type DataFilterProps = {
  checkeboxOptions: CheckboxOptions[];
  onCheckedChange: (id: string, checked: boolean) => void;
} & React.ComponentProps<"section">;

export const DataFilter: React.FC<DataFilterProps> = ({
  className,
  checkeboxOptions,
  onCheckedChange,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <section
      className={cn(
        "flex flex-col w-full rounded-md bg-white px-6 py-4 shadow-sm shadow-slate-300",
        className
      )}
    >
      <div className="flex w-full">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          {checkeboxOptions.map((option) => (
            <div className="flex items-center gap-2" key={option.id}>
              <Checkbox
                id={option.id}
                onCheckedChange={(checked) => {
                  onCheckedChange(option.id, !!checked);
                }}
                checked={option.checked}
              />
              <label
                htmlFor={option.id}
                className="font-GilroySemibold text-slate-800 text-sm leading-[14px] cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {!!children && (
          <Toggle
            size="sm"
            aria-label="data-filter"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter className="w-4 h-4" />
          </Toggle>
        )}
      </div>
      {isOpen && children && (
        <div className="w-full border-t border-solid border-slate-200 mt-4 py-4">
          {children}
        </div>
      )}
    </section>
  );
};
