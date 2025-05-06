import { useTranslation } from "react-i18next";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { usePermission } from "hooks";
type TrackingDeliveryLayoutProps = {
  children: React.ReactNode;
};

export default function TrackingDeliveryLayout({
  children,
}: TrackingDeliveryLayoutProps) {
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();

  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.asideMenu.tracking.innerNavigation.tracking"),
      route: "/tracking-delivery",
      hasPermission: hasPermissionTo("DOCUMENTS.GET_DOCUMENTS"),
    },
    {
      title: t("general.asideMenu.tracking.innerNavigation.deliveryVoucher"),
      route: "/tracking-delivery/vouchers",
      hasPermission: hasPermissionTo("DELIVERY_VOUCHER.INDEX"),
    },
    {
      title: t(
        "general.asideMenu.tracking.innerNavigation.deliveryVoucherReport"
      ),
      route: "/tracking-delivery/reports",
      hasPermission: hasPermissionTo("DELIVERY_VOUCHER.REPORT"),
    },
  ];
  return (
    <>
      <InnerNavigator options={navigatorOptions} className="relative" />
      <section className="py-6">{children}</section>
    </>
  );
}
