import { UpdateRoleForm } from 'components'
import { Scaffold } from 'layouts'
import React from 'react'
import * as S from './styles'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export const UpdateRole = () => {
    const location = useLocation();
    const data = location.state;
    const { i18n,t } = useTranslation();
  return (
    <>
      <S.Header>
      {t('general.config.profile.actualProfile')}
      </S.Header>
      <UpdateRoleForm />
    </>
  )
}

export default UpdateRole