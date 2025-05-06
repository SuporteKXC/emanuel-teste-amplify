import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { StockOrder } from 'contracts/StockOrders';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_STOCK_ORDER_',
  }
);

export interface FetchStockOrderState {
  data: StockOrder | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchStockOrderRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: StockOrder;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchStockOrderState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchStockOrderState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchStockOrderState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchStockOrderState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchStockOrderState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchStockOrder = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchStockOrderTypes = Types;
export const FetchStockOrderActions = Creators;
