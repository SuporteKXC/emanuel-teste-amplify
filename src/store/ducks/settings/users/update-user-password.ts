import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/update-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "putData", "onSuccess", "onFailure"],
    success: [],
    failure: [],
    reset: [],
  },
  { prefix: "UPDATE_PASSWORD_USER_" }
);

export interface UpdateUserPasswordState extends IState {}

const INITIAL_STATE: UpdateUserPasswordState = {
  loading: false,
  error: null,
};

const request = (state: UpdateUserPasswordState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateUserPasswordState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateUserPasswordState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateUserPassword = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateUserPasswordTypes = Types;
export const UpdateUserPasswordActions = Creators;
