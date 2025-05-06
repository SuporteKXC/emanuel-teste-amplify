import {
  FindStockOrders,
  StockOrderFilters,
  StockOrdersList,
  OrderModal,
  OrderModalRef,
} from 'components/Pages/StockOrders';
import { ListingPageHeader, Paginator } from 'components/Shared';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginateStockOrdersActions as PaginateActions } from 'store/ducks/stockOrders';
import * as S from './styles';

const StockOrdersListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orderModalRef = useRef<OrderModalRef>(null);

  const { paginationCache, updatePaginationCache, handleFilter, handleSort } =
    usePaginationCache<FindStockOrders>('stockOrders');

  const {
    data: stockOrders,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateStockOrders);

  const [query, setQuery] = useState<FindStockOrders>({
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
      <OrderModal ref={orderModalRef} />
      <S.MainPanel>
        <ListingPageHeader
          icon={<S.StockOrderIcon />}
          title="Solicitações de estoque"
          isLoading={loading}
          actions={
            <S.LinkButton
              to={'/solicitacoes-estoque/criar'}
              size="small"
              mood="primary"
            >
              <S.PlusIcon /> Nova solicitação
            </S.LinkButton>
          }
        />
        <StockOrderFilters
          currentFilter={query}
          onFilter={(filter) => handleFilter(query, filter, setQuery)}
        />
        <StockOrdersList
          stockOrders={stockOrders}
          currentSort={query}
          onSort={(sort) => handleSort(query, sort, setQuery)}
          onSelectOrder={(id) => orderModalRef.current?.selectOrder(id)}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};

export { StockOrdersListPage };
