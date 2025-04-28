import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { AuthState } from "store/ducks/auth";

import { MainContainer, MenuSelector } from "components/shared";
import * as S from "./styles";
import { useHistory } from "react-router-dom";

export const SettingMain: React.FC = () => {
  const history = useHistory();

  const { data: userData } = useSelector<RootStateOrAny>(
    (state) => state?.auth
  ) as AuthState;
  const userRole =  userData?.roles[0]

  var initialPage = 'alerts';


  switch (userRole) {
    case 'Customer Service':
      initialPage = 'clients'
      break;
  
    default:
      initialPage = 'alerts'
      break;
  }

  history.push(`/settings/${initialPage}`);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          Configurações <MenuSelector page={initialPage}/>
        </h1>

      </S.PageHeader>
      <S.PageContent>
        
      </S.PageContent>
    </MainContainer>
  );
};
