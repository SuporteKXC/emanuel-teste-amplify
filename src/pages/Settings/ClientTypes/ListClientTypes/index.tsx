import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'hooks';
import { translations } from './translations';

import {
  PaginateClientTypesActions,
  PaginateClientTypesState,
} from "store/ducks/settings/client-types";

import { SelectedFilterActions, SelectedFilterState } from "store/ducks/filter";

import * as S from "./styles";
import {
  MainContainer,
  Paginator,
  Search,
  MenuSelector,
} from "components/shared";
import { GridClientTypes } from "components/settings";

export const ListClientTypes: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);
  const [query, setQuery] = useState({
    search: "",
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateClientTypes
  ) as PaginateClientTypesState;

  const { data: dataFilter } = useSelector<RootStateOrAny>(
    (state) => state.selectedFilter
  ) as SelectedFilterState;

  const handleSearchChange = useCallback(
    (value) => {
      const data = {
        ...dataFilter,
        search: value,
        page: 1,
      };
      dispatch(SelectedFilterActions.success(data));
      setQuery((state) => ({ ...state, data }));
    },
    [setQuery, dispatch, dataFilter]
  );

  const handlePageChange = useCallback(
    (value) => {
      const data = {
        ...dataFilter,
        page: value,
      };
      dispatch(SelectedFilterActions.success(data));
      setQuery((state) => ({ ...state, data }));
    },
    [setQuery, dispatch, dataFilter]
  );

  const getData = useCallback(() => {
    dispatch(PaginateClientTypesActions.request({ ...query,  ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <MenuSelector page="client-types" />
          {loading && <S.LoadingPage />}
        </h1>
        <Search onSearch={handleSearchChange} />
        <S.ButtonMini onClick={() => history.push("/settings/client-type/new")}>
        {getTranslation('novoCustumer')}
        </S.ButtonMini>
      </S.PageHeader>
      <S.PageContent>
        <GridClientTypes clientTypes={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
