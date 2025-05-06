import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['id', 'putData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'UPDATE_ADMIN_',
  }
);

export interface UpdateAdminState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateAdminRequestAction {
  id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateAdminState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: UpdateAdminState, action: UpdateAdminRequestAction) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateAdminState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateAdminState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateAdminState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateAdmin = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateAdminTypes = Types;
export const UpdateAdminActions = Creators;
