import { DocumentJustification } from "@/contracts/trackingDelivery";
import { cn } from "@/lib/utils";

interface IProps {
  justification: DocumentJustification;
}

export const StatusTag: React.FC<IProps> = ({ justification }) => {

  let status = 'Pendente';
  let statusColor = 'bg-yellow-500';

  if(justification.approvedAt) {
    status = 'Aprovado';
    statusColor = 'bg-green-500';
  } else if(justification.rejectedAt) {
    status = 'Reprovado';
    statusColor = 'bg-red-600';
  }

  return (
    <span className={cn('inline-flex text-white uppercase items-center px-2 py-1 rounded-md text-xs font-GilroyBold', statusColor)}>
      {status}
    </span>
  )
}
