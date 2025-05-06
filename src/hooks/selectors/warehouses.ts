import { SelectOption } from 'contracts/Common';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListWarehousesActions } from 'store/ducks/warehouses';
import { Formatter } from 'utils';

export const useWarehouses = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: warehouses, loading: loadingWarehouses } = useSelector(
    (state: RootState) => state.listWarehouses
  );

  const [options, setOptions] = useState<SelectOption[]>([]);

  const fetchWarehouses = useCallback((query?: any): void => {
    dispatch(ListWarehousesActions.request(query));
  }, [dispatch]);

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

export type WarehousesHook = ReturnType<typeof useWarehouses>;
