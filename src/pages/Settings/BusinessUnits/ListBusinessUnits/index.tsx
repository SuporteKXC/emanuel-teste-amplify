import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'hooks';
import { translations } from './translations';

import {
  PaginateBusinessUnitsActions,
  PaginateBusinessUnitsState,
} from 'store/ducks/settings/business-unit';

import * as S from './styles';
import {
  MainContainer,
  Paginator,
  Search,
  MenuSelector,
} from 'components/shared';

import { SelectedFilterActions, SelectedFilterState } from 'store/ducks/filter';

import { GridBusinessUnits } from 'components/settings';

export const ListBusinessUnits: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);
  
  const [query, setQuery] = useState({
    search: '',
    limit: 10,
    page: 1,
  });
  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateBusinessUnits
  ) as PaginateBusinessUnitsState;

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
    dispatch(PaginateBusinessUnitsActions.request({ ...query, ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}<MenuSelector page='business-units' />
          {loading && <S.LoadingPage />}
        </h1>
        <Search onSearch={handleSearchChange} />
        <S.HeaderButtons>
          <S.ButtonMini
            onClick={() => history.push('/settings/business-units/new')}
          >
            {getTranslation('novaDivision')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridBusinessUnits units={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
