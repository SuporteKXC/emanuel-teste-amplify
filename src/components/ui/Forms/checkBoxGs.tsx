import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../label";
import { FormControl, FormItem, FormMessage } from "../form";

export interface CheckboxProps
  extends React.ButtonHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: any
}
const CheckboxGs = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <FormItem>
        <FormControl>
          <div className="flex w-full h-full items-center gap-1.5">
            {label && (
              <Label className="font-GilroySemibold text-sm text-slate-800">
                {label}
              </Label>
            )}
            <input ref={ref} {...props} type="checkbox"></input>
            <FormMessage />
          </div>
        </FormControl>
      </FormItem>
    );
  }
);
CheckboxGs.displayName = "CheckboxGs";

export { CheckboxGs };
