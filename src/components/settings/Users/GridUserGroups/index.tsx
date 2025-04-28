import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import * as S from './styles';
import { IGroup } from 'interfaces/group';
import { useTranslation } from 'hooks';

import { translations } from './translations';

import {
  DeleteUserGroupState,
  DeleteUserGroupActions,
} from 'store/ducks/settings/users';

interface IGridUserGroupsProps {
  groups: IGroup[] | Record<string, any>[];
  userId: string;
  onSuccess: () => void;
}

interface ItemGroupProps {
  group: IGroup | Record<string, any>;
  onSelect: (value: number) => void;
  loading: boolean;
}

const Item: React.FC<ItemGroupProps> = ({ 
  group,
  onSelect,
  loading,
}) => {
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{group.id || '--'}</S.ItemValue>
        <S.ItemValue>{group.name || '--'}</S.ItemValue>
        <S.ButtonTrash onClick={() => onSelect(group.id)}>
          {loading ? <S.Loading /> : <S.IconTrash />}
        </S.ButtonTrash>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridUserGroups: React.FC<IGridUserGroupsProps> = ({
  groups = [],
  userId,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number>(0);
  const { getTranslation } = useTranslation(translations);
  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.deleteUserGroup
  ) as DeleteUserGroupState;

  const handleDelete = useCallback(
    (groupId) => {
      setSelected(groupId);
      dispatch(DeleteUserGroupActions.request(userId, groupId, onSuccess));
    },
    [dispatch, onSuccess, userId]
  );

  return (
    <S.Container>
      {groups.length > 0 && (
        <>
          <S.Header>
            <S.Label>{getTranslation('codigo')}</S.Label>
            <S.Label>{getTranslation('nome')}</S.Label>
          </S.Header>
          {groups.map((group) => (
            <Item
              group={group}
              key={group.id}
              loading={selected === group.id && loading}
              onSelect={handleDelete}
            />
          ))}
        </>
      )}
    </S.Container>
  );
};
