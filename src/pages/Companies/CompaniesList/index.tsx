import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginateCompaniesActions as PaginateActions } from 'store/ducks/companies';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import {
  CompaniesList,
  CompanyFilters,
  FindCompanies,
} from 'components/Pages/Companies';
import { Paginator, ListingPageHeader, SettingsMenu } from 'components/Shared';
import * as S from './styles';

export const CompaniesListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { paginationCache, updatePaginationCache, handleFilter, handleSort } =
    usePaginationCache<FindCompanies>('companies');

  const {
    data: companies,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateCompanies);

  const [query, setQuery] = useState<FindCompanies>({
    page: 1,
    limit: 10,
    ...paginationCache,
  });

  const onPageChange = useCallback((page: number): void => {
    setQuery((state) => ({ ...state, page }));
  }, []);

  const onQueryChange = useCallback((): void => {
    dispatch(PaginateActions.request(query));
  }, [dispatch, query]);

  useEffect(() => {
    onQueryChange();
  }, [onQueryChange]);

  useEffect(() => {
    return () => {
      dispatch(PaginateActions.reset());
      updatePaginationCache(query);
    };
  }, [dispatch, query, updatePaginationCache]);

  return (
    <Scaffold>
      <SettingsMenu />
      <S.MainPanel>
        <ListingPageHeader
          icon={<S.CompanyIcon />}
          title="Clientes"
          isLoading={loading}
          actions={
            <S.LinkButton to={'/configuracoes/clientes/criar'} size="small">
              <S.PlusIcon /> Novo cliente
            </S.LinkButton>
          }
        />
        <CompanyFilters
          currentFilter={query}
          onFilter={(filter) => handleFilter(query, filter, setQuery)}
        />
        <CompaniesList
          companies={companies}
          currentSort={query}
          onSort={(sort) => handleSort(query, sort, setQuery)}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};
