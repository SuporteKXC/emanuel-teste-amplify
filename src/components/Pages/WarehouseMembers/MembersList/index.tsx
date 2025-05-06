import { SortableHeader, SortableHeadersGroup } from 'components/Shared';
import type { SortingParams } from 'contracts/Common';
import type {
  PaginatedWarehouseMember,
  Warehouse,
  WarehouseMember,
} from 'contracts/WarehouseMembers';
import React, { useState } from 'react';
import * as S from './styles';
import { WarehousesModal } from '../Modal';

interface Props {
  members: PaginatedWarehouseMember[];
  onSort?: (sort: SortingParams) => void;
  onImpersonate?: (email: string) => void;
  currentSort: SortingParams;
}

interface ItemProps {
  member: PaginatedWarehouseMember;
}

export const MembersList: React.FC<Props> = ({
  members,
  onSort,
  onImpersonate,
  currentSort,
}) => {
  const [warehouses, setWarehouses] = useState<Partial<Warehouse>[]>([]);

  const handleModal = React.useCallback(
    (warehouseMember?: WarehouseMember[]) => {
      setWarehouses(
        warehouseMember ? warehouseMember.map((member) => member.warehouse) : []
      );
    },
    []
  );

  const Item = React.useCallback(
    ({ member }: ItemProps): JSX.Element => {
      const { id, name, email, warehouseMembers } = member;

      return (
        <S.ListItem>
          <S.Column>{id}</S.Column>
          <S.Column>{name}</S.Column>
          <S.Column>{email}</S.Column>
          <S.ActionsColumn>
            <S.ButtonModal
              title="Ver armazéns"
              onClick={() => handleModal(warehouseMembers)}
            >
              <S.PackageSolidIcon />
              <S.Quantity>{warehouseMembers.length}</S.Quantity>
            </S.ButtonModal>
            <S.ActionButton
              mood="void"
              title="Fazer login como este usuário"
              onClick={() => onImpersonate?.(email)}
            >
              <S.LoginIcon />
            </S.ActionButton>
            <S.LinkActionButton
              to={`/configuracoes/armazens/usuarios/${id}/editar`}
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
        <WarehousesModal
          warehouses={warehouses}
          isOpen={Boolean(warehouses?.length)}
          onClose={handleModal}
        />
        <SortableHeadersGroup onSort={onSort} currentSort={currentSort}>
          <SortableHeader column="id" label="ID" />
          <SortableHeader column="userName" label="NOME" />
          <SortableHeader column="userEmail" label="E-MAIL" />
        </SortableHeadersGroup>
      </S.ListHeader>
      {members.map((member) => (
        <Item key={member.id} member={member} />
      ))}
    </S.List>
  );
};
