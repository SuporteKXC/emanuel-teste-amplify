import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_CANCEL_ORDER_ITENS_',
  }
);

export interface CancelOrderItensState {
  loading: boolean;
  errorMessage: string | null;
}

export interface CancelOrderItensRequestAction {
  postData: { ids: string[] };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface CancelOrderItensFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: CancelOrderItensState = {
  loading: false,
  errorMessage: null,
};

const request = (state: CancelOrderItensState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: CancelOrderItensState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CancelOrderItensState, action: CancelOrderItensFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const cancelOrderItens = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CancelOrderItensTypes = Types;
export const CancelOrderItensActions = Creators;
