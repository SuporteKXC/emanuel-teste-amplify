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

export const TrackingDeliveryTopPanel: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isMenuActive = useCallback(
    (itemPath: string): boolean => pathname.startsWith(itemPath),
    [pathname]
  );

  const menuItems = useMemo((): HeaderMenu[] => {
    return [
      {
        title: "Tracking",
        to: "/tracking-delivery",
        todo: "TRACKING",
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
