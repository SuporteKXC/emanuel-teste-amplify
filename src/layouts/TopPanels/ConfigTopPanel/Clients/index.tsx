import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { useLocation } from "react-router-dom";

interface HeaderMenu {
  title: string;
  to: string;
  todo: string;
}

export const ClientsTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname === itemPath,
    [pathname]
  );

  const menuItems = useMemo((): HeaderMenu[] => {
    return [
      {
        title: t("general.config.clients.listarClientes"),
        to: "/config/clients",
        todo: "LISTCLIENT",
      },
      {
        title: t("general.config.clients.criarCliente"),
        to: "/config/clients/new",
        todo: "CREATECLIENT",
      },
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
