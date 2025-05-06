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
    prefix: 'COMEX_NEW_CREDIT_HISTORY_',
  }
);

export interface NewCreditHistoryState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewCreditHistoryRequestAction {
  postData: { 
    description: string;
    roles: string[];
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewCreditHistoryFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewCreditHistoryState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewCreditHistoryState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewCreditHistoryState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewCreditHistoryState, action: NewCreditHistoryFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newCreditHistory = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewCreditHistoryTypes = Types;
export const NewCreditHistoryActions = Creators;
