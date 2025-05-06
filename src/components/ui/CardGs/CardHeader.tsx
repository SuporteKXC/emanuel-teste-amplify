import { CardHeader as CardHeaderUi } from "@/components/ui/card";

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <CardHeaderUi className="pb-3">{children}</CardHeaderUi>;
}
