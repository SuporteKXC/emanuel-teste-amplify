import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'CREATE_COMPANY_MEMBER_',
  }
);

export interface CreateCompanyMemberState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface CreateCompanyMemberRequestAction {
  postData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: CreateCompanyMemberState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: CreateCompanyMemberState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: CreateCompanyMemberState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateCompanyMemberState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: CreateCompanyMemberState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const createCompanyMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const CreateCompanyMemberTypes = Types;
export const CreateCompanyMemberActions = Creators;
