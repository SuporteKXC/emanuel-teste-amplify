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
    prefix: 'APPROVE_INVOICE_JUSTIFICATION_',
  }
);

export interface ApproveInvoiceJustificationState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface ApproveInvoiceJustificationRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: ApproveInvoiceJustificationState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: ApproveInvoiceJustificationState) => 
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: ApproveInvoiceJustificationState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: ApproveInvoiceJustificationState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: ApproveInvoiceJustificationState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const approveInvoiceJustification = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ApproveInvoiceJustificationTypes = Types;
export const ApproveInvoiceJustificationActions = Creators;
