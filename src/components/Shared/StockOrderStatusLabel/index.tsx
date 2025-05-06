import type { StockOrderStatus } from 'contracts/StockOrders';
import React from 'react';
import * as S from './styles';

interface Props {
  status: StockOrderStatus;
}

export const StockOrderStatusLabel: React.FC<Props> = ({ status }) => {
  return (
    <S.Container status={status} className="status-label">
      {status}
    </S.Container>
  );
};
