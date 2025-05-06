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
    prefix: 'COMEX_DELETE_ALERT_TYPE_',
  }
);

export interface DeleteAlertTypeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteAlertTypeRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteAlertTypeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteAlertTypeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteAlertTypeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteAlertTypeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteAlertTypeState, action: DeleteAlertTypeFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteAlertType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteAlertTypeTypes = Types;
export const DeleteAlertTypeActions = Creators;
