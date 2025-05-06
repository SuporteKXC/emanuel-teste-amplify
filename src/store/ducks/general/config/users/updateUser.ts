import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id','postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'UPDATE_USER_',
  }
);

export interface UpdateUserState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateUserRequestAction {
  id:number;
  postData: { 
    name:string; 
    email: string; 
    fone: string;
    roles: string[];
    companies: string[];
    responsibles: string[];
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateUserFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateUserState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateUserState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateUserState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateUserState, action: UpdateUserFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateUser = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateUserTypes = Types;
export const UpdateUserActions = Creators;
