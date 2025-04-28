import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { UserAlert } from "interfaces/user-alert";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_USER_ALERTS_" }
);

export interface ListUserAlertsState extends IState {
  data: UserAlert[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: UserAlert[];
}

const INITIAL_STATE: ListUserAlertsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListUserAlertsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListUserAlertsState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListUserAlertsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listUserAlerts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListUserAlertsTypes = Types;
export const ListUserAlertsActions = Creators;
