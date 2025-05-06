import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Indicators, SalesOrder
} from "contracts/salesOrder";

const { Types, Creators } = createActions(
  {
    request: ["query", "statusFilter","onSuccess", "onFailure"],
    success: ["data", "meta"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_SALES_ORDER",
  }
);

export const SalesOrderListTypes = Types;
export const SalesOrderListActions = Creators;

export interface SalesOrderListState {
  data: SalesOrder[];
  meta: any;
  loading: boolean;
  error: string | null;
}

export interface SalesOrderListRequestAction {
  query?: any;
  statusFilter?: any;
  error: string | null;
  onSuccess?: (data: SalesOrder[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: {
    data: SalesOrder[];
    meta: any;
  }
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: SalesOrderListState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
};

const _request = (state: SalesOrderListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SalesOrderListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set: action.data.meta },
  });
}

const _failure = (state: SalesOrderListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const salesOrderList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
