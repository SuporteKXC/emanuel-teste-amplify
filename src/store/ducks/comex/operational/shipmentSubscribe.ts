import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_SHIPMENT_SUBSCRIBE_',
  }
);

export const OrderItemShipmentSubscribeTypes = Types;
export const OrderItemShipmentSubscribeActions = Creators;

export interface OrderItemShipmentSubscribeState {
  loading: boolean;
  error: string | null;
}

export interface OrderItemShipmentSubscribeRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction { }

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemShipmentSubscribeState = {
  loading: false,
  error: null,
};

const _request = (state: OrderItemShipmentSubscribeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemShipmentSubscribeState) =>
  update(state, {
    loading: { $set: false },
  });

const _failure = (state: OrderItemShipmentSubscribeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemShipmentSubscribe = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
