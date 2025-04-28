import React, { useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import { AuthActions, AuthState } from "store/ducks/auth";
import { useTranslation } from 'hooks';
import { translations } from './translations';

import * as S from "./styles";

export const User: React.FC = () => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const { data: userData } = useSelector<RootStateOrAny>(
    (state) => state.auth
  ) as AuthState;

  const handleLogout = useCallback(() => {
    dispatch(AuthActions.logoutRequest());
  }, [dispatch]);

  return (
    <S.Container>
      <S.Name>{userData?.name.split(" ")[0]}</S.Name>
      <S.Logout onClick={handleLogout}>{getTranslation("sair")}</S.Logout>
    </S.Container>
  );
};
