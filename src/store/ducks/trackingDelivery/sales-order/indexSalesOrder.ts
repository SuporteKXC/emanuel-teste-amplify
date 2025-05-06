import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Indicators, SalesOrder
} from "contracts/salesOrder";

const { Types, Creators } = createActions(
  {
    request: ["query", "statusFilter","onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "INDEX_SALES_ORDER",
  }
);

export const SalesOrderIndexTypes = Types;
export const SalesOrderIndexActions = Creators;

export interface SalesOrderIndexState {
  data: SalesOrder[];
  loading: boolean;
  error: string | null;
}

export interface SalesOrderIndexRequestAction {
  query?: any;
  statusFilter?: any;
  error: string | null;
  onSuccess?: (data: SalesOrder[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: SalesOrder[];
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: SalesOrderIndexState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: SalesOrderIndexState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SalesOrderIndexState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: SalesOrderIndexState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const salesOrderIndex = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
