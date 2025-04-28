import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { User } from "interfaces/user";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_USERS_" }
);

export interface PaginateUsersState extends IState {
  data: User[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateUsersState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateUsersState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateUsersState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateUsersState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateUsers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateUsersTypes = Types;
export const PaginateUsersActions = Creators;
