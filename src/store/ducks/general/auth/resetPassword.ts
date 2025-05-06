import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    reset: [],
  },
  {
    prefix: 'RESET_PASSWORD_',
  }
);

export interface ResetPasswordState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface ResetPasswordRequestAction {
  postData: { email: string; password: string; passwordResetToken: string };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: ResetPasswordState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: ResetPasswordState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: ResetPasswordState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: ResetPasswordState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const reset = () => INITIAL_STATE;

export const resetPassword = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ResetPasswordTypes = Types;
export const ResetPasswordActions = Creators;
