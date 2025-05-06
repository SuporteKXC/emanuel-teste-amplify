import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'DELETE_ROLE_',
  }
);

export interface DeleteRoleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteRoleRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteRoleFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteRoleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteRoleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteRoleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteRoleState, action: DeleteRoleFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteRole = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteRoleTypes = Types;
export const DeleteRoleActions = Creators;
