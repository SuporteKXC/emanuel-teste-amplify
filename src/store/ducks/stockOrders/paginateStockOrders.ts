import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { PaginatedStockOrder } from 'contracts/StockOrders';
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
    prefix: 'PAGINATE_STOCK_ORDERS_',
  }
);

export interface PaginateStockOrdersState {
  data: PaginatedStockOrder[];
  pagination?: Pagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateStockOrdersRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: PaginatedStockOrder[];
  pagination: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateStockOrdersState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateStockOrdersState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateStockOrdersState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateStockOrdersState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateStockOrdersState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateStockOrders = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateStockOrdersTypes = Types;
export const PaginateStockOrdersActions = Creators;
