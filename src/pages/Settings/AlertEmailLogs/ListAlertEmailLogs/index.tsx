import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useTranslation  } from 'hooks';

import { translations } from './translations';

import {
  PaginateAlertEmailLogsActions,
  PaginateAlertEmailLogsState,
} from 'store/ducks/settings/alert-email-logs';

import { SelectedFilterActions, SelectedFilterState } from 'store/ducks/filter';

import { MainContainer, Paginator, MenuSelector } from 'components/shared';
import { GridAlertEmailLogs, FilterAlertEmailLogs } from 'components/settings';
import * as S from './styles';

export const ListAlertEmailLogs: React.FC = () => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });

  const { data, loading, pagination } = useSelector<RootStateOrAny>(
    (state) => state.paginateAlertEmailLogs
  ) as PaginateAlertEmailLogsState;


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
    dispatch(PaginateAlertEmailLogsActions.request({ ...query, ...dataFilter }));
  }, [dispatch, query, dataFilter]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <MenuSelector page='alert-email-logs' />
          {loading && <S.LoadingPage />}
        </h1>

        <S.HeaderButtons>
          <FilterAlertEmailLogs onFilter={handleSubmitFilter} />
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <GridAlertEmailLogs alertEmailLogs={data} />
        <Paginator
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </S.PageContent>
    </MainContainer>
  );
};
