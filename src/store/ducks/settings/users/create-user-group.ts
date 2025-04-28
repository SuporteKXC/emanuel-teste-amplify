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
  { prefix: "CREATE_USER_Group_" }
);

export interface CreateUserGroupState extends IState {}

const INITIAL_STATE: CreateUserGroupState = {
  loading: false,
  error: null,
};

const request = (state: CreateUserGroupState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateUserGroupState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateUserGroupState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createUserGroup = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateUserGroupTypes = Types;
export const CreateUserGroupActions = Creators;
