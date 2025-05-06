import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    reset: [],
  },
  {
    prefix: 'LOGIN_',
  }
);

export interface LoginState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface LoginRequestAction {
  postData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface LoginFailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: LoginState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: LoginState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: LoginState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: LoginState, action: LoginFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const reset = () => INITIAL_STATE;

export const login = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const LoginTypes = Types;
export const LoginActions = Creators;
