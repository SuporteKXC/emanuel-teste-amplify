import React, { useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { FetchAddressByZipcodeActions as Actions } from 'store/ducks/addressLookup';
import { AddressLookupData } from 'contracts/AddressLookup';

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
      for (const [field, value] of Object.entries(data)) {
        formRef.current.setFieldValue(field, value);
      }
    },
    [formRef]
  );

  const fetchAddress = useCallback(
    (zipcode: string): void => {
      dispatch(Actions.request(zipcode, onSuccess));
    },
    [dispatch, onSuccess]
  );

  /**
   * USe this directly in your input component:
   */
  const onZipcodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const zipcode = e.target.value;
      const cleanZipcode = zipcode.replace(/\D/g, '');
      if (cleanZipcode.length !== 8) return;
      fetchAddress(zipcode);
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
