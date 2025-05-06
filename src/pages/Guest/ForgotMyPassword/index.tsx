import React, { useCallback } from 'react';
import { GuestScaffold } from 'layouts';
import { GenerateTokenForm } from 'components/Pages/Guest/ForgotMyPassword';
import * as S from './styles';

export const ForgotMyPasswordPage: React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <S.LogoImage src={require('assets/images/logo.png')} />
        </S.Logo>
        <S.Title>
          Insira abaixo seu e-mail de acesso e clique em Enviar.
        </S.Title>
        <S.Subtitle>
          Após o envio, você receberá um e-mail com um código que será usado na
          próxima etapa para redefinir sua senha.
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
          <GenerateTokenForm />
        </S.FormContainer>
        <S.ArtContainer />
      </S.PageContainer>
    </GuestScaffold>
  );
};
