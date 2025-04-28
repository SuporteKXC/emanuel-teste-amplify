import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { User } from "interfaces/user";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_USERS_" }
);

export interface ListUsersState extends IState {
  data: User[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: User[];
}

const INITIAL_STATE: ListUsersState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListUsersState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListUsersState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListUsersState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listUsers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListUsersTypes = Types;
export const ListUsersActions = Creators;
