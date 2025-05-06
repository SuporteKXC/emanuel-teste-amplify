import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedStockRelatedWarehouse } from 'contracts/StockManager';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_STOCK_RELATED_WAREHOUSES_',
  }
);

export interface ListStockRelatedWarehousesState {
  data: ListedStockRelatedWarehouse[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListStockRelatedWarehousesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedStockRelatedWarehouse[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListStockRelatedWarehousesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListStockRelatedWarehousesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (
  state: ListStockRelatedWarehousesState,
  action: SuccessAction
) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (
  state: ListStockRelatedWarehousesState,
  action: FailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListStockRelatedWarehousesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listStockRelatedWarehouses = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListStockRelatedWarehousesTypes = Types;
export const ListStockRelatedWarehousesActions = Creators;
