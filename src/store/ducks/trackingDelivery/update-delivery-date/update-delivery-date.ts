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
    prefix: 'UPDATE_DELIVERY_DATE',
  }
);

export interface UpdateDeliveryDateState {
  // id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateDeliveryDateRequestAction {
  // id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateDeliveryDateState = {
  // id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateDeliveryDateState,
  action: UpdateDeliveryDateRequestAction
) =>
  update(state, {
    // id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateDeliveryDateState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateDeliveryDateState, action: FailureAction) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateDeliveryDateState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateDeliveryDate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateDeliveryDateTypes = Types;
export const UpdateDeliveryDateActions = Creators;
