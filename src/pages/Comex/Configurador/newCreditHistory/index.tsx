import NewCreditHistoryForm from 'components/comex/Config/NewCreditHistory';
import { Scaffold } from 'layouts';
import React from 'react';
import * as S from './styles';
import { useTranslation } from 'react-i18next';

export const NewCreditHistory = () => {
  const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
        {t('comex.settings.creditHistory.createTitle')}
      </S.Header>
      <NewCreditHistoryForm/>
    </>
  )
}

export default NewCreditHistory;