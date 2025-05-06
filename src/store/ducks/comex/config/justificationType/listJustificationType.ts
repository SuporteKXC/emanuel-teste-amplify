import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { JustificationData } from "contracts";
import type { JustificationTypeData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_JUSTIFICATION_TYPE_LIST',
    }
  );

export const JustificationTypeListTypes = Types;
export const JustificationTypeListActions = Creators;

export interface JustificationTypeState {
    data: JustificationTypeData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface JustificationTypeRequestAction {
    params?: any;
    error: string | null;
    onSuccess?: (data:JustificationTypeData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: JustificationTypeData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:JustificationTypeState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:JustificationTypeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationTypeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: JustificationTypeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const justificationTypes = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });