import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { UserAlertData } from "contracts";
import { Pagination } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params','onSuccess','onFailure'],
    success: ['data', 'meta'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_EXPORT_ORDER_ITEM_ALERTS_',
  }
);

export const ExportOrderItemAlertListTypes = Types;
export const ExportOrderItemAlertActions = Creators;

export interface ExportAlertState {
  data: UserAlertData[] | null;
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}
  
export interface ExportOrderItemAlertRequestAction {
  data: UserAlertData[];
  error: string | null;
  onSuccess?: (data:UserAlertData[]) => void;
  onFailure?: () => void;
  params: any;
}

interface SuccessAction {
  data: UserAlertData[] | any;
  meta: Pagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ExportAlertState = {
  data: null,
  meta: [],
  loading: false,
  error: null,
};

const _request = (state: ExportAlertState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ExportAlertState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set:action.data.meta },
  });

const _failure = (state: ExportAlertState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const _reset = () => INITIAL_STATE;

export const exportOrderItemAlert = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
});