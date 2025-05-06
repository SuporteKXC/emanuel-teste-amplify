import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import { EMPTY_COLUMN_VALUE } from 'constants/Common';
import type { SortingParams } from 'contracts/Common';
import type { PaginatedStock } from 'contracts/Stocks';
import React, { useCallback } from 'react';
import { Formatter, Validator } from 'utils';
import * as S from './styles';

interface Props {
  stocks: PaginatedStock[];
  onSort?: (sort: SortingParams) => void;
  currentSort: SortingParams;
}

interface ItemProps {
  stock: PaginatedStock;
}

const StocksList: React.FC<Props> = ({ stocks, onSort, currentSort }) => {
  const Info = useCallback(({ stock }: ItemProps): JSX.Element => {
    const { time, startDate, dueDate, product } = stock;
    const info = [
      {
        id: 1,
        title: 'Contrato:',
        description: product.contractDescription,
      },
      {
        id: 2,
        title: 'Início em AG:',
        description: startDate && Formatter.date(startDate),
      },
      {
        id: 3,
        title: 'Dias restantes:',
        description: time,
      },
      {
        id: 4,
        title: 'Vencimento do AG:',
        description: dueDate && Formatter.date(dueDate),
      },
    ];

    return (
      <S.InfoContainer>
        <S.Tail />
        {info.map((item) => (
          <S.InfoContent key={item.id}>
            <S.InfoTitle>{item.title}</S.InfoTitle>
            {item.description}
          </S.InfoContent>
        ))}
      </S.InfoContainer>
    );
  }, []);

  const Item = useCallback(({ stock }: ItemProps): JSX.Element => {
    const {
      id,
      product,
      quantity,
      batch,
      productUnit,
      entranceDate,
      manufacturingDate,
      price,
      expirationDate,
      invoiceNumber,
      dueDate,
      totalPrice,
    } = stock;

    const expire =
      expirationDate && Validator.validateExpiration(expirationDate);

    const overdue = dueDate && Validator.validateExpiration(dueDate, 30);

    let titleExpiration = '';

    switch (expire) {
      case 'alert':
        titleExpiration = 'Perto do Vencimento';
        break;
      case 'expired':
        titleExpiration = 'Produto Vencido';
        break;
      default:
        break;
    }

    return (
      <S.ListItem>
        <S.Column>{id}</S.Column>
        <S.Column>{product?.code}</S.Column>
        <S.Column>{product?.name}</S.Column>
        <S.Column>{productUnit?.name}</S.Column>
        <S.Column>{quantity}</S.Column>
        <S.Column>{batch}</S.Column>
        <S.Column>
          {manufacturingDate
            ? Formatter.date(manufacturingDate)
            : EMPTY_COLUMN_VALUE}
        </S.Column>
        <S.Column style={{ overflow: 'visible' }}>
          {product.contract && (
            <S.IconContainer>
              <Info stock={stock} />
              <S.CalendarIcon overdue={overdue} />
            </S.IconContainer>
          )}
        </S.Column>
        <S.Column expire={expire} title={titleExpiration} padding>
          {expirationDate ? Formatter.date(expirationDate) : EMPTY_COLUMN_VALUE}
        </S.Column>
        <S.Column>
          {price ? Formatter.currency(price) : EMPTY_COLUMN_VALUE}
        </S.Column>
        <S.Column>
          {totalPrice ? Formatter.currency(totalPrice) : EMPTY_COLUMN_VALUE}
        </S.Column>
        <S.Column>{invoiceNumber}</S.Column>
        <S.Column>
          {entranceDate ? Formatter.date(entranceDate) : EMPTY_COLUMN_VALUE}
        </S.Column>
      </S.ListItem>
    );
  }, []);

  return (
    <S.List>
      <S.ListHeader>
        <SortableHeadersGroup onSort={onSort} currentSort={currentSort}>
          <SortableHeader column="id" label="ID" />
          <SortableHeader column="productCode" label="CÓDIGO" />
          <SortableHeader column="productName" label="DESCRIÇÃO" />
          <SortableHeader column="productUnitId" label="UN" />
          <SortableHeader column="quantity" label="QTD" />
          <SortableHeader column="batch" label="LOTE" />
          <SortableHeader column="manufacturingDate" label="DT FAB" />
          <SortableHeader column="agDueDate" label="AG" />
          <SortableHeader column="expirationDate" label="DT VENC" padding />
          <SortableHeader column="price" label="VALOR" />
          <SortableHeader column="totalPrice" label="TOTAL" disabled/>
          <SortableHeader column="invoiceNumber" label="NF" />
          <SortableHeader column="entranceDate" label="DT ENTRADA" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {stocks.map((stock) => (
        <Item key={stock.id} stock={stock} />
      ))}
    </S.List>
  );
};

export { StocksList };
