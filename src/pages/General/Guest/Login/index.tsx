import React, { useCallback } from 'react'
import { GuestScaffold } from 'layouts/GuestScaffold';
import * as S from './styles';
import { LoginForm } from 'components';
import Logo from 'assets/images/logo-dark.png';

export const LoginPage:React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <img src={Logo}/>
        </S.Logo>
        <S.Title>
          Supply Monitoring and Management
        </S.Title>
        <S.Subtitle>Please submit your access credentials</S.Subtitle>
      </S.Header>
    ),
    []
  );

  return (
    <GuestScaffold>
      <S.PageContainer>
        <S.FormContainer>
          <Header />
          <LoginForm/>
        </S.FormContainer>
        <S.ArtContainer />
      </S.PageContainer>
    </GuestScaffold>
  )
};