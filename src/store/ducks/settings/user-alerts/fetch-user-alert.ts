import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_USER_ALERT_" }
);

export interface FetchUserAlertState extends IState {}

const INITIAL_STATE: FetchUserAlertState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchUserAlertState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchUserAlertState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchUserAlertState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchUserAlert = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchUserAlertTypes = Types;
export const FetchUserAlertActions = Creators;
