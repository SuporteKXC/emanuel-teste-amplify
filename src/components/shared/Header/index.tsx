import React from "react";

import * as S from "./styles";
import User from "./User";

export const Header: React.FC = () => {
  return (
    <S.Container>
      <User/>
    </S.Container>
  );
};
