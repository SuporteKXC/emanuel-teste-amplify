import { CardContent as CardContentUi } from "@/components/ui/card";

export function CardContent({ children }: { children: React.ReactNode }) {
  return <CardContentUi>{children}</CardContentUi>;
}
