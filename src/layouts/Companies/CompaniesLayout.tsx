import { useTranslation } from "react-i18next";
import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import { usePermission } from "hooks";
type CompaniesLayoutProps = {
  children: React.ReactNode;
};

export default function CompaniesLayout({ children }: CompaniesLayoutProps) {
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const navigatorOptions: InnerNavigatorOption[] = [
    {
      title: t("general.config.companies.listCompanies"),
      route: "/config/companies",
      hasPermission: true,
    },
    {
      title: t("general.config.companies.addCompany"),
      route: "/config/companies/new",
      hasPermission: true,
    },
  ];

  return (
    <>
      <InnerNavigator options={navigatorOptions} />
      <section className="py-6">{children}</section>
    </>
  );
}
