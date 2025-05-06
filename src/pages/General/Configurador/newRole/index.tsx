import { NewRoleForm } from 'components';
import { Scaffold } from 'layouts';
import React from 'react';
import * as S from './styles';
import { useTranslation } from 'react-i18next';

export const NewRole = () => {
  const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
        {t('general.config.profile.newProfile')}
      </S.Header>
      <NewRoleForm/>
    </>
  )
}

export default NewRole