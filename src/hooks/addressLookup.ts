import { FormHandles } from "@unform/core";
import { AddressLookupData } from "contracts/general/AddressLookup";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { STATES } from "constants/Common";
import { FetchAddressByZipcodeActions as Actions } from "store/ducks/general/addressLookup";

/**
 *
 * If you want, you can pass the formRef so I can update your form for you
 */
export const useAddressLookup = (formRef?: React.RefObject<FormHandles>) => {
  const dispatch: AppDispatch = useDispatch();

  const { data, loading } = useSelector(
    (state: RootState) => state.fetchAddressByZipcode
  );

  const onSuccess = useCallback(
    (data: AddressLookupData): void => {
      if (!formRef?.current) return;

      const { addressUf, ...restData } = data;

      for (const [field, value] of Object.entries(restData)) {
        formRef.current.setFieldValue(field, value);
      }

      if (!addressUf) return;

      const stateOption = STATES.find(
        (option) => option.value === addressUf
      );

      if (stateOption) {
        formRef.current.setFieldValue("addressState", stateOption);
      }
    },
    [formRef]
  );

  const fetchAddress = useCallback(
    (zipcode: string): void => {
      if (!formRef?.current) return;

      dispatch(Actions.request(zipcode, onSuccess));
    },
    [dispatch, formRef, onSuccess]
  );

  const onZipcodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const zipcode = e.target.value;
      const cleanZipcode = zipcode.replace(/\D/g, "");
      cleanZipcode.length === 8 && fetchAddress(zipcode);
    },
    [fetchAddress]
  );

  return {
    address: data,
    fetchingAddress: loading,
    fetchAddress,
    onZipcodeChange,
  };
};

export type AddressLookupHook = ReturnType<typeof useAddressLookup>;
