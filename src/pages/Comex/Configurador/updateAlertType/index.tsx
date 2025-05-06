import UpdateAlertTypeForm from 'components/comex/Config/UpdateAlertType'
import { Scaffold } from 'layouts';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './styles';
import { changeLanguage } from 'i18next';

export const UpdateAlertType = () => {
    const location = useLocation();
    const data = location.state;
    const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
        {t('comex.settings.alertType.updateAlertType')}
      </S.Header>
      <UpdateAlertTypeForm />
    </>
  )
}

export default UpdateAlertType;