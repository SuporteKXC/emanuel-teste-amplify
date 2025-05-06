import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination } from "contracts";
import type { OrderItemData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data','meta'],
      failure: ['error'],
      reset: [],
      startLoading: [],
      stopLoading: [],
    },
    {
      prefix: 'COMEX_ORDER_ITEM_',
    }
  );

export const OrderItemListTypes = Types;
export const OrderItemActions = Creators;

export interface OrderItemState {
    data: OrderItemData[] | null;
    meta: Pagination | any;
    loading: boolean;
    error: string | null;
  }
export interface OrderItemRequestAction {
    params: any;
    error: string | null;
    onSuccess?: (data:OrderItemData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: OrderItemData[] | any;
    meta: Pagination;
    loading:boolean
}
interface FailureAction {
  error: string;
  loading:boolean;
}
const INITIAL_STATE:OrderItemState = {
  data: null,
  meta:[],
  loading: false,
  error: null,
};

const _request = (state:OrderItemState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:OrderItemState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set:action.data.meta},
  });

const _failure = (state:OrderItemState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _startLoading = (state:OrderItemState) => 
  update(state, { loading: { $set: true }})
  
const _stopLoading = (state:OrderItemState) => 
  update(state, { loading: { $set: false }})
  
const _reset = () => INITIAL_STATE;

export const orderItems = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
    [Types.START_LOADING]: _startLoading,
    [Types.STOP_LOADING]: _stopLoading
  });