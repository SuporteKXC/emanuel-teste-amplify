import { NewResponsibleForm } from 'components/comex/Config/NewResponsible';
import { Scaffold } from 'layouts';
import React from 'react';
import * as S from './styles';
import { useTranslation } from 'react-i18next';

export const NewResponsible = () => {
  const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
        {t('general.config.profile.newResponsible')}
      </S.Header>
      <NewResponsibleForm/>
    </>
  )
}

export default NewResponsible