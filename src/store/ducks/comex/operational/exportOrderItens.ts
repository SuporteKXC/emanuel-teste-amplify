import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ExportOrderItem, OrderItemData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  { prefix: 'COMEX_EXPORT_ORDER_ITEMS_' }
);

export interface ExportOrderItemsState {
  data: ExportOrderItem[] | null
  loading: boolean;
  error: string | null;
}

export interface ExportOrderItemsRequestAction {
  data: ExportOrderItem[]
  error: string | null;
  onSuccess?: (data: any) => void;
  onFailure?: () => void;
  params: any;
}

interface ISuccessAction {
  data: ExportOrderItem[]
}

 interface IFailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ExportOrderItemsState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: ExportOrderItemsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: ExportOrderItemsState,
  action: ISuccessAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ExportOrderItemsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const exportOrderItems = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ExportOrderItemsTypes = Types;
export const ExportOrderItemsActions = Creators;