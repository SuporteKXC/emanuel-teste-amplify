import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { IModule } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'MODULES_',
    }
  );

export const ModulesListTypes = Types;
export const ModulesListActions = Creators;

export interface ModulesState {
    data: IModule[] | null;
    loading: boolean;
    error: string | null;
  }
export interface ModulesRequestAction {
  params: Record<string, string>;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
    data: IModule[];
    loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: ModulesState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ModulesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ModulesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ModulesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const modules = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});