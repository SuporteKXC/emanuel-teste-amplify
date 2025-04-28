import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { AlertEmailLog } from "interfaces/alert-email-log";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_ALERT_EMAIL_LOGS" }
);

export interface PaginateAlertEmailLogsState extends IState {
  data: AlertEmailLog[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateAlertEmailLogsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateAlertEmailLogsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateAlertEmailLogsState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateAlertEmailLogsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateAlertEmailLogs = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateAlertEmailLogsTypes = Types;
export const PaginateAlertEmailLogsActions = Creators;
