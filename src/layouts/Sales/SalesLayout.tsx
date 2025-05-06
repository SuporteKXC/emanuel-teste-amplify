import { useTranslation } from "react-i18next";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { usePermission } from "hooks";
type TrackingDeliveryLayoutProps = {
  children: React.ReactNode;
};

export default function SalesLayout({ children }: TrackingDeliveryLayoutProps) {
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.asideMenu.tracking.innerNavigation.trackingSales"),
      route: "/tracking-delivery/sales",
      hasPermission: hasPermissionTo("SALES_ORDER.INDEX"),
    },
    // {
    //   title: t("comex.topMenu.alerts.title"),
    //   route: "/tracking-delivery/sales/alerts",
    //   hasPermission: hasPermissionTo("LISTUSERALERT"),
    // },
  ];
  return (
    <>
      <InnerNavigator options={navigatorOptions} />
      <section className="py-6">{children}</section>
    </>
  );
}
