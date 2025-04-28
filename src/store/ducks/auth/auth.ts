import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Auth } from "interfaces/auth";

export interface AuthState {
  data: Auth | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  data: Record<string, any>;
}

export interface LoginSuccessAction {
  data: Auth;
}

export interface LoginFailureAction {
  error: string;
}

export interface LogoutFailureAction {
  error: string;
}

const { Types, Creators } = createActions(
  {
    loginRequest: ["data"],
    loginSuccess: ["data"],
    loginFailure: ["error"],
    logoutRequest: [],
    logoutSuccess: [],
    logoutFailure: [],
    reset: [],
  },
  { prefix: "AUTH_" }
);

const INITIAL_STATE: AuthState = {
  data: null,
  loading: false,
  loggedIn: false,
  error: null,
};

const loginRequest = (state: AuthState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const loginSuccess = (state: AuthState, action: LoginSuccessAction) =>
  update(state, {
    loading: { $set: false },
    loggedIn: { $set: true },
    data: { $set: action.data },
  });

const loginFailure = (state: AuthState, action: LoginFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const logoutRequest = (state: AuthState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const logoutSuccess = (state: AuthState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
    loggedIn: { $set: false },
  });

const logoutFailure = (state: AuthState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const auth = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
  [Types.RESET]: reset,
});

export const AuthTypes = Types;
export const AuthActions = Creators;
