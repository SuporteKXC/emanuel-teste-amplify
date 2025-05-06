import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import { PaginatedAdmin } from 'contracts/Admins';
import type { SortingParams } from 'contracts/Common';
import React, { useCallback } from 'react';
import * as S from './styles';

interface Props {
  admins: PaginatedAdmin[];
  onSort?: (sort: SortingParams) => void;
  currentSort: SortingParams;
}

interface ItemProps {
  admin: PaginatedAdmin;
}

export const AdminsList: React.FC<Props> = ({
  admins,
  onSort,
  currentSort,
}) => {
  const Item = useCallback(({ admin }: ItemProps): JSX.Element => {
    const { id, user } = admin;

    return (
      <S.ListItem>
        <S.Column>{id}</S.Column>
        <S.Column>{user.name}</S.Column>
        <S.Column>{user.email}</S.Column>
        <S.ActionsColumn>
          <S.LinkActionButton
            to={`/configuracoes/administradores/${id}/editar`}
          >
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
          <SortableHeader column="userName" label="NOME" />
          <SortableHeader column="userEmail" label="E-MAIL" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {admins.map((admin) => (
        <Item key={admin.id} admin={admin} />
      ))}
    </S.List>
  );
};
