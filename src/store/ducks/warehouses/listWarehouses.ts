import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedWarehouse } from 'contracts/Warehouses';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_WAREHOUSES_',
  }
);

export interface ListWarehousesState {
  data: ListedWarehouse[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListWarehousesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedWarehouse[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListWarehousesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListWarehousesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListWarehousesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListWarehousesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListWarehousesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listWarehouses = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListWarehousesTypes = Types;
export const ListWarehousesActions = Creators;
