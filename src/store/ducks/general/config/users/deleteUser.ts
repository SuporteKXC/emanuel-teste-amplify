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
    prefix: 'DELETE_USER_',
  }
);

export interface DeleteUserState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteUserRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteUserFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteUserState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteUserState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteUserState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserState, action: DeleteUserFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteUser = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserTypes = Types;
export const DeleteUserActions = Creators;
