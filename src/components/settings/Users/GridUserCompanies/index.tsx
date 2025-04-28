import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import * as S from './styles';
import { cnpj } from 'utils';
import { useTranslation } from 'hooks';

import { translations } from './translations';
import { Company } from 'interfaces/company';
import {
  DeleteUserCompanyState,
  DeleteUserCompanyActions,
} from 'store/ducks/settings/users';

interface IGridUserCompaniesProps {
  companies: Company[] | Record<string, any>[];
  userId: string;
  onSuccess: () => void;
}

interface ItemCompanyProps {
  company: Company | Record<string, any>;
  onSelect: (value: number) => void;
  loading: boolean;
}

const Item: React.FC<ItemCompanyProps> = ({ company, onSelect, loading }) => {
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{company.code || '--'}</S.ItemValue>
        <S.ItemValue>{company.cnpj ? cnpj(company.cnpj) : '--'}</S.ItemValue>
        <S.ItemValue>{company.trade_name || '--'}</S.ItemValue>
        <S.ButtonTrash onClick={() => onSelect(company.id)}>
          {loading ? <S.Loading /> : <S.IconTrash />}
        </S.ButtonTrash>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridUserCompanies: React.FC<IGridUserCompaniesProps> = ({
  companies = [],
  userId,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number>(0);
  const { getTranslation } = useTranslation(translations);
  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.deleteUserCompany
  ) as DeleteUserCompanyState;

  const handleDelete = useCallback(
    (companyId) => {
      setSelected(companyId);
      dispatch(DeleteUserCompanyActions.request(userId, companyId, onSuccess));
    },
    [dispatch, onSuccess, userId]
  );

  return (
    <S.Container>
      {companies.length > 0 && (
        <>
          <S.Header>
            <S.Label>{getTranslation('codigo')}</S.Label>
            <S.Label>{getTranslation('cnpj')}</S.Label>
            <S.Label>{getTranslation('nomeFantasia')}</S.Label>
          </S.Header>
          {companies.map((company) => (
            <Item
              company={company}
              key={company.id}
              onSelect={handleDelete}
              loading={selected === company.id && loading}
            />
          ))}
        </>
      )}
    </S.Container>
  );
};
