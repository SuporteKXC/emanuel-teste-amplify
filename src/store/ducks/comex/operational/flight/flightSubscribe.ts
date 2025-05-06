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
    prefix: 'COMEX_ORDER_ITEM_FLIGHT_SUBSCRIBE_',
  }
);

export const OrderItemFlightSubscribeTypes = Types;
export const OrderItemFlightSubscribeActions = Creators;

export interface OrderItemFlightSubscribeState {
  loading: boolean;
  error: string | null;
}

export interface OrderItemFlightSubscribeRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction { }

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemFlightSubscribeState = {
  loading: false,
  error: null,
};

const _request = (state: OrderItemFlightSubscribeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemFlightSubscribeState) =>
  update(state, {
    loading: { $set: false },
  });

const _failure = (state: OrderItemFlightSubscribeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemFlightSubscribe = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
