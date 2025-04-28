import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { ForgotState, ForgotActions } from "store/ducks/auth/forgot";

import * as S from "./styles";

export const ForgotSuccess: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector<RootStateOrAny>(
    (state) => state.forgot
  ) as ForgotState;

  useEffect(() => {
    return () => {
      dispatch(ForgotActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <S.Header>
        <S.Logo />
      </S.Header>
      {data && (
        <S.Content>
          <S.Title>Olá {data?.name}</S.Title>
          <S.Text>
            Uma nova senha de acesso foi gerada automaticamente pelo sistema
            WebCOL e enviada para seu e-mail: <span>{data?.email}</span>.<br />
            Siga as instruções contidas no e-mail e retorne para realizar o
            login.
          </S.Text>
          <S.Button onClick={() => history.push("/login")}>
            Retornar ao login
          </S.Button>
        </S.Content>
      )}
    </S.Container>
  );
};
