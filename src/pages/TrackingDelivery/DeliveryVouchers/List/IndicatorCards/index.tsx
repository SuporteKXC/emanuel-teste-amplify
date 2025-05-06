import React from "react";
import { DeliveryVoucher } from "@/contracts/trackingDelivery";
import { Card } from "@/components/ui/CardGs";
import { Ban, Check, FileClock, ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";

type IndicatorCardsProps = {
  vouchers: DeliveryVoucher[];
};

type CardProps = {
  total: number;
  totalPercentage: number;
  title: string;
  icon: React.ReactNode;
};

export const IndicatorCards: React.FC<IndicatorCardsProps> = ({ vouchers }) => {
  const total = vouchers.length;

  const totalPending = vouchers.filter((v) => v.status === "pending").length;
  const totalApproved = vouchers.filter((v) => v.status === "approved").length;
  const totalRejected = vouchers.filter((v) => v.status === "rejected").length;
  const totalInAnalysis = vouchers.filter((v) => v.status === "analise").length;

  const totalPendingPercentage =
    totalPending > 0 ? (totalPending / total) * 100 : 0;
  const totalApprovedPercentage =
    totalApproved > 0 ? (totalApproved / total) * 100 : 0;
  const totalRejectedPercentage =
    totalRejected > 0 ? (totalRejected / total) * 100 : 0;
  const totalInAnalysisPercentage =
    totalInAnalysis > 0 ? (totalInAnalysis / total) * 100 : 0;

  const BaseCard = ({ total, totalPercentage, title, icon }: CardProps) => {
    return (
      <div className={total === 0 ? "opacity-30" : ""}>
        <Card.Root>
          <Card.Header>
            <div className="flex items-center justify-between w-full">
              <h5 className="font-GilroySemibold text-sm text-slate-800">
                {title}
              </h5>
              {icon}
            </div>
          </Card.Header>
          <Card.Content>
            <div className="flex items-center justify-between w-full mb-4">
              <h5
                className={cn(
                  "font-GilroyBold text-3xl text-primary-500",
                  total === 0 && "text-slate-500"
                )}
              >
                {total}
              </h5>
              <h5
                className={cn(
                  "font-GilroyBold text-3xl text-primary-500",
                  total === 0 && "text-slate-500"
                )}
              >
                {totalPercentage.toFixed(2)}%
              </h5>
            </div>
            <div className="w-full rounded h-1 bg-slate-200">
              <div
                className="bg-primary-500 h-1 rounded"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );
  };

  return (
    <section className="grid md:grid-cols-4 gap-4">
      <BaseCard
        total={totalPending}
        totalPercentage={totalPendingPercentage}
        title="Pendentes"
        icon={<FileClock />}
      />
      <BaseCard
        total={totalInAnalysis}
        totalPercentage={totalInAnalysisPercentage}
        title="Em análise"
        icon={<ScanSearch />}
      />
      <BaseCard
        total={totalApproved}
        totalPercentage={totalApprovedPercentage}
        title="Aprovados"
        icon={<Check />}
      />
      <BaseCard
        total={totalRejected}
        totalPercentage={totalRejectedPercentage}
        title="Rejeitados"
        icon={<Ban />}
      />
    </section>
  );
};
