import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { AuthData, IProfile, UserData } from "contracts";

const { Types, Creators } = createActions(
  {
    setData: ['data'],
    request: ['id','onSuccess','onFailure'],
    refresh: ['data'],
    reset: [],
  },
  {
    prefix: 'AUTH_',
  }
);

export interface AuthState {
  data: AuthData | null;
  loading: boolean;
  error: string | null;
}

interface UserState {
  data: UserData
}

interface SetDataAction {
  data: AuthData | null;
}

export interface AuthRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: UserData) => void;
  onFailure?: () => void;
}

const INITIAL_STATE: AuthState = {
  data: null,
  loading: false,
  error: null
};

const setData = (state: AuthState, action: SetDataAction) =>
  update(state, {
    data: { $set: action.data },
  });

const _request = (state: AuthState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });
  
const refreshLoggedUser = (state: AuthState, action: UserState) =>
  update(state, {
    data: {
      profile: { $merge: action.data }
    },
  });
  
const reset = () => INITIAL_STATE;

export const auth = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.RESET]: reset,
  [Types.REQUEST]: _request,
  [Types.REFRESH]: refreshLoggedUser,
});

export const AuthTypes = Types;
export const AuthActions = Creators;
