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
    prefix: 'COMEX_UPDATE_EXPORT_ORDER_ITEM_ALERT_',
  }
);

export interface UpdateExportOrderItemAlertState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateExportOrderItemAlertRequestAction {
  id: number;
  read: 0 | 1;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateExportOderItemAlertFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateExportOrderItemAlertState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateExportOrderItemAlertState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateExportOrderItemAlertState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateExportOrderItemAlertState, action: UpdateExportOderItemAlertFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateExportOrderItemAlert = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateExportOrderItemAlertTypes = Types;
export const UpdateExportOrderItemAlertActions = Creators;
