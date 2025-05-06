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
    prefix: 'UPDATE_WAREHOUSE_MEMBER_',
  }
);

export interface UpdateWarehouseMemberState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateWarehouseMemberRequestAction {
  id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateWarehouseMemberState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateWarehouseMemberState,
  action: UpdateWarehouseMemberRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateWarehouseMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateWarehouseMemberState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateWarehouseMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateWarehouseMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateWarehouseMemberTypes = Types;
export const UpdateWarehouseMemberActions = Creators;
