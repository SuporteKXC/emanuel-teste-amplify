import { Scaffold } from 'layouts'
import React from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export const ConfigIndex:React.FC = () => {
  const { i18n,t } = useTranslation();
  return (
    <>    
      <S.PageHeader>
        <div>{t('general.config.title')}</div>
      </S.PageHeader>
        <S.Container>
          <S.LinkNav to={'users'}>{t('general.config.users.title')}</S.LinkNav>
          <S.LinkNav to={'roles'}>{t('general.config.roles.title')}</S.LinkNav>
          <S.LinkNav to={'alert-types'}>{t('general.config.alertTypes.title')}</S.LinkNav>
          <S.LinkNav to={'products'}>{t('general.config.products.title')}</S.LinkNav>
          <S.LinkNav to={'credit-history'}>{t('general.config.creditHistory.title')}</S.LinkNav>
          <S.LinkNav to={'responsible'}>{t('general.config.responsible.title')}</S.LinkNav>
          <S.LinkNav to={'justification-type'}>{t('general.config.responsible.title')}</S.LinkNav>
        </S.Container>
    </>
  )
}

export default ConfigIndex