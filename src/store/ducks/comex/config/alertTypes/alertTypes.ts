import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { AlertTypeData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_ALERT_TYPES_',
    }
  );

export const AlertTypesListTypes = Types;
export const AlertTypesActions = Creators;

export interface AlertTypesState {
    data: AlertTypeData[] | null;
    loading: boolean;
    error: string | null;
  }
export interface AlertTypesRequestAction {
    params: Partial<AlertTypeData>
    error: string | null;
    onSuccess?: (data:AlertTypeData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: AlertTypeData[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:AlertTypesState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:AlertTypesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:AlertTypesState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:AlertTypesState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const alertTypes = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });