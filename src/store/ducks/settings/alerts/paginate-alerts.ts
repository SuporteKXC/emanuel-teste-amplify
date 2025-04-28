import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { Alert } from "interfaces/alert";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_ALERTS_" }
);

export interface PaginateAlertsState extends IState {
  data: Alert[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateAlertsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateAlertsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateAlertsState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateAlertsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateAlerts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateAlertsTypes = Types;
export const PaginateAlertsActions = Creators;
