import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { UserData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'USERS_',
    }
  );

export const UserListTypes = Types;
export const UserActions = Creators;

export interface UserState {
    data: UserData[] | null;
    loading: boolean;
    error: string | null;
  }
export interface UserRequestAction {
    data: UserData[];
    error: string | null;
    onSuccess?: (data:UserData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: UserData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:UserState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:UserState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:UserState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:UserState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const users = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });