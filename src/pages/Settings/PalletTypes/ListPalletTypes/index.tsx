import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  PaginatePalletTypeActions,
  PaginatePalletTypeState,
} from 'store/ducks/settings/pallet-type';

import * as S from './styles';
import { MainContainer, Paginator, MenuSelector } from 'components/shared';
import { GridPalletTypes, FilterPalletTypes } from 'components/settings';
import { useTranslation } from "hooks";
import { translations } from "./translations";
export const ListPalletTypes: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });

  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginatePalletType
  ) as PaginatePalletTypeState;

  const handleSubmitFilter = useCallback((value) => {
    setQuery((state) => ({ ...state, ...value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((value) => {
    setQuery((state) => ({ ...state, page: value }));
  }, []);

  const getData = useCallback(() => {
    dispatch(PaginatePalletTypeActions.request({ ...query }));
  }, [dispatch, query]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation("configuracoes")} <MenuSelector page="pallet-types" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini
            onClick={() => history.push('/settings/pallet-types/new')}
          >
            {getTranslation("novoTipo")}
          </S.ButtonMini>
          <FilterPalletTypes onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridPalletTypes palletTypes={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
