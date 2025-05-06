import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { OrderItemData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['param','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_SHOW_ORDER_ITEM_',
    }
  );

export const ShowOrderItemTypes = Types;
export const ShowOrderItemActions = Creators;

export interface ShowOrderItemState {
    data: OrderItemData | null;
    loading: boolean;
    error: string | null;
  }
export interface ShowOrderItemRequestAction {
    param: string;
    error: string | null;
    onSuccess?: (data:OrderItemData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: OrderItemData;
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:ShowOrderItemState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:ShowOrderItemState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:ShowOrderItemState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:ShowOrderItemState, action:FailureAction) =>
  update(state, {
    data: { $set: null },
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItem = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });