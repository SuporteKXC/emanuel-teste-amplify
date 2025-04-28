import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Alert } from "interfaces/alert";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridAlertsProps {
  alerts: Alert[] | Record<string, any>[];
}

interface IAlertProps {
  alert: Alert | Record<string, any>;
}

const Item: React.FC<IAlertProps> = ({ alert }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/alert/${alert.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{alert.name || "--"}</S.ItemValue>
        <S.ItemValue>{alert.module ? alert.module.name : "--"}</S.ItemValue>
        <S.ItemValue>{alert.description || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridAlerts: React.FC<IGridAlertsProps> = ({ alerts = [] }) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('nome')}</S.Label>
        <S.Label>{getTranslation('modulos')}</S.Label>
        <S.Label>{getTranslation('descricao')}</S.Label>
      </S.Header>
      {alerts.length > 0 &&
        alerts.map((alert) => <Item alert={alert} key={alert.id} />)}
    </S.Container>
  );
};
