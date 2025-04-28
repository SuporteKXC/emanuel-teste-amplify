import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  PaginateClientsActions,
  PaginateClientsState,
} from "store/ducks/settings/clients";

import { SelectedFilterActions, SelectedFilterState } from "store/ducks/filter";

import * as S from "./styles";
import { MainContainer, Paginator, MenuSelector } from "components/shared";
import { GridClients, FilterClients } from "components/settings";
import { useTranslation } from 'hooks';
import { translations } from './translations';

export const ListClients: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateClients
  ) as PaginateClientsState;

 
  const { data: dataFilter } = useSelector<RootStateOrAny>(
    (state) => state.selectedFilter
  ) as SelectedFilterState;

  const handleSubmitFilter = useCallback(
    (value) => {
      const data = {
        ...dataFilter,
        ...value,
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
    dispatch(PaginateClientsActions.request({ ...query, ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')} <MenuSelector page="clients" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini onClick={() => history.push("/settings/client/new")}>
          {getTranslation('novoCliente')}
          </S.ButtonMini>
          <FilterClients onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridClients clients={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
