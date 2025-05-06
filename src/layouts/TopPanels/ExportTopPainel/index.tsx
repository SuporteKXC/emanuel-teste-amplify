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

export const ExportTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { hasPermissionTo } = usePermission();
  const { pathname } = useLocation();

  const currentLocale = i18n.language; 

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname.includes(itemPath),
    [pathname]
  );

  const menuItems: HeaderMenu[] = [
    {
      title: "Operacional (por Item)",
      to: "/comex/export/operacional-item",
      todo: "LISTEXPORTORDERITEM",
    },
    {
      title: "Relatórios",
      to: "/comex/export/export-order-reports",
      todo: "LISTEXPORTORDERITEM",
    },
  ];
  const dashBoard = {
    title: t("comex.topMenu.dashboard.title"),
    to: "comex/export/dashboard",
  };

  const { data, isLoading } = useDashboards(6);

  const options = data?.map((option: DashboardData) => {
    const permissionsArray = option.permissions.split(",");
    console.log(permissionsArray)
    return {
      label: (option.locale as { [key: string]: any })[currentLocale],
      action: () => window.open(`/comex/export/dashboard/${option.page_url}`),
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
