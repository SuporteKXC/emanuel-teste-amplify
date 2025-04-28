import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "hooks";
import { translations } from "./translations";

import {
  PaginateProductTypeActions,
  PaginateProductTypeState,
} from 'store/ducks/settings/product-type';

import * as S from './styles';
import { MainContainer, Paginator, MenuSelector } from 'components/shared';
import { GridProductTypes, FilterProductTypes } from 'components/settings';

export const ListProductTypes: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });

  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateProductType
  ) as PaginateProductTypeState;

  const handleSubmitFilter = useCallback((value) => {
    setQuery((state) => ({ ...state, ...value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((value) => {
    setQuery((state) => ({ ...state, page: value }));
  }, []);

  const getData = useCallback(() => {
    dispatch(PaginateProductTypeActions.request({ ...query }));
  }, [dispatch, query]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('confirguracoes')} <MenuSelector page="product-types" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini
            onClick={() => history.push('/settings/product-types/new')}
          >
          {getTranslation('novoTipo')}
          </S.ButtonMini>
          <FilterProductTypes onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridProductTypes productTypes={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
