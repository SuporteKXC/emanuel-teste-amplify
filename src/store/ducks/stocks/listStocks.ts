import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedStock } from 'contracts/Stocks';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_STOCKS_',
  }
);

export interface ListStocksState {
  data: ListedStock[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListStocksRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedStock[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListStocksState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListStocksState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListStocksState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListStocksState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListStocksState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listStocks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListStocksTypes = Types;
export const ListStocksActions = Creators;
