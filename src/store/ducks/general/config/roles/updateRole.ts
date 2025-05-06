import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'UPDATE_ROLE_',
  }
);

export interface UpdateRoleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateRoleRequestAction {
  id: number;
  postData: {
    name: string,
    actionIds: {
      action_id: string
    }[]
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateRoleFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateRoleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateRoleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateRoleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateRoleState, action: UpdateRoleFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateRole = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateRoleTypes = Types;
export const UpdateRoleActions = Creators;
