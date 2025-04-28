import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: [],
    failure: [],
    reset: [],
  },
  { prefix: "GET_AVATAR_USER_" }
);

export interface GetUserAvatarState extends IState {}

const INITIAL_STATE: GetUserAvatarState = {
  data: {},
  loading: false,
  error: null,
};

const request = (state: GetUserAvatarState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: GetUserAvatarState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data},
    loading: { $set: false },
  });

const failure = (state: GetUserAvatarState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const getUserAvatar = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const GetUserAvatarTypes = Types;
export const GetUserAvatarActions = Creators;
