import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ExportOrderJustificationData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_EXPORT_ORDER_JUSTIFICATION_NEW',
    }
  );

export const NewExportOrderJustificationTypes = Types;
export const NewExportOrderJustificationActions = Creators;

export interface ExportOrderJustificationNewState {
    data: ExportOrderJustificationData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface NewExportOrderJustificationRequestAction {
    postData: any;
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
const INITIAL_STATE:ExportOrderJustificationNewState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:ExportOrderJustificationNewState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ExportOrderJustificationNewState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ExportOrderJustificationNewState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const newExportOrderJustification = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });