import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['id', 'putData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'UPDATE_COMPANY_MEMBER_',
  }
);

export interface UpdateCompanyMemberState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateCompanyMemberRequestAction {
  id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateCompanyMemberState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateCompanyMemberState,
  action: UpdateCompanyMemberRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateCompanyMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateCompanyMemberState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateCompanyMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateCompanyMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateCompanyMemberTypes = Types;
export const UpdateCompanyMemberActions = Creators;
