import { SelectOption } from 'contracts/Common';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListStockRelatedWarehousesActions as MainActions } from 'store/ducks/stockManager';
import { Formatter } from 'utils';

interface FindWarehouses {
  companyId?: unknown;
  havingStock?: boolean;
}

export const useStockRelatedWarehouses = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: warehouses, loading: loadingWarehouses } = useSelector(
    (state: RootState) => state.listStockRelatedWarehouses
  );

  const [options, setOptions] = useState<SelectOption[]>([]);

  const fetchWarehouses = useCallback(
    (query?: FindWarehouses): void => {
      dispatch(MainActions.request({ ...query }));
    },
    [dispatch]
  );

  const onWarehousesLoad = useCallback((): void => {
    setOptions(
      warehouses.map(({ id, tradeName, documentType, document }) => ({
        value: id,
        label: `${tradeName} - ${Formatter.document(document, documentType)}`,
      }))
    );
  }, [warehouses]);

  useEffect(() => {
    onWarehousesLoad();
  }, [onWarehousesLoad]);

  return {
    warehouses,
    warehouseOptions: options,
    loadingWarehouses,
    fetchWarehouses,
  };
};
