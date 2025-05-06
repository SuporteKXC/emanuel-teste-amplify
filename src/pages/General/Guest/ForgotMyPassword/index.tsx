import React, { useCallback } from "react";
import { GuestScaffold } from "layouts";
import { GenerateTokenForm } from "components";
import * as S from "./styles";
import Logo from "assets/images/logo-dark.png";

export const ForgotMyPasswordPage: React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <img src={Logo} />
        </S.Logo>
        <S.Title>Redefina sua senha.</S.Title>
        <S.Subtitle>
          Insira abaixo seu e-mail de acesso e clique em <span>Enviar</span>.
        </S.Subtitle>
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
