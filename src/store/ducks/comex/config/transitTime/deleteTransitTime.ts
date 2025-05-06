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
    prefix: 'COMEX_DELETE_TRANSIT_TIME_',
  }
);

export interface DeleteTransitTimeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteTransitTimeRequestAction {
  id: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface DeleteTransitTimeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: DeleteTransitTimeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: DeleteTransitTimeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteTransitTimeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteTransitTimeState, action: DeleteTransitTimeFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const deleteTransitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteTransitTimeTypes = Types;
export const DeleteTransitTimeActions = Creators;
