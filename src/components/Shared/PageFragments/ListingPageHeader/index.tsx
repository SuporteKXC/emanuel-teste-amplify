import React from 'react';
import * as S from './styles';

interface Props {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  isLoading?: boolean;
}

export const ListingPageHeader: React.FC<Props> = ({
  title,
  icon,
  actions,
  isLoading = false,
}) => {
  return (
    <S.PageHeader>
      <S.TitleSlot>
        {icon} <S.Title>{title}</S.Title> {isLoading && <S.ActivityIndicator />}
      </S.TitleSlot>
      <S.ActionsSlot>{actions}</S.ActionsSlot>
    </S.PageHeader>
  );
};
