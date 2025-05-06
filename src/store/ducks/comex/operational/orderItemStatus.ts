import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IOrderItemStatus } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_STATUS_FETCH_',
  }
);

export const OrderItemStatusTypes = Types;
export const OrderItemStatusActions = Creators;


export interface orderItemStatusState {
  data: IOrderItemStatus[] | [];
  loading: boolean;
  error: string | null;
}

export interface orderItemStatusRequestAction {
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IOrderItemStatus[];
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: orderItemStatusState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: orderItemStatusState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: orderItemStatusState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: orderItemStatusState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemStatus = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
