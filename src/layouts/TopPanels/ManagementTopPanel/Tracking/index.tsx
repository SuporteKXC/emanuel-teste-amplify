import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { useLocation } from "react-router-dom";

const lngs: any = ["pt-BR", "en", "es"];

interface HeaderMenu {
  title: string;
  to: string;
  todo: string;
}

export const TrackingTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname === itemPath,
    [pathname]
  );

  const menuItems = useMemo((): HeaderMenu[] => {
    return [
      {
        title: t("management.tracking.importacao.dashboard"),
        to: "/management/tracking/dashboard",
        todo: "DASHBOARD",
      },
      {
        title: t("management.tracking.importacao.importacao"),
        to: "/management/tracking/import",
        todo: "LISTTRACKING",
      },
      {
        title: t("management.tracking.complaint.complaint"),
        to: "/management/tracking/complaint",
        todo: "LISTCOMPLAINTS",
      },
      {
        title: t("management.tracking.curva.abc"),
        to: "/management/tracking/reports",
        todo: "LISTREPORTS",
      },
      {
        title: t("management.snapshot.transfer.transfer"),
        to: "/management/tracking/transfer",
        todo: "LISTTRANSFERS",
      }
    ];
  }, [t]);

  return (
    <S.Container>
      {menuItems.map((item, index) => (
        <S.MenuItem to={item.to} key={index} $active={isMenuActive(item.to)}>
          {item.title}
        </S.MenuItem>
      ))}
    </S.Container>
  );
};
