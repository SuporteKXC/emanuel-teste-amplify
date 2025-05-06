import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { Carrier } from 'contracts/general/Carrier';
import type { CamelPagination, Pagination } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data', 'pagination'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'PAGINATE_CARRIERS_',
  }
);

export interface PaginateCarriersState {
  data: Carrier[];
  pagination?: CamelPagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateCarriersRequestAction {
  query?: Record<string, any>;
  onSuccess?: (data: Carrier[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Carrier[];
  pagination: CamelPagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateCarriersState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateCarriersState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateCarriersState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateCarriersState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateCarriersState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateCarriers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateCarriersTypes = Types;
export const PaginateCarriersActions = Creators;
