import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { useLocation } from "react-router-dom";

interface HeaderMenu {
  title: string;
  to: string;
  todo: string;
}

export const CompaniesTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname === itemPath,
    [pathname]
  );

  const menuItems = useMemo((): HeaderMenu[] => {
    return [
      {
        title: "Listar Empresas",
        to: "/config/companies",
        todo: "LISTCARRIER",
      },
      {
        title: "Adicionar Empresa",
        to: "/config/companies/new",
        todo: "CREATECARRIER",
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
