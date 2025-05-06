import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { PaginatedWarehouseMember } from 'contracts/WarehouseMembers';
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
    prefix: 'PAGINATE_WAREHOUSE_MEMBERS_',
  }
);

export interface PaginateWarehouseMembersState {
  data: PaginatedWarehouseMember[];
  pagination?: Pagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateWarehouseMembersRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: PaginatedWarehouseMember[];
  pagination: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateWarehouseMembersState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateWarehouseMembersState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateWarehouseMembersState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateWarehouseMembersState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateWarehouseMembersState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateWarehouseMembers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateWarehouseMembersTypes = Types;
export const PaginateWarehouseMembersActions = Creators;
