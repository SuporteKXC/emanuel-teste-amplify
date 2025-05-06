import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['putData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'UPDATE_DOCUMENT_CARRIER',
  }
);

export interface UpdateDocumentCarrierState {
  // id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateDocumentCarrierRequestAction {
  // id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateDocumentCarrierState = {
  // id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateDocumentCarrierState,
  action: UpdateDocumentCarrierRequestAction
) =>
  update(state, {
    // id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateDocumentCarrierState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateDocumentCarrierState, action: FailureAction) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateDocumentCarrierState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateDocumentCarrier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateDocumentCarrierTypes = Types;
export const UpdateDocumentCarrierActions = Creators;
