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
  { prefix: "UPDATE_AVATAR_USER_" }
);

export interface UpdateUserAvatar extends IState {}

const INITIAL_STATE: UpdateUserAvatar = {
  loading: false,
  error: null,
};

const request = (state: UpdateUserAvatar) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateUserAvatar, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateUserAvatar, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateUserAvatar = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateUserAvatarTypes = Types;
export const UpdateUserAvatarActions = Creators;
