import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/update-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "CREATE_AVATAR_USER_" }
);

export interface CreateUserAvatar extends IState {}

const INITIAL_STATE: CreateUserAvatar = {
  loading: false,
  error: null,
};

const request = (state: CreateUserAvatar) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateUserAvatar, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateUserAvatar, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createUserAvatar = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateUserAvatarTypes = Types;
export const CreateUserAvatarActions = Creators;
