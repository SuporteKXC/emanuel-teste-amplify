import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import type { SortingParams } from 'contracts/Common';
import type { PaginatedCompany } from 'contracts/Companies';
import React, { useCallback } from 'react';
import { Formatter } from 'utils';
import * as S from './styles';

interface Props {
  companies: PaginatedCompany[];
  onSort?: (sort: SortingParams) => void;
  currentSort: SortingParams;
}

interface ItemProps {
  company: PaginatedCompany;
}

export const CompaniesList: React.FC<Props> = ({
  companies,
  onSort,
  currentSort,
}) => {
  const Item = useCallback(({ company }: ItemProps): JSX.Element => {
    const { id, document, documentType, tradeName, addressCity, addressState } =
      company;

    return (
      <S.ListItem>
        <S.Column>{id}</S.Column>
        <S.Column>{Formatter.document(document, documentType)}</S.Column>
        <S.Column>{tradeName}</S.Column>
        <S.Column>{addressCity}</S.Column>
        <S.Column>{addressState}</S.Column>
        <S.ActionsColumn>
          <S.LinkActionButton to={`/configuracoes/clientes/${id}/editar`}>
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
      {companies.map((company) => (
        <Item key={company.id} company={company} />
      ))}
    </S.List>
  );
};
