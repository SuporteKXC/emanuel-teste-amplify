import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_DELETE_CREDIT_HISTORY_',
  }
);

export interface DeleteCreditHistoryState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteCreditHistoryRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteCreditHistoryFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteCreditHistoryState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteCreditHistoryState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteCreditHistoryState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteCreditHistoryState, action: DeleteCreditHistoryFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteCreditHistory = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteCreditHistoryTypes = Types;
export const DeleteCreditHistoryActions = Creators;
