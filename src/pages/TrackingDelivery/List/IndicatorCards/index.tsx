import { Card } from '@/components/ui/CardGs';
import { Indicators } from '@/contracts/trackingDelivery';
import { AlertTriangle, PackageCheck, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type TrackingNumbers = {
  total: number;
  withDelay: number;
  withoutDelay: number;
  withoutDeadline: number;
  percentageOfTotal: number;
  percentageWithDelay: number | null;
  percentageWithoutDelay: number | null;
  percentageWithoutDeadline: number | null;
};

type IndicatorCardsProps = {
  indicators: Indicators;
  isLoading: boolean;
};

type IndicatorCardProps = {
  trackingNumbers: TrackingNumbers;
  indicator: 'pending' | 'inTransit' | 'delivered';
  loading: boolean;
};

export function IndicatorCards({ indicators, isLoading }: IndicatorCardsProps) {

  const { t } = useTranslation();
  const { delivered, pending, inTransit } = indicators;

  function IndicatorCard({ trackingNumbers, indicator, loading }: IndicatorCardProps) {
    const renderIcon = (indicator: IndicatorCardProps['indicator']) => {
      switch (indicator) {
        case 'delivered':
          return <PackageCheck className="stroke-slate-800" />;
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
                {indicator === 'delivered' && t("trackingDelivery.indicators.delivered")}
                {indicator === 'pending' && t("trackingDelivery.indicators.pending")}
                {indicator === 'inTransit' && t("trackingDelivery.indicators.transit")}
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
              <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2 ">
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  0% {t("trackingDelivery.indicators.onTime")}
                </span>
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  0% {t("trackingDelivery.indicators.withDelay")}
                </span>
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  0% {t("trackingDelivery.indicators.withoutDeadline")}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );

    return (
      <div className={(
        trackingNumbers.total
      ) === 0 ? 'opacity-30' : ''}>
        <Card.Root>
          <Card.Header>
            <div className="flex items-center justify-between w-full">
              <h5 className="font-GilroySemibold text-sm text-slate-800">
                {indicator === 'delivered' && t("trackingDelivery.indicators.delivered")}
                {indicator === 'pending' && t("trackingDelivery.indicators.pending")}
                {indicator === 'inTransit' && t("trackingDelivery.indicators.transit")}
              </h5>
              {renderIcon(indicator)}
            </div>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-GilroyBold text-3xl text-primary-500">
                <span className={(
                  trackingNumbers.total
                ) === 0 ? 'text-slate-500' : 'text-primary-500'}>
                  {trackingNumbers.total}
                </span>
                <span className={(
                    trackingNumbers.total
                  ) === 0 ? 'text-slate-500' : 'text-primary-500'}>
                  {
                  trackingNumbers.percentageOfTotal ? (
                    trackingNumbers.percentageOfTotal
                  ).toFixed(2) : 0}
                  %
                </span>
              </div>
              <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2 ">
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  {trackingNumbers.percentageWithoutDelay ? trackingNumbers.percentageWithoutDelay : 0}% {t("trackingDelivery.indicators.onTime")}
                </span>
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  {trackingNumbers.percentageWithDelay ? trackingNumbers.percentageWithDelay : 0}% {t("trackingDelivery.indicators.withDelay")}
                </span>
                <span className="rounded-md bg-slate-200 px-1 py-0.5 font-GilroySemibold text-xs text-slate-500 max-w-max">
                  {trackingNumbers.percentageWithoutDeadline ? trackingNumbers.percentageWithoutDeadline : 0}% {t("trackingDelivery.indicators.withoutDeadline")}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );
  }

  return (
    <section className="grid md:grid-cols-3 gap-4 mb-4">
      <IndicatorCard trackingNumbers={pending} indicator="pending" loading={isLoading} />
      <IndicatorCard trackingNumbers={inTransit} indicator="inTransit" loading={isLoading} />
      <IndicatorCard trackingNumbers={delivered} indicator="delivered" loading={isLoading} />
    </section>
  );
}
