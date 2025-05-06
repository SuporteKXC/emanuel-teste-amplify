import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { IFilters } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'FILTERS',
    }
  );

export const FiltersListTypes = Types;
export const FiltersListActions = Creators;

export interface FiltersState {
    data: IFilters[] | null;
    loading: boolean;
    error: string | null;
  }
export interface FiltersRequestAction {
  params: Record<string, string>;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
    data: IFilters[];
    loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: FiltersState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: FiltersState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FiltersState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FiltersState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const filters = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});