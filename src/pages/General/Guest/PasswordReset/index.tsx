import React, { useCallback } from "react";
import { GuestScaffold } from "layouts";
import { PasswordResetForm } from "components";
import * as S from "./styles";
import Logo from "assets/images/logo-dark.png";

export const PasswordResetPage: React.FC = () => {
  const Header = useCallback(
    (): JSX.Element => (
      <S.Header>
        <S.Logo>
          <img src={Logo} />
        </S.Logo>
        <S.Title>Redefina sua senha.</S.Title>
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
