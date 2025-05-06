import React, { useCallback } from 'react';
import { GuestScaffold } from 'layouts';
import { PasswordResetForm } from 'components/Pages/Guest/PasswordReset';
import * as S from './styles';

export const PasswordResetPage: React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <S.LogoImage src={require('assets/images/logo.png')} />
        </S.Logo>
        <S.Title>
          Código enviado por e-mail.
        </S.Title>
        <S.Subtitle>
          Informe o código que você recebeu por e-mail e uma nova senha.
        </S.Subtitle>
      </S.Header>
    ),
    []
  );

  return (
    <GuestScaffold>
      <S.PageContainer>
        <S.FormContainer>
          <Header />
          <PasswordResetForm />
        </S.FormContainer>
        <S.ArtContainer />
      </S.PageContainer>
    </GuestScaffold>
  );
};
