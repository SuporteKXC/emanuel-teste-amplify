import { cn } from '@/lib/utils';
import {
  Ban,
  CalendarOff,
  CalendarPlus,
  FileClock,
  PackageCheck,
  Truck,
  Undo2,
  FileText
} from 'lucide-react';
// import { useTranslation } from '@/hooks/useTranslation';
import { translations } from './translations';

export type InvoiceStatus =
  | 'transito'
  | 'transito-atraso'
  | 'transito_sem_prazo'
  | 'entregue'
  | 'entregue_cliente'
  | 'entregue_atraso'
  | 'entregue_sem_prazo'
  | 'sem_status'
  | 'sem_status_atraso'
  | 'sem_status_sem_prazo'
  | 'cancelado'
  | 'transito_atraso'
  | 'em_transito'
  | 'pendente'
  | 'faturado'
  | 'devolucao';

export const friendlyStatusMessage: Record<InvoiceStatus, string> = {
  'transito': 'Em trânsito',
  'transito-atraso': 'Em trânsito com atraso',
  'transito_sem_prazo': 'Em trânsito sem prazo',
  'entregue': 'Entregue',
  'entregue_cliente': 'Entregue ao cliente',
  'entregue_atraso': 'Entregue com atraso',
  'entregue_sem_prazo': 'Entregue sem prazo',
  'sem_status': 'Sem status',
  'sem_status_atraso': 'Sem status com atraso',
  'sem_status_sem_prazo': 'Sem status sem prazo',
  'cancelado': 'Cancelado',
  'transito_atraso': 'Em trânsito com atraso',
  'devolucao': 'Devolução',
  'pendente': 'Pendente',
  'faturado': 'Faturado',
  'em_transito': 'Em trânsito',
};
export type InvoiceStatusIconProps = {
  status: InvoiceStatus;
  size?: 'small' | 'large';
};

type StatusBaseProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export function InvoiceStatusIcon({ status, size }: InvoiceStatusIconProps) {
  // const { getTranslation } = useTranslation(translations);

  const StatusBase = ({ children, className }: StatusBaseProps) => {
    return (
      <span
        title={status}
        className={cn(
          'rounded-full bg-slate-300 text-slate-50 flex items-center justify-center p-1',
          size === 'large' ? 'w-10 h-10' : 'w-6 h-6',
          className
        )}
      >
        {children}
      </span>
    );
  };
  const renderIcon = (status: InvoiceStatus) => {
    switch (status) {
      case 'transito':
        return (
          <StatusBase className="bg-yellow-500">
            <Truck />
          </StatusBase>
        );
      case 'transito-atraso':
        return (
          <StatusBase className="bg-orange-500">
            <CalendarPlus />
          </StatusBase>
        );
        case 'transito_atraso':
        return (
          <StatusBase className="bg-purple-500">
            <FileClock />
          </StatusBase>
        );
      case 'transito_sem_prazo':
        return (
          <StatusBase className="bg-orange-500">
            <Truck />
          </StatusBase>
        );
      case 'entregue':
        return (
          <StatusBase className="bg-green-500">
            <PackageCheck />
          </StatusBase>
        );
      case 'entregue_cliente':
        return (
          <StatusBase className="bg-green-500">
            <PackageCheck />
          </StatusBase>
        );
      case 'entregue_atraso':
        return (
          <StatusBase className="bg-green-700">
            <PackageCheck />
          </StatusBase>
        );
      case 'entregue_sem_prazo':
        return (
          <StatusBase className="bg-green-700">
            <PackageCheck />
          </StatusBase>
        );
      case 'sem_status':
        return (
          <StatusBase>
            <></>
          </StatusBase>
        );
      case 'sem_status_atraso':
        return (
          <StatusBase>
            <></>
          </StatusBase>
        );
      case 'sem_status_sem_prazo':
        return (
          <StatusBase>
            <CalendarOff />
          </StatusBase>
        );
      case 'pendente':
        return (
          <StatusBase className="bg-yellow-500">
            <FileClock />
          </StatusBase>
        );
      case 'faturado':
        return (
          <StatusBase className="bg-purple-500">
            <FileText />
          </StatusBase>
        );
      case 'em_transito':
        return (
          <StatusBase className="bg-orange-500">
            <Truck />
          </StatusBase>
        );
      case 'cancelado':
        return (
          <StatusBase className="bg-red-500">
            <Ban />
          </StatusBase>
        );
      case 'devolucao':
        return (
          <StatusBase className="bg-purple-700">
            <Undo2 />
          </StatusBase>
        );
      default:
        return (
          <StatusBase>
            <></>
          </StatusBase>
        );
    }
  };
  return (
    <div className="flex items-center justify-center">{renderIcon(status)}</div>
  );
}
