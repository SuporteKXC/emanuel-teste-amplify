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
    prefix: 'NEW_ROLE_',
  }
);

export interface NewRoleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewRoleRequestAction {
  postData: {
    name: string,
    actionIds: {
      action_id: string
    }[]
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewRoleFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewRoleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewRoleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewRoleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewRoleState, action: NewRoleFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newrole = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewRoleTypes = Types;
export const NewRoleActions = Creators;
