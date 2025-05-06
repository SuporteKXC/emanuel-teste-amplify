import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IShipmentTracking } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_SHIPMENT_TRACKING_',
  }
);

export const OrderItemShipmentTrackingTypes = Types;
export const OrderItemShipmentTrackingActions = Creators;

interface IShipmentTrackingData extends IShipmentTracking {}

export interface OrderItemShipmentTrackingState {
  data: IShipmentTrackingData | null
  loading: boolean;
  error: string | null;
}

export interface OrderItemShipmentTrackingRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IShipmentTrackingData
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemShipmentTrackingState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: OrderItemShipmentTrackingState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemShipmentTrackingState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: OrderItemShipmentTrackingState, action: FailureAction) =>
  update(state, {
    data: { $set: null },
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemShipmentTracking = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
