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
    prefix: 'COMEX_DELETE_USER_FAVORITE_',
  }
);

export interface DeleteUserFavoriteState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteUserFavoriteRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteUserFavoriteFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteUserFavoriteState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteUserFavoriteState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteUserFavoriteState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserFavoriteState, action: DeleteUserFavoriteFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteUserFavorite = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserFavoriteTypes = Types;
export const DeleteUserFavoriteActions = Creators;
