import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ExportOrderJustificationData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_EXPORT_ORDER_JUSTIFICATION_GET',
    }
  );

export const GetExportOrderJustificationTypes = Types;
export const GetExportOrderJustificationActions = Creators;

export interface ExportOrderJustificationGetState {
    data: ExportOrderJustificationData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface GetExportOrderJustificationRequestAction {
    params: any;
    error: string | null;
    onSuccess?: (data:ExportOrderJustificationData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: ExportOrderJustificationData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:ExportOrderJustificationGetState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:ExportOrderJustificationGetState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ExportOrderJustificationGetState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ExportOrderJustificationGetState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const getExportOrderJustification = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });