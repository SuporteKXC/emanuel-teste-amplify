import { IDeliveryVoucherStatus } from "@/contracts/trackingDelivery";
import React from "react";
import { cn } from "@/lib/utils";
import { Ban, Check, ScanSearch, FileClock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type VoucherStatusIconsProps = {
  status: IDeliveryVoucherStatus;
  message?: string;
};

type StatusProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const VoucherStatusIcons: React.FC<VoucherStatusIconsProps> = ({
  status,
  message,
}) => {
  const StatusRoot = ({ children, className, ...rest }: StatusProps) => {
    return (
      <span
        className={cn(
          "rounded-full bg-slate-300 text-slate-50 flex items-center justify-center p-1 w-6 h-6",
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  };

  const renderIcon = (status: IDeliveryVoucherStatus) => {
    switch (status) {
      case "pending":
        return (
          <StatusRoot className="bg-orange-500" title="Aguardando comprovante">
            <FileClock />
          </StatusRoot>
        );
      case "analise":
        return (
          <StatusRoot className="bg-yellow-500" title="Em análise">
            <ScanSearch />
          </StatusRoot>
        );
      case "approved":
        return (
          <StatusRoot className="bg-green-500" title="Aprovado">
            <Check />
          </StatusRoot>
        );
      case "rejected":
        if (!message) {
          return (
            <StatusRoot className="bg-red-500" title="Reprovado">
              <Ban />
            </StatusRoot>
          );
        }
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <StatusRoot className="bg-red-500" title="Reprovado">
                  <Ban />
                </StatusRoot>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs font-sans text-xs p-4">
                <p>{message}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return <></>;
    }
  };

  return <div>{renderIcon(status)}</div>;
};
