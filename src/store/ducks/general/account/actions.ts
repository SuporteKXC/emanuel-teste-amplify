import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { IAction } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'ACTIONS_',
    }
  );

export const ActionsListTypes = Types;
export const ActionsListActions = Creators;

export interface ActionsState {
    data: IAction[] | null;
    loading: boolean;
    error: string | null;
  }
export interface ActionsRequestAction {
    data: { id:number; code: string; description:string; group?:string|null};
    error: string | null;
    onSuccess?: (data:IAction) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: IAction[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:ActionsState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:ActionsState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:ActionsState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:ActionsState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const actions = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });