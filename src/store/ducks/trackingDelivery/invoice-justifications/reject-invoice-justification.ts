import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { ApiValidationError } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'REJECT_INVOICE_JUSTIFICATION_',
  }
);

export interface RejectInvoiceJustificationState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface RejectInvoiceJustificationRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: RejectInvoiceJustificationState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: RejectInvoiceJustificationState) => 
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: RejectInvoiceJustificationState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: RejectInvoiceJustificationState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: RejectInvoiceJustificationState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const rejectInvoiceJustification = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const RejectInvoiceJustificationTypes = Types;
export const RejectInvoiceJustificationActions = Creators;
