import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ResponsibleData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_RESPONSIBLE_LIST',
    }
  );

export const ResponsibleListTypes = Types;
export const ResponsibleActions = Creators;

export interface ResponsibleState {
    data: ResponsibleData[] | null;
    loading: boolean;
    error: string | null;
  }
export interface ResponsibleRequestAction {
    data: ResponsibleData[];
    error: string | null;
    onSuccess?: (data:ResponsibleData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: ResponsibleData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:ResponsibleState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:ResponsibleState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ResponsibleState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ResponsibleState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const responsibles = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });