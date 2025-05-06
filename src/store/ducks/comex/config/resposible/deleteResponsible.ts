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
    prefix: 'COMEX_DELETE_RESPONSIBLE_',
  }
);

export interface DeleteResponsibleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteResponsibleRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteUserFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteResponsibleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteResponsibleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteResponsibleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteResponsibleState, action: DeleteUserFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteResponsible = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteResponsibleTypes = Types;
export const DeleteResponsibleActions = Creators;
