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
    prefix: 'COMEX_NEW_ALERT_TYPE_',
  }
);

export interface NewAlertTypeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewAlertTypeRequestAction {
  postData: { 
    description: string;
    roles: string[];
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewAlertTypeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewAlertTypeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewAlertTypeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewAlertTypeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewAlertTypeState, action: NewAlertTypeFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newAlertType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewAlertTypeTypes = Types;
export const NewAlertTypeActions = Creators;
