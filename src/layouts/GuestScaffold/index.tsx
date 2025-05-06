import React from 'react';
import * as S from './styles';

interface Props extends React.PropsWithChildren<{}> {}

export const GuestScaffold: React.FC<Props> = ({ children }) => {
  return (
    <S.PageContainer>
      <S.Backdrop />
      <S.ChildrenContainer>{children}</S.ChildrenContainer>
    </S.PageContainer>
  );
};
