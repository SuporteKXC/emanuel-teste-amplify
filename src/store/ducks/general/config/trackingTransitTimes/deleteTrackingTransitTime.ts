import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ApiValidationError } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage', 'validationErrors'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'DELETE_TRACKING_TRANSIT_TIME_',
  }
);

export interface DeleteTrackingTransitTimeState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
  validationErrors: ApiValidationError[];
}

export interface DeleteTrackingTransitTimeRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
  validationErrors?: ApiValidationError[];
}

const INITIAL_STATE: DeleteTrackingTransitTimeState = {
  id: null,
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (
  state: DeleteTrackingTransitTimeState,
  action: DeleteTrackingTransitTimeRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: DeleteTrackingTransitTimeState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: DeleteTrackingTransitTimeState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const softReset = (state: DeleteTrackingTransitTimeState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const deleteTrackingTransitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const DeleteTrackingTransitTimeTypes = Types;
export const DeleteTrackingTransitTimeActions = Creators;
