import { Card } from "@/components/ui/card";

export function CardRoot({ children }: { children: React.ReactNode }) {
  return <Card className="h-full">{children}</Card>;
}
