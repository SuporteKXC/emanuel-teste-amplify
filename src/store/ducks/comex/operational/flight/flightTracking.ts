import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IFlightTracking } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_FLIGHT_TRACKING_',
  }
);

export const OrderItemFlightTrackingTypes = Types;
export const OrderItemFlightTrackingActions = Creators;

interface IFlightTrackingData extends IFlightTracking {}

export interface OrderItemFlightTrackingState {
  data: IFlightTrackingData | null
  loading: boolean;
  error: string | null;
}

export interface OrderItemFlightTrackingRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IFlightTrackingData
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: OrderItemFlightTrackingState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: OrderItemFlightTrackingState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemFlightTrackingState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: OrderItemFlightTrackingState, action: FailureAction) =>
  update(state, {
    data: { $set: null },
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemFlightTracking = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
