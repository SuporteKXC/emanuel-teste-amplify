import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'read', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_ALERT_',
  }
);

export interface UpdateAlertState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateAlertRequestAction {
  id: number;
  read: 0 | 1;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateAlertFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateAlertState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateAlertState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateAlertState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateAlertState, action: UpdateAlertFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateAlert = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateAlertTypes = Types;
export const UpdateAlertActions = Creators;
