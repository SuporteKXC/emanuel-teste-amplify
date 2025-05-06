import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination, DashboardData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['query','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'DASHBOARD_LIST',
    }
  );

export const DashboardsListTypes = Types;
export const DashboardsActions = Creators;

export interface DashboardsState {
  data: DashboardData[] | [];
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}

export interface DashboardsRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: DashboardData[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: DashboardData[] | any;
  meta: Pagination;
  loading:boolean
}

interface FailureAction {
  error: string;
  loading:boolean;
}

const INITIAL_STATE: DashboardsState = {
  data: [],
  meta: [],
  loading: false,
  error: null,
};

const _request = (state: DashboardsState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DashboardsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    meta: { $set: action.data },
    // meta: { $set: action.meta },
  });

const _failure = (state: DashboardsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const dashboardsList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});