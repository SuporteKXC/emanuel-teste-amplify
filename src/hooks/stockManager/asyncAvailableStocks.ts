import { SelectOption } from 'contracts/Common';
import { ListedAvailableStock } from 'contracts/StockManager';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListAvailableStocksActions as MainActions } from 'store/ducks/stockManager';

interface FindStocks {
  search?: unknown;
  companyId?: unknown;
  warehouseId?: unknown;
}

const optionMapper = (stock: ListedAvailableStock): SelectOption => {
  const { id, product, productUnit, batch } = stock;
  return {
    value: id,
    label: `${product.name} [Unid: ${productUnit.name} Cód: ${product.code} Lote: ${batch}]`,
  };
};

export const useAsyncAvailableStocks = () => {
  const dispatch: AppDispatch = useDispatch();
  const resolver = useRef<(value: any) => void>();

  const { data: stocks, loading: loadingStocks } = useSelector(
    (state: RootState) => state.listAvailableStocks
  );

  /**
   * Fetches a single stock by id.
   */
  const fetchStock = useCallback(
    (id: number): ListedAvailableStock | null => {
      const stock = stocks.find((item) => item.id === id);
      return stock || null;
    },
    [stocks]
  );

  /**
   * Fetches the list of stocks from the API.
   */
  const fetchStocks = useCallback(
    (query?: FindStocks): Promise<SelectOption[]> => {
      dispatch(MainActions.request({ ...query }));
      return new Promise<SelectOption[]>((resolve) => {
        resolver.current = resolve;
      });
    },
    [dispatch]
  );

  const onLoad = useCallback((): void => {
    if (!resolver.current) return;
    resolver.current(stocks.map(optionMapper));
  }, [stocks]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return {
    fetchStocks,
    fetchStock,
    loadingStocks,
    cachedStockOptions: stocks.map(optionMapper),
  };
};
