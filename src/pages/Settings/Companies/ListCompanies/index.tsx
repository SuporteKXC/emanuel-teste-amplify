import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  PaginateCompaniesActions,
  PaginateCompaniesState,
} from "store/ducks/settings/companies";

import { SelectedFilterActions, SelectedFilterState } from "store/ducks/filter";

import { useTranslation } from "hooks";
import { translations } from "./translations";
import * as S from "./styles";
import { MainContainer, Paginator, MenuSelector } from "components/shared";
import { GridCompanies, FilterCompanies } from "components/settings";


export const ListCompanies: React.FC = () => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const history = useHistory();
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateCompanies
  ) as PaginateCompaniesState;


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
    dispatch(PaginateCompaniesActions.request({ ...query,  ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation("configuracoes")}
          <MenuSelector page="companies" />
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini onClick={() => history.push("/settings/company/new")}>
            {getTranslation("novoCentro")}
          </S.ButtonMini>
          <FilterCompanies onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridCompanies companies={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
