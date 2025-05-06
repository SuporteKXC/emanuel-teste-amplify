import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Indicators, SalesOrder
} from "contracts/salesOrder";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "SHOW_SALES_ORDER",
  }
);

export const SalesOrderShowTypes = Types;
export const SalesOrderShowActions = Creators;

export interface SalesOrderShowState {
  data: SalesOrder | null;
  loading: boolean;
  error: string | null;
}

export interface SalesOrderShowRequestAction {
  id: any;
  error: string | null;
  onSuccess?: (data: SalesOrder[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: SalesOrder | null;
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: SalesOrderShowState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: SalesOrderShowState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SalesOrderShowState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: SalesOrderShowState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const salesOrderShow = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
