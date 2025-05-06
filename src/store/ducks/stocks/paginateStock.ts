import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { PaginatedStock } from 'contracts/Stocks';
import type { Pagination } from 'contracts/Pagination';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data', 'pagination'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'PAGINATE_STOCKS_',
  }
);

export interface PaginateStocksState {
  data: PaginatedStock[];
  pagination?: Pagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateStocksRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: PaginatedStock[];
  pagination: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateStocksState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateStocksState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateStocksState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateStocksState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateStocksState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateStocks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateStocksTypes = Types;
export const PaginateStocksActions = Creators;
