import React from "react";

import { useHistory } from "react-router-dom";

import * as S from "./styles";

export const PasswordSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <S.Header>
        <S.Logo />
      </S.Header>
      <S.Content>
        <S.Title>Sua nova senha criada com sucesso!</S.Title>
        <S.Text>Clique no botão abaixo para retornar a tela de login.</S.Text>
        <S.Button onClick={() => history.push("/login")}>
          Retornar ao login
        </S.Button>
      </S.Content>
    </S.Container>
  );
};
