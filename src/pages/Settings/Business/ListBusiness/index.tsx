import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'hooks';
import { translations } from './translations';
import {
  PaginateBusinessActions,
  PaginateBusinessState,
} from "store/ducks/settings/business";

import { SelectedFilterActions, SelectedFilterState } from "store/ducks/filter";

import * as S from "./styles";
import { MainContainer, Paginator, MenuSelector } from "components/shared";
import { GridBusiness, FilterBusiness } from "components/settings";

export const ListBusiness: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateBusiness
  ) as PaginateBusinessState;


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
    dispatch(PaginateBusinessActions.request({ ...query, ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')}<MenuSelector page="business" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini onClick={() => history.push("/settings/business/new")}>
            {getTranslation('novaLinha')}
          </S.ButtonMini>
          <FilterBusiness onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridBusiness businesses={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
