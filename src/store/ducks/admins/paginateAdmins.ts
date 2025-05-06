import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { PaginatedAdmin } from 'contracts/Admins';
import { Pagination } from 'contracts/Pagination';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data', 'pagination'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'PAGINATE_ADMINS_',
  }
);

export interface PaginateAdminsState {
  data: PaginatedAdmin[];
  pagination?: Pagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateAdminsRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: PaginatedAdmin[];
  pagination: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateAdminsState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateAdminsState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateAdminsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateAdminsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateAdminsState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateAdmins = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateAdminsTypes = Types;
export const PaginateAdminsActions = Creators;
