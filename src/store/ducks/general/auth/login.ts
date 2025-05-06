import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

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
  validationErrors: any;
}

export interface LoginRequestAction {
  postData: { email: string; password: string };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface LoginFailureAction {
  errorMessage: string;
  validationErrors?: any;
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
