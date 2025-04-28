import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Alert } from "interfaces/alert";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_ALERTS_" }
);

export interface ListAlertsState extends IState {
  data: Alert[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Alert[];
}

const INITIAL_STATE: ListAlertsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListAlertsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListAlertsState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListAlertsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listAlerts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListAlertsTypes = Types;
export const ListAlertsActions = Creators;
