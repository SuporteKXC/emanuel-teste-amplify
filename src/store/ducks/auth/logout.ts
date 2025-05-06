import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: [],
    success: [],
    failure: [],
    reset: [],
  },
  {
    prefix: 'LOGOUT_',
  }
);

export interface LogoutState {
  errorMessage: string | null;
  loading: boolean;
}

interface LogoutFailureAction {
  errorMessage: string;
}

const INITIAL_STATE: LogoutState = {
  errorMessage: null,
  loading: false,
};

const request = (state: LogoutState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: LogoutState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: LogoutState, action: LogoutFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const logout = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const LogoutTypes = Types;
export const LogoutActions = Creators;
