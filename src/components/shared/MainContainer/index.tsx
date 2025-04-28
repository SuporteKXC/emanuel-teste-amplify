import React, { PropsWithChildren } from "react";

import * as S from "./styles";
import { AsideMenu } from "components/Main";

interface IMainProps extends PropsWithChildren<any> {}

export const MainContainer: React.FC<IMainProps> = ({ children }) => {
  return (
    <S.Container>
      <AsideMenu />
      <S.Content className="scrollHidden">{children}</S.Content>
    </S.Container>
  );
};
