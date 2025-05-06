import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { JustificationTypeData } from "@/contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'JUSTIFICATION_TYPES_',
    }
  );

export const JustificationTypesListTypes = Types;
export const JustificationTypesActions = Creators;

export interface JustificationTypesState {
    data: JustificationTypeData[];
    loading: boolean;
    error: string | null;
  }
export interface JustificationTypesRequestAction {
    params: any;
    error: string | null;
    onSuccess?: (data: []) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: JustificationTypeData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:JustificationTypesState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:JustificationTypesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:JustificationTypesState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:JustificationTypesState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const listJustificationTypes = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });