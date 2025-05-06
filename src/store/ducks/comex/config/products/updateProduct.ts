import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'alert_critical', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_PRODUCT_',
  }
);

export interface UpdateProductState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateProductRequestAction {
  id: number;
  alert_critical: 0 | 1;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateProductFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateProductState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateProductState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateProductState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateProductState, action: UpdateProductFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateProduct = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateProductTypes = Types;
export const UpdateProductActions = Creators;
