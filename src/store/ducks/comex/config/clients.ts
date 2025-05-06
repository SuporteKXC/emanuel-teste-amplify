import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_CLIENT_',
    }
  );

export const ClientListTypes = Types;
export const ClientActions = Creators;

export interface ClientState {
    data: any[] | null;
    loading: boolean;
    error: string | null;
  }
export interface ClientRequestAction {
    data: { id: number; name: string };
    error: string | null;
    onSuccess?: (data: any) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: any[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ClientState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ClientState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ClientState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ClientState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const client = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });