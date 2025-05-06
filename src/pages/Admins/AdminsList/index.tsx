import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginateAdminsActions as PaginateActions } from 'store/ducks/admins';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import { Paginator, ListingPageHeader, SettingsMenu } from 'components/Shared';
import { AdminsList, AdminFilters, FindAdmins } from 'components/Pages/Admins';
import * as S from './styles';

export const AdminsListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { paginationCache, updatePaginationCache, handleSort, handleFilter } =
    usePaginationCache<FindAdmins>('admins');

  const {
    data: admins,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateAdmins);

  const [query, setQuery] = useState<FindAdmins>({
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
          icon={<S.AdminIcon />}
          title="Administradores"
          isLoading={loading}
          actions={
            <S.LinkButton
              to={'/configuracoes/administradores/criar'}
              size="small"
            >
              <S.PlusIcon /> Novo administrador
            </S.LinkButton>
          }
        />
        <AdminFilters
          currentFilter={query}
          onFilter={(filter) => handleFilter(query, filter, setQuery)}
        />
        <AdminsList
          admins={admins}
          currentSort={query}
          onSort={(sort) => handleSort(query, sort, setQuery)}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};
