import { MainNavigatorOptionProps } from "@/components/ui/MainNavigator";
import {
  AlertTriangleIcon,
  Package2Icon,
  PlaneTakeoffIcon,
  RouteIcon,
  SettingsIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function MainNavOptions() {
  const { t } = useTranslation();

  const options: MainNavigatorOptionProps["options"] = [
    {
      name: "Comex",
      module: "comex",
      description: "Gestão de processos de importação e exportação.",
      icon: <PlaneTakeoffIcon className="w-5 h-5" />,
      subOptions: [
        {
          name: t("general.asideMenu.comex.importation.title"),
          route: "comex/importation",
          permission: "LISTORDERITEM",
        },
        {
          name: t("general.asideMenu.comex.exportation.title"),
          route: "comex/export/operacional-item",
          permission: "LISTEXPORTORDERITEM",
        },
      ],
    },
    // {
    //   name: "Gestão de estoque",
    //   module: "wms",
    //   description: "Controle da movimentação de estoque e snapshot.",
    //   icon: <Package2Icon className="w-5 h-5" />,
    //   subOptions: [
    //     {
    //       name: t("general.asideMenu.management.abc.title"),
    //       route: "management/tracking/import",
    //       permission: "STOCKORDERS.LIST",
    //     },
    //     {
    //       name: t("general.asideMenu.management.snapshot.title"),
    //       route: "management/snapshot/dashboard",
    //       permission: "LISTSNAPSHOTS",
    //     },
    //   ],
    // },
    {
      name: t("general.asideMenu.tracking.name"),
      module: "tracking",
      description: "Monitoramento e gestão de entregas em tempo real.",
      icon: <RouteIcon className="w-5 h-5" />,
      subOptions: [
        {
          name: t("general.asideMenu.tracking.tracking.title"),
          route: "tracking-delivery",
          permission: "DOCUMENTS.GET_DOCUMENTS",
        },
        {
          name: t("general.asideMenu.tracking.sales.title"),
          route: "tracking-delivery/sales",
          permission: "SALES_ORDER.INDEX",
        },
      ],
    },
    {
      name: "Alertas",
      module: "FREE",
      description: "Alertas do usuário.",
      icon: <AlertTriangleIcon className="w-5 h-5" />,
      subOptions: [
        {
          name: "Comex",
          route: "alerts/comex",
          permission: "LISTUSERALERT",
        },
        {
          name: "Estoque",
          route: "alerts/wms",
          permission: "LISTUSERALERT",
        },
        {
          name: "Saídas",
          route: "alerts/sales",
          permission: "LISTUSERALERT",
        },
        {
          name: "Exportação - Comex",
          route: "alerts/comex-export",
          permission: "LISTUSERALERT",
        },
      ],
    },
    {
      name: "Configurações",
      module: "config",
      description: "Monitoramento e gestão de entregas em tempo real.",
      icon: <SettingsIcon className="w-5 h-5" />,
      subOptions: [
        {
          name: t("general.asideMenu.config.roles.title"),
          route: "config/roles",
          permission: "LISTROLE",
        },
        {
          name: t("general.asideMenu.config.users.title"),
          route: "config/users",
          permission: "LISTUSER",
        },
        {
          name: t("general.asideMenu.config.alertTypes.title"),
          route: "config/alert-types",
          permission: "LISTALERTTYPE",
        },
        {
          name: t("general.asideMenu.config.carriers.title"),
          route: "config/carriers",
          permission: "LISTCARRIER",
        },
        {
          name: t("general.asideMenu.config.clients.title"),
          route: "config/clients",
          permission: "LISTCLIENT",
        },
        {
          name: t("general.asideMenu.config.transitTimes.title"),
          route: "config/tracking-transit-times",
          permission: "LISTTTRANSITTIME",
        },
        {
          name: t("comex.topMenu.config.products.title"),
          route: "config/products",
          permission: "LISTPRODUCT",
        },
        {
          name: t("comex.topMenu.config.creditHistory.title"),
          route: "config/credit-history",
          permission: "LISTCREDITHISTORY",
        },
        {
          name: t("comex.topMenu.config.responsible.title"),
          route: "config/responsible",
          permission: "LISTRESPONSIBLE",
        },
        {
          name: t("comex.topMenu.config.justificationType.title"),
          route: "config/justification-type",
          permission: "LISTJUSTIFICATIONTYPE",
        },
        {
          name: t("comex.topMenu.config.transitTime.title"),
          route: "config/transit-time",
          permission: "LISTTRANSITTIME",
        },
        {
          name: t("general.asideMenu.config.companies.title"),
          route: "config/companies",
          permission: "LISTCARRIER",
        },
        {
          name: t("general.asideMenu.config.suppliers.title"),
          route: "config/suppliers",
          permission: "LISTSUPPLIER",
        },
        {
          name: "Feriados",
          route: "config/holidays",
          permission: "LISTHOLIDAY",
        },
      ],
    },
  ];

  return { options };
}
