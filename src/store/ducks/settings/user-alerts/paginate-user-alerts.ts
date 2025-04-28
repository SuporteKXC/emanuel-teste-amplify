import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { UserAlert } from "interfaces/user-alert";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_USER_ALERTS_" }
);

export interface PaginateUserAlertsState extends IState {
  data: UserAlert[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateUserAlertsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateUserAlertsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateUserAlertsState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateUserAlertsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateUserAlerts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateUserAlertsTypes = Types;
export const PaginateUserAlertsActions = Creators;
