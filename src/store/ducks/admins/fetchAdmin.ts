import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { Admin } from 'contracts/Admins';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_ADMIN_',
  }
);

export interface FetchAdminState {
  data: Admin | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchAdminRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Admin;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchAdminState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchAdminState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchAdminState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchAdminState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchAdminState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchAdmin = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchAdminTypes = Types;
export const FetchAdminActions = Creators;
