import React from 'react';
import { showPHomologAlert } from 'services/api';
import * as S from './styles';

export const HomologAlert: React.FC = () => {
  if (!showPHomologAlert) return null;

  return (
    <S.Container>
      <S.Message>
        Atenção, vocês está usando uma versão de homologação e sua api está
        apontando para o ambiente de produção
      </S.Message>
    </S.Container>
  );
};
