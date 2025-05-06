import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { IPermissionData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'PERMISSION_GET',
  }
);

export interface PermissionState {
  data: IPermissionData | null;
  loading: boolean;
  error: string | null;
}

export interface PermissionRequestAction {
  data: IPermissionData;
  error: string | null;
  onSuccess?: (data:PermissionState) => void;
  onFailure?: () => void;
}

const INITIAL_STATE: PermissionState = {
  data: null,
  loading: false,
  error: null,
};

interface SuccessAction {
  data: IPermissionData;
}
interface FailureAction {
  error: string;
}

const _request = (state:PermissionState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: PermissionState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: PermissionState, action: FailureAction) =>
update(state, {
  loading: { $set: false },
  error: { $set: action.error },
});

const _reset = () => INITIAL_STATE;

export const permission = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});

export const PermissionTypes = Types;
export const PermissionActions = Creators;
