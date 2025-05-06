import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: ['email'],
    failure: ['errorMessage', 'validationErrors'],
    reset: [],
  },
  {
    prefix: 'GENERATE_PASSWORD_RESET_TOKEN_',
  }
);

export interface GeneratePasswordResetTokenState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface GeneratePasswordResetTokenRequestAction {
  postData: { email: string };
  onSuccess?: (email: string) => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: GeneratePasswordResetTokenState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: GeneratePasswordResetTokenState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: GeneratePasswordResetTokenState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (
  state: GeneratePasswordResetTokenState,
  action: FailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const reset = () => INITIAL_STATE;

export const generatePasswordResetToken = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const GeneratePasswordResetTokenTypes = Types;
export const GeneratePasswordResetTokenActions = Creators;
