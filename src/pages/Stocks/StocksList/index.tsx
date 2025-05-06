import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginateStocksActions as PaginateActions } from 'store/ducks/stocks';
import { usePaginationCache } from 'hooks';
import { Scaffold } from 'layouts';
import { StockFilters, StocksList, FindStocks } from 'components/Pages/Stocks';
import { Paginator, ListingPageHeader } from 'components/Shared';
import { Formatter } from 'utils';
import { DownloadXLS } from 'components/Shared/DownloadXLS';
import * as S from './styles';
import { useStocks } from 'hooks/selectors/stocks';

export const StocksListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { paginationCache, updatePaginationCache, handleFilter, handleSort } =
    usePaginationCache<FindStocks>('stocks');
  const { fetchStocksForExport, stocksExport, loadingStocks } = useStocks();

  const {
    data: stocks,
    pagination,
    loading,
  } = useSelector((state: RootState) => state.paginateStocks);

  const [query, setQuery] = useState<FindStocks>({
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
      <S.MainPanel>
        <ListingPageHeader
          icon={<S.ListIcon />}
          title="Painel gerencial"
          isLoading={loading}
          actions={
            <DownloadXLS
              archive={stocksExport}
              archiveName="WMS-ESTOQUES"
              loading={loadingStocks}
              action={() => fetchStocksForExport(query)}
            />
          }
        />
        {pagination?.lastUpdate && (
          <S.Update>
            <S.ContentUpdate>
              Última atualização:
              <p>
                {Formatter.date(pagination.lastUpdate, { format: 'dd/MM/yyyy HH:mm' })}
              </p>
            </S.ContentUpdate>
            <S.ContentUpdate>
              Próxima atualização:
              <p>
                {Formatter.sumHours(pagination.lastUpdate, { format: 'dd/MM/yyyy HH:mm' })}
              </p>
            </S.ContentUpdate>
          </S.Update>
        )}
        <StockFilters
          currentFilter={query}
          onFilter={(filter) => handleFilter(query, filter, setQuery)}
        />
        <StocksList
          stocks={stocks}
          currentSort={query}
          onSort={(sort) => handleSort(query, sort, setQuery)}
        />
        <Paginator onPageChange={onPageChange} pagination={pagination} />
      </S.MainPanel>
    </Scaffold>
  );
};
