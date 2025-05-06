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
    prefix: 'UPDATE_DEADLINE',
  }
);

export interface UpdateDeadlineState {
  // id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateDeadlineRequestAction {
  // id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateDeadlineState = {
  // id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateDeadlineState,
  action: UpdateDeadlineRequestAction
) =>
  update(state, {
    // id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateDeadlineState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateDeadlineState, action: FailureAction) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateDeadlineState) =>
  update(state, {
    // id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateDeadline = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateDeadlineTypes = Types;
export const UpdateDeadlineActions = Creators;
