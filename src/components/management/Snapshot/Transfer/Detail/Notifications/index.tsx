import React from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

export interface Notifications {
  notification?: string;
  email?: string;
  date?: string;
}

interface Props {
  notifications: Notifications[];
}

//ARRUMAR O PROGRESS STEP E TERMINAR O FINAL DAS NOTIFICAÇÕES

export const BatchNotifications = React.memo(({ notifications }: Props) => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.Title>{t("management.tracking.detalhe.notificacoes")}</S.Title>
      <S.Content>
        <S.List>
          {notifications.map((notification, index) => (
            <S.Item key={index}>
              {notification?.notification ?? "---"}
              <S.Info>
                <S.ContentInfo>
                  {t("management.tracking.detalhe.enviadopara")}
                  <p>{notification?.email}</p>
                </S.ContentInfo>
                <S.ContentInfo>
                  {t("management.tracking.detalhe.em")}
                  <p>{notification?.date}</p>
                </S.ContentInfo>
              </S.Info>
            </S.Item>
          ))}
        </S.List>
        <div>
          <S.Next>
            {t("management.tracking.detalhe.proxima")}
            <S.EditButton>
              <S.EditIcon />
              {t("management.tracking.detalhe.alterar")}
            </S.EditButton>
          </S.Next>
        </div>
      </S.Content>
    </S.Container>
  );
});
