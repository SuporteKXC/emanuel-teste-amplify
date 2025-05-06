import NewAlertTypeForm from 'components/comex/Config/NewAlertType';
import { Scaffold } from 'layouts';
import React from 'react';
import * as S from './styles';
import { useTranslation } from 'react-i18next';

export const NewAlertType = () => {
  const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
        {t('comex.settings.alertType.typesAlert')}
      </S.Header>
      <NewAlertTypeForm/>
    </>
  )
}

export default NewAlertType