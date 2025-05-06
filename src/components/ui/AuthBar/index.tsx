import { ComponentProps, ReactNode } from "react";
import { User, UserOption } from "../User";
import { cn } from "@/lib/utils";

export interface AuthBarProps extends ComponentProps<"header"> {
  user: {
    name: string;
    avatar: string | undefined;
    options: UserOption[];
  };
  currentPage?: string;
  children?: ReactNode;
}

export function AuthBar({
  user,
  currentPage,
  className,
  children,
}: AuthBarProps) {
  return (
    <header
      className={cn(
        "relative flex w-full items-center justify-between rounded-md bg-white px-6 py-4 shadow-sm shadow-slate-300",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {children}
        {!children && (
          <span className="hidden text-sm capitalize text-slate-500 md:block font-sans">
            {currentPage}
          </span>
        )}
      </div>
      <User name={user.name} avatar={user.avatar} options={user.options} />
    </header>
  );
}
