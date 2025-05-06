import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'DELETE_ADMIN_',
  }
);

export interface DeleteAdminState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteAdminRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: DeleteAdminState = {
  id: null,
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteAdminState, action: DeleteAdminRequestAction) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteAdminState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: DeleteAdminState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: DeleteAdminState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const deleteAdmin = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const DeleteAdminTypes = Types;
export const DeleteAdminActions = Creators;
