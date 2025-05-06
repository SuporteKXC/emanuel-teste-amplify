import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { PaginatedCompanyMember } from 'contracts/CompanyMembers';
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
    prefix: 'PAGINATE_COMPANY_MEMBERS_',
  }
);

export interface PaginateCompanyMembersState {
  data: PaginatedCompanyMember[];
  pagination?: Pagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateCompanyMembersRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: PaginatedCompanyMember[];
  pagination: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateCompanyMembersState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateCompanyMembersState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateCompanyMembersState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateCompanyMembersState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateCompanyMembersState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateCompanyMembers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateCompanyMembersTypes = Types;
export const PaginateCompanyMembersActions = Creators;
