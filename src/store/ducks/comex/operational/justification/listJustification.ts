import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { JustificationData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_JUSTIFICATION_LIST',
    }
  );

export const JustificationListTypes = Types;
export const JustificationListActions = Creators;

export interface JustificationState {
    data: JustificationData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface JustificationRequestAction {
    error: string | null;
    onSuccess?: (data:JustificationData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: JustificationData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:JustificationState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:JustificationState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: JustificationState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const justifications = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });