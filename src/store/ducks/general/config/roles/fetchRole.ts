import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { RoleData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'ROLE_FETCH_',
  }
);

export const FetchRoleTypes = Types;
export const FetchRoleActions = Creators;

interface IRoleData extends RoleData {}

export interface FetchRoleState {
  data: IRoleData | null;
  loading: boolean;
  error: string | null;
}

export interface FetchRoleRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: RoleData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IRoleData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchRoleState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: FetchRoleState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchRoleState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FetchRoleState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const role = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });