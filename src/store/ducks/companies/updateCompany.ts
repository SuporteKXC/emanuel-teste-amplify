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
    prefix: 'UPDATE_COMPANY_',
  }
);

export interface UpdateCompanyState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface UpdateCompanyRequestAction {
  id: number;
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: UpdateCompanyState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: UpdateCompanyState,
  action: UpdateCompanyRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: UpdateCompanyState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: UpdateCompanyState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: UpdateCompanyState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const updateCompany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const UpdateCompanyTypes = Types;
export const UpdateCompanyActions = Creators;
