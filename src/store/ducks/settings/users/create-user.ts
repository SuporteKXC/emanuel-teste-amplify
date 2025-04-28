import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "CREATE_USER_" }
);

export interface CreateUserState extends IState {}

const INITIAL_STATE: CreateUserState = {
  loading: false,
  error: null,
};

const request = (state: CreateUserState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateUserState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateUserState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createUser = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateUserTypes = Types;
export const CreateUserActions = Creators;
