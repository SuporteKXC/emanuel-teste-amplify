import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedCompany } from 'contracts/Companies';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_COMPANIES_',
  }
);

export interface ListCompaniesState {
  data: ListedCompany[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListCompaniesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedCompany[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListCompaniesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListCompaniesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListCompaniesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListCompaniesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListCompaniesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListCompaniesTypes = Types;
export const ListCompaniesActions = Creators;
