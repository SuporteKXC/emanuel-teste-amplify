import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['putData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    reset: [],
  },
  {
    prefix: 'UPDATE_ACCOUNT_',
  }
);

export interface UpdateAccountState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateAccountRequestAction {
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateAccountState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: UpdateAccountState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateAccountState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateAccountState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const reset = () => INITIAL_STATE;

export const updateAccount = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateAccountTypes = Types;
export const UpdateAccountActions = Creators;
