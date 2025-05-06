import { JustificationTypeFrom } from 'components/comex/Config/NewJustificationType';
import { Scaffold } from 'layouts';
import React from 'react';
// import * as S from './styles';
import { useTranslation } from 'react-i18next';

export const NewJustificationType = () => {
  const { i18n,t } = useTranslation();
  return (
    <>
      <JustificationTypeFrom/>
    </>
  )
}

export default NewJustificationType;