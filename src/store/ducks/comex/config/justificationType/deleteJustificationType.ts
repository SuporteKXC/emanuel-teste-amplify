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
    prefix: 'COMEX_DELETE_JUSTIFICATION_TYPE_',
  }
);

export interface DeleteJustificationTypeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteJustificationTypeRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteJustificationTypeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteJustificationTypeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteJustificationTypeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteJustificationTypeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteJustificationTypeState, action: DeleteJustificationTypeFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteJustificationType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteJustificationTypeTypes = Types;
export const DeleteJustificationTypeActions = Creators;
