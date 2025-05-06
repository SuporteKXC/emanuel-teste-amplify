import React, { useCallback } from 'react';
import type { StockOrderStatus } from 'contracts/StockOrders';
import * as S from './styles';

interface Props {
  status: StockOrderStatus;
}
const StockOrderStatusIcon: React.FC<Props> = ({ status }) => {
  const renderIcon = useCallback(() => {
    switch (status) {
      case 'pendente':
        return <S.PendingIcon />;
      case 'separacao':
        return <S.SeparationIcon />;
      default:
        return <S.PendingIcon />;
    }
  }, [status]);

  return renderIcon();
};

export { StockOrderStatusIcon };
