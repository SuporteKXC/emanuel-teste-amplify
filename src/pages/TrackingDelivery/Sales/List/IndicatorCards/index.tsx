import { Card } from '@/components/ui/CardGs';
import { Indicators } from '@/contracts/salesOrder';
import { AlertTriangle, PackageCheck, Truck, FileCheck2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type SalesOrderNumbers = {
  total: number;
  percentageOfTotal: number;
};

type IndicatorCardsProps = {
  indicators: Indicators;
  isLoading: boolean;
};

type SalesOrderProps = {
  salesOrderNumbers: SalesOrderNumbers;
  indicator: 'pending' | 'sales' | 'inTransit' | 'delivered';
  loading: boolean;
};

export function IndicatorCards({ indicators, isLoading }: IndicatorCardsProps) {

  const { t } = useTranslation();
  const base = "salesOrder.cards";
  const { delivered, sales, pending, inTransit } = indicators;

  function IndicatorCard({ salesOrderNumbers, indicator, loading }: SalesOrderProps) {
    const renderIcon = (indicator: SalesOrderProps['indicator']) => {
      switch (indicator) {
        case 'delivered':
          return <PackageCheck className="stroke-slate-800" />;
        case 'sales':
          return <FileCheck2 className="stroke-slate-800" />;
        case 'pending':
          return <AlertTriangle className="stroke-slate-800" />;
        case 'inTransit':
          return <Truck className="stroke-slate-800" />;
        default:
          return <AlertTriangle className="stroke-slate-800" />;
      }
    };

    if(loading) return (
      <div className="opacity-30">
        <Card.Root>
          <Card.Header>
            <div className="flex items-center justify-between w-full">
              <h5 className="font-GilroySemibold text-sm text-slate-800">
                {indicator === 'delivered' && t(`${base}.entregue`)}
                {indicator === 'sales' && t(`${base}.faturado`)}
                {indicator === 'pending' && t(`${base}.pendenteFat`)}
                {indicator === 'inTransit' && t(`${base}.transito`)}
              </h5>
              {renderIcon(indicator)}
            </div>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-GilroyBold text-3xl text-primary-500">
                <span className="text-gray-600">
                  0
                </span>
                <span className="text-gray-600">
                  0%
                </span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );

    return (
      <div className={(
        salesOrderNumbers.total
      ) === 0 ? 'opacity-30' : ''}>
        <Card.Root>
          <Card.Header>
            <div className="flex items-center justify-between w-full">
              <h5 className="font-GilroySemibold text-sm text-slate-800">
                {indicator === 'delivered' && t(`${base}.entregue`)}
                {indicator === 'sales' && t(`${base}.faturado`)}
                {indicator === 'pending' && t(`${base}.pendenteFat`)}
                {indicator === 'inTransit' && t(`${base}.transito`)}
              </h5>
              {renderIcon(indicator)}
            </div>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-GilroyBold text-3xl text-primary-500">
                <span className={(
                  salesOrderNumbers.total
                ) === 0 ? 'text-slate-500' : 'text-primary-500'}>
                  {salesOrderNumbers.total}
                </span>
                <span className={(
                    salesOrderNumbers.total
                  ) === 0 ? 'text-slate-500' : 'text-primary-500'}>
                  {
                  salesOrderNumbers.percentageOfTotal ? (
                    salesOrderNumbers.percentageOfTotal
                  ).toFixed(2) : 0}
                  %
                </span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );
  }

  return (
    <section className="grid md:grid-cols-4 gap-4 mb-4">
      <IndicatorCard salesOrderNumbers={pending} indicator="pending" loading={isLoading} />
      <IndicatorCard salesOrderNumbers={sales} indicator="sales" loading={isLoading} />
      <IndicatorCard salesOrderNumbers={inTransit} indicator="inTransit" loading={isLoading} />
      <IndicatorCard salesOrderNumbers={delivered} indicator="delivered" loading={isLoading} />
    </section>
  );
}
