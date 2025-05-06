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
    prefix: 'USER_SECONDARY_EMAIL_DELETE_',
  }
);

export interface UserSecondaryEmailDeleteState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UserSecondaryEmailDeleteRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteUserSecondaryEmailFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UserSecondaryEmailDeleteState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UserSecondaryEmailDeleteState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UserSecondaryEmailDeleteState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UserSecondaryEmailDeleteState, action: DeleteUserSecondaryEmailFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const userSecondaryEmailDelete = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UserSecondaryEmailDeleteTypes = Types;
export const UserSecondaryEmailDeleteActions = Creators;
