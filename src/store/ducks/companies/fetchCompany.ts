import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { Company } from 'contracts/Companies';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_COMPANY_',
  }
);

export interface FetchCompanyState {
  data: Company | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchCompanyRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Company;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchCompanyState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchCompanyState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchCompanyState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchCompanyState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchCompanyState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchCompany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchCompanyTypes = Types;
export const FetchCompanyActions = Creators;
