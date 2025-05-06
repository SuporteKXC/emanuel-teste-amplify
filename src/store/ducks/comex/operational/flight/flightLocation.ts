import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IOrderItemLocation } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_FLIGHT_FETCH_',
  }
);

export const OrderItemFlightLocationTypes = Types;
export const OrderItemFlightLocationActions = Creators;

interface IOrderItemFlightLocationData extends IOrderItemLocation { }

export interface OrderItemFlightLocationState {
  data: IOrderItemFlightLocationData | null;
  loading: boolean;
  error: string | null;
}

export interface OrderItemFlightLocationRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IOrderItemFlightLocationData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemFlightLocationState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: OrderItemFlightLocationState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemFlightLocationState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: OrderItemFlightLocationState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemFlightLocation = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
