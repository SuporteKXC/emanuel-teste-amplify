import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['id', 'putData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'UPDATE_WAREHOUSE_',
  }
);

export interface UpdateWarehouseState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateWarehouseRequestAction {
  id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateWarehouseState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateWarehouseState,
  action: UpdateWarehouseRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateWarehouseState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateWarehouseState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateWarehouseState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateWarehouse = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateWarehouseTypes = Types;
export const UpdateWarehouseActions = Creators;
