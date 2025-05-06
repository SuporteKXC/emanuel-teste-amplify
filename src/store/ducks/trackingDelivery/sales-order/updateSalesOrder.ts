import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Indicators, SalesOrder
} from "contracts/salesOrder";

const { Types, Creators } = createActions(
  {
    request: ["id", "data","onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "PUT_SALES_ORDER",
  }
);

export const SalesOrderPutTypes = Types;
export const SalesOrderPutActions = Creators;

export interface SalesOrderPutState {
  data: SalesOrder | null;
  loading: boolean;
  error: string | null;
}

export interface SalesOrderPutRequestAction {
  id: any;
  data: Partial<SalesOrder>;
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

const INITIAL_STATE: SalesOrderPutState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: SalesOrderPutState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SalesOrderPutState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: SalesOrderPutState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const salesOrderPut = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
