import React, { useCallback, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import * as S from "./styles";
import { useTranslation } from 'hooks';

import { translations } from './translations';

import { Business } from "interfaces/business";
import {
  DeleteUserBusinessLineState,
  DeleteUserBusinessLineActions,
} from "store/ducks/settings/users";

interface IGridUserBusinessLinesProps {
  businessLines: Business[] | Record<string, any>[];
  userId: string;
  onSuccess: () => void;
}

interface ItemBusinessLineProps {
  businessLine: Business | Record<string, any>;
  onSelect: (value: number) => void;
  loading: boolean;
}

const Item: React.FC<ItemBusinessLineProps> = ({
  businessLine,
  onSelect,
  loading,
}) => {
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{businessLine.activity_division || "--"}</S.ItemValue>
        <S.ItemValue>{businessLine.description || "--"}</S.ItemValue>
        <S.ButtonTrash onClick={() => onSelect(businessLine.id)}>
          {loading ? <S.Loading /> : <S.IconTrash />}
        </S.ButtonTrash>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridUserBusinessLines: React.FC<IGridUserBusinessLinesProps> = ({
  businessLines = [],
  userId,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number>(0);
  const { getTranslation } = useTranslation(translations);
  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.deleteUserBusinessLine
  ) as DeleteUserBusinessLineState;

  const handleDelete = useCallback(
    (businessLineId) => {
      setSelected(businessLineId);
      dispatch(
        DeleteUserBusinessLineActions.request(userId, businessLineId, onSuccess)
      );
    },
    [dispatch, onSuccess, userId]
  );

  return (
    <S.Container>
      {businessLines.length > 0 && (
        <>
          <S.Header>
            <S.Label>{getTranslation('codigo')}</S.Label>
            <S.Label>{getTranslation('nome')}</S.Label>
          </S.Header>
          {businessLines.map((businessLine) => (
            <Item
              businessLine={businessLine}
              key={businessLine.id}
              onSelect={handleDelete}
              loading={selected === businessLine.id && loading}
            />
          ))}
        </>
      )}
    </S.Container>
  );
};
