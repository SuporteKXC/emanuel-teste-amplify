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
    prefix: 'COMEX_ORDER_ITEM_LOCATION_FETCH_',
  }
);

export const OrderItemLocationTypes = Types;
export const OrderItemLocationActions = Creators;

interface IOrderItemLocationData extends IOrderItemLocation { }

export interface OrderItemLocationState {
  data: IOrderItemLocationData | null;
  loading: boolean;
  error: string | null;
}

export interface OrderItemLocationRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IOrderItemLocationData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemLocationState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: OrderItemLocationState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemLocationState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: OrderItemLocationState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemLocation = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
