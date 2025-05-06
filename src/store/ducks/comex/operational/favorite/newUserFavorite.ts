import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { IUserFavorite } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_NEW_USER_FAVORITE_',
  }
);

interface IUserFavoriteData extends IUserFavorite { }

export interface NewUserFavoriteState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewUserFavoriteRequestAction {
  postData: { 
    user_id: string;
    order_item_id: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface NewUserFavoriteFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewUserFavoriteState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewUserFavoriteState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewUserFavoriteState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewUserFavoriteState, action: NewUserFavoriteFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newUserFavorite = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewUserFavoriteTypes = Types;
export const NewUserFavoriteActions = Creators;
