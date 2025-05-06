import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'CREATE_WAREHOUSE_',
  }
);

export interface CreateWarehouseState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface CreateWarehouseRequestAction {
  postData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: CreateWarehouseState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: CreateWarehouseState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: CreateWarehouseState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateWarehouseState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: CreateWarehouseState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const createWarehouse = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const CreateWarehouseTypes = Types;
export const CreateWarehouseActions = Creators;
