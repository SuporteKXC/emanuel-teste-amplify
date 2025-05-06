import { SelectOption } from 'contracts/Common';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListVehicleTypesActions } from 'store/ducks/vehicleTypes';

export const useVehicleTypes = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: vehicleTypes, loading: loadingVehicleTypes } = useSelector(
    (state: RootState) => state.listVehicleTypes
  );

  const [options, setOptions] = useState<SelectOption[]>([]);

  const fetchVehicleTypes = useCallback((): void => {
    dispatch(ListVehicleTypesActions.request());
  }, [dispatch]);

  const onVehicleTypesLoad = useCallback((): void => {
    setOptions(
      vehicleTypes.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    );
  }, [vehicleTypes]);

  useEffect(() => {
    onVehicleTypesLoad();
  }, [onVehicleTypesLoad]);

  return {
    vehicleTypes,
    vehicleTypesOptions: options,
    loadingVehicleTypes,
    fetchVehicleTypes,
  };
};

export type VehicleTypesHook = ReturnType<typeof useVehicleTypes>;
