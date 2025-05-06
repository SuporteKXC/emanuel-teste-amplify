import React, { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const button = tv({
  base: [
    "flex items-center justify-center gap-2 rounded-md border-2 font-GilroySemibold duration-300 ease-in-out text-sm disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: [
        "bg-primary-500 border-primary-500 text-slate-50 border-primary-500",
        "enabled:hover:brightness-90",
      ],
      secondary: [
        "text-primary-500 border-primary-100 bg-primary-100",
        "enabled:hover:brightness-90",
      ],
      tertiary: [
        "text-primary-500 border-primary-500 bg-transparent",
        "enabled:hover:bg-primary-500 enabled:hover:border-primary-500 enabled:hover:text-slate-50",
      ],
      danger: [
        "text-slate-50 border-red-500 bg-red-500",
        "enabled:hover:bg-red-600 enabled:hover:border-red-600",
      ],
      white: [
        "text-slate-600 border-slate-900 bg-white",
        "enabled:hover:shadow-lg enabled:hover:border-slate-100",
      ]
    },
    size: {
      sm: "py-2 px-4 h-[40px]",
      md: "py-4 px-10 ",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonRootProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    children: React.ReactNode;
  };

export const ButtonRoot: React.FC<ButtonRootProps> = ({
  variant,
  size,
  children,
  className,
  ...props
}) => {
  return (
    <>
      <button {...props} className={cn(button({ variant, size }), className)}>
        {children}
      </button>
    </>
  );
};
