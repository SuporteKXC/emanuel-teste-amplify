import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedAvailableStock } from 'contracts/StockManager';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_AVAILABLE_STOCKS_',
  }
);

export interface ListAvailableStocksState {
  data: ListedAvailableStock[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListAvailableStocksRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedAvailableStock[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListAvailableStocksState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListAvailableStocksState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListAvailableStocksState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListAvailableStocksState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListAvailableStocksState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listAvailableStocks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListAvailableStocksTypes = Types;
export const ListAvailableStocksActions = Creators;
