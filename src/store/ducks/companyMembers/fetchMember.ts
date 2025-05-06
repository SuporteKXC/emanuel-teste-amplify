import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { CompanyMember } from 'contracts/CompanyMembers';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_COMPANY_MEMBER_',
  }
);

export interface FetchCompanyMemberState {
  data: CompanyMember | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchCompanyMemberRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: CompanyMember;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchCompanyMemberState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchCompanyMemberState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchCompanyMemberState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchCompanyMemberState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchCompanyMemberState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchCompanyMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchCompanyMemberTypes = Types;
export const FetchCompanyMemberActions = Creators;
