import React from 'react';
import { showProductionApiAlert } from 'services/api';
import * as S from './styles';

export const ProductionApiAlert: React.FC = () => {
  if (!showProductionApiAlert) return null;

  return (
    <S.Container>
      <S.Message>
        Atenção, sua api está apontando para o ambiente de produção
      </S.Message>
    </S.Container>
  );
};
