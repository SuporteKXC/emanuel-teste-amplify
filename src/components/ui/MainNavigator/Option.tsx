import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { OptionProps } from ".";

export interface SubOptionProps extends ComponentProps<"button"> {
  option: OptionProps;
  onSelected: () => void;
  currentOption: boolean;
}

export function Option({
  option,
  onSelected,
  currentOption,
  ...rest
}: SubOptionProps) {
  return (
    <button
      {...rest}
      title={option.name}
      type="button"
      className={twMerge(
        "relative flex h-14 w-14 items-center justify-center bg-slate-700 duration-300 ease-in-out after:absolute after:left-0 after:hidden after:h-full after:w-0.5 after:bg-primary-500 after:content-[''] enabled:hover:bg-slate-800 text-slate-50",
        `${currentOption && "bg-slate-800 after:block"}`
      )}
      onClick={() => onSelected()}
    >
      {option.icon}
    </button>
  );
}
