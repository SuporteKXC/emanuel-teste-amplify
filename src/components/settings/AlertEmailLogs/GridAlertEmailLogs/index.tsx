import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { AlertEmailLog } from "interfaces/alert-email-log";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridAlertEmailLogsProps {
  alertEmailLogs: AlertEmailLog[] | Record<string, any>[];
}

interface IAlertEmailLogProps {
  alertEmailLog: AlertEmailLog | Record<string, any>;
}

const Item: React.FC<IAlertEmailLogProps> = ({ alertEmailLog }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/alert-email-logs/${alertEmailLog.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{alertEmailLog.receivers || "--"}</S.ItemValue>
        <S.ItemValue>{alertEmailLog.subject || "--"}</S.ItemValue>
        <S.ItemValue>{alertEmailLog.created_at || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridAlertEmailLogs: React.FC<IGridAlertEmailLogsProps> = ({ alertEmailLogs = [] }) => {
  const { getTranslation } = useTranslation(translations);

  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('destinatarios')}</S.Label>
        <S.Label>{getTranslation('assunto')}</S.Label>
        <S.Label>{getTranslation('date')}</S.Label>
      </S.Header>
      {alertEmailLogs.length > 0 &&
        alertEmailLogs.map((alertEmailLog) => <Item alertEmailLog={alertEmailLog} key={alertEmailLog.id} />)}
    </S.Container>
  );
};
