import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SalesOrderItem } from "@/contracts/salesOrderItem";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "meta"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_SALES_ORDER_ITEM",
  }
);

export const SalesOrderItemListTypes = Types;
export const SalesOrderItemListActions = Creators;

export interface SalesOrderItemListState {
  data: SalesOrderItem[];
  meta: any;
  loading: boolean;
  error: string | null;
}

export interface SalesOrderItemListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: SalesOrderItem[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {

  data: {
    data: SalesOrderItem[];
    meta: any;
  }
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: SalesOrderItemListState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
};

const _request = (state: SalesOrderItemListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SalesOrderItemListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set: action.data.meta },
  });
}

const _failure = (state: SalesOrderItemListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const salesOrderItemList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
