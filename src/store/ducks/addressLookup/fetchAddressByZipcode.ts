import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { AddressLookupData } from 'contracts/AddressLookup';

const { Types, Creators } = createActions(
  {
    request: ['zipcode', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_ADDRESS_BY_ZIPCODE_',
  }
);

export interface FetchAddressByZipcodeState {
  data: AddressLookupData | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchAddressByZipcodeRequestAction {
  zipcode: string;
  onSuccess?: (data: AddressLookupData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: AddressLookupData;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchAddressByZipcodeState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchAddressByZipcodeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchAddressByZipcodeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchAddressByZipcodeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchAddressByZipcodeState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchAddressByZipcode = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchAddressByZipcodeTypes = Types;
export const FetchAddressByZipcodeActions = Creators;
