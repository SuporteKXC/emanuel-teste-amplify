import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { UserAlertData } from "contracts";
import { Pagination } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params','onSuccess','onFailure'],
    success: ['data', 'meta'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ALERTS_',
  }
);

export const AlertListTypes = Types;
export const AlertActions = Creators;

export interface AlertState {
  data: UserAlertData[] | null;
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}
  
export interface AlertRequestAction {
  data: UserAlertData[];
  error: string | null;
  onSuccess?: (data:UserAlertData[]) => void;
  onFailure?: () => void;
  params: any;
}

interface SuccessAction {
  data: UserAlertData[] | any;
  meta: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE:AlertState = {
  data: null,
  meta: [],
  loading: false,
  error: null,
};

const _request = (state:AlertState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:AlertState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set:action.data.meta },
  });

const _failure = (state:AlertState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const _reset = () => INITIAL_STATE;

export const alerts = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
});