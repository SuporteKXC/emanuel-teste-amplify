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
    prefix: 'COMEX_JUSTIFICATION_TYPE_CREATE',
  }
);

export interface NewJustificationState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewJustificationTypeRequestAction {
  postData: any;
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewJustificationFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewJustificationState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewJustificationState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewJustificationState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewJustificationState, action: NewJustificationFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newJustificationType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewJustificationTypesTypes = Types;
export const NewJustificationTypesActions = Creators;
