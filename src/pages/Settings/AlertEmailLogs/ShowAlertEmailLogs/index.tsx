import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useTranslation  } from 'hooks';

import { translations } from './translations';

import {
  FetchAlertEmailLogActions,
  FetchAlertEmailLogState,
} from 'store/ducks/settings/alert-email-logs';

import { MainContainer } from 'components/shared';
import * as S from './styles';
import { useHistory, useParams } from 'react-router-dom';

interface IParams {
  id: string;
}

export const ShowAlertEmailLogs: React.FC = () => {
  document.body.style.padding = "0px";
  const { id } = useParams<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const { data, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchAlertEmailLog
  ) as FetchAlertEmailLogState;

  const getData = useCallback(() => {
    dispatch(FetchAlertEmailLogActions.request(id));
  }, [dispatch, id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}
          {loading && <S.LoadingPage />}
        </h1>

        <S.HeaderButtons>
        <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
            <S.IconArrowLeft />
            {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <S.ContentModal>
          <S.BorderContent>
            <S.InfoContent>
              <S.TitleLabel>{getTranslation('destinatarios')}</S.TitleLabel>
              {data && data.receivers ? <S.InfoText>{data.receivers.replaceAll(";", " ")}</S.InfoText> : <S.InfoText>{"---"}</S.InfoText>}
            </S.InfoContent>
            <S.InfoContent>
              <S.TitleLabel>{getTranslation('assunto')}</S.TitleLabel>
              {data && data.subject ? <S.InfoText>{data.subject}</S.InfoText> : <S.InfoText>{"---"}</S.InfoText>}
            </S.InfoContent>
            <S.InfoContent>
              <S.TitleLabel>{getTranslation('mensagem')}</S.TitleLabel>
              {data && data.text ? <S.LogHMLT style={{
              }} dangerouslySetInnerHTML={{__html: data.text.replaceAll('<a ', '<a target="_blank" ')}} /> : <p>{"---"}</p>}
            </S.InfoContent>
          </S.BorderContent>
        </S.ContentModal>
      </S.PageContent>
    </MainContainer>
  );
};
