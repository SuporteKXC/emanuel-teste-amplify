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
    prefix: 'COMEX_UPDATE_MANY_EXPORT_ORDER_ITEM_ALERT_',
  }
);

export interface UpdateManyExportOrderItemAlertState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateManyExportOrderItemAlertRequestAction {
  ids: number[];
  read: 0 | 1;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateManyExportOrderItemAlertFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateManyExportOrderItemAlertState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateManyExportOrderItemAlertState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateManyExportOrderItemAlertState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateManyExportOrderItemAlertState, action: UpdateManyExportOrderItemAlertFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateManyExportOrderItemAlert = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateManyExportOrderItemAlertTypes = Types;
export const UpdateManyExportOrderItemAlertActions = Creators;
