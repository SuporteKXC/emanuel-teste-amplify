import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_USER_SECONDARY_EMAIL_" }
);

export interface FetchUserSecondaryEmailState extends IState {}

const INITIAL_STATE: FetchUserSecondaryEmailState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchUserSecondaryEmailState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchUserSecondaryEmailState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchUserSecondaryEmailState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchUserSecondaryEmail = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchUserSecondaryEmailTypes = Types;
export const FetchUserSecondaryEmailActions = Creators;
