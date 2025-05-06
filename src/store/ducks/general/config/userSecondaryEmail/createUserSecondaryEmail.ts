import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'USER_SECONDARY_EMAIL_CREATE_',
  }
);

export interface UserSecondaryEmailState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UserSecondaryEmailRequestAction {
  postData: { 
    user_id: number;
    email: string;
    expiry_date: string;
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface UserSecondaryEmailFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UserSecondaryEmailState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UserSecondaryEmailState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UserSecondaryEmailState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UserSecondaryEmailState, action: UserSecondaryEmailFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const userSecondaryEmailCreate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UserSecondaryEmailTypes = Types;
export const UserSecondaryEmailActions = Creators;
