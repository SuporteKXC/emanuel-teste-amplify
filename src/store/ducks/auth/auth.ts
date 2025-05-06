import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { AuthData } from 'contracts/Auth';

const { Types, Creators } = createActions(
  {
    setData: ['data'],
    reset: [],
  },
  {
    prefix: 'AUTH_',
  }
);

export interface AuthState {
  data: AuthData | null;
}

interface SetDataAction {
  data: AuthData | null;
}

const INITIAL_STATE: AuthState = {
  data: null,
};

const setData = (state: AuthState, action: SetDataAction) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const auth = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.RESET]: reset,
});

export const AuthTypes = Types;
export const AuthActions = Creators;
