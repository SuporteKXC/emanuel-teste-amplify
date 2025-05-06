import React, { useCallback } from 'react';
import { GuestScaffold } from 'layouts';
import { LoginForm } from 'components/Pages/Guest/Login';
import * as S from './styles';

export const LoginPage: React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <S.LogoImage src={require('assets/images/logo.png')} />
        </S.Logo>
        <S.Title>
          Maior visibilidade do estoque em nossos centros de distribuição
        </S.Title>
        <S.Subtitle>Entre com suas credenciais de acesso</S.Subtitle>
      </S.Header>
    ),
    []
  );

  return (
    <GuestScaffold>
      <S.PageContainer>
        <S.FormContainer>
          <Header />
          <LoginForm />
        </S.FormContainer>
        <S.ArtContainer />
      </S.PageContainer>
    </GuestScaffold>
  );
};
