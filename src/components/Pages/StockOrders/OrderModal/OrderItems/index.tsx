import { StockOrderItem } from 'contracts/StockOrders';
import React from 'react';
import * as S from './styles';

interface Props {
  items: StockOrderItem[];
}

const OrderItems: React.FC<Props> = ({ items }) => {
  return (
    <>
      <S.Header>
        <h4>Itens da solicitação</h4>
      </S.Header>
      <S.List>
        <S.ListHeader>
          <div>Qtd</div>
          <div>Produto</div>
          <div>Lote</div>
        </S.ListHeader>
        {items.map((item) => (
          <S.ListItem key={item.id}>
            <S.Column>
              {item.quantity} {item.productUnit.name}
            </S.Column>
            <S.Column>{item.product.name}</S.Column>
            <S.Column>{item.batch.toUpperCase()}</S.Column>
          </S.ListItem>
        ))}
      </S.List>
    </>
  );
};

export default OrderItems;
