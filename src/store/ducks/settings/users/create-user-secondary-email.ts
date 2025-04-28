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
  { prefix: "CREATE_USER_SECONDARY_EMAIL_" }
);

export interface CreateUserSecondaryEmailState extends IState {}

const INITIAL_STATE: CreateUserSecondaryEmailState = {
  loading: false,
  error: null,
};

const request = (state: CreateUserSecondaryEmailState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateUserSecondaryEmailState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateUserSecondaryEmailState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createUserSecondaryEmail = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateUserSecondaryEmailTypes = Types;
export const CreateUserSecondaryEmailActions = Creators;
