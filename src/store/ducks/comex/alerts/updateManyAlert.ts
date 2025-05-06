import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['ids', 'read', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_MANY_ALERT_',
  }
);

export interface UpdateManyAlertState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateManyAlertRequestAction {
  ids: number[];
  read: 0 | 1;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateManyAlertFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateManyAlertState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateManyAlertState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateManyAlertState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateManyAlertState, action: UpdateManyAlertFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateManyAlert = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateManyAlertTypes = Types;
export const UpdateManyAlertActions = Creators;
