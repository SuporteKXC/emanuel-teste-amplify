import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_JUSTIFICATION_TYPE_UPDATE_',
  }
);

export interface UpdateJustificationTypeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateJustificationTypeRequestAction {
  id: number;
  postData: { 
    description:string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateJustificationTypeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateJustificationTypeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateJustificationTypeState) =>
update(state, {
  loading: { $set: true },
  errorMessage: { $set: null },
});

const success = (state: UpdateJustificationTypeState) =>
update(state, {
  loading: { $set: false },
});

const failure = (state: UpdateJustificationTypeState, action: UpdateJustificationTypeFailureAction) =>
update(state, {
  loading: { $set: false },
  errorMessage: { $set: action.errorMessage },
});

const reset = () => INITIAL_STATE;

export const updateJustificationType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateJustificationTypeTypes = Types;
export const UpdateJustificationTypeActions = Creators;
