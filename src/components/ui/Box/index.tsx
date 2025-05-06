import { cn } from "@/lib/utils";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function Box({ children, className }: BoxProps) {
  return (
    <div
      className={cn(
        "rounded bg-white p-8 shadow-sm shadow-slate-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
