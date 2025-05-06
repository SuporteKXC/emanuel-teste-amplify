import React, { useCallback, useMemo } from "react";
import { usePermission } from "hooks";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { PopoverMenu } from "components";
import { useLocation } from "react-router-dom";
import i18n from "@/i18n";
import { DashboardData } from "@/contracts";
import { useDashboards } from "@/hooks/useDashboards";

interface HeaderMenu {
  title: string;
  to: string;
  todo: string;
}

export const ComexTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const { pathname } = useLocation();

  const currentLocale = i18n.language; 

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname.includes(itemPath),
    [pathname]
  );

  const menuItems = useMemo((): HeaderMenu[] => {
    return [
      {
        title: t("comex.topMenu.operational.title"),
        to: "comex/importation/operacional",
        todo: "LISTORDERITEM",
      },
      {
        title: t("comex.topMenu.documentation.title"),
        to: "comex/importation/documentos",
        todo: "LISTORDERITEM",
      },
      {
        title: t("comex.topMenu.panels.title"),
        to: "comex/importation/panels",
        todo: "LISTPRODUCT",
      },
      {
        title: "Relatórios",
        to: "comex/importation/order-reports",
        todo: "LISTPRODUCT",
      },
      // {
      //   title: t("comex.topMenu.alerts.title"),
      //   to: "comex/importation/alertas",
      //   todo: "LISTUSERALERT",
      // },
    ];
  }, [t]);

  const dashBoard = {
    title: t("comex.topMenu.dashboard.title"),
    to: "comex/importation/dashboard",
  };

  const { data, isLoading } = useDashboards(2);

  const options = data?.map((option: DashboardData) => {
    const permissionsArray = option.permissions.split(",");
    return {
      label: (option.locale as { [key: string]: any })[currentLocale],
      action: () => window.open(`/comex/importation/${option.page_url}`),
      todo: permissionsArray.includes("safe") ? ["safe"] : permissionsArray,
    }
  }).filter(({ todo }: { todo: string[] }) => hasPermissionTo(...todo))

  const optionIsLoading = [{
    label: "Carregando...",
    action: () => null,
  }]

  return (
    <S.Container>
      {menuItems
        .filter(({ todo }) => hasPermissionTo(todo))
        .map((item, index) => (
          <S.MenuItem to={item.to} key={index} $active={isMenuActive(item.to)}>
            {item.title}
          </S.MenuItem>
        ))}
      <S.MenuItemWithOptions $active={isMenuActive(dashBoard.to)}>
        <PopoverMenu menuItems={isLoading ? optionIsLoading : options}>
          <S.OptionButton>{dashBoard.title}</S.OptionButton>
        </PopoverMenu>
      </S.MenuItemWithOptions>
    </S.Container>
  );
};
