import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from 'store';
import { PaginateWarehouseMembersActions as PaginateActions } from 'store/ducks/warehouseMembers';
import { ImpersonateActions } from 'store/ducks/auth';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import {
  Paginator,
  ListingPageHeader,
  SettingsMenu,
  ConfirmationDialog,
  ConfirmationDialogRef,
} from 'components/Shared';
import {
  FindMembers,
  MemberFilters,
  MembersList,
} from 'components/Pages/WarehouseMembers';
import * as S from './styles';

export const WarehouseMembersListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<ConfirmationDialogRef>(null);

  const { paginationCache, updatePaginationCache, handleFilter, handleSort } =
    usePaginationCache<FindMembers>('warehouseMembers');

  const {
    data: members,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateWarehouseMembers);

  const [query, setQuery] = useState<FindMembers>({
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

  const onImpersonate = useCallback(
    async (email: string): Promise<void> => {
      const confirmed = await dialogRef.current?.openDialog({
        title: 'Logar como outro usuário?',
        message:
          'Você está prestes a logar como outro usuário. Deseja continuar?',
      });

      if (confirmed) {
        const onSuccess = navigate('/');
        dispatch(ImpersonateActions.request({ email }, onSuccess));
      }
    },
    [dispatch, navigate]
  );

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
      <ConfirmationDialog ref={dialogRef} />
      <S.MainPanel>
        <ListingPageHeader
          icon={<S.UserRectangleIcon />}
          title="Usuários de armazéns"
          isLoading={loading}
          actions={
            <S.LinkButton
              to={'/configuracoes/armazens/usuarios/criar'}
              size="small"
            >
              <S.PlusIcon /> Novo usuário
            </S.LinkButton>
          }
        />
        <MemberFilters
          currentFilter={query}
          onFilter={(filter) => handleFilter(query, filter, setQuery)}
        />
        <MembersList
          members={members}
          currentSort={query}
          onImpersonate={onImpersonate}
          onSort={(sort) => handleSort(query, sort, setQuery)}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};
