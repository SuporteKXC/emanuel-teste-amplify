import {
  SortableHeader,
  SortableHeadersGroup,
  StockOrderStatusLabel,
} from 'components/Shared';
import { EMPTY_COLUMN_VALUE } from 'constants/Common';
import type { SortingParams } from 'contracts/Common';
import type { PaginatedStockOrder } from 'contracts/StockOrders';
import React, { useCallback } from 'react';
import { Formatter } from 'utils';
import * as S from './styles';

interface Props {
  stockOrders: PaginatedStockOrder[];
  currentSort: SortingParams;
  onSort?: (sort: SortingParams) => void;
  onSelectOrder?: (orderId: number) => void;
}

interface ItemProps {
  stockOrder: PaginatedStockOrder;
}

const StockOrdersList: React.FC<Props> = ({
  stockOrders,
  currentSort,
  onSort,
  onSelectOrder,
}) => {
  const Item = useCallback(
    ({ stockOrder }: ItemProps): JSX.Element => {
      const {
        id,
        wmsId,
        company,
        warehouse,
        withdrawalDate,
        addressCity,
        addressState,
        items,
        status,
      } = stockOrder;

      return (
        <S.ListItem>
          <S.Column>{id}</S.Column>
          <S.Column>
            <StockOrderStatusLabel status={status} />
          </S.Column>
          <S.Column>{wmsId || EMPTY_COLUMN_VALUE}</S.Column>
          <S.Column title={company.tradeName}>
            {Formatter.document(company?.document)}
          </S.Column>
          <S.Column title={warehouse.tradeName}>
            {Formatter.document(warehouse?.document)}
          </S.Column>
          <S.Column>
            {withdrawalDate
              ? Formatter.date(withdrawalDate)
              : EMPTY_COLUMN_VALUE}
          </S.Column>
          <S.Column>{items.length}</S.Column>
          <S.Column>
            {addressCity}/{addressState}
          </S.Column>
          <S.ActionsColumn>
            <S.ActionButton onClick={() => onSelectOrder?.(id)}>
              <S.ArrowRightCircleIcon />
            </S.ActionButton>
          </S.ActionsColumn>
        </S.ListItem>
      );
    },
    [onSelectOrder]
  );

  return (
    <S.List>
      <S.ListHeader>
        <SortableHeadersGroup onSort={onSort} currentSort={currentSort}>
          <SortableHeader column="id" label="ID" />
          <SortableHeader column="status" label="STATUS" />
          <SortableHeader column="wmsId" label="WMS ID" />
          <SortableHeader column="companyDocument" label="CLIENTE" />
          <SortableHeader column="warehouseDocument" label="ARMAZÉM" />
          <SortableHeader column="withdrawalDate" label="DT RETIRADA" />
          <SortableHeader column="itemsCount" label="QTD ITENS" />
          <SortableHeader column="addressCity" label="DESTINO" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {stockOrders.map((stockOrder) => (
        <Item key={stockOrder.id} stockOrder={stockOrder} />
      ))}
    </S.List>
  );
};

export { StockOrdersList };
