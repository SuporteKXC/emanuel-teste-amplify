import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { ListCountriesActions } from "store/ducks";

export const useCountries = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    options: countriesOptions,
    loading: loadingCountries,
    defaultOption: defaultCountry,
  } = useSelector((state: RootState) => state.listCountries);

  const listCountries = React.useCallback(
    () => !countriesOptions.length && dispatch(ListCountriesActions.request()),
    [countriesOptions]
  );

  return {
    listCountries,
    loadingCountries,
    defaultCountry,
    countriesOptions,
  };
};

export type AddressLookupHook = ReturnType<typeof useCountries>;
