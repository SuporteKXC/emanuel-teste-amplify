import React from 'react';
import { Scaffold } from 'layouts';
import { StockOrderCreationForm } from 'components/Pages/StockOrders';
import * as S from './styles';

const StockOrderCreationPage: React.FC = () => {
  return (
    <Scaffold>
      <S.PageContainer>
        <StockOrderCreationForm />
      </S.PageContainer>
    </Scaffold>
  );
};

export { StockOrderCreationPage };
