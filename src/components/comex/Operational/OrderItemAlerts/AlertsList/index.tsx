import React, { useState } from "react";
import * as S from "./styles";
import { OrderItemAlertData } from 'contracts';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { AlertRolesModal } from 'components';

interface IProps {
  alerts: OrderItemAlertData[]
}

export const OrderItemAlerts: React.FC<IProps> = ({ alerts }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currAlert, setCurrAlert] = useState<OrderItemAlertData>();
  
  return (
    <S.ContentMainAlert>
      <header>
        <S.ConteMainAlertIcon size="20px" />
        <h3>Últimos alertas</h3>
      </header>
      <S.Alerts isScrolling={!!alerts[13]}>
        <S.GridHeader>
          <div>{t("comex.operational.orderItem.alerts.msg")}</div>
          <div>{t("comex.operational.orderItem.alerts.type")}</div>
          <div>{t("comex.operational.orderItem.alerts.date")}</div>
          <div></div>
        </S.GridHeader>
        <S.GridContainer>    
        {alerts.map(alert =>
          <S.ItemWrapper key={alert.id}>
            <div>{alert?.message}</div>
            <div>{alert?.alert_type?.description}</div>
            <div>
            {alert?.created_at
              ? format(new Date(alert?.created_at), "dd/MM/yyyy HH:mm")
              : "--/--/----"
            }
            </div>
            <S.DetailIcon onClick={() => {
                setIsModalOpen(true);
                setCurrAlert(alert);
              }}
            />
          </S.ItemWrapper>
        )}
        </S.GridContainer>
      </S.Alerts>
      <AlertRolesModal
        isOpen={isModalOpen}
        alert={currAlert}
        closeModal={() => setIsModalOpen(false)}
      />
    </S.ContentMainAlert>
  );
};