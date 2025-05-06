import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ComexTopPanel, TrackingTopPanel, SnapshotTopPanel } from "layouts";
import * as S from "./styles";
import { AsideMenu, BackgroundTransition, Clock, StatusBar } from "components";
import { useTranslation } from "react-i18next";

interface Props extends React.PropsWithChildren<{}> {}

const homologPagesRegex = [
  /^\/management\/snapshot$/,
  /^\/management\/snapshot\/divergences$/,
  /^\/management\/tracking\/transfer$/,
  /^\/management\/tracking\/import$/,
  /^\/comex\/export\/operacional$/,
  /^\/comex\/export\/operacional-item$/,
  /^\/comex\/export\/operacional-item\/\d+$/,
];

export const Scaffold: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const paths = [
    {
      path: "comex/importation",
      component: <ComexTopPanel />,
    },
    {
      path: "management/snapshot",
      component: <SnapshotTopPanel />,
    },
    {
      path: "management/tracking",
      component: <TrackingTopPanel />,
    },
  ];

  const isInitial = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const TopPanel = useMemo(() => {
    return (
      paths.find(({ path }) => pathname.includes(path))?.component || <></>
    );
  }, [pathname]);

  return (
    <>
      {homologPagesRegex.some((regex) => regex.test(pathname)) ? (
        <S.Warning>
          <S.Title>{t("management.snapshot.snapshot.avisoTitulo")}</S.Title>
        </S.Warning>
      ) : (
        ""
      )}
      <S.PageContainer>
        <S.MainContainer>
          <AsideMenu />
          <S.Backdrop>
            <StatusBar />
            {TopPanel}
            <S.ChildrenSlot>{children}</S.ChildrenSlot>
            {isInitial && (
              <>
                <S.HorusContainer>
                  <S.HorusLogo />
                  <S.HorusContent>
                    <p>Horus Project</p>
                    Logistics Operation Management Tool
                  </S.HorusContent>
                </S.HorusContainer>
                <Clock />
              </>
            )}
          </S.Backdrop>
          {isInitial && (
            <>
              <BackgroundTransition />
            </>
          )}
        </S.MainContainer>
      </S.PageContainer>
    </>
  );
};
