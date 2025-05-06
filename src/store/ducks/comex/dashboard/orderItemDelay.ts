import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination } from "contracts";
import type { IOrderItemDelay } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["params", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_ORDER_ITEM_DELAY",
  }
);

export const OrderItemDelayTypes = Types;
export const OrderItemDelayActions = Creators;

export interface OrderItemDelayState {
  data: IOrderItemDelay | null;
  loading: boolean;
  error: string | null;
}
export interface OrderItemDelayRequestAction {
  params: any;
  error: string | null;
  onSuccess?: (data: IOrderItemDelay) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IOrderItemDelay[] | any;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: OrderItemDelayState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: OrderItemDelayState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemDelayState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: OrderItemDelayState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemsDelay = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
