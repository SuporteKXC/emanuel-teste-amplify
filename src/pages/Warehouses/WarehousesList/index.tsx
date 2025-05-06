import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginateWarehousesActions as PaginateActions } from 'store/ducks/warehouses';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import {
  WarehousesList,
  WarehouseFilters,
  FindWarehouses,
} from 'components/Pages/Warehouses';
import { Paginator, ListingPageHeader, SettingsMenu } from 'components/Shared';
import * as S from './styles';

export const WarehousesListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { paginationCache, updatePaginationCache } =
    usePaginationCache('warehouses');

  const {
    data: warehouses,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateWarehouses);

  const [query, setQuery] = useState({
    search: '',
    page: 1,
    limit: 10,
    ...paginationCache,
  });

  const onPageChange = useCallback((page: number): void => {
    setQuery((state) => ({ ...state, page }));
  }, []);

  const onSort = useCallback((sort: any): void => {
    setQuery((state) => ({ ...state, ...sort, page: 1 }));
  }, []);

  const onFilter = useCallback((filter: FindWarehouses): void => {
    setQuery((state) => ({ ...state, ...filter, page: 1 }));
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
          icon={<S.WarehouseIcon />}
          title="Armazéns"
          isLoading={loading}
          actions={
            <S.LinkButton to={'/configuracoes/armazens/criar'} size="small">
              <S.PlusIcon /> Novo armazém
            </S.LinkButton>
          }
        />
        <WarehouseFilters currentFilter={query} onFilter={onFilter} />
        <WarehousesList
          warehouses={warehouses}
          currentSort={query}
          onSort={onSort}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};
