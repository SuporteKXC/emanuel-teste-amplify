import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import * as S from './styles';
import { useTranslation } from 'hooks';

import { translations } from './translations';
import {
  DeleteUserSecondaryEmailActions,
  DeleteUserSecondaryEmailState
} from 'store/ducks/settings/users';

interface IGridUserSecondaryEmailProps {
  emails: Record<string, any>;
  onSuccess: () => void;
}

interface ItemGroupProps {
  data: Record<string, any>;
  onSelect: (value: number) => void;
  loading: boolean;
}

const Item: React.FC<ItemGroupProps> = ({ data, onSelect, loading }) => {
  return (
    <S.ItemContainer onClick={() => onSelect(data.id)}>
      <S.ItemContent>
        <S.ItemValue>{data.id || '--'}</S.ItemValue>
        <S.ItemValue>{data.email || '--'}</S.ItemValue>
        <S.ButtonTrash>
          {loading ? <S.Loading /> : <S.IconTrash />}
        </S.ButtonTrash>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridUserEmails: React.FC<IGridUserSecondaryEmailProps> = ({
  emails = [],
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number>(0);
  const { getTranslation } = useTranslation(translations);
  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.deleteUserSecondaryEmail
  ) as DeleteUserSecondaryEmailState;

  const handleDelete = useCallback(
    (emailId) => {
      setSelected(emailId);
      dispatch(DeleteUserSecondaryEmailActions.request(emailId, onSuccess));
    },
    [dispatch, onSuccess]
  );

  return (
    <S.Container>
      {emails.length > 0 && (
        <>
          <S.Header>
            <S.Label>{getTranslation('codigo')}</S.Label>
            <S.Label>{getTranslation('email')}</S.Label>
          </S.Header>
          {
          emails.map((el: any) => (
            <Item
              data={el}
              key={el.id}
              onSelect={handleDelete}
              loading={selected === el.id && loading}
            />
          ))
          
          }
        </>
      )}
    </S.Container>
  );
};
