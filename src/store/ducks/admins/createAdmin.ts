import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { ApiValidationError } from 'contracts/Common';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'CREATE_ADMIN_',
  }
);

export interface CreateAdminState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface CreateAdminRequestAction {
  postData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: CreateAdminState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: CreateAdminState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: CreateAdminState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateAdminState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: CreateAdminState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const createAdmin = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const CreateAdminTypes = Types;
export const CreateAdminActions = Creators;
