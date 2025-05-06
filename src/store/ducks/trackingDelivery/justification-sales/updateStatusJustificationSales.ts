import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { ApiValidationError } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['statusData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'UPDATE_STATUS_JUSTIFICATION_SALES',
  }
);

export interface UpdateStatusJustificationSalesState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateStatusJustificationSalesRequestAction {
  statusData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateStatusJustificationSalesState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: UpdateStatusJustificationSalesState) => 
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateStatusJustificationSalesState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateStatusJustificationSalesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateStatusJustificationSalesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateStatusJustificationSales = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateStatusJustificationSalesTypes = Types;
export const UpdateStatusJustificationSalesActions = Creators;
