import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { RoleData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'ROLES_',
    }
  );

export const RolesListTypes = Types;
export const RolesActions = Creators;

export interface RolesState {
    data: RoleData[] | null;
    loading: boolean;
    error: string | null;
  }
export interface RolesRequestAction {
    data: { id:number; name: string };
    error: string | null;
    onSuccess?: (data:RoleData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: RoleData[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:RolesState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:RolesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:RolesState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:RolesState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const roles = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });