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
    prefix: 'NEW_USER_',
  }
);

export interface NewUserState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewUserRequestAction {
  postData: { 
    name:string; 
    email: string; 
    password: string;
    fone: string;
    roles: string[];
    companies: string[];
    responsibles: string[];
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewUserFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewUserState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewUserState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewUserState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewUserState, action: NewUserFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newuser = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewUserTypes = Types;
export const NewUserActions = Creators;
