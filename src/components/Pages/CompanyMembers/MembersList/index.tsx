import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import type { SortingParams } from 'contracts/Common';
import type { PaginatedCompanyMember } from 'contracts/CompanyMembers';
import React, { useCallback } from 'react';
import * as S from './styles';

interface Props {
  members: PaginatedCompanyMember[];
  currentSort: SortingParams;
  onSort?: (sort: SortingParams) => void;
  onImpersonate?: (email: string) => void;
}

interface ItemProps {
  member: PaginatedCompanyMember;
}

export const MembersList: React.FC<Props> = ({
  members,
  currentSort,
  onSort,
  onImpersonate,
}) => {
  const Item = useCallback(
    ({ member }: ItemProps): JSX.Element => {
      const { id, company, user } = member;

      return (
        <S.ListItem>
          <S.Column>{id}</S.Column>
          <S.Column>{user.name}</S.Column>
          <S.Column>{user.email}</S.Column>
          <S.Column>{company.tradeName}</S.Column>
          <S.ActionsColumn>
            <S.ActionButton
              mood="void"
              title="Fazer login como este usuário"
              onClick={() => onImpersonate?.(user.email)}
            >
              <S.LoginIcon />
            </S.ActionButton>
            <S.LinkActionButton
              to={`/configuracoes/clientes/usuarios/${id}/editar`}
            >
              <S.EditIcon />
            </S.LinkActionButton>
          </S.ActionsColumn>
        </S.ListItem>
      );
    },
    [onImpersonate]
  );

  return (
    <S.List>
      <S.ListHeader>
        <SortableHeadersGroup onSort={onSort} currentSort={currentSort}>
          <SortableHeader column="id" label="ID" />
          <SortableHeader column="userName" label="NOME" />
          <SortableHeader column="userEmail" label="E-MAIL" />
          <SortableHeader column="companyName" label="CLIENTE" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {members.map((member) => (
        <Item key={member.id} member={member} />
      ))}
    </S.List>
  );
};
