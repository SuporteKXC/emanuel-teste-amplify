import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import type { SortingParams } from 'contracts/Common';
import type { PaginatedWarehouse } from 'contracts/Warehouses';
import React, { useCallback } from 'react';
import { Formatter } from 'utils';
import * as S from './styles';

interface Props {
  warehouses: PaginatedWarehouse[];
  onSort?: (sort: SortingParams) => void;
  currentSort: SortingParams;
}

interface ItemProps {
  warehouse: PaginatedWarehouse;
}

export const WarehousesList: React.FC<Props> = ({
  warehouses,
  onSort,
  currentSort,
}) => {
  const Item = useCallback(({ warehouse }: ItemProps): JSX.Element => {
    const { id, document, documentType, tradeName, addressCity, addressState } =
      warehouse;

    return (
      <S.ListItem>
        <S.Column>{id}</S.Column>
        <S.Column>{Formatter.document(document, documentType)}</S.Column>
        <S.Column>{tradeName}</S.Column>
        <S.Column>{addressCity}</S.Column>
        <S.Column>{addressState}</S.Column>
        <S.ActionsColumn>
          <S.LinkActionButton to={`/configuracoes/armazens/${id}/editar`}>
            <S.EditIcon />
          </S.LinkActionButton>
        </S.ActionsColumn>
      </S.ListItem>
    );
  }, []);

  return (
    <S.List>
      <S.ListHeader>
        <SortableHeadersGroup onSort={onSort} currentSort={currentSort}>
          <SortableHeader column="id" label="ID" />
          <SortableHeader column="document" label="DOCUMENTO" />
          <SortableHeader column="tradeName" label="NOME" />
          <SortableHeader column="addressCity" label="CIDADE" />
          <SortableHeader column="addressState" label="ESTADO" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {warehouses.map((warehouse) => (
        <Item key={warehouse.id} warehouse={warehouse} />
      ))}
    </S.List>
  );
};
