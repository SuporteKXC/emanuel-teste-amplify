import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../label";
import { FormControl, FormItem, FormMessage } from "../form";

export interface InputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const InputFileGs = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <FormItem>
        <FormControl>
          <div className="grid w-full items-center gap-1.5">
            {label && (
              <Label className="font-GilroySemibold text-sm text-slate-800">
                {label}
              </Label>
            )}
            <input
              type="file"
              className={cn(
                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                className
              )}
              ref={ref}
              {...props}
            />
            <FormMessage />
          </div>
        </FormControl>
      </FormItem>
    );
  }
);
InputFileGs.displayName = "InputFileGs";

export { InputFileGs };
