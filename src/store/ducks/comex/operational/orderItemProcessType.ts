import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IOrderItemProcessTypes } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_ORDER_ITEM_PROCESS_TYPE_FETCH_',
  }
);

export const OrderItemProcessTypesTypes = Types;
export const OrderItemProcessTypesActions = Creators;


export interface orderItemProcessTypesState {
  data: IOrderItemProcessTypes[] | [];
  loading: boolean;
  error: string | null;
}

export interface orderItemProcessTypesRequestAction {
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IOrderItemProcessTypes[];
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: orderItemProcessTypesState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: orderItemProcessTypesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: orderItemProcessTypesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: orderItemProcessTypesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemProcessTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
