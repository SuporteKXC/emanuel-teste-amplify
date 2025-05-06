import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { Warehouse } from 'contracts/Warehouses';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_WAREHOUSE_',
  }
);

export interface FetchWarehouseState {
  data: Warehouse | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchWarehouseRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Warehouse;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchWarehouseState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchWarehouseState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchWarehouseState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchWarehouseState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchWarehouseState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchWarehouse = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchWarehouseTypes = Types;
export const FetchWarehouseActions = Creators;
